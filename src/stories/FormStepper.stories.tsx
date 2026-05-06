import type { Meta, StoryObj } from '@storybook/react'
import { FormStepper } from '../components/forms'
import type { FormStepSchema } from '../types/form.types'

const steps: FormStepSchema[] = [
  { id: 'one', title: 'Personal Info', fields: [] },
  { id: 'two', title: 'Account Details', fields: [] },
  { id: 'three', title: 'Verification', fields: [] },
  { id: 'four', title: 'Review', fields: [] },
]

const meta: Meta<typeof FormStepper> = {
  title: 'Forms / FormStepper',
  component: FormStepper,
  args: {
    steps,
    activeStep: 1,
  },
}

export default meta
type Story = StoryObj<typeof FormStepper>

export const Default: Story = {}

export const FirstStep: Story = {
  args: {
    activeStep: 0,
  },
}

export const LastStep: Story = {
  args: {
    activeStep: 3,
  },
}

