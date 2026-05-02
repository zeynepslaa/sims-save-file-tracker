import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SaveTrackerProvider } from './context/SaveTrackerContext'
import { Layout } from './components/layout/Layout'
import { DashboardPage } from './pages/DashboardPage'
import { WorldsPage } from './pages/WorldsPage'
import { WorldDetailPage } from './pages/WorldDetailPage'
import { LotDetailPage } from './pages/LotDetailPage'
import { InspirationPage } from './pages/InspirationPage'
import { SettingsPage } from './pages/SettingsPage'
import { AboutPage } from './pages/AboutPage'

export default function App() {
  return (
    <SaveTrackerProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/worlds" element={<WorldsPage />} />
            <Route path="/worlds/:worldId" element={<WorldDetailPage />} />
            <Route path="/worlds/:worldId/lots/:lotId" element={<LotDetailPage />} />
            <Route path="/inspiration" element={<InspirationPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </SaveTrackerProvider>
  )
}
