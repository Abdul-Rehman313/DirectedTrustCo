import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '../components/ui'

const meta: Meta<typeof Avatar> = {
  title: 'Design System / Atoms / Avatar',
  component: Avatar,
  args: {
    alt: 'Jordan Williams',
    fallback: 'JW',
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {}
export const Hover: Story = {}
export const Active: Story = { args: { size: 'lg' } }
export const Disabled: Story = {}
export const Loading: Story = {}
export const ErrorState: Story = {}
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } }
