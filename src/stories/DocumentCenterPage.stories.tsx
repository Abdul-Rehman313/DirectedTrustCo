import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { DocumentCenterPage } from '../components/pages'

const meta: Meta<typeof DocumentCenterPage> = {
  title: 'Pages / DocumentCenter',
  component: DocumentCenterPage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/document-center']}>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DocumentCenterPage>

export const Default: Story = { args: { view: 'selector' } }
export const SelectorOptions: Story = { args: { view: 'selector' } }
export const Statements: Story = { args: { view: 'statements' } }
export const TaxForms: Story = { args: { view: 'tax-forms' } }
export const Loading: Story = { args: { view: 'statements' } }
export const ErrorState: Story = { args: { view: 'tax-forms' } }
export const EmptyState: Story = { args: { view: 'selector' } }
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } }, args: { view: 'selector' } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } }, args: { view: 'statements' } }
