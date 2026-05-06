import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { CreateAccountPage } from '../components/pages'

const withCreateAccountRoute = (initialPath: string) => (Story: () => JSX.Element) => (
  <MemoryRouter initialEntries={[initialPath]}>
    <Routes>
      <Route path="/create-account" element={<Story />} />
      <Route path="/create-account/:accountType" element={<Story />} />
    </Routes>
  </MemoryRouter>
)

const meta: Meta<typeof CreateAccountPage> = {
  title: 'Pages / CreateAccount',
  component: CreateAccountPage,
}

export default meta
type Story = StoryObj<typeof CreateAccountPage>

export const Selection: Story = {
  decorators: [withCreateAccountRoute('/create-account')],
}

export const RothIraForm: Story = {
  decorators: [withCreateAccountRoute('/create-account/roth-ira')],
}

export const TraditionalIraForm: Story = {
  decorators: [withCreateAccountRoute('/create-account/traditional-ira')],
}

export const SepIraForm: Story = {
  decorators: [withCreateAccountRoute('/create-account/sep-ira')],
}

export const HealthSavingsAccountForm: Story = {
  decorators: [withCreateAccountRoute('/create-account/health-savings-account')],
}

export const CoverdellEducationForm: Story = {
  decorators: [withCreateAccountRoute('/create-account/coverdell-education-savings-account')],
}

export const InheritedTraditionalIraForm: Story = {
  decorators: [withCreateAccountRoute('/create-account/inherited-traditional-ira')],
}

export const InheritedRothIraForm: Story = {
  decorators: [withCreateAccountRoute('/create-account/inherited-roth-ira')],
}

export const RothIraKidsForm: Story = {
  decorators: [withCreateAccountRoute('/create-account/roth-ira-kids-account')],
}

export const RothConversionForm: Story = {
  decorators: [withCreateAccountRoute('/create-account/roth-conversion-strategy')],
}

export const Solo401kIntakeForm: Story = {
  decorators: [withCreateAccountRoute('/create-account/solo-401k-intake')],
}

export const BackdoorRothStrategyForm: Story = {
  decorators: [withCreateAccountRoute('/create-account/backdoor-roth-ira-strategy')],
}

export const IndividualCustodyForm: Story = {
  decorators: [withCreateAccountRoute('/create-account/individual-custody')],
}

export const RetireCustodyForm: Story = {
  decorators: [withCreateAccountRoute('/create-account/retire-custody')],
}

export const RothConversionOtherForm: Story = {
  decorators: [withCreateAccountRoute('/create-account/roth-conversion-other')],
}

export const Solo401kAppForm: Story = {
  decorators: [withCreateAccountRoute('/create-account/solo-401k-app')],
}

export const TrustEstateCustodyForm: Story = {
  decorators: [withCreateAccountRoute('/create-account/trust-or-estate-custody')],
}

export const MobileSelection: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
  decorators: [withCreateAccountRoute('/create-account')],
}
