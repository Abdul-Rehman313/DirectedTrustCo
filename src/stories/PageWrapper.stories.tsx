import type { Meta, StoryObj } from '@storybook/react'
import { PageWrapper } from '../components/layout'
import { Card } from '../components/ui'

const meta: Meta<typeof PageWrapper> = {
  title: 'Design System / Layout / PageWrapper',
  component: PageWrapper,
  args: {
    title: 'Page Title',
    subtitle: 'Reusable page wrapper without app-coupling.',
    showSidebar: false,
  },
}

export default meta
type Story = StoryObj<typeof PageWrapper>

export const Default: Story = {
  render: (args) => (
    <PageWrapper {...args}>
      <Card>
        <p className="text-sm text-text-secondary">Page content rendered inside wrapper.</p>
      </Card>
    </PageWrapper>
  ),
}

