import { LuHouse, LuSearch, LuSparkles, LuUser } from 'react-icons/lu'
import { TbHanger } from 'react-icons/tb'
import { ROUTES } from './routes'

export const NAV_LINKS = [
  { label: 'Bosh sahifa', to: ROUTES.home, icon: LuHouse },
  { label: 'Katalog', to: ROUTES.catalog, icon: LuSearch },
  { label: 'Yangi', to: ROUTES.newArrivals, icon: LuSparkles },
  { label: 'Garderob', to: ROUTES.wardrobe, icon: TbHanger },
  { label: 'Profil', to: ROUTES.profile, icon: LuUser },
]
