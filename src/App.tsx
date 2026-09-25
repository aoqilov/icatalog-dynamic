import { QueryClientProvider } from '@tanstack/react-query'
import { MotionConfig } from 'framer-motion'
import { RouterProvider } from 'react-router/dom'
import { queryClient } from '@/api/api-config/tanstack'
import { router } from '@/router'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* OS'da "harakatni kamaytirish" yoqilgan bo'lsa, siljish animatsiyalari o'chadi (opacity qoladi) */}
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
      </MotionConfig>
    </QueryClientProvider>
  )
}
