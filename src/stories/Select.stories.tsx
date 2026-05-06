import type { Meta, StoryObj } from '@storybook/react'
import { Select } from '../components/ui'

const meta: Meta<typeof Select> = {
  title: 'Design System / Atoms / Select',
  component: Select,
  args: {
    placeholder: 'Select citizenship',
    options: [
      { label: 'US Citizen', value: 'us-citizen' },
      { label: 'Permanent Resident', value: 'resident' },
      { label: 'Non-Resident', value: 'non-resident' },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {}
export const Hover: Story = {}
export const Active: Story = { args: { value: 'us-citizen' } }
export const Disabled: Story = { args: { disabled: true } }
export const Loading: Story = { args: { placeholder: 'Loading options...' } }
export const ErrorState: Story = { args: { placeholder: 'Please select an option' } }
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } }
