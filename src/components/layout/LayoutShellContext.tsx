/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from 'react'

interface HeaderRenderProps {
  title: string
  subtitle?: string
}

interface LayoutShellContextValue {
  renderHeader?: (props: HeaderRenderProps) => ReactNode
  renderSidebar?: () => ReactNode
}

const LayoutShellContext = createContext<LayoutShellContextValue>({})

interface LayoutShellProviderProps extends LayoutShellContextValue {
  children: ReactNode
}

export const LayoutShellProvider = ({ children, renderHeader, renderSidebar }: LayoutShellProviderProps) => (
  <LayoutShellContext.Provider value={{ renderHeader, renderSidebar }}>{children}</LayoutShellContext.Provider>
)

export const useLayoutShell = () => useContext(LayoutShellContext)
