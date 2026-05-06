import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ContributePage } from '../components/pages'

const withContributeRoute = (initialPath: string) => (Story: () => JSX.Element) => (
  <MemoryRouter initialEntries={[initialPath]}>
    <Routes>
      <Route path="/accounts/:accountId/manage/contribute" element={<Story />} />
      <Route path="/accounts/:accountId/manage/contribute/:contributionType" element={<Story />} />
    </Routes>
  </MemoryRouter>
)

const meta: Meta<typeof ContributePage> = {
  title: 'Pages / Contribute',
  component: ContributePage,
}

export default meta
type Story = StoryObj<typeof ContributePage>

export const Selection: Story = {
  decorators: [withContributeRoute('/accounts/acct-001/manage/contribute')],
}

export const PlaidFlow: Story = {
  decorators: [withContributeRoute('/accounts/acct-001/manage/contribute/plaid')],
}

export const ManualFlow: Story = {
  decorators: [withContributeRoute('/accounts/acct-001/manage/contribute/manual')],
}

export const MobileViewport: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
  decorators: [withContributeRoute('/accounts/acct-001/manage/contribute')],
}

