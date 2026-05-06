import {
  ArrowLeft,
  Baby,
  BriefcaseBusiness,
  Droplets,
  GraduationCap,
  HeartPulse,
  Landmark,
  Leaf,
  Repeat,
  Search,
  ShieldCheck,
  UserCircle2,
  Wallet,
} from 'lucide-react'
import { useMemo, useState, type ComponentType } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageWrapper } from '../../layout'
import { Button, Card } from '../../ui'
import { cn } from '../../../utils/cn'
import { RothIraOnboardingFlow } from './RothIraOnboardingFlow'

type CreateAccountGroup = 'account-types' | 'account-strategies' | 'other-account'

interface CreateAccountOption {
  id: string
  title: string
  description: string
  group: CreateAccountGroup
  icon: ComponentType<{ className?: string }>
  schemaTitle: string
}

const onboardingSteps = [
  'Account Type',
  'Owner Information',
  'Contact Information',
  'Statements and Tax Forms',
  'Add Beneficiary',
  'Add Interested Party',
  'Payment & Agreement',
  'Funding Option',
] as const

const createAccountOptions: ReadonlyArray<CreateAccountOption> = [
  {
    id: 'roth-ira',
    title: 'Roth IRA',
    description: 'Account holders at Directed IRA can use Roth IRAs to invest in alternative assets.',
    group: 'account-types',
    icon: Leaf,
    schemaTitle: 'Self-Directed - Roth IRA',
  },
  {
    id: 'traditional-ira',
    title: 'Traditional IRA',
    description: 'Account holders at Directed IRA can use Traditional IRAs to invest in alternative assets.',
    group: 'account-types',
    icon: Droplets,
    schemaTitle: 'Self-Directed - Traditional IRA',
  },
  {
    id: 'sep-ira',
    title: 'SEP IRA',
    description: 'Small business owners and self-employed individuals can invest their SEP IRAs into alternative assets.',
    group: 'account-types',
    icon: BriefcaseBusiness,
    schemaTitle: 'Self-Directed - SEP IRA',
  },
  {
    id: 'health-savings-account',
    title: 'Health Savings Account',
    description: 'Take control of your healthcare savings with a self-directed Health Savings Account (HSA).',
    group: 'account-types',
    icon: HeartPulse,
    schemaTitle: 'Self-Directed - Health Savings Account (HSA)',
  },
  {
    id: 'coverdell-education-savings-account',
    title: 'Coverdell Education Savings Account',
    description: 'Account holders at Directed IRA can invest their Coverdell ESA in alternative assets.',
    group: 'account-types',
    icon: GraduationCap,
    schemaTitle: 'Self-Directed - Coverdell Education Savings Account',
  },
  {
    id: 'inherited-traditional-ira',
    title: 'Inherited Traditional IRA',
    description: 'Inherited IRAs can be a powerful tool for preserving and growing the wealth left by a loved one.',
    group: 'account-types',
    icon: Landmark,
    schemaTitle: 'Self-Directed - Inherited Traditional IRA',
  },
  {
    id: 'inherited-roth-ira',
    title: 'Inherited Roth IRA',
    description: 'Inherited IRAs can be a powerful tool for preserving and growing the wealth left by a loved one.',
    group: 'account-types',
    icon: Landmark,
    schemaTitle: 'Self-Directed - Inherited Roth IRA',
  },
  {
    id: 'roth-ira-kids-account',
    title: 'Roth IRA Kids Account',
    description: 'Inherited IRAs can be a powerful tool for preserving and growing the wealth left by a loved one.',
    group: 'account-types',
    icon: Baby,
    schemaTitle: 'Self-Directed - Roth IRA Kids Account',
  },
  {
    id: 'roth-conversion-strategy',
    title: 'Roth Conversion',
    description: 'Account holders at Directed IRA can invest their Coverdell ESA in alternative assets.',
    group: 'account-strategies',
    icon: Repeat,
    schemaTitle: 'Self-Directed - Roth Conversion',
  },
  {
    id: 'solo-401k-intake',
    title: 'Solo 401(k) Intake',
    description: 'Inherited IRAs can be a powerful tool for preserving and growing the wealth left by a loved one.',
    group: 'account-strategies',
    icon: ShieldCheck,
    schemaTitle: 'Self-Directed - Solo 401(k) Intake',
  },
  {
    id: 'backdoor-roth-ira-strategy',
    title: 'Backdoor Roth IRA Strategy',
    description: 'Inherited IRAs can be a powerful tool for preserving and growing the wealth left by a loved one.',
    group: 'account-strategies',
    icon: Wallet,
    schemaTitle: 'Self-Directed - Backdoor Roth IRA Strategy',
  },
  {
    id: 'individual-custody',
    title: 'Individual Custody',
    description: 'Set up or manage an IRA account held in your name, giving you full control over your investments.',
    group: 'other-account',
    icon: UserCircle2,
    schemaTitle: 'Self-Directed - Individual Custody',
  },
  {
    id: 'retire-custody',
    title: 'Retire Custody',
    description: "Manage retirement accounts under Directed IRA's custody, including contributions, rollovers, and distributions.",
    group: 'other-account',
    icon: ShieldCheck,
    schemaTitle: 'Self-Directed - Retire Custody',
  },
  {
    id: 'roth-conversion-other',
    title: 'Roth Conversion',
    description: 'Convert your Traditional IRA funds to a Roth IRA to enjoy potential tax-free growth and withdrawals.',
    group: 'other-account',
    icon: Repeat,
    schemaTitle: 'Self-Directed - Roth Conversion - Crypto',
  },
  {
    id: 'solo-401k-app',
    title: 'Solo 401(k) App',
    description: 'Apply for and manage a Solo 401(k), designed for self-employed individuals and small business owners.',
    group: 'other-account',
    icon: BriefcaseBusiness,
    schemaTitle: 'Self-Directed - Solo 401(k) App',
  },
  {
    id: 'trust-or-estate-custody',
    title: 'Trust or Estate Custody',
    description: 'Open or oversee accounts held in the name of a trust or estate to support long-term planning and asset protection.',
    group: 'other-account',
    icon: Landmark,
    schemaTitle: 'Self-Directed - Trust or Estate Custody',
  },
]

const groupLabels: Record<CreateAccountGroup, string> = {
  'account-types': '',
  'account-strategies': 'Account Strategies',
  'other-account': 'Other Account',
}

export const CreateAccountPage = () => {
  const navigate = useNavigate()
  const { accountType } = useParams()
  const [query, setQuery] = useState('')

  const selectedRouteOption = useMemo(
    () => createAccountOptions.find((option) => option.id === accountType) ?? null,
    [accountType],
  )

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return createAccountOptions
    }
    return createAccountOptions.filter(
      (option) =>
        option.title.toLowerCase().includes(normalized) ||
        option.description.toLowerCase().includes(normalized),
    )
  }, [query])

  const groupedOptions = useMemo(
    () => ({
      'account-types': filteredOptions.filter((option) => option.group === 'account-types'),
      'account-strategies': filteredOptions.filter((option) => option.group === 'account-strategies'),
      'other-account': filteredOptions.filter((option) => option.group === 'other-account'),
    }),
    [filteredOptions],
  )

  if (accountType && selectedRouteOption) {
    const badgeIcon =
      accountType === 'traditional-ira'
        ? Droplets
        : accountType === 'sep-ira'
          ? BriefcaseBusiness
          : accountType === 'health-savings-account'
            ? HeartPulse
            : accountType === 'coverdell-education-savings-account'
              ? GraduationCap
              : accountType === 'inherited-traditional-ira' || accountType === 'inherited-roth-ira'
                ? Landmark
                : selectedRouteOption.icon

    return (
      <PageWrapper title={selectedRouteOption.title} subtitle="Complete all required onboarding steps." showHeader={false}>
        <RothIraOnboardingFlow
          accountTypeId={accountType}
          accountLabel={selectedRouteOption.title}
          badgeIcon={badgeIcon}
          onBackToAccountTypes={() => navigate('/create-account')}
          onComplete={() => navigate('/')}
        />
      </PageWrapper>
    )
  }

  if (accountType && !selectedRouteOption) {
    return (
      <PageWrapper title="Account Type Not Found" subtitle="The selected account type does not exist." showHeader={false}>
        <Card className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Account Type Not Found</h2>
          <p className="text-sm text-text-secondary">Please go back and choose an available account type.</p>
          <Button onClick={() => navigate('/create-account')}>Back To Create Account</Button>
        </Card>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title="Create Account" subtitle="Choose an account type to begin onboarding." showHeader={false}>
      <section className="min-h-[calc(100vh-3rem)] overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
        <div className="flex min-h-[calc(100vh-3rem)]">
          <aside className="hidden w-[360px] border-r border-border px-5 py-6 lg:block xl:w-[380px]">
            <ol className="relative space-y-5">
              <span className="pointer-events-none absolute left-[13px] top-3 block h-[calc(100%-24px)] w-px bg-border" aria-hidden />
              {onboardingSteps.map((stepLabel, index) => {
                const stepNumber = index + 1
                const active = stepNumber === 1
                return (
                  <li key={stepLabel} className="relative flex items-center gap-3">
                    <span
                      className={cn(
                        'relative z-10 grid h-7 w-7 place-items-center rounded-full text-xs',
                        active
                          ? 'bg-text-primary font-semibold text-text-inverse'
                          : 'border border-border bg-surface font-medium text-text-primary',
                      )}
                    >
                      {stepNumber}
                    </span>
                    <span className="text-base font-medium text-text-primary">{stepLabel}</span>
                  </li>
                )
              })}
            </ol>
          </aside>

          <div className="flex flex-1 flex-col">
            <div className="border-b border-border px-4 py-4 md:px-6">
              <div className="mb-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="grid h-8 w-8 place-items-center rounded-full border border-border bg-surface text-text-primary"
                  aria-label="Back to dashboard"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <h1 className="text-4xl font-semibold text-text-primary">Create Account</h1>
              </div>

              <div className="relative max-w-[380px]">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search account type..."
                  className="h-11 w-full rounded-full border border-border bg-surface px-11 text-sm text-text-primary placeholder:text-text-muted"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6">
              {(['account-types', 'account-strategies', 'other-account'] as const).map((group) => {
                const options = groupedOptions[group]
                if (options.length === 0) {
                  return null
                }
                return (
                  <div key={group} className="mb-6">
                    {groupLabels[group] ? (
                      <h2 className="mb-3 text-4xl font-semibold text-text-primary">{groupLabels[group]}</h2>
                    ) : null}

                    <div className="grid gap-3 xl:grid-cols-2">
                      {options.map((option) => {
                        const Icon = option.icon
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => navigate(`/create-account/${option.id}`)}
                            className={cn(
                              'rounded-2xl border p-4 text-left transition-colors duration-200 ease-fintech',
                              'border-border bg-surface hover:bg-slate-50',
                            )}
                          >
                            <div className="mb-2 flex items-start gap-2">
                              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-text-primary" />
                              <p className="text-lg font-semibold leading-tight text-text-primary">{option.title}</p>
                            </div>
                            <p className="mt-2 text-sm text-text-secondary">{option.description}</p>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
