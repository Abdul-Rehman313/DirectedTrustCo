import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { FeesPage } from '../components/pages'

const meta: Meta<typeof FeesPage> = {
  title: 'Pages / Fees',
  component: FeesPage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/fees']}>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FeesPage>

export const Default: Story = { args: { view: 'filled' } }
export const Loading: Story = { args: { view: 'filled' } }
export const ErrorState: Story = { args: { view: 'filled' } }
export const EmptyState: Story = { args: { view: 'empty' } }
export const DisplayedData: Story = { args: { view: 'filled' } }
export const FilteringOpen: Story = { args: { view: 'filtering-open' } }
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } }, args: { view: 'filled' } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } }, args: { view: 'filled' } }
