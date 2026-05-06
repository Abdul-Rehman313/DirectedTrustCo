import { Card, Button } from '../../ui'
import { PageWrapper } from '../../layout'

export const SupportPage = () => (
  <PageWrapper title="Support" subtitle="Get help from our client success and operations teams.">
    <div className="space-y-4">
      <Card className="space-y-2">
        <h2 className="text-lg font-semibold text-text-primary">Support Center</h2>
        <p className="text-sm text-text-secondary">
          Submit requests, browse help documentation, and follow up on onboarding questions.
        </p>
      </Card>
      <Card className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-text-primary">Need immediate help?</p>
          <p className="text-sm text-text-secondary">Our support team typically responds in under 1 business day.</p>
        </div>
        <Button>Contact Support</Button>
      </Card>
    </div>
  </PageWrapper>
)
