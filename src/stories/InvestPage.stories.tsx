import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { InvestPage } from '../components/pages'

const withInvestRoute = (initialPath: string) => (Story: () => JSX.Element) => (
  <MemoryRouter initialEntries={[initialPath]}>
    <Routes>
      <Route path="/accounts/:accountId/manage/invest" element={<Story />} />
      <Route path="/accounts/:accountId/manage/invest/:investmentType" element={<Story />} />
    </Routes>
  </MemoryRouter>
)

const meta: Meta<typeof InvestPage> = {
  title: 'Pages / Invest',
  component: InvestPage,
}

export default meta
type Story = StoryObj<typeof InvestPage>

export const Selection: Story = {
  decorators: [withInvestRoute('/accounts/acct-001/manage/invest')],
}

export const PrivateOfferingSelected: Story = {
  decorators: [withInvestRoute('/accounts/acct-001/manage/invest/private-offering-private-company-ppm')],
}

export const RothIraLlcFlow: Story = {
  decorators: [withInvestRoute('/accounts/acct-001/manage/invest/roth-ira-llc')],
}

export const RothIraLlcIntakeFlow: Story = {
  decorators: [withInvestRoute('/accounts/acct-001/manage/invest/roth-ira-llc-intake')],
}

export const MobileViewport: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
  decorators: [withInvestRoute('/accounts/acct-001/manage/invest')],
}
