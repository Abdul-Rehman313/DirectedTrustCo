import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '../components/ui'

const meta: Meta<typeof Switch> = {
  title: 'Design System / Atoms / Switch',
  component: Switch,
  args: {
    label: 'Enable alerts',
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {}
export const Hover: Story = {}
export const Active: Story = { args: { checked: true } }
export const Disabled: Story = {}
export const Loading: Story = {}
export const ErrorState: Story = {}
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } }
