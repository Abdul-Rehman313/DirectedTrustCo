import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { FormStep } from '../components/forms'
import type { FormStepSchema } from '../types/form.types'

const sampleStep: FormStepSchema = {
  id: 'personal-information',
  title: 'Personal Information',
  description: 'Provide your profile details.',
  fields: [
    {
      id: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter first name',
      required: true,
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'name@example.com',
      required: true,
    },
    {
      id: 'riskTolerance',
      type: 'select',
      label: 'Risk Tolerance',
      options: [
        { label: 'Conservative', value: 'conservative' },
        { label: 'Moderate', value: 'moderate' },
        { label: 'Aggressive', value: 'aggressive' },
      ],
    },
  ],
}

const FormStepPreview = ({ step }: { step: FormStepSchema }) => {
  const { control, watch, setValue, formState } = useForm<Record<string, unknown>>({
    defaultValues: {},
  })

  return (
    <div className="max-w-3xl">
      <FormStep step={step} control={control} errors={formState.errors} setValue={setValue} watch={watch} />
    </div>
  )
}

const meta: Meta<typeof FormStepPreview> = {
  title: 'Forms / FormStep',
  component: FormStepPreview,
}

export default meta
type Story = StoryObj<typeof FormStepPreview>

export const Default: Story = {
  args: {
    step: sampleStep,
  },
}

