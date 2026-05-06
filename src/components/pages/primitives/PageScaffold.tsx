import type { ReactNode } from 'react'
import { PageWrapper } from '@/components/layout'

interface PageScaffoldProps {
  title: string
  subtitle: string
  children: ReactNode
}

export const PageScaffold = ({ title, subtitle, children }: PageScaffoldProps) => (
  <PageWrapper title={title} subtitle={subtitle} showHeader={false}>
    <section className="rounded-2xl border border-border bg-surface px-4 py-4 shadow-card md:px-6 md:py-5">
      <div className="border-b border-border py-4">
        <h1 className="text-[34px] font-semibold leading-none text-text-primary">{title}</h1>
        <p className="mt-2 text-sm text-text-secondary">{subtitle}</p>
      </div>
      <div className="pt-4">{children}</div>
    </section>
  </PageWrapper>
)
