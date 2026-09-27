import { useState } from 'react'
import type { FormEvent } from 'react'
import { normalizeUzPhone } from '@/lib/formatPhone'
import { CusBottomSheet } from '@/shared/ui/CusBottomSheet'
import { CusButton } from '@/shared/ui/CusButton'
import { CusInput } from '@/shared/ui/CusInput'
import { useRegister } from '../api-hooks/useRegister'

type RegisterSheetProps = {
  isOpen: boolean
  onClose: () => void
}

type FieldErrors = {
  name?: string
  phone?: string
}

export function RegisterSheet({ isOpen, onClose }: RegisterSheetProps) {
  const register = useRegister()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const firstName = name.trim()
    const login = normalizeUzPhone(phone)
    const nextErrors: FieldErrors = {
      name: firstName ? undefined : 'Ismingizni kiriting',
      phone: login ? undefined : "Raqamni to'liq kiriting, masalan: 90 123 45 67",
    }
    setErrors(nextErrors)
    if (!firstName || !login) return

    register.mutate({ firstName, login }, { onSuccess: onClose })
  }

  return (
    <CusBottomSheet isOpen={isOpen} onClose={onClose} title="Ro'yxatdan o'tish">
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4 pb-2">
        <CusInput
          label="Ism"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ismingiz"
          autoComplete="given-name"
          error={errors.name}
        />
        <CusInput
          label="Telefon raqam"
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+998 90 123 45 67"
          autoComplete="tel"
          error={errors.phone}
        />

        {register.isError && (
          <p role="alert" className="text-sm font-semibold text-accent">
            Ro'yxatdan o'tib bo'lmadi. Qayta urinib ko'ring
          </p>
        )}

        <CusButton type="submit" fullWidth disabled={register.isPending}>
          {register.isPending ? 'Yuborilmoqda…' : "Ro'yxatdan o'tish"}
        </CusButton>
      </form>
    </CusBottomSheet>
  )
}
