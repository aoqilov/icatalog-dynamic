// Do'kon ma'lumoti yuklanguncha sahifa shakli (layout sakramasligi uchun o'lchamlar haqiqiy bloklarga teng)
export function HomeSkeleton() {
  return (
    <div aria-busy="true" aria-label="Yuklanmoqda" className="flex animate-pulse flex-col items-center">
      <div className="h-48 w-full bg-fill mask-b-from-50% mask-b-to-100% sm:h-60" />
      <div className="-mt-14 size-28 rounded-full border-2 border-line bg-fill" />
      <div className="mt-4 h-6 w-40 rounded-md bg-fill" />
      <div className="mt-3 h-4 w-28 rounded-md bg-fill" />

      <div className="mt-6 flex w-full flex-col gap-5 px-4">
        <div className="h-14 rounded-md bg-fill" />
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="h-24 rounded-md bg-fill" />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="aspect-square rounded-full bg-fill" />
          ))}
        </div>
      </div>
    </div>
  )
}
