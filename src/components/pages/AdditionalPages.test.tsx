import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AccountDetailsPage } from './AccountDetails/AccountDetailsPage'
import { AccountFormsPage } from './AccountForms/AccountFormsPage'
import { ContributePage } from './Contribute/ContributePage'
import { CreateAccountPage } from './CreateAccount/CreateAccountPage'
import { InvestPage } from './Invest/InvestPage'
import { ManageInvestmentsPage } from './ManageInvestments/ManageInvestmentsPage'
import { RolloverTransferPage } from './RolloverTransfer/RolloverTransferPage'
import { SupportPage } from './Support/SupportPage'

const LocationDisplay = () => {
  const location = useLocation()
  return <p data-testid="location">{location.pathname}</p>
}

const renderWithRoute = ({
  entry,
  path,
  element,
}: {
  entry: string
  path: string
  element: JSX.Element
}) =>
  render(
    <MemoryRouter initialEntries={[entry]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path={path} element={element} />
        <Route path="*" element={<LocationDisplay />} />
      </Routes>
    </MemoryRouter>,
  )

describe('Remaining Pages', () => {
  describe('AccountDetailsPage', () => {
    it('shows account-not-found fallback when route account does not exist', () => {
      renderWithRoute({
        entry: '/accounts/missing-account',
        path: '/accounts/:accountId',
        element: <AccountDetailsPage />,
      })

      expect(screen.getByText('Account Not Found')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /back to dashboard/i })).toBeInTheDocument()
    })

    it('renders account details for a valid account and opens manage modal flow', async () => {
      renderWithRoute({
        entry: '/accounts/acct-001',
        path: '/accounts/:accountId',
        element: <AccountDetailsPage />,
      })
      const user = userEvent.setup()

      expect(screen.getByRole('heading', { name: /self-directed roth ira/i })).toBeInTheDocument()
      const manageButtons = screen.getAllByRole('button', { name: 'Manage' })
      expect(manageButtons.length).toBeGreaterThan(0)

      await user.click(manageButtons[0])
      expect(screen.getByRole('heading', { name: 'Manage Account' })).toBeInTheDocument()

      const chooseButtons = screen.getAllByRole('button', { name: 'Choose' })
      await user.click(chooseButtons[0])
      expect(screen.getByTestId('location')).toHaveTextContent('/accounts/acct-001/manage/account-forms')
    })

    it('renders crypto account variant', () => {
      renderWithRoute({
        entry: '/accounts/acct-003',
        path: '/accounts/:accountId',
        element: <AccountDetailsPage />,
      })

      expect(screen.getByRole('button', { name: 'Gemini' })).toBeInTheDocument()
    })
  })

  describe('AccountFormsPage', () => {
    it('renders forms listing for valid account', () => {
      renderWithRoute({
        entry: '/accounts/acct-001/manage/account-forms',
        path: '/accounts/:accountId/manage/account-forms',
        element: <AccountFormsPage />,
      })

      expect(screen.getByRole('heading', { name: 'Account Forms' })).toBeInTheDocument()
      expect(screen.getByText(/all necessary forms related to your account setup/i)).toBeInTheDocument()
    })

    it('shows form-not-found for unknown form id', () => {
      renderWithRoute({
        entry: '/accounts/acct-001/manage/account-forms/unknown-form',
        path: '/accounts/:accountId/manage/account-forms/:formId',
        element: <AccountFormsPage />,
      })

      expect(screen.getByText('Form Not Found')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /back to account forms/i })).toBeInTheDocument()
    })

    it('shows preparing state for known form without mapped flow component', () => {
      renderWithRoute({
        entry: '/accounts/acct-001/manage/account-forms/limited-power-of-attorney',
        path: '/accounts/:accountId/manage/account-forms/:formId',
        element: <AccountFormsPage />,
      })

      expect(screen.getByRole('heading', { name: /limited power of attorney/i })).toBeInTheDocument()
      expect(screen.getByText(/give someone permission to manage parts of your account/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /back to account forms/i })).toBeInTheDocument()
    })
  })

  describe('ContributePage', () => {
    it('shows option listing for valid account', () => {
      renderWithRoute({
        entry: '/accounts/acct-001/manage/contribute',
        path: '/accounts/:accountId/manage/contribute',
        element: <ContributePage />,
      })

      expect(screen.getByRole('heading', { name: 'Contribute' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /fund the contribution via plaid/i })).toBeInTheDocument()
    })

    it('shows flow-not-found for unknown contribute type', () => {
      renderWithRoute({
        entry: '/accounts/acct-001/manage/contribute/invalid',
        path: '/accounts/:accountId/manage/contribute/:contributionType',
        element: <ContributePage />,
      })

      expect(screen.getByText('Flow Not Found')).toBeInTheDocument()
    })

    it('moves plaid flow from deposit step to document sign when required fields are completed', async () => {
      renderWithRoute({
        entry: '/accounts/acct-001/manage/contribute/plaid',
        path: '/accounts/:accountId/manage/contribute/:contributionType',
        element: <ContributePage />,
      })
      const user = userEvent.setup()

      await user.type(screen.getByPlaceholderText('$0.00'), '1000')
      await user.selectOptions(screen.getByRole('combobox'), '2025')
      await user.click(screen.getByText('Regular'))
      await user.type(screen.getByPlaceholderText('Enter bank nickname'), 'My Bank')
      await user.type(screen.getByPlaceholderText('Enter account holder name'), 'Jordan Williams')
      await user.click(screen.getByText(/i confirm the contribution details are accurate and authorized/i))

      const continueButtons = screen.getAllByRole('button', { name: 'Continue' })
      const enabledContinue = continueButtons.find((button) => !button.hasAttribute('disabled'))
      expect(enabledContinue).toBeDefined()

      await user.click(enabledContinue!)
      expect(screen.getByRole('heading', { name: 'Sign Contribution Request' })).toBeInTheDocument()
    })
  })

  describe('CreateAccountPage', () => {
    it('renders account type listing and filters via search', async () => {
      renderWithRoute({
        entry: '/create-account',
        path: '/create-account',
        element: <CreateAccountPage />,
      })
      const user = userEvent.setup()

      expect(screen.getByRole('heading', { name: 'Create Account' })).toBeInTheDocument()
      await user.type(screen.getByPlaceholderText('Search account type...'), 'Traditional')

      expect(screen.getByText('Traditional IRA')).toBeInTheDocument()
      expect(screen.queryByText('Roth IRA')).not.toBeInTheDocument()
    })

    it('shows account-type-not-found for unknown create-account route', () => {
      renderWithRoute({
        entry: '/create-account/not-real',
        path: '/create-account/:accountType',
        element: <CreateAccountPage />,
      })

      expect(screen.getByText('Account Type Not Found')).toBeInTheDocument()
    })
  })

  describe('InvestPage', () => {
    it('shows account-not-found when account route is invalid', () => {
      renderWithRoute({
        entry: '/accounts/missing/manage/invest',
        path: '/accounts/:accountId/manage/invest',
        element: <InvestPage />,
      })

      expect(screen.getByText('Account Not Found')).toBeInTheDocument()
    })

    it('shows option-not-found when investment type route is unknown', () => {
      renderWithRoute({
        entry: '/accounts/acct-001/manage/invest/unknown-option',
        path: '/accounts/:accountId/manage/invest/:investmentType',
        element: <InvestPage />,
      })

      expect(screen.getByText('Option Not Found')).toBeInTheDocument()
    })

    it('shows preparing fallback when custom option exists but flow component is not provided', () => {
      const DummyIcon = ({ className }: { className?: string }) => <span className={className}>I</span>
      const customOptions = [{ id: 'custom-option', title: 'Custom Option', description: 'Custom option description', icon: DummyIcon }]

      renderWithRoute({
        entry: '/accounts/acct-001/manage/invest/custom-option',
        path: '/accounts/:accountId/manage/invest/:investmentType',
        element: <InvestPage options={customOptions} flowComponents={{}} />,
      })

      expect(screen.getByRole('heading', { name: 'Custom Option' })).toBeInTheDocument()
      expect(screen.getByText('Custom option description')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Back to Invest' })).toBeInTheDocument()
    })
  })

  describe('ManageInvestmentsPage', () => {
    it('shows account-not-found for invalid account route', () => {
      renderWithRoute({
        entry: '/accounts/missing/manage/manage-investments',
        path: '/accounts/:accountId/manage/manage-investments',
        element: <ManageInvestmentsPage />,
      })

      expect(screen.getByText('Account Not Found')).toBeInTheDocument()
    })

    it('shows option-not-found for unknown manage-investments route', () => {
      renderWithRoute({
        entry: '/accounts/acct-001/manage/manage-investments/unknown-option',
        path: '/accounts/:accountId/manage/manage-investments/:manageInvestmentType',
        element: <ManageInvestmentsPage />,
      })

      expect(screen.getByText('Option Not Found')).toBeInTheDocument()
    })
  })

  describe('RolloverTransferPage', () => {
    it('renders listing for valid account and known route', () => {
      renderWithRoute({
        entry: '/accounts/acct-001/manage/rollover-transfer',
        path: '/accounts/:accountId/manage/rollover-transfer',
        element: <RolloverTransferPage />,
      })

      expect(screen.getByRole('heading', { name: 'Rollover/Transfer' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /transfer from existing ira/i })).toBeInTheDocument()
    })

    it('shows flow-not-found for unknown rollover route', () => {
      renderWithRoute({
        entry: '/accounts/acct-001/manage/rollover-transfer/not-valid',
        path: '/accounts/:accountId/manage/rollover-transfer/:rolloverType',
        element: <RolloverTransferPage />,
      })

      expect(screen.getByText('Flow Not Found')).toBeInTheDocument()
    })
  })

  describe('SupportPage', () => {
    it('renders support content and action button', () => {
      renderWithRoute({
        entry: '/support',
        path: '/support',
        element: <SupportPage />,
      })

      expect(screen.getByRole('heading', { name: 'Support Center' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Contact Support' })).toBeInTheDocument()
    })
  })
})
