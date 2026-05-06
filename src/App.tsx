import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Header, LayoutShellProvider, RoutedAppSidebar } from '@/components/layout'
import { mockAccounts, mockCurrentUser, topNavigation, bottomNavigation } from '@/mocks'

const DashboardPage = lazy(() => import('./components/pages/Dashboard/DashboardPage').then((module) => ({ default: module.DashboardPage })))
const TransactionsPage = lazy(() =>
  import('./components/pages/Transactions/TransactionsPage').then((module) => ({ default: module.TransactionsPage })),
)
const DocumentCenterPage = lazy(() =>
  import('./components/pages/DocumentCenter/DocumentCenterPage').then((module) => ({ default: module.DocumentCenterPage })),
)
const FeesPage = lazy(() => import('./components/pages/Fees/FeesPage').then((module) => ({ default: module.FeesPage })))
const AccountDetailsPage = lazy(() =>
  import('./components/pages/AccountDetails/AccountDetailsPage').then((module) => ({ default: module.AccountDetailsPage })),
)
const AccountFormsPage = lazy(() =>
  import('./components/pages/AccountForms/AccountFormsPage').then((module) => ({ default: module.AccountFormsPage })),
)
const RolloverTransferPage = lazy(() =>
  import('./components/pages/RolloverTransfer/RolloverTransferPage').then((module) => ({ default: module.RolloverTransferPage })),
)
const ContributePage = lazy(() =>
  import('./components/pages/Contribute/ContributePage').then((module) => ({ default: module.ContributePage })),
)
const CreateAccountPage = lazy(() =>
  import('./components/pages/CreateAccount/CreateAccountPage').then((module) => ({ default: module.CreateAccountPage })),
)
const InvestPage = lazy(() =>
  import('./components/pages/Invest/InvestPage').then((module) => ({ default: module.InvestPage })),
)
const ManageInvestmentsPage = lazy(() =>
  import('./components/pages/ManageInvestments/ManageInvestmentsPage').then((module) => ({
    default: module.ManageInvestmentsPage,
  })),
)
const SupportPage = lazy(() => import('./components/pages/Support/SupportPage').then((module) => ({ default: module.SupportPage })))

const App = () => (
  <LayoutShellProvider
    renderHeader={({ title, subtitle }) => <Header title={title} subtitle={subtitle} />}
    renderSidebar={() => (
      <RoutedAppSidebar
        user={mockCurrentUser}
        topLinks={topNavigation}
        bottomLinks={bottomNavigation}
      />
    )}
  >
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-background text-sm font-medium text-text-secondary">Loading...</div>
      }
    >
      <Routes>
        <Route path="/" element={<DashboardPage accountsData={mockAccounts} />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/document-center" element={<DocumentCenterPage />} />
        <Route path="/fees" element={<FeesPage />} />
        <Route path="/accounts/:accountId" element={<AccountDetailsPage />} />
        <Route path="/accounts/:accountId/manage/account-forms" element={<AccountFormsPage />} />
        <Route path="/accounts/:accountId/manage/account-forms/:formId" element={<AccountFormsPage />} />
        <Route path="/accounts/:accountId/manage/rollover-transfer" element={<RolloverTransferPage />} />
        <Route path="/accounts/:accountId/manage/rollover-transfer/:rolloverType" element={<RolloverTransferPage />} />
        <Route path="/accounts/:accountId/manage/contribute" element={<ContributePage />} />
        <Route path="/accounts/:accountId/manage/contribute/:contributionType" element={<ContributePage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/create-account/:accountType" element={<CreateAccountPage />} />
        <Route path="/accounts/:accountId/manage/invest" element={<InvestPage />} />
        <Route path="/accounts/:accountId/manage/invest/:investmentType" element={<InvestPage />} />
        <Route path="/accounts/:accountId/manage/manage-investments" element={<ManageInvestmentsPage />} />
        <Route path="/accounts/:accountId/manage/manage-investments/:manageInvestmentType" element={<ManageInvestmentsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/support/help-center" element={<SupportPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </LayoutShellProvider>
)

export default App
