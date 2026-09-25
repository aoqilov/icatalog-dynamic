import { Outlet, useMatches } from 'react-router'
import type { RouteHandle } from '@/types/router'
import { BottomNav } from './components/BottomNav'
import { Header } from './components/Header'

export function MainLayout() {
  const matches = useMatches()
  const hideHeaderOnMobile = matches.some(
    (match) => (match.handle as RouteHandle | undefined)?.hideHeaderOnMobile,
  )

  return (
    // app-bg: glass sirtlar ortidagi dog'lar, har bir sahifa shu fon ustida turadi.
    // pb: mobilda kontent pastki navbar (h-16 + safe area) ostida qolib ketmasligi uchun
    <div className="app-bg flex flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
      <Header hideOnMobile={hideHeaderOnMobile} />
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
