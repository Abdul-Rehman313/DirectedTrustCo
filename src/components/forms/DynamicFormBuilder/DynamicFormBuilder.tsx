import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useFormBuilder } from '../../../hooks/useFormBuilder'
import { useMultiStepForm } from '../../../hooks/useMultiStepForm'
import type { FormSchema, FormValues } from '../../../types/form.types'
import { Button, Card } from '../../ui'
import { FormStep } from '../FormStep/FormStep'
import { FormStepper } from '../FormStepper/FormStepper'

interface DynamicFormBuilderProps {
  schema: FormSchema
  onSubmit?: (data: FormValues) => Promise<void> | void
  onCancel?: () => void
}

export const DynamicFormBuilder = ({ schema, onSubmit, onCancel }: DynamicFormBuilderProps) => {
  const multiStep = useMultiStepForm(schema)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const currentStep = schema.steps[multiStep.currentStepIndex]
  const { control, handleSubmit, formState, getValues, reset, trigger, setValue, watch } = useFormBuilder(
    schema,
    multiStep.currentStepIndex,
    multiStep.formData,
  )

  useEffect(() => {
    reset(multiStep.formData)
  }, [multiStep.currentStepIndex, multiStep.formData, reset])

  if (!currentStep) {
    return null
  }

  const goNext = async (): Promise<void> => {
    const isValid = await trigger()
    if (!isValid) {
      return
    }
    multiStep.updateFormData(getValues())
    multiStep.goNext()
  }

  const submit = async (values: FormValues): Promise<void> => {
    multiStep.setIsSubmitting(true)
    setSubmitError(null)
    const payload = { ...multiStep.formData, ...values }

    try {
      await onSubmit?.(payload)
      multiStep.updateFormData(values)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit the form. Please try again.')
    } finally {
      multiStep.setIsSubmitting(false)
    }
  }

  const isReviewStep = currentStep.id === 'review-submit'

  return (
    <Card className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-text-primary">{schema.title}</h2>
        <p className="mt-2 text-sm text-text-secondary">{schema.description}</p>
      </div>

      <FormStepper steps={schema.steps} activeStep={multiStep.currentStepIndex} onStepClick={multiStep.goTo} />

      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <FormStep step={currentStep} control={control} errors={formState.errors} setValue={setValue} watch={watch} />
        </motion.div>

        {isReviewStep ? (
          <div className="rounded-md border border-border bg-slate-50 p-4">
            <h4 className="text-sm font-semibold text-text-primary">Entered Data Summary</h4>
            <pre className="mt-2 max-h-72 overflow-auto rounded-md bg-white p-3 text-xs text-text-secondary">
              {JSON.stringify({ ...multiStep.formData, ...watch() }, null, 2)}
            </pre>
          </div>
        ) : null}

        {submitError ? (
          <div className="rounded-md border border-error bg-error-light px-3 py-2 text-sm text-error" role="alert">
            {submitError}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" variant="secondary" onClick={multiStep.goBack} disabled={multiStep.isFirstStep}>
            Back
          </Button>

          {!multiStep.isLastStep ? (
            <Button type="button" onClick={goNext}>
              {multiStep.currentStepIndex === 0 ? 'Continue' : 'Next'}
            </Button>
          ) : (
            <Button type="submit" isLoading={multiStep.isSubmitting}>
              Submit
            </Button>
          )}

          {onCancel ? (
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>
    </Card>
  )
}
