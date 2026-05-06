import type { FormStepSchema } from '../../../types/form.types'
import { cn } from '../../../utils/cn'
import { ProgressBar } from '../../ui'

interface FormStepperProps {
  steps: FormStepSchema[]
  activeStep: number
  onStepClick?: (index: number) => void
}

export const FormStepper = ({ steps, activeStep, onStepClick }: FormStepperProps) => {
  const completion = ((activeStep + 1) / steps.length) * 100

  return (
    <div className="space-y-4">
      <ProgressBar value={completion} />
      <ol className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {steps.map((step, index) => {
          const state = index === activeStep ? 'active' : index < activeStep ? 'complete' : 'pending'

          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => onStepClick?.(index)}
                className="w-full text-left"
                aria-current={state === 'active' ? 'step' : undefined}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'inline-grid h-6 w-6 place-items-center rounded-full text-xs font-semibold',
                      state === 'active' && 'bg-primary text-text-inverse',
                      state === 'complete' && 'bg-success text-text-inverse',
                      state === 'pending' && 'bg-slate-200 text-text-secondary',
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className={cn('text-xs', state === 'active' ? 'font-semibold text-text-primary' : 'text-text-secondary')}>
                    {step.title}
                  </span>
                </div>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
