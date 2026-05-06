import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { FormField } from '../components/forms'
import type { FormFieldSchema } from '../types/form.types'

const textFieldSchema: FormFieldSchema = {
  id: 'fullName',
  type: 'text',
  label: 'Full Name',
  placeholder: 'Enter full name',
  required: true,
}

const fileFieldSchema: FormFieldSchema = {
  id: 'document',
  type: 'file',
  label: 'Upload Document',
  accept: '.pdf,.png,.jpg',
  maxSizeMb: 5,
}

const FormFieldPreview = ({ fieldSchema }: { fieldSchema: FormFieldSchema }) => {
  const { control, watch, setValue, formState } = useForm<Record<string, unknown>>({
    defaultValues: {},
  })

  return (
    <div className="max-w-xl">
      <FormField fieldSchema={fieldSchema} control={control} errors={formState.errors} setValue={setValue} watch={watch} />
    </div>
  )
}

const meta: Meta<typeof FormFieldPreview> = {
  title: 'Forms / FormField',
  component: FormFieldPreview,
}

export default meta
type Story = StoryObj<typeof FormFieldPreview>

export const TextInput: Story = {
  args: {
    fieldSchema: textFieldSchema,
  },
}

export const FileUpload: Story = {
  args: {
    fieldSchema: fileFieldSchema,
  },
}

