import { Link } from 'react-router'
import { ROUTES } from '@/config/routes'
import { SITE } from '@/config/site'

export function Logo() {
  return (
    <Link
      to={ROUTES.home}
      className="font-serif text-[26px] font-bold italic text-accent"
    >
      {SITE.name}
    </Link>
  )
}
