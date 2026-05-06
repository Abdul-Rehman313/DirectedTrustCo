import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from '../components/ui'

const meta: Meta<typeof Divider> = {
  title: 'Design System / Atoms / Divider',
  component: Divider,
}

export default meta
type Story = StoryObj<typeof Divider>

export const Default: Story = {}
export const Hover: Story = {}
export const Active: Story = {}
export const Disabled: Story = {}
export const Loading: Story = {}
export const ErrorState: Story = {}
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } }
