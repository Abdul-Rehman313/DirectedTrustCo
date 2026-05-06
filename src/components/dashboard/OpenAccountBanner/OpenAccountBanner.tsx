import { ArrowRight, PlusCircle } from 'lucide-react'
import { Button, Card } from '../../ui'

interface OpenAccountBannerProps {
  onStartNew: () => void
}

export const OpenAccountBanner = ({ onStartNew }: OpenAccountBannerProps) => (
  <Card className="overflow-hidden border-primary/20 bg-gradient-to-r from-info-light to-surface">
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="max-w-xl">
        <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <PlusCircle className="h-3.5 w-3.5" />
          Directed Connect Onboarding
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-text-primary md:text-3xl">Open a New Account</h2>
        <p className="mt-2 text-sm text-text-secondary md:text-base">
          Start a guided, multi-step onboarding flow for IRA, Crypto, Custody, and contribution workflows.
        </p>
      </div>
      <Button size="lg" className="min-w-40" onClick={onStartNew}>
        Start New Account
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  </Card>
)
