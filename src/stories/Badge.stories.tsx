import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '../components/ui'

const meta: Meta<typeof Badge> = {
  title: 'Design System / Atoms / Badge',
  component: Badge,
  args: {
    children: 'Active',
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {}
export const Hover: Story = {}
export const Active: Story = { args: { variant: 'success', children: 'Active' } }
export const Disabled: Story = { args: { variant: 'default', children: 'Disabled' } }
export const Loading: Story = { args: { variant: 'info', children: 'Loading' } }
export const ErrorState: Story = { args: { variant: 'error', children: 'Error' } }
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } }
