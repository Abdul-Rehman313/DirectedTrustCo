import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../components/ui'

const meta: Meta<typeof Input> = {
  title: 'Design System / Atoms / Input',
  component: Input,
  args: {
    placeholder: 'Enter value',
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}
export const Hover: Story = {}
export const Active: Story = { args: { value: 'Focused Input' } }
export const Disabled: Story = { args: { disabled: true, value: 'Disabled' } }
export const Loading: Story = { args: { value: 'Loading...' } }
export const ErrorState: Story = { args: { error: 'This field is required' } }
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } }
