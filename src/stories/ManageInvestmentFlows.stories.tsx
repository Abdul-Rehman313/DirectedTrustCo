import type { Meta, StoryObj } from '@storybook/react'
import { AdditionalInvestmentRequestFlow } from '../components/pages/ManageInvestments/AdditionalInvestmentRequestFlow'
import { ExpensePayment990TFlow } from '../components/pages/ManageInvestments/ExpensePayment990TFlow'
import { ExpensePaymentFlow } from '../components/pages/ManageInvestments/ExpensePaymentFlow'
import { FairMarketValuationSelfCertificationFlow } from '../components/pages/ManageInvestments/FairMarketValuationSelfCertificationFlow'
import { FairMarketValuationTaxableEventFlow } from '../components/pages/ManageInvestments/FairMarketValuationTaxableEventFlow'
import { InvestmentIncomeDepositFlow } from '../components/pages/ManageInvestments/InvestmentIncomeDepositFlow'
import { SaleOfAssetsNotePayoffFlow } from '../components/pages/ManageInvestments/SaleOfAssetsNotePayoffFlow'

const meta: Meta = {
  title: 'Pages / ManageInvestments / Flows',
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

export const ExpensePayment990T: Story = {
  render: () => renderFlow(<ExpensePayment990TFlow onBackToManageInvestments={() => undefined} />),
}

export const ExpensePayment: Story = {
  render: () => renderFlow(<ExpensePaymentFlow onBackToManageInvestments={() => undefined} />),
}

export const AdditionalInvestmentRequest: Story = {
  render: () => renderFlow(<AdditionalInvestmentRequestFlow onBackToManageInvestments={() => undefined} />),
}

export const FairMarketValuationSelfCertification: Story = {
  render: () => renderFlow(<FairMarketValuationSelfCertificationFlow onBackToManageInvestments={() => undefined} />),
}

export const FairMarketValuationTaxableEvent: Story = {
  render: () => renderFlow(<FairMarketValuationTaxableEventFlow onBackToManageInvestments={() => undefined} />),
}

export const InvestmentIncomeDeposit: Story = {
  render: () => renderFlow(<InvestmentIncomeDepositFlow onBackToManageInvestments={() => undefined} />),
}

export const SaleOfAssetsNotePayoff: Story = {
  render: () => renderFlow(<SaleOfAssetsNotePayoffFlow onBackToManageInvestments={() => undefined} />),
}
