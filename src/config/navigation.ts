import { CatalogIcon, HangerIcon, HomeIcon, SparkleIcon, UserIcon } from '@/shared/ui/Icons'
import { ROUTES } from './routes'

export const NAV_LINKS = [
  { label: 'Bosh sahifa', to: ROUTES.home, icon: HomeIcon },
  { label: 'Katalog', to: ROUTES.catalog, icon: CatalogIcon },
  { label: 'Yangi', to: ROUTES.newArrivals, icon: SparkleIcon },
  { label: 'Garderob', to: ROUTES.wardrobe, icon: HangerIcon },
  { label: 'Profil', to: ROUTES.profile, icon: UserIcon },
]
