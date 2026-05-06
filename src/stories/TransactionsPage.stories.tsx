import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { TransactionsPage } from '../components/pages'

const meta: Meta<typeof TransactionsPage> = {
  title: 'Pages / Transactions',
  component: TransactionsPage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/transactions']}>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TransactionsPage>

export const Default: Story = { args: { view: 'filled' } }
export const Loading: Story = { args: { view: 'filled' } }
export const ErrorState: Story = { args: { view: 'filled' } }
export const EmptyState: Story = { args: { view: 'empty' } }
export const DisplayedData: Story = { args: { view: 'filled' } }
export const FilteringOpen: Story = { args: { view: 'filtering-open' } }
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } }, args: { view: 'filled' } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } }, args: { view: 'filled' } }
