import {
  Building2,
  CircleDollarSign,
  FileCheck2,
  Gem,
  HandCoins,
  House,
  Landmark,
  LineChart,
  ScrollText,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export interface InvestFlowProps {
  onBackToInvest: () => void
}

export interface InvestOption {
  id: string
  title: string
  description: string
  icon: ComponentType<{ className?: string }>
}

export const investOptions = [
  {
    id: 'roth-ira-llc',
    title: 'Roth IRA/LLC',
    description: 'Invest using a Roth IRA through an LLC structure.',
    icon: HandCoins,
  },
  {
    id: 'private-offering-private-company-ppm',
    title: 'Private Offering/Private Company/PPM',
    description: 'Invest in private placements or privately held companies.',
    icon: Building2,
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    description: 'Use your IRA to invest in real estate properties.',
    icon: House,
  },
  {
    id: 'un-secured-promissory-note',
    title: 'Un-Secured Promissory Note',
    description: 'Lend money without collateral through your IRA.',
    icon: ScrollText,
  },
  {
    id: 'earnest-money-deposit',
    title: 'Earnest Money Deposit',
    description: 'Submit a deposit to show intent to purchase real estate.',
    icon: Landmark,
  },
  {
    id: 'mutual-fund',
    title: 'Mutual Fund',
    description: 'Invest in mutual funds using your self-directed IRA.',
    icon: Users,
  },
  {
    id: 'precious-metals',
    title: 'Precious Metals',
    description: 'Use your IRA to buy gold, silver, and other metals.',
    icon: Gem,
  },
  {
    id: 'secured-promissory-note',
    title: 'Secured Promissory Note',
    description: 'Lend money with collateral protection through your IRA.',
    icon: ShieldCheck,
  },
  {
    id: 'public-traded-stock-and-etfs',
    title: 'Public Traded/Stock and ETFs',
    description: 'Trade public stocks and ETFs through your account.',
    icon: LineChart,
  },
  {
    id: 'roth-ira-llc-intake',
    title: 'Roth IRA/LLC in-take',
    description: 'Submit required documents to begin Roth IRA LLC setup.',
    icon: FileCheck2,
  },
  {
    id: 'other-investment-type',
    title: 'Other Investment Type',
    description: 'Submit forms for alternative investment types not listed.',
    icon: CircleDollarSign,
  },
] as const satisfies ReadonlyArray<InvestOption>

export type InvestOptionId = (typeof investOptions)[number]['id']
type InvestFlowComponent = LazyExoticComponent<ComponentType<InvestFlowProps>>

export const investFlowComponents: Record<InvestOptionId, InvestFlowComponent> = {
  'roth-ira-llc': lazy(() => import('./RothIraLlcFlow').then((module) => ({ default: module.RothIraLlcFlow }))),
  'private-offering-private-company-ppm': lazy(() =>
    import('./PrivateOfferingPpmFlow').then((module) => ({ default: module.PrivateOfferingPpmFlow })),
  ),
  'real-estate': lazy(() => import('./RealEstateFlow').then((module) => ({ default: module.RealEstateFlow }))),
  'un-secured-promissory-note': lazy(() =>
    import('./UnsecuredPromissoryNoteFlow').then((module) => ({ default: module.UnsecuredPromissoryNoteFlow })),
  ),
  'earnest-money-deposit': lazy(() =>
    import('./EarnestMoneyDepositFlow').then((module) => ({ default: module.EarnestMoneyDepositFlow })),
  ),
  'mutual-fund': lazy(() => import('./MutualFundFlow').then((module) => ({ default: module.MutualFundFlow }))),
  'precious-metals': lazy(() => import('./PreciousMetalsFlow').then((module) => ({ default: module.PreciousMetalsFlow }))),
  'secured-promissory-note': lazy(() =>
    import('./SecuredPromissoryNoteFlow').then((module) => ({ default: module.SecuredPromissoryNoteFlow })),
  ),
  'public-traded-stock-and-etfs': lazy(() =>
    import('./PublicTradedStockEtfsFlow').then((module) => ({ default: module.PublicTradedStockEtfsFlow })),
  ),
  'other-investment-type': lazy(() =>
    import('./OtherInvestmentTypeFlow').then((module) => ({ default: module.OtherInvestmentTypeFlow })),
  ),
  'roth-ira-llc-intake': lazy(() => import('./RothIraLlcIntakeFlow').then((module) => ({ default: module.RothIraLlcIntakeFlow }))),
}

