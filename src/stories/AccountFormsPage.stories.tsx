import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AccountFormsPage } from '../components/pages'

const withAccountFormsRoute = (initialPath: string, pathPattern = '/accounts/:accountId/manage/account-forms/:formId') =>
  (Story: () => JSX.Element) => (
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path={pathPattern} element={<Story />} />
      </Routes>
    </MemoryRouter>
  )

const meta: Meta<typeof AccountFormsPage> = {
  title: 'Pages / AccountForms',
  component: AccountFormsPage,
}

export default meta
type Story = StoryObj<typeof AccountFormsPage>

export const Default: Story = {
  decorators: [withAccountFormsRoute('/accounts/acct-001/manage/account-forms', '/accounts/:accountId/manage/account-forms')],
}

export const SelectedForm: Story = {
  decorators: [withAccountFormsRoute('/accounts/acct-001/manage/account-forms/add-update-interested-party')],
}

export const CreditCardAuthorization: Story = {
  decorators: [withAccountFormsRoute('/accounts/acct-001/manage/account-forms/credit-card-authorization')],
}

export const DocumentSignatureAuthorization: Story = {
  decorators: [withAccountFormsRoute('/accounts/acct-001/manage/account-forms/document-signature-authorization')],
}

export const RothIraConversion: Story = {
  decorators: [withAccountFormsRoute('/accounts/acct-001/manage/account-forms/roth-ira-conversion')],
}

export const UpdateAccountInformation: Story = {
  decorators: [withAccountFormsRoute('/accounts/acct-001/manage/account-forms/update-account-information')],
}

export const BeneficiaryDesignationUpdate: Story = {
  decorators: [withAccountFormsRoute('/accounts/acct-001/manage/account-forms/beneficiary-designation-update')],
}

export const DistributionRequestAssetsCash: Story = {
  decorators: [withAccountFormsRoute('/accounts/acct-001/manage/account-forms/distribution-request-assets-cash')],
}

export const TransferRequestTradestation: Story = {
  decorators: [withAccountFormsRoute('/accounts/acct-001/manage/account-forms/transfer-request-tradestation')],
}
