import { Outlet } from 'react-router'
import { BottomNav } from './components/BottomNav'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

export function MainLayout() {
  return (
    // app-bg: glass sirtlar ortidagi dog'lar, har bir sahifa shu fon ustida turadi.
    // pb: mobilda kontent pastki navbar (h-16 + safe area) ostida qolib ketmasligi uchun
    <div className="app-bg flex flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
