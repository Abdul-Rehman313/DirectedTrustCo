import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from '../components/ui'

const meta: Meta<typeof ProgressBar> = {
  title: 'Design System / Atoms / ProgressBar',
  component: ProgressBar,
  args: {
    value: 45,
  },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {}
export const Hover: Story = {}
export const Active: Story = { args: { value: 80 } }
export const Disabled: Story = { args: { value: 0 } }
export const Loading: Story = { args: { value: 55 } }
export const ErrorState: Story = { args: { value: 20 } }
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } }
