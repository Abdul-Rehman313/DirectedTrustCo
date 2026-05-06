import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import type { ComponentProps } from 'react'
import { Button, Modal } from '../components/ui'

const ModalPreview = (args: ComponentProps<typeof Modal>) => {
  const [open, setOpen] = useState(true)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal {...args} open={open} onOpenChange={setOpen}>
        <p className="text-sm text-text-secondary">Modal content for account workflows.</p>
      </Modal>
    </>
  )
}

const meta: Meta<typeof Modal> = {
  title: 'Design System / Atoms / Modal',
  component: Modal,
  render: (args) => <ModalPreview {...args} />,
  args: {
    title: 'Account Type Selection',
    description: 'Choose account category',
    open: true,
  },
}

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {}
export const Hover: Story = {}
export const Active: Story = {}
export const Disabled: Story = {}
export const Loading: Story = {}
export const ErrorState: Story = { args: { title: 'Error', description: 'Unable to load form' } }
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } }
