import type { Meta, StoryObj } from '@storybook/react'
import { OpenAccountBanner } from '../components/dashboard'

const meta: Meta<typeof OpenAccountBanner> = {
  title: 'Dashboard / OpenAccountBanner',
  component: OpenAccountBanner,
  args: { onStartNew: () => undefined },
}

export default meta
type Story = StoryObj<typeof OpenAccountBanner>

export const Default: Story = {}
export const Hover: Story = {}
export const Active: Story = {}
export const Disabled: Story = {}
export const Loading: Story = {}
export const ErrorState: Story = {}
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } }
