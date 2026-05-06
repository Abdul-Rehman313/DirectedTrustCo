import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { Button } from '../components/ui'

const meta: Meta<typeof Button> = {
  title: 'Design System / Atoms / Button',
  component: Button,
  args: {
    children: 'Start New',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Hover: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.hover(within(canvasElement).getByRole('button'))
  },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Loading: Story = {
  args: { isLoading: true },
}

export const ErrorState: Story = {
  args: { variant: 'danger', children: 'Submission Failed' },
}

export const MobileViewport: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
}

export const DesktopViewport: Story = {
  parameters: { viewport: { defaultViewport: 'desktop' } },
}
