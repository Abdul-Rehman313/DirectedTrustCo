import type { Meta, StoryObj } from '@storybook/react'
import { EarnestMoneyDepositFlow } from '../components/pages/Invest/EarnestMoneyDepositFlow'
import { MutualFundFlow } from '../components/pages/Invest/MutualFundFlow'
import { OtherInvestmentTypeFlow } from '../components/pages/Invest/OtherInvestmentTypeFlow'
import { PreciousMetalsFlow } from '../components/pages/Invest/PreciousMetalsFlow'
import { PrivateOfferingPpmFlow } from '../components/pages/Invest/PrivateOfferingPpmFlow'
import { PublicTradedStockEtfsFlow } from '../components/pages/Invest/PublicTradedStockEtfsFlow'
import { RealEstateFlow } from '../components/pages/Invest/RealEstateFlow'
import { RothIraLlcFlow } from '../components/pages/Invest/RothIraLlcFlow'
import { RothIraLlcIntakeFlow } from '../components/pages/Invest/RothIraLlcIntakeFlow'
import { SecuredPromissoryNoteFlow } from '../components/pages/Invest/SecuredPromissoryNoteFlow'
import { UnsecuredPromissoryNoteFlow } from '../components/pages/Invest/UnsecuredPromissoryNoteFlow'

const meta: Meta = {
  title: 'Pages / Invest Flows',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

const renderFlow = (node: JSX.Element) => (
  <div className="min-h-screen bg-background p-4">
    {node}
  </div>
)

export const RothIraLlc: Story = {
  render: () => renderFlow(<RothIraLlcFlow onBackToInvest={() => undefined} />),
}

export const PrivateOfferingPpm: Story = {
  render: () => renderFlow(<PrivateOfferingPpmFlow onBackToInvest={() => undefined} />),
}

export const RealEstate: Story = {
  render: () => renderFlow(<RealEstateFlow onBackToInvest={() => undefined} />),
}

export const UnsecuredPromissoryNote: Story = {
  render: () => renderFlow(<UnsecuredPromissoryNoteFlow onBackToInvest={() => undefined} />),
}

export const EarnestMoneyDeposit: Story = {
  render: () => renderFlow(<EarnestMoneyDepositFlow onBackToInvest={() => undefined} />),
}

export const MutualFund: Story = {
  render: () => renderFlow(<MutualFundFlow onBackToInvest={() => undefined} />),
}

export const PreciousMetals: Story = {
  render: () => renderFlow(<PreciousMetalsFlow onBackToInvest={() => undefined} />),
}

export const SecuredPromissoryNote: Story = {
  render: () => renderFlow(<SecuredPromissoryNoteFlow onBackToInvest={() => undefined} />),
}

export const PublicTradedStockEtfs: Story = {
  render: () => renderFlow(<PublicTradedStockEtfsFlow onBackToInvest={() => undefined} />),
}

export const RothIraLlcIntake: Story = {
  render: () => renderFlow(<RothIraLlcIntakeFlow onBackToInvest={() => undefined} />),
}

export const OtherInvestmentType: Story = {
  render: () => renderFlow(<OtherInvestmentTypeFlow onBackToInvest={() => undefined} />),
}
