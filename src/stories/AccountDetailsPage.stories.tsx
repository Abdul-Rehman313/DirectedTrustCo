import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AccountDetailsPage } from '../components/pages'

const withAccountRoute = (initialPath: string) => (Story: () => JSX.Element) => (
  <MemoryRouter initialEntries={[initialPath]}>
    <Routes>
      <Route path="/accounts/:accountId" element={<Story />} />
    </Routes>
  </MemoryRouter>
)

const meta: Meta<typeof AccountDetailsPage> = {
  title: 'Pages / AccountDetails',
  component: AccountDetailsPage,
}

export default meta
type Story = StoryObj<typeof AccountDetailsPage>

export const SelfDirected: Story = {
  decorators: [withAccountRoute('/accounts/acct-001')],
}

export const Crypto: Story = {
  decorators: [withAccountRoute('/accounts/acct-003')],
}
