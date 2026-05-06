import type { Meta, StoryObj } from '@storybook/react'
import { Button, Tooltip } from '../components/ui'

const meta: Meta<typeof Tooltip> = {
  title: 'Design System / Atoms / Tooltip',
  component: Tooltip,
  args: {
    content: 'Helpful guidance',
    children: <Button variant="secondary">Hover me</Button>,
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {}
export const Hover: Story = {}
export const Active: Story = {}
export const Disabled: Story = {}
export const Loading: Story = {}
export const ErrorState: Story = { args: { content: 'Failed to load details' } }
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } }
