import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '../components/ui'

const meta: Meta<typeof Card> = {
  title: 'Design System / Atoms / Card',
  component: Card,
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: <p className="text-sm text-text-secondary">Tokenized card surface.</p>,
  },
}

export const Hover: Story = {
  args: {
    hoverable: true,
    children: <p className="text-sm text-text-secondary">Hover me for elevated state.</p>,
  },
}

export const Active: Story = { args: { children: <p className="text-sm text-text-primary">Selected Card</p> } }
export const Disabled: Story = { args: { children: <p className="text-sm text-text-muted">Disabled content</p> } }
export const Loading: Story = { args: { children: <p className="text-sm text-text-secondary">Loading content...</p> } }
export const ErrorState: Story = { args: { children: <p className="text-sm text-error">Failed to load card data.</p> } }
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } }, args: { children: <p>Mobile card</p> } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } }, args: { children: <p>Desktop card</p> } }
