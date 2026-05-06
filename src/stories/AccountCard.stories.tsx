import type { Meta, StoryObj } from '@storybook/react'
import { accounts } from '../data/mockData'
import { AccountCard } from '../components/dashboard'

const meta: Meta<typeof AccountCard> = {
  title: 'Dashboard / AccountCard',
  component: AccountCard,
  args: {
    account: accounts[0],
  },
}

export default meta
type Story = StoryObj<typeof AccountCard>

export const Default: Story = {}
export const Hover: Story = { args: { account: accounts[1] } }
export const Active: Story = { args: { account: accounts[0] } }
export const Disabled: Story = { args: { account: { ...accounts[0], status: 'Closed' } } }
export const Loading: Story = { args: { account: { ...accounts[0], balanceLabel: 'Loading...' } } }
export const ErrorState: Story = { args: { account: { ...accounts[0], status: 'Review' } } }
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } }
