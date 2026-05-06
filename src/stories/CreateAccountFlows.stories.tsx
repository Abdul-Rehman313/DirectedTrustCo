import type { Meta, StoryObj } from '@storybook/react'
import { Leaf } from 'lucide-react'
import { RothIraOnboardingFlow } from '../components/pages/CreateAccount/RothIraOnboardingFlow'

const meta: Meta<typeof RothIraOnboardingFlow> = {
  title: 'Pages / CreateAccount / Flows',
  component: RothIraOnboardingFlow,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onBackToAccountTypes: () => undefined,
    onComplete: () => undefined,
    badgeIcon: Leaf,
  },
}

export default meta
type Story = StoryObj<typeof RothIraOnboardingFlow>

const renderFlow = (accountTypeId: string, accountLabel: string): Story => ({
  args: { accountTypeId, accountLabel },
})

export const RothIRA: Story = renderFlow('roth-ira', 'Roth IRA')
export const TraditionalIRA: Story = renderFlow('traditional-ira', 'Traditional IRA')
export const SepIRA: Story = renderFlow('sep-ira', 'SEP IRA')
export const HealthSavingsAccount: Story = renderFlow('health-savings-account', 'Health Savings Account')
export const CoverdellEducationSavings: Story = renderFlow('coverdell-education-savings-account', 'Coverdell Education Savings Account')
export const InheritedTraditionalIRA: Story = renderFlow('inherited-traditional-ira', 'Inherited Traditional IRA')
export const InheritedRothIRA: Story = renderFlow('inherited-roth-ira', 'Inherited Roth IRA')
export const RothIRAKids: Story = renderFlow('roth-ira-kids-account', 'Roth IRA Kids Account')
export const RothConversion: Story = renderFlow('roth-conversion-strategy', 'Roth Conversion')
export const Solo401kIntake: Story = renderFlow('solo-401k-intake', 'Solo 401(k) Intake')
export const BackdoorRothStrategy: Story = renderFlow('backdoor-roth-ira-strategy', 'Backdoor Roth IRA Strategy')
export const IndividualCustody: Story = renderFlow('individual-custody', 'Individual Custody')
export const RetireCustody: Story = renderFlow('retire-custody', 'Retire Custody')
export const RothConversionOther: Story = renderFlow('roth-conversion-other', 'Roth Conversion')
export const Solo401kApp: Story = renderFlow('solo-401k-app', 'Solo 401(k) App')
export const TrustEstateCustody: Story = renderFlow('trust-or-estate-custody', 'Trust or Estate Custody')
