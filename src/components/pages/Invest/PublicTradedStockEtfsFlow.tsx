import { ArrowLeft, Check, FileText, LineChart } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../../ui'
import { cn } from '../../../utils/cn'

type FlowStep = 2 | 3 | 4
type SecurityType = 'stock' | 'etf'
type OrderSide = 'buy' | 'sell'
type OrderType = 'market' | 'limit'
type TimeInForce = 'day' | 'gtc'
type SettlementMethod = 'cash-balance' | 'ach' | 'wire'

interface PublicTradedStockEtfsValues {
  securityType?: SecurityType
  symbol: string
  securityName: string
  orderSide?: OrderSide
  orderType?: OrderType
  quantity: string
  limitPrice: string
  timeInForce?: TimeInForce
  requestedTradeDate: string
  directedIraAccountNumber: string
  settlementMethod?: SettlementMethod
  brokerContactName: string
  brokerContactEmail: string
  brokerContactPhone: string
  confirmsOrderAuthorization: boolean
  confirmsMarketRiskAcknowledgement: boolean
  confirmsInvestmentSuitability: boolean
  signed: boolean
}

interface PublicTradedStockEtfsFlowProps {
  onBackToInvest: () => void
}

const inputClass =
  'h-11 w-full rounded-full border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted'

const badgeClass = 'inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-primary'

const StepItem = ({
  index,
  label,
  status,
}: {
  index: number
  label: string
  status: 'completed' | 'active' | 'pending'
}) => (
  <li className="flex items-center gap-3">
    {status === 'completed' ? (
      <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-200 text-text-primary">
        <Check className="h-4 w-4" />
      </span>
    ) : (
      <span
        className={cn(
          'grid h-7 w-7 place-items-center rounded-full text-xs',
          status === 'active'
            ? 'bg-text-primary font-semibold text-text-inverse'
            : 'border border-border bg-surface text-text-primary',
        )}
      >
        {index}
      </span>
    )}
    <span className="text-base font-medium text-text-primary">{label}</span>
  </li>
)

