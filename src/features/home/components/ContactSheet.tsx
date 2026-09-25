import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { LuChevronRight, LuMapPin, LuPhone } from 'react-icons/lu'
import {
  TbBrandFacebook,
  TbBrandInstagram,
  TbBrandTelegram,
  TbBrandTiktok,
  TbBrandYoutube,
} from 'react-icons/tb'
import type { SocialPlatform, Store } from '@/api/routes/store/store.types'
import { BottomSheet } from '@/shared/ui/BottomSheet'
import type { ContactKind } from '../types'

type ContactSheetProps = {
  kind: ContactKind | null
  store: Store
  onClose: () => void
}

const TITLES: Record<ContactKind, string> = {
  socials: 'Ijtimoiy tarmoqlar',
  addresses: 'Manzillar',
  phones: 'Kontaktlar',
}

const SOCIAL_ICONS: Record<SocialPlatform, IconType> = {
  instagram: TbBrandInstagram,
  telegram: TbBrandTelegram,
  tiktok: TbBrandTiktok,
  youtube: TbBrandYoutube,
  facebook: TbBrandFacebook,
}

const SOCIAL_NAMES: Record<SocialPlatform, string> = {
  instagram: 'Instagram',
  telegram: 'Telegram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  facebook: 'Facebook',
}

type ContactRowProps = {
  href: string
  icon: ReactNode
  title: string
  subtitle: string
  note?: string
  external?: boolean
}

function ContactRow({ href, icon, title, subtitle, note, external = false }: ContactRowProps) {
  return (
    <a
      href={href}
      {...(external && { target: '_blank', rel: 'noreferrer' })}
      className="flex min-h-16 items-center gap-3 rounded-md px-2 py-2 hover:bg-fill focus-visible:outline-2 focus-visible:outline-brand"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-fill text-accent">
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[15px] font-semibold text-text">{title}</span>
        <span className="text-sm text-muted">{subtitle}</span>
        {note && <span className="text-xs text-muted">{note}</span>}
      </span>
      <LuChevronRight aria-hidden className="size-5 shrink-0 text-muted" />
    </a>
  )
}

export function ContactSheet({ kind, store, onClose }: ContactSheetProps) {
  return (
    <BottomSheet isOpen={kind !== null} onClose={onClose} title={kind ? TITLES[kind] : ''}>
      <ul className="flex flex-col gap-1">
        {kind === 'socials' &&
          store.socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.platform]
            return (
              <li key={social.platform}>
                <ContactRow
                  href={social.url}
                  external
                  icon={<Icon aria-hidden className="size-5" />}
                  title={SOCIAL_NAMES[social.platform]}
                  subtitle={social.handle}
                />
              </li>
            )
          })}

        {kind === 'addresses' &&
          store.addresses.map((address) => (
            <li key={address.id}>
              <ContactRow
                href={address.mapUrl}
                external
                icon={<LuMapPin aria-hidden className="size-5" />}
                title={address.title}
                subtitle={address.address}
                note={address.workHours}
              />
            </li>
          ))}

        {kind === 'phones' &&
          store.phones.map((phone) => (
            <li key={phone.id}>
              <ContactRow
                href={`tel:${phone.number.replace(/[^\d+]/g, '')}`}
                icon={<LuPhone aria-hidden className="size-5" />}
                title={phone.number}
                subtitle={phone.label}
              />
            </li>
          ))}
      </ul>
    </BottomSheet>
  )
}
