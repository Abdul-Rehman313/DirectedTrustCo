import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from '../components/ui'

const meta: Meta<typeof RadioGroup> = {
  title: 'Design System / Atoms / RadioGroup',
  component: RadioGroup,
  args: {
    name: 'riskTolerance',
    options: [
      { label: 'Conservative', value: 'conservative' },
      { label: 'Moderate', value: 'moderate' },
      { label: 'Aggressive', value: 'aggressive' },
    ],
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {}
export const Hover: Story = {}
export const Active: Story = { args: { value: 'moderate' } }
export const Disabled: Story = {}
export const Loading: Story = {}
export const ErrorState: Story = {}
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } }
