import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { describe, expect, it, vi } from 'vitest'
import { DynamicFormBuilder } from './DynamicFormBuilder/DynamicFormBuilder'
import { FormField } from './FormField/FormField'
import { FormStepper } from './FormStepper/FormStepper'
import type { FormFieldSchema, FormSchema } from '../../types/form.types'

const fieldHarnessSchema = (fieldSchema: FormFieldSchema, defaultValues: Record<string, unknown> = {}) => () => {
  const { control, formState, setValue, watch } = useForm<Record<string, unknown>>({ defaultValues })
  return <FormField fieldSchema={fieldSchema} control={control} errors={formState.errors} setValue={setValue} watch={watch} />
}

describe('Form Components', () => {
  it('renders FormStepper and handles step clicks', async () => {
    const onStepClick = vi.fn()
    const user = userEvent.setup()

    render(
      <FormStepper
        activeStep={1}
        onStepClick={onStepClick}
        steps={[
          { id: 'one', title: 'One', fields: [] },
          { id: 'two', title: 'Two', fields: [] },
          { id: 'three', title: 'Three', fields: [] },
        ]}
      />,
    )

    await user.click(screen.getByRole('button', { name: /one/i }))
    expect(onStepClick).toHaveBeenCalledWith(0)
    expect(screen.getByRole('button', { name: /two/i })).toHaveAttribute('aria-current', 'step')
  })

  it('hides conditional FormField when condition is not matched', () => {
    const ConditionalField = fieldHarnessSchema(
      {
        id: 'details',
        type: 'text',
        label: 'Details',
        conditional: { fieldId: 'showDetails', equals: true },
      },
      { showDetails: false },
    )

    render(<ConditionalField />)
    expect(screen.queryByLabelText('Details')).not.toBeInTheDocument()
  })

  it('formats SSN and currency input values', async () => {
    const user = userEvent.setup()
    const SSNField = fieldHarnessSchema({ id: 'ssn', type: 'ssn', label: 'SSN' })
    const CurrencyField = fieldHarnessSchema({ id: 'amount', type: 'currency', label: 'Amount' })

    render(
      <>
        <SSNField />
        <CurrencyField />
      </>,
    )

    await user.type(screen.getByLabelText('SSN'), '123456789')
    expect(screen.getByLabelText('SSN')).toHaveValue('123-45-6789')

    await user.type(screen.getByLabelText('Amount'), '1500')
    expect(screen.getByLabelText('Amount')).toHaveValue('$1500')
  })

  it('submits DynamicFormBuilder payload across multiple steps', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    const schema: FormSchema = {
      id: 'simple-form',
      title: 'Simple Form',
      description: 'Simple form description.',
      steps: [
        {
          id: 'basic',
          title: 'Basic',
          fields: [{ id: 'fullName', type: 'text', label: 'Full Name', validation: z.string().min(1, 'Required') }],
        },
        {
          id: 'review-submit',
          title: 'Review',
          fields: [{ id: 'review', type: 'info', label: 'Review values' }],
        },
      ],
    }

    render(<DynamicFormBuilder schema={schema} onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Full Name'), 'Jordan')
    await user.click(screen.getByRole('button', { name: 'Continue' }))
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Submit' }))
    expect(onSubmit).toHaveBeenCalled()
  })

  it('shows submit error when DynamicFormBuilder submit fails', async () => {
    const user = userEvent.setup()

    const schema: FormSchema = {
      id: 'review-only',
      title: 'Review Only',
      description: 'Review only form.',
      steps: [{ id: 'review-submit', title: 'Review', fields: [{ id: 'review', type: 'info', label: 'Review' }] }],
    }

    render(
      <DynamicFormBuilder
        schema={schema}
        onSubmit={async () => {
          throw new Error('Submission failed')
        }}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Submit' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Submission failed')
  })
})
