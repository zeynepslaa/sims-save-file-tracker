import { BridgeConnector } from '../bridge/BridgeConnector'
import { Header } from './Header'

export function Layout({ children }) {
  return (
    <div className="min-h-screen pb-16">
      <BridgeConnector />
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  )
}
