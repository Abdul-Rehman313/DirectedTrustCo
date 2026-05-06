import type { Control, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import type { FormStepSchema } from '../../../types/form.types'
import { FormField } from '../FormField/FormField'

interface FormStepProps {
  step: FormStepSchema
  control: Control<Record<string, unknown>>
  errors: FieldErrors<Record<string, unknown>>
  setValue: UseFormSetValue<Record<string, unknown>>
  watch: UseFormWatch<Record<string, unknown>>
}

export const FormStep = ({ step, control, errors, setValue, watch }: FormStepProps) => (
  <section className="space-y-4">
    <header>
      <h3 className="text-lg font-semibold text-text-primary">{step.title}</h3>
      {step.description ? <p className="mt-1 text-sm text-text-secondary">{step.description}</p> : null}
    </header>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {step.fields.map((fieldSchema) => (
        <div key={fieldSchema.id} className={fieldSchema.type === 'info' ? 'md:col-span-2' : ''}>
          <FormField
            fieldSchema={fieldSchema}
            control={control}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        </div>
      ))}
    </div>
  </section>
)
