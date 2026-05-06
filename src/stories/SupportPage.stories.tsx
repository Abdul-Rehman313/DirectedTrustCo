import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { SupportPage } from '../components/pages'

const meta: Meta<typeof SupportPage> = {
  title: 'Pages / Support',
  component: SupportPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SupportPage>

export const Default: Story = {}
export const Loading: Story = {}
export const ErrorState: Story = {}
export const EmptyState: Story = {}
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } }
