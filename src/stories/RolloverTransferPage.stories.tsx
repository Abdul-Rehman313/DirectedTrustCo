import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { RolloverTransferPage } from '../components/pages'

const withRolloverRoute = (initialPath: string) => (Story: () => JSX.Element) => (
  <MemoryRouter initialEntries={[initialPath]}>
    <Routes>
      <Route path="/accounts/:accountId/manage/rollover-transfer" element={<Story />} />
      <Route path="/accounts/:accountId/manage/rollover-transfer/:rolloverType" element={<Story />} />
    </Routes>
  </MemoryRouter>
)

const meta: Meta<typeof RolloverTransferPage> = {
  title: 'Pages / RolloverTransfer',
  component: RolloverTransferPage,
}

export default meta
type Story = StoryObj<typeof RolloverTransferPage>

export const Selection: Story = {
  decorators: [withRolloverRoute('/accounts/acct-001/manage/rollover-transfer')],
}

export const ExistingIraFlow: Story = {
  decorators: [withRolloverRoute('/accounts/acct-001/manage/rollover-transfer/existing-ira')],
}

export const EmployerPlanFlow: Story = {
  decorators: [withRolloverRoute('/accounts/acct-001/manage/rollover-transfer/employer-plan')],
}

export const MobileViewport: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
  decorators: [withRolloverRoute('/accounts/acct-001/manage/rollover-transfer')],
}