export const PublicTradedStockEtfsFlow = ({ onBackToInvest }: PublicTradedStockEtfsFlowProps) => {
  const [step, setStep] = useState<FlowStep>(2)
  const [values, setValues] = useState<PublicTradedStockEtfsValues>({
    symbol: '',
    securityName: '',
    quantity: '',
    limitPrice: '',
    requestedTradeDate: '',
    directedIraAccountNumber: '',
    brokerContactName: '',
    brokerContactEmail: '',
    brokerContactPhone: '',
    confirmsOrderAuthorization: false,
    confirmsMarketRiskAcknowledgement: false,
    confirmsInvestmentSuitability: false,
    signed: false,
  })

  const canContinue = useMemo(() => {
    if (step === 4) {
      return values.signed
    }

    if (step === 3) {
      return Boolean(
        values.settlementMethod &&
          values.brokerContactName.trim() &&
          values.brokerContactEmail.trim() &&
          values.brokerContactPhone.trim() &&
          values.confirmsOrderAuthorization &&
          values.confirmsMarketRiskAcknowledgement &&
          values.confirmsInvestmentSuitability,
      )
    }

    const requiresLimitPrice = values.orderType === 'limit'
    return Boolean(
      values.securityType &&
        values.symbol.trim() &&
        values.securityName.trim() &&
        values.orderSide &&
        values.orderType &&
        values.quantity.trim() &&
        values.timeInForce &&
        values.requestedTradeDate &&
        values.directedIraAccountNumber.trim() &&
        (!requiresLimitPrice || values.limitPrice.trim()),
    )
  }, [step, values])

  const setField = <K extends keyof PublicTradedStockEtfsValues>(key: K, value: PublicTradedStockEtfsValues[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }))
  }

  const back = (): void => {
    if (step === 2) {
      onBackToInvest()
      return
    }
    setStep((previous) => (previous - 1) as FlowStep)
  }

  const next = (): void => {
    if (!canContinue) {
      return
    }

    if (step === 4) {
      onBackToInvest()
      return
    }

    setStep((previous) => (previous + 1) as FlowStep)
  }

  return (
    <section className="min-h-[calc(100vh-3rem)] overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      <div className="flex min-h-[calc(100vh-3rem)]">
        <aside className="hidden w-[360px] border-r border-border px-5 py-6 lg:block">
          <ol className="space-y-5">
            <StepItem index={1} label="Account Type" status="completed" />
            <StepItem index={2} label="Trade Ticket" status={step === 2 ? 'active' : 'completed'} />
            <StepItem index={3} label="Settlement & Compliance" status={step === 3 ? 'active' : step > 3 ? 'completed' : 'pending'} />
            <StepItem index={4} label="Document Sign" status={step === 4 ? 'active' : 'pending'} />
          </ol>
        </aside>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between px-4 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={back}
                className="grid h-8 w-8 place-items-center rounded-full border border-border bg-surface text-text-primary"
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
                {step === 2 ? 'Trade Ticket' : step === 3 ? 'Settlement & Compliance' : 'Document Sign'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={cn(badgeClass, 'hidden md:inline-flex')}>
                <LineChart className="h-3.5 w-3.5" />
                Public Traded/Stock and ETFs
              </span>
              <button
                type="button"
                disabled
                className="h-9 rounded-full bg-slate-100 px-4 text-sm font-medium text-text-muted disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-6 md:px-6">
            {step === 2 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4 md:border-0 md:p-0">
                <div className="rounded-2xl border border-border p-4">
                  <p className="text-sm font-medium text-text-primary">Security Type*</p>
                  <div className="mt-3 space-y-3">
                    {[
                      ['stock', 'Stock'],
                      ['etf', 'ETF'],
                    ].map(([value, label]) => (
                      <label key={value} className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.securityType === value ? 'border-error bg-error' : 'border-border',
                          )}
                        >
                          <span className={cn('h-2.5 w-2.5 rounded-full', values.securityType === value ? 'bg-surface' : 'bg-transparent')} />
                        </span>
                        {label}
                        <input
                          type="radio"
                          className="sr-only"
                          checked={values.securityType === value}
                          onChange={() => setField('securityType', value as SecurityType)}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Ticker Symbol*</span>
                    <input
                      className={inputClass}
                      placeholder="e.g. AAPL"
                      value={values.symbol}
                      onChange={(event) => setField('symbol', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Security Name*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter security name"
                      value={values.securityName}
                      onChange={(event) => setField('securityName', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Order Side*</span>
                    <select
                      className={inputClass}
                      value={values.orderSide ?? ''}
                      onChange={(event) => setField('orderSide', event.target.value as OrderSide)}
                    >
                      <option value="">Select side</option>
                      <option value="buy">Buy</option>
                      <option value="sell">Sell</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Order Type*</span>
                    <select
                      className={inputClass}
                      value={values.orderType ?? ''}
                      onChange={(event) => setField('orderType', event.target.value as OrderType)}
                    >
                      <option value="">Select type</option>
                      <option value="market">Market</option>
                      <option value="limit">Limit</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Quantity*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter quantity"
                      value={values.quantity}
                      onChange={(event) => setField('quantity', event.target.value)}
                    />
                  </label>
                  {values.orderType === 'limit' ? (
                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary">Limit Price*</span>
                      <input
                        className={inputClass}
                        placeholder="$0.00"
                        value={values.limitPrice}
                        onChange={(event) => setField('limitPrice', event.target.value)}
                      />
                    </label>
                  ) : null}
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Time In Force*</span>
                    <select
                      className={inputClass}
                      value={values.timeInForce ?? ''}
                      onChange={(event) => setField('timeInForce', event.target.value as TimeInForce)}
                    >
                      <option value="">Select TIF</option>
                      <option value="day">Day</option>
                      <option value="gtc">GTC</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Requested Trade Date*</span>
                    <input
                      type="date"
                      className={inputClass}
                      value={values.requestedTradeDate}
                      onChange={(event) => setField('requestedTradeDate', event.target.value)}
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-xs text-text-secondary">Directed IRA Account Number*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter account number"
                      value={values.directedIraAccountNumber}
                      onChange={(event) => setField('directedIraAccountNumber', event.target.value)}
                    />
                  </label>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4 md:border-0 md:p-0">
                <div className="rounded-2xl border border-border p-4">
                  <p className="text-sm font-medium text-text-primary">Settlement Method*</p>
                  <div className="mt-3 space-y-3">
                    {[
                      ['cash-balance', 'Cash balance in account'],
                      ['ach', 'ACH funding'],
                      ['wire', 'Wire funding'],
                    ].map(([value, label]) => (
                      <label key={value} className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.settlementMethod === value ? 'border-error bg-error' : 'border-border',
                          )}
                        >
                          <span className={cn('h-2.5 w-2.5 rounded-full', values.settlementMethod === value ? 'bg-surface' : 'bg-transparent')} />
                        </span>
                        {label}
                        <input
                          type="radio"
                          className="sr-only"
                          checked={values.settlementMethod === value}
                          onChange={() => setField('settlementMethod', value as SettlementMethod)}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Broker Contact Name*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter contact name"
                      value={values.brokerContactName}
                      onChange={(event) => setField('brokerContactName', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Broker Contact Email*</span>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="name@example.com"
                      value={values.brokerContactEmail}
                      onChange={(event) => setField('brokerContactEmail', event.target.value)}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs text-text-secondary">Broker Contact Phone*</span>
                  <input
                    className={inputClass}
                    placeholder="(000) 000-0000"
                    value={values.brokerContactPhone}
                    onChange={(event) => setField('brokerContactPhone', event.target.value)}
                  />
                </label>

                {[
                  ['confirmsOrderAuthorization', 'I authorize Directed IRA to process this order as instructed.'],
                  ['confirmsMarketRiskAcknowledgement', 'I acknowledge market and execution risk associated with this trade.'],
                  ['confirmsInvestmentSuitability', 'I confirm this trade aligns with my IRA investment strategy.'],
                ].map(([key, label]) => (
                  <label key={key} className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3 text-sm text-text-primary">
                    <span
                      className={cn(
                        'mt-0.5 grid h-5 w-5 place-items-center rounded border',
                        values[key as keyof PublicTradedStockEtfsValues] ? 'border-error bg-error text-text-inverse' : 'border-border bg-surface',
                      )}
                    >
                      {values[key as keyof PublicTradedStockEtfsValues] ? <Check className="h-3.5 w-3.5" /> : null}
                    </span>
                    {label}
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={Boolean(values[key as keyof PublicTradedStockEtfsValues])}
                      onChange={(event) => setField(key as keyof PublicTradedStockEtfsValues, event.target.checked)}
                    />
                  </label>
                ))}
              </div>
            ) : null}

            {step === 4 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4 md:border-0 md:p-0">
                <div className="rounded-2xl border border-border p-5">
                  <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                    <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-error-light text-error">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-semibold text-text-primary md:text-3xl">Sign Stock/ETF Trade Request</h3>
                    <p className="mt-2 text-base text-text-secondary">Digitally sign to submit your public market trade request.</p>
                    <Button className="mt-5 rounded-full px-6" onClick={() => setField('signed', true)}>
                      {values.signed ? 'Signed' : 'Sign Document'}
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-border px-4 py-4 md:px-6">
            <button
              type="button"
              onClick={back}
              className="h-11 rounded-full border border-border bg-surface px-6 text-sm font-medium text-text-primary hover:bg-slate-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!canContinue}
              className={cn(
                'h-11 rounded-full px-7 text-sm font-semibold text-text-inverse transition-colors',
                canContinue ? 'bg-primary hover:bg-primary-hover' : 'cursor-not-allowed bg-slate-200 text-text-muted',
              )}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

