import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Avatar } from './Avatar/Avatar'
import { Badge } from './Badge/Badge'
import { Button } from './Button/Button'
import { Card } from './Card/Card'
import { Checkbox } from './Checkbox/Checkbox'
import { Divider } from './Divider/Divider'
import { Input } from './Input/Input'
import { Modal } from './Modal/Modal'
import { ProgressBar } from './ProgressBar/ProgressBar'
import { RadioGroup } from './RadioGroup/RadioGroup'
import { Select } from './Select/Select'
import { Switch } from './Switch/Switch'
import { Tooltip } from './Tooltip/Tooltip'

describe('UI Components', () => {
  it('renders Avatar fallback and Badge variant text', () => {
    render(
      <>
        <Avatar alt="Jordan Williams" fallback="JW" />
        <Badge variant="success">Active</Badge>
      </>,
    )

    expect(screen.getByText('JW')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('renders Card children and Divider in vertical mode', () => {
    const { container } = render(
      <>
        <Card>Card Body</Card>
        <Divider orientation="vertical" />
      </>,
    )

    expect(screen.getByText('Card Body')).toBeInTheDocument()
    expect(container.querySelector('.w-px')).toBeInTheDocument()
  })

  it('handles Button click and loading/disabled state', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    const { rerender } = render(<Button onClick={onClick}>Submit</Button>)
    await user.click(screen.getByRole('button', { name: 'Submit' }))
    expect(onClick).toHaveBeenCalledTimes(1)

    rerender(<Button isLoading>Submit</Button>)
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled()
  })

  it('shows Input error message with alert role', () => {
    render(<Input value="bad" onChange={() => undefined} error="Invalid value" />)

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid value')
  })

  it('toggles Checkbox and Switch via callbacks', async () => {
    const onCheckedChange = vi.fn()
    const onSwitchChange = vi.fn()
    const user = userEvent.setup()

    render(
      <>
        <Checkbox label="Accept terms" checked={false} onCheckedChange={onCheckedChange} />
        <Switch label="Enable alerts" checked={false} onCheckedChange={onSwitchChange} />
      </>,
    )

    await user.click(screen.getByText('Accept terms'))
    await user.click(screen.getByRole('switch'))

    expect(onCheckedChange).toHaveBeenCalled()
    expect(onSwitchChange).toHaveBeenCalledWith(true)
  })

  it('changes RadioGroup values and renders Select trigger', async () => {
    const onRadioChange = vi.fn()
    const user = userEvent.setup()

    render(
      <>
        <RadioGroup
          name="risk"
          value="low"
          onValueChange={onRadioChange}
          options={[
            { label: 'Low', value: 'low' },
            { label: 'High', value: 'high' },
          ]}
        />
        <Select
          placeholder="Pick one"
          onValueChange={() => undefined}
          options={[
            { label: 'One', value: 'one' },
            { label: 'Two', value: 'two' },
          ]}
        />
      </>,
    )

    await user.click(screen.getByText('High'))
    expect(onRadioChange).toHaveBeenCalledWith('high')
    expect(screen.getByRole('combobox', { name: 'Pick one' })).toBeInTheDocument()
  })

  it('renders Modal content and closes when close button is clicked', async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()

    render(
      <Modal open onOpenChange={onOpenChange} title="Manage Account" description="Choose action">
        <p>Modal Body</p>
      </Modal>,
    )

    expect(screen.getByRole('heading', { name: 'Manage Account' })).toBeInTheDocument()
    expect(screen.getByText('Modal Body')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('renders ProgressBar and Tooltip trigger', () => {
    render(
      <>
        <ProgressBar value={25} />
        <Tooltip content="Helpful text">
          <button type="button">Hover me</button>
        </Tooltip>
      </>,
    )

    expect(screen.getByLabelText('Progress')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument()
  })
})
