import type { Meta, StoryObj } from '@storybook/react'
import { Header } from '../components/layout'

const meta: Meta<typeof Header> = {
  title: 'Design System / Layout / Header',
  component: Header,
  args: {
    title: 'Dashboard',
    subtitle: 'Manage your accounts and forms.',
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {}
export const Hover: Story = {}
export const Active: Story = {}
export const Disabled: Story = {}
export const Loading: Story = {}
export const ErrorState: Story = {}
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } }
