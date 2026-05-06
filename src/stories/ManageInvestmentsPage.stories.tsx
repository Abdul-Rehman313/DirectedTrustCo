import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ManageInvestmentsPage } from '../components/pages'

const withManageInvestmentsRoute = (initialPath: string) => (Story: () => JSX.Element) => (
  <MemoryRouter initialEntries={[initialPath]}>
    <Routes>
      <Route path="/accounts/:accountId/manage/manage-investments" element={<Story />} />
      <Route path="/accounts/:accountId/manage/manage-investments/:manageInvestmentType" element={<Story />} />
    </Routes>
  </MemoryRouter>
)

const meta: Meta<typeof ManageInvestmentsPage> = {
  title: 'Pages / ManageInvestments',
  component: ManageInvestmentsPage,
}

export default meta
type Story = StoryObj<typeof ManageInvestmentsPage>

export const Selection: Story = {
  decorators: [withManageInvestmentsRoute('/accounts/acct-001/manage/manage-investments')],
}

export const ExpensePaymentSelected: Story = {
  decorators: [withManageInvestmentsRoute('/accounts/acct-001/manage/manage-investments/expense-payment-990-t')],
}

export const AdditionalInvestmentRequestSelected: Story = {
  decorators: [withManageInvestmentsRoute('/accounts/acct-001/manage/manage-investments/additional-investment-request')],
}

export const GeneralExpensePaymentSelected: Story = {
  decorators: [withManageInvestmentsRoute('/accounts/acct-001/manage/manage-investments/expense-payment')],
}

export const FairMarketValuationSelfCertificationSelected: Story = {
  decorators: [withManageInvestmentsRoute('/accounts/acct-001/manage/manage-investments/fair-market-valuation-self-certification')],
}

export const MobileFairMarketValuationSelfCertification: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
  decorators: [withManageInvestmentsRoute('/accounts/acct-001/manage/manage-investments/fair-market-valuation-self-certification')],
}

export const FairMarketValuationTaxableEventSelected: Story = {
  decorators: [withManageInvestmentsRoute('/accounts/acct-001/manage/manage-investments/fair-market-valuation-taxable-event')],
}

export const InvestmentIncomeDepositSelected: Story = {
  decorators: [withManageInvestmentsRoute('/accounts/acct-001/manage/manage-investments/investment-income-deposit')],
}

export const SaleOfAssetsNotePayoffSelected: Story = {
  decorators: [withManageInvestmentsRoute('/accounts/acct-001/manage/manage-investments/sale-of-assets-note-payoff')],
}

export const MobileFairMarketValuationTaxableEvent: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
  decorators: [withManageInvestmentsRoute('/accounts/acct-001/manage/manage-investments/fair-market-valuation-taxable-event')],
}

export const MobileInvestmentIncomeDeposit: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
  decorators: [withManageInvestmentsRoute('/accounts/acct-001/manage/manage-investments/investment-income-deposit')],
}

export const MobileSaleOfAssetsNotePayoff: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
  decorators: [withManageInvestmentsRoute('/accounts/acct-001/manage/manage-investments/sale-of-assets-note-payoff')],
}

export const MobileViewport: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
  decorators: [withManageInvestmentsRoute('/accounts/acct-001/manage/manage-investments')],
}
