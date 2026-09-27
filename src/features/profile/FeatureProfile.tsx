import { useState } from 'react'
import { useGetFavoriteProducts } from './api-hooks/useGetFavoriteProducts'
import { useGetFavoriteStores } from './api-hooks/useGetFavoriteStores'
import { useGetMe } from './api-hooks/useGetMe'
import { AccountPanel } from './components/AccountPanel'
import { FavoritesSection } from './components/FavoritesSection'
import { FavoritesSheet } from './components/FavoritesSheet'
import { RegisterSheet } from './components/RegisterSheet'
import { SettingsSection } from './components/SettingsSection'
import type { FavoritesKind } from './types'

// Profil: hisob paneli (ro'yxatdan o'tilmagan bo'lsa qulflangan), umumiy sozlamalar, sevimlilar
export function FeatureProfile() {
  const me = useGetMe()
  const isRegistered = Boolean(me.data)
  const favoriteProducts = useGetFavoriteProducts(isRegistered)
  const favoriteStores = useGetFavoriteStores(isRegistered)

  const [isRegisterOpen, setRegisterOpen] = useState(false)
  const [favoritesKind, setFavoritesKind] = useState<FavoritesKind | null>(null)

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-4">
      <h1 className="text-[22px] font-bold text-text">Profil</h1>

      {me.isPending && <div aria-busy="true" aria-label="Yuklanmoqda" className="h-24 animate-pulse rounded-md bg-fill" />}
      {me.isError && <p className="py-6 text-center text-sm text-muted">Profil yuklanmadi</p>}
      {me.isSuccess && <AccountPanel buyer={me.data} onRegister={() => setRegisterOpen(true)} />}

      <SettingsSection />

      <FavoritesSection
        isLocked={!isRegistered}
        productCount={favoriteProducts.data?.total}
        storeCount={favoriteStores.data?.total}
        onOpen={setFavoritesKind}
      />

      <RegisterSheet isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)} />
      <FavoritesSheet
        kind={favoritesKind}
        products={favoriteProducts.data?.items ?? []}
        stores={favoriteStores.data?.items ?? []}
        onClose={() => setFavoritesKind(null)}
      />
    </div>
  )
}
