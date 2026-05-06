import type { Meta, StoryObj } from '@storybook/react'
import { AddUpdateInterestedPartyFlow } from '../components/pages/AccountForms/AddUpdateInterestedPartyFlow'
import { BeneficiaryDesignationUpdateFlow } from '../components/pages/AccountForms/BeneficiaryDesignationUpdateFlow'
import { CreditCardAuthorizationFlow } from '../components/pages/AccountForms/CreditCardAuthorizationFlow'
import { DistributionRequestAssetsCashFlow } from '../components/pages/AccountForms/DistributionRequestAssetsCashFlow'
import { DocumentSignatureAuthorizationFlow } from '../components/pages/AccountForms/DocumentSignatureAuthorizationFlow'
import { RothIraConversionFlow } from '../components/pages/AccountForms/RothIraConversionFlow'
import { TransferRequestTradestationFlow } from '../components/pages/AccountForms/TransferRequestTradestationFlow'
import { UpdateAccountInformationFlow } from '../components/pages/AccountForms/UpdateAccountInformationFlow'

const meta: Meta = {
  title: 'Pages / Account Form Flows',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

const renderFlow = (node: JSX.Element) => (
  <div className="min-h-screen bg-background p-4">
    {node}
  </div>
)

export const AddUpdateInterestedParty: Story = {
  render: () => renderFlow(<AddUpdateInterestedPartyFlow onBackToForms={() => undefined} />),
}

export const CreditCardAuthorization: Story = {
  render: () => renderFlow(<CreditCardAuthorizationFlow onBackToForms={() => undefined} />),
}

export const DocumentSignatureAuthorization: Story = {
  render: () => renderFlow(<DocumentSignatureAuthorizationFlow onBackToForms={() => undefined} />),
}

export const RothIraConversion: Story = {
  render: () => renderFlow(<RothIraConversionFlow onBackToForms={() => undefined} />),
}

export const UpdateAccountInformation: Story = {
  render: () => renderFlow(<UpdateAccountInformationFlow onBackToForms={() => undefined} />),
}

export const BeneficiaryDesignationUpdate: Story = {
  render: () => renderFlow(<BeneficiaryDesignationUpdateFlow onBackToForms={() => undefined} />),
}

export const DistributionRequestAssetsCash: Story = {
  render: () => renderFlow(<DistributionRequestAssetsCashFlow onBackToForms={() => undefined} />),
}

export const TransferRequestTradestation: Story = {
  render: () => renderFlow(<TransferRequestTradestationFlow onBackToForms={() => undefined} />),
}

