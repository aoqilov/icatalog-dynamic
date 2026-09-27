import { LuLock } from 'react-icons/lu'
import type { Buyer } from '@/api/routes/auth/auth.types'
import { formatPhone } from '@/lib/formatPhone'
import { CusButton } from '@/shared/ui/CusButton'

type AccountPanelProps = {
  // null: ro'yxatdan o'tilmagan
  buyer: Buyer | null
  onRegister: () => void
}

const cardClass = 'flex flex-col gap-4 rounded-md border border-line bg-tile p-4'
const avatarClass = 'flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2'

export function AccountPanel({ buyer, onRegister }: AccountPanelProps) {
  if (!buyer) {
    return (
      <section aria-label="Hisob" className={cardClass}>
        <div className="flex items-center gap-4">
          <span className={`${avatarClass} border-line bg-fill text-muted`}>
            <LuLock aria-hidden className="size-6" />
          </span>
          <div className="flex min-w-0 flex-col">
            <p className="text-[17px] font-bold text-text">Hali ro'yxatdan o'tilmagan</p>
            <p className="text-sm text-muted">Sevimlilarni saqlash uchun ro'yxatdan o'ting</p>
          </div>
        </div>
        <CusButton fullWidth onClick={onRegister}>
          Ro'yxatdan o'tish
        </CusButton>
      </section>
    )
  }

  const fullName = [buyer.firstName, buyer.lastName].filter(Boolean).join(' ')

  return (
    <section aria-label="Hisob" className={cardClass}>
      <div className="flex items-center gap-4">
        <span className={`${avatarClass} border-brand bg-fill`}>
          {buyer.avatarPhoto ? (
            <img src={buyer.avatarPhoto} alt="" className="size-full object-cover" />
          ) : (
            <span aria-hidden="true" className="text-2xl font-bold text-accent">
              {fullName.charAt(0).toUpperCase()}
            </span>
          )}
        </span>
        <div className="flex min-w-0 flex-col">
          <p className="truncate text-[17px] font-bold text-text">{fullName}</p>
          <p className="text-sm text-muted">{formatPhone(buyer.login)}</p>
        </div>
      </div>
    </section>
  )
}
