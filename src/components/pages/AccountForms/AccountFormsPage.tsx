import { CreditCard, FileText, HandCoins, Landmark, MoveRight, Sprout, UserRound, Users } from 'lucide-react'
import { lazy, Suspense, useMemo, type ComponentType, type LazyExoticComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageWrapper } from '../../layout'
import { accountFormsCatalog } from '../../../data/formSchemas'
import { accounts } from '../../../data/mockData'
import { cn } from '../../../utils/cn'
import { Button, Card } from '../../ui'

const iconMap = {
  user: Users,
  card: CreditCard,
  document: FileText,
  invest: Sprout,
  account: UserRound,
  beneficiary: Users,
  distribution: HandCoins,
  attorney: Landmark,
  transfer: MoveRight,
} as const

interface AccountFormFlowProps {
  onBackToForms: () => void
}

type AccountFormFlowComponent = LazyExoticComponent<ComponentType<AccountFormFlowProps>>

const formFlowComponents: Record<string, AccountFormFlowComponent> = {
  'add-update-interested-party': lazy(() =>
    import('./AddUpdateInterestedPartyFlow').then((module) => ({ default: module.AddUpdateInterestedPartyFlow })),
  ),
  'credit-card-authorization': lazy(() =>
    import('./CreditCardAuthorizationFlow').then((module) => ({ default: module.CreditCardAuthorizationFlow })),
  ),
  'document-signature-authorization': lazy(() =>
    import('./DocumentSignatureAuthorizationFlow').then((module) => ({ default: module.DocumentSignatureAuthorizationFlow })),
  ),
  'roth-ira-conversion': lazy(() =>
    import('./RothIraConversionFlow').then((module) => ({ default: module.RothIraConversionFlow })),
  ),
  'update-account-information': lazy(() =>
    import('./UpdateAccountInformationFlow').then((module) => ({ default: module.UpdateAccountInformationFlow })),
  ),
  'beneficiary-designation-update': lazy(() =>
    import('./BeneficiaryDesignationUpdateFlow').then((module) => ({ default: module.BeneficiaryDesignationUpdateFlow })),
  ),
  'distribution-request-assets-cash': lazy(() =>
    import('./DistributionRequestAssetsCashFlow').then((module) => ({ default: module.DistributionRequestAssetsCashFlow })),
  ),
  'transfer-request-tradestation': lazy(() =>
    import('./TransferRequestTradestationFlow').then((module) => ({ default: module.TransferRequestTradestationFlow })),
  ),
}

export const AccountFormsPage = () => {
  const navigate = useNavigate()
  const { accountId, formId } = useParams()

  const account = useMemo(() => accounts.find((entry) => entry.id === accountId), [accountId])
  const selectedForm = useMemo(() => accountFormsCatalog.find((form) => form.id === formId) ?? null, [formId])
  const activeFormFlow = formId ? formFlowComponents[formId] : undefined

  const openForm = (nextFormId: string): void => {
    if (!accountId) {
      return
    }
    navigate(`/accounts/${accountId}/manage/account-forms/${nextFormId}`)
  }

  const backToFormsList = (): void => {
    if (!accountId) {
      return
    }
    navigate(`/accounts/${accountId}/manage/account-forms`)
  }

  if (!account) {
    return (
      <PageWrapper title="Account Not Found" subtitle="The account you requested was not found." showHeader={false}>
        <Card className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Account Not Found</h2>
          <p className="text-sm text-text-secondary">Please go back and select an available account.</p>
          <Button onClick={() => navigate('/')}>Back to Dashboard</Button>
        </Card>
      </PageWrapper>
    )
  }

  if (formId && activeFormFlow && selectedForm) {
    const ActiveFormFlow = activeFormFlow
    return (
      <PageWrapper title={selectedForm.title} subtitle="Complete steps to submit this form." showHeader={false}>
        <Suspense
          fallback={
            <section className="rounded-2xl border border-border bg-surface p-6 text-sm text-text-secondary shadow-card">
              Loading form...
            </section>
          }
        >
          <ActiveFormFlow onBackToForms={backToFormsList} />
        </Suspense>
      </PageWrapper>
    )
  }

  if (formId && !selectedForm) {
    return (
      <PageWrapper title="Form Not Found" subtitle="The requested account form does not exist." showHeader={false}>
        <Card className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Form Not Found</h2>
          <p className="text-sm text-text-secondary">Please go back and choose an available account form.</p>
          <Button onClick={backToFormsList}>Back To Account Forms</Button>
        </Card>
      </PageWrapper>
    )
  }

  if (selectedForm) {
    return (
      <PageWrapper title={selectedForm.title} subtitle="This workflow screen is being prepared." showHeader={false}>
        <section className="rounded-2xl border border-border bg-surface p-6 shadow-card">
          <h1 className="text-2xl font-semibold text-text-primary">{selectedForm.title}</h1>
          <p className="mt-2 text-sm text-text-secondary">{selectedForm.description}</p>
          <div className="mt-5">
            <Button variant="secondary" onClick={backToFormsList}>
              Back To Account Forms
            </Button>
          </div>
        </section>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title="Account Forms" subtitle="Access and manage account forms." showHeader={false}>
      <section className="rounded-2xl border border-border bg-surface px-4 py-4 shadow-card md:px-6 md:py-5">
        <div className="border-b border-border pb-4">
          <p className="text-[11px] text-text-secondary">
            Dashboard <span className="mx-1">{'>'}</span> Manage Account <span className="mx-1">{'>'}</span>{' '}
            <span className="font-semibold text-text-primary">Account Forms</span>
          </p>
        </div>

        <div className="border-b border-border py-4">
          <h1 className="text-[28px] font-semibold leading-none text-text-primary">Account Forms</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Access and manage all necessary forms related to your account setup, updates, or maintenance.
          </p>
          <p className="mt-2 text-xs font-medium text-text-secondary">
            {account.name} ({account.accountNumber})
          </p>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          {accountFormsCatalog.map((form, index) => {
            const Icon = iconMap[form.icon]
            const isSelected = formId ? form.id === formId : index === 0

            return (
              <button
                key={form.id}
                type="button"
                onClick={() => openForm(form.id)}
                className={cn(
                  'rounded-2xl border p-4 text-left transition-colors duration-200 ease-fintech',
                  isSelected ? 'border-primary bg-error-light/30' : 'border-border bg-surface hover:bg-slate-50',
                )}
              >
                <Icon className={cn('mb-5 h-5 w-5', isSelected ? 'text-primary' : 'text-text-primary')} />
                <p className="text-[16px] font-semibold leading-[1.05] text-text-primary">{form.title}</p>
                <p className="mt-2 text-sm text-text-secondary">{form.description}</p>
              </button>
            )
          })}
        </div>
      </section>
    </PageWrapper>
  )
}
