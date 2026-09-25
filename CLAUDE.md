# bridal-org

Foydalanuvchi bilan o'zbek tilida (lotin yozuvida) yoziladi. Kod, fayl nomlari va texnik atamalar ingliz tilida qoladi.

## Stack

React 19 · TypeScript 6 · Vite 8 · Tailwind CSS 4 · axios · TanStack Query 5 · framer-motion · React Router 7 · react-icons · oxlint

## Buyruqlar

```bash
npm run dev      # dev server
npm run build    # tsc + production build
npm run lint     # oxlint
```

Har bir o'zgarishdan keyin `npm run build` va `npm run lint` xato va ogohlantirishsiz o'tishi shart.

## Hozirgi bosqich: faqat mock ma'lumot

Backend hali ulanmagan, shuning uchun barcha so'rovlar mock ma'lumot bilan ishlaydi.
- `.env`da `VITE_USE_MOCK=true` turadi, foydalanuvchi aytmaguncha o'zgartirilmaydi.
- Har bir yangi so'rov uchun avval `<resurs>.mockdata.ts`da mock ma'lumot yoziladi. U `<resurs>.types.ts`dagi tiplarga to'liq mos bo'ladi.
- Mock rejimda api funksiyasi mock ma'lumotni qaytaradi. Mutatsiyalar (create / update / delete) xotiradagi mock massivni o'zgartiradi va natijani qaytaradi, sahifa yangilanganda ma'lumot asl holiga qaytadi.
- Real so'rov qismi (axios) ham yoziladi, lekin undagi endpoint va tiplar taxminiy. Backend ulanganda ular tekshiriladi va `VITE_USE_MOCK=false` qilinadi.

## Tuzilma

```
src/
├── main.tsx
├── App.tsx                        # global provider'lar (QueryClientProvider) + RouterProvider
├── style/                         # barcha .css fayllar
│   ├── index.css                  # Tailwind, glass.css importi, @theme tokenlari
│   └── glass.css                  # glass dizayn-tizimi: tokenlar va recipe klasslar
├── vite-env.d.ts                  # env o'zgaruvchilarining tiplari
├── api/
│   ├── api-config/
│   │   ├── axios.ts               # axios instance
│   │   └── tanstack.ts            # QueryClient sozlamalari
│   └── routes/                    # har bir backend resursi uchun alohida papka
│       └── products/
│           ├── products.api.ts        # so'rov funksiyalari + query key'lar
│           ├── products.types.ts      # backend so'rov/javob tiplari
│           └── products.mockdata.ts   # mock ma'lumotlar
├── router/index.tsx               # route'lar ro'yxati
├── layouts/
│   ├── MainLayout.tsx             # Header + sahifa + BottomNav
│   └── components/                # Header, BottomNav, Logo, Footer (hozircha ishlatilmaydi)
├── pages/                         # har bir route uchun sahifa
│   ├── home/HomePage.tsx
│   └── catalog/
│       ├── CatalogPage.tsx
│       └── product/ProductPage.tsx
├── features/                      # biznes-modullar, har biri mustaqil
│   └── products/
│       ├── api-hooks/             # TanStack Query hook'lari (useGetProduct)
│       ├── components/            # faqat shu feature'ning komponentlari
│       ├── hooks/                 # faqat shu feature'ning mantiqi
│       ├── types.ts               # (kerak bo'lsa) faqat shu feature'ning UI tiplari
│       └── FeatureProduct.tsx     # yagona kirish nuqtasi
├── shared/
│   ├── ui/                        # oddiy UI elementlar: Button, Input, Modal
│   └── components/                # bir nechta feature ishlatadigan komponentlar
├── assets/                        # rasm, shrift, ikonkalar
├── config/                        # env.ts, routes.ts, navigation.ts, site.ts, niche.ts, konstantalar
├── types/                         # API'dan tashqari umumiy tiplar
├── hooks/                         # hamma joyda ishlatiladigan hook'lar
└── lib/                           # motion.ts, applyNiche.ts, yordamchi funksiyalar
```

## Qoidalar

### Qatlamlar va importlar
- Import yo'nalishi: `router → layouts, pages → features → api → shared, lib, config, types, hooks, assets`. Teskari yo'nalishda import qilinmaydi.
- Pastki qatlamdagi papkalar (`shared`, `lib`, `config`, `types`, `hooks`, `assets`) bir-birini import qila oladi, lekin `api`, `features`, `pages`, `layouts`ni import qilmaydi.
- Istisno: `api/routes/<resurs>/<resurs>.types.ts` fayllaridagi tiplarni istalgan qatlam `import type` bilan olishi mumkin.
- Feature'lar bir-birini import qilmaydi. Ikki feature'ga kerak bo'lgan narsa `shared/`, `types/` yoki `hooks/`ga ko'chiriladi.
- Feature'dan tashqariga faqat `Feature<Nom>.tsx` import qilinadi. Uning ichki papkalariga (`api-hooks`, `components` va boshqalar) tashqaridan murojaat qilinmaydi.
- Qatlamlar orasida `@/` alias ishlatiladi (`@/api/routes/products/products.api`), bitta qatlam ichida esa nisbiy import (`./components/...`, `../../api-config/axios`).

### Sahifalar
- Sahifa `pages/<route>/<Nom>Page.tsx` faylida turadi. U faqat Feature komponentlarini yig'adi va URL parametrlarini (`useParams`) props orqali uzatadi. Sahifada API so'rovi va biznes-mantiq bo'lmaydi.
- Istisno: holati URL query'da turadigan feature (masalan, katalogdagi tanlov va ko'rinish) uni o'zining `hooks/` ichida `useSearchParams` bilan o'qiydi va yozadi (`features/catalog/hooks/useCatalogParams`). Bunday sahifa feature'ga props bermaydi. Boshqa joyda shu formatdagi URL kerak bo'lsa, `ROUTES`ga yordamchi funksiya qo'shiladi (`ROUTES.catalogByCategory`).
- Yangi sahifa uchun URL `config/routes.ts`dagi `ROUTES`ga, route esa `router/index.tsx`ga qo'shiladi. Kodda URL qo'lda yozilmaydi, faqat `ROUTES` orqali olinadi.
- Sahifa menyuda ko'rinishi kerak bo'lsa, `config/navigation.ts`dagi `NAV_LINKS`ga `label`, `to` va `icon` bilan qo'shiladi. Header (desktop) va pastki navbar havolalarni shu ro'yxatdan oladi.

### Layout
- `layouts/MainLayout.tsx` Header, sahifa (`Outlet`) va BottomNav'ni yig'adi. Ularning qismlari `layouts/components/`da turadi.
- Sayt nomi, telefon, email va ijtimoiy tarmoqlar faqat `config/site.ts`dagi `SITE`dan olinadi (hozircha vaqtinchalik qiymatlar).
- Header: chapda logo, o'ngda mavzu tugmasi va sevimlilar (❤). Mobilda menyu tugmasi yo'q, navigatsiya faqat BottomNav orqali. `md`dan kattada Header ichida `NAV_LINKS` ko'rinadi.
- Modal oynalar `shared/ui/BottomSheet` orqali: fon yoki Escape bosilganda yopiladi, ochiq paytda sahifa scroll'i bloklanadi (`hooks/useLockBodyScroll`).
- Sahifaning o'z sticky toolbar'i bo'lsa, route'ga `handle: { hideHeaderOnMobile: true }` qo'shiladi (tip: `types/router.ts`), `MainLayout` mobilda Header'ni yashiradi. Toolbar mobilda `top-0`, `md`dan kattada Header ostida (`md:top-[65px]`) turadi.
- Pastda qotib turadigan harakatlar paneli `shared/ui/StickyActionBar` orqali: mobilda BottomNav ustida turadi, sahifa oxiriga uning balandligicha (`h-24`) bo'sh joy qo'yiladi.
- Mobilda (`md`dan kichik) ekran pastida `BottomNav` turadi: `NAV_LINKS`dagi har bir havola ikonka va nom bilan. Kontent uning ostida qolmasligi uchun `MainLayout`da `pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0` bor, pastki navbar balandligi o'zgarsa, shu ham o'zgartiriladi. Faol band: `aria-current`, qalinroq ikonka va oltin nuqta.
- `MainLayout` ildizida `.app-bg` turadi: glass sirtlar ortidagi dog'lar har bir sahifada shu yerdan keladi, sahifalarga qayta qo'yilmaydi.
- Ikonkalar `react-icons`dan kerakli faylning o'zida to'g'ridan-to'g'ri import qilinadi (`import { LuHeart } from 'react-icons/lu'`), oraliq `Icons` fayli yo'q. Avval Lucide (`react-icons/lu`), unda yo'q bo'lsa Tabler (`react-icons/tb`) ishlatiladi: ikkalasi chiziqli va `strokeWidth`ni qo'llab-quvvatlaydi. To'ldirilgan (fill) to'plamlar ishlatilmaydi. O'lcham `className` bilan (`size-5`, `size-6`) beriladi, bezak ikonkasiga `aria-hidden` qo'yiladi.

### Feature'lar
- Nomlash: `features/<nom>/Feature<Nom>.tsx` (masalan, `features/cart/FeatureCart.tsx`).
- Feature o'z ma'lumotini o'zi yuklaydi va loading / error holatlarini o'zi ko'rsatadi.
- Namuna sifatida `features/products`ga qarang.

### API
- Har bir backend resursi uchun `api/routes/<resurs>/` papkasida 3 ta fayl bo'ladi:
  - `<resurs>.api.ts`: so'rov funksiyalari (`<resurs>Api` obyekti) va query key'lar (`<resurs>Keys`);
  - `<resurs>.types.ts`: backend so'rov va javob tiplari;
  - `<resurs>.mockdata.ts`: mock ma'lumotlar.
- axios faqat `<resurs>.api.ts` fayllarida, `api-config/axios.ts`dagi `api` instance orqali ishlatiladi.
- `.env`da `VITE_USE_MOCK=true` bo'lsa, api funksiyalari backend'ga so'rov yubormaydi va mock ma'lumot qaytaradi. Har bir yangi api funksiyasi mock rejimni ham qo'llab-quvvatlashi shart (namuna: `api/routes/products/products.api.ts`).
- Feature'ning `api-hooks/` papkasida faqat TanStack Query hook'lari turadi: `useGet<Nom>` uchun `useQuery`, `useCreate<Nom>`, `useUpdate<Nom>`, `useDelete<Nom>` uchun `useMutation`. Ular `api/routes` funksiyalarini chaqiradi.
- Komponent ichida axios ham, `api/routes` funksiyalari ham to'g'ridan-to'g'ri chaqirilmaydi, faqat `api-hooks` orqali.
- Query key'lar qo'lda yozilmaydi, faqat `<resurs>Keys` orqali olinadi. Mutatsiyadan keyin tegishli ma'lumot `queryClient.invalidateQueries({ queryKey: <resurs>Keys.all })` bilan yangilanadi.
- QueryClient'ning umumiy sozlamalari `api-config/tanstack.ts`da.

### Hook'lar
- `features/<nom>/api-hooks/`: TanStack Query hook'lari.
- `features/<nom>/hooks/`: faqat shu feature'ning mantiqi.
- `src/hooks/`: hamma joyda ishlatiladigan hook'lar (`useDebounce`, `useMediaQuery`).

### Tiplar va komponentlar
- Backend tiplari `api/routes/<resurs>/<resurs>.types.ts`da, faqat bitta feature'ga tegishli UI tiplari o'sha feature'ning `types.ts` faylida, boshqa umumiy tiplar `src/types/`da turadi.
- `shared/ui/`: biznes-mantiqdan xabarsiz oddiy elementlar (Button, Input, Modal).
- `shared/components/`: bir nechta feature ishlatadigan murakkabroq komponentlar (masalan, ProductCard).
- Faqat bitta feature'ga kerak komponent `features/<nom>/components/`da turadi.

### Env
- Yangi env o'zgaruvchisi `.env` va `.env.example` fayllariga `VITE_` prefiksi bilan qo'shiladi, tipi `src/vite-env.d.ts`ga yoziladi va `config/env.ts` orqali o'qiladi.
- `.env` git'ga qo'shilmaydi. Yangi dasturchi `.env.example`dan nusxa olib `.env` yaratadi.

### Stil va animatsiya
- Stil faqat Tailwind klasslari bilan yoziladi, global stillar `src/style/index.css`da.
- Barcha `.css` fayllar faqat `src/style/` papkasida turadi. Yangi `.css` fayl ham shu yerga qo'shiladi va `style/index.css` ichidan `@import` qilinadi.

### Glass dizayn-tizimi
- Tokenlar (rang, radius, shrift) faqat `style/glass.css`da. `style/index.css`dagi `@theme inline` ularni Tailwind klasslariga ulaydi: `bg-bg`, `bg-fill`, `bg-tile`, `text-text`, `text-muted`, `text-accent`, `border-line`, `bg-brand`, `text-brand-ink`, `bg-placeholder`, `rounded-tile` (4px), `rounded-sm` (9px), `rounded-md` (12px), `rounded-pill` (20px), `font-serif` (faqat logo).
- Komponentlarda hex rang, `rose-*` / `gray-*` kabi Tailwind palitrasi va yangi ranglar ishlatilmaydi. Yagona aksent: nishaning `brand` rangi.
- Glass sirtlar faqat recipe klasslari bilan: `.glass` (ikkinchi darajali tugma, trek, chip), `.glass-brand` (asosiy CTA va har qanday tanlangan holat), `.glass-on-image` (surat ustidagi tugma/badge), `.glass-bar` (navbar, sticky panel), `.gline` (ajratuvchi chiziq), `.badge-new` (solid). Ular Tailwind utility'lari bilan qayta yozilmaydi.
- Bitta ekranda bitta primary (`.glass-brand`) tugma. `.glass-brand` matni faqat `--brand-ink`, boshqa rang berilmaydi.
- Blur ichida blur bo'lmaydi: `.glass-bar` ichidagi element shaffof + `border-line` bilan yoziladi. Uzun ro'yxat elementlariga `backdrop-filter` qo'yilmaydi, ular `bg-tile` oladi.
- Tugmalar `shared/ui/Button` (`primary` / `secondary` / `icon` / `onImage`), segmentlar `shared/ui/SegmentedControl` orqali. Faqat ikonkali tugmada `aria-label` shart. Bosiladigan maydon kamida 44×44px.
- Mavzu: `<html data-theme="light|dark">`, tanlov `localStorage`ning `theme` kalitida. O'qish/yozish faqat `hooks/useTheme` orqali, tugma `shared/components/ThemeToggle`. `index.html`dagi inline skript mavzuni React'dan oldin qo'yadi.
- Yangi dizayn-tizim komponenti avval `/playground` sahifasida (`features/playground`) ko'rsatiladi. Bu route menyuda yo'q.

### Nisha (rang palitrasi)
- Saytning ranglari `config/niche.ts`dagi `NICHE`dan olinadi. Nishani almashtirish uchun faqat `export const NICHE = NICHES.<id>` qatori o'zgartiriladi.
- Nisha 6 ta xom rang, `tone` va `darkTint` beradi: `brand`, `brandInk`, `textLight`, `textDark`, `blobA`, `blobB`. `tone: 'light'` och brand uchun (oltin, ustida to'q matn), `'dark'` to'q brand uchun (yashil, qizil, ustida och matn): glass-brand zichroq bo'ladi.
- `main.tsx`da render'dan oldin `lib/applyNiche` ranglarni `:root`ga `--brand*` / `--blob-*` sifatida yozadi va `data-niche`, `data-brand-tone` atributlarini qo'yadi.
- Chiziqlar, glass gradient, soyalar, badge va fon dog'lari `glass.css`da `color-mix()` bilan shu ranglardan hisoblanadi. Mavzuga bog'liq tokenlar (`--primary-text`, `--brand-mark`, `--line`) `textLight` yoki `textDark`ni tanlaydi. Bu qiymatlar qo'lda qayta yozilmaydi.
- Yorug' mavzuda neytral ranglar (`bg`, `fill`, `tile`, `text`, `muted`) nishaga bog'liq emas. Qorong'i mavzuda esa `bg`, `fill`, `tile` va `muted` neytral qoraga nishaning `darkTint` foizicha brand rangini aralashtirib hisoblanadi (`--dark-tint`, 0 bo'lsa sof neytral).
- Yangi nisha qo'shishda kontrast tekshiriladi: `brandInk` glass-brand ustida va `textLight` / `textDark` fon ustida kamida 4.5:1, ikkala mavzuda.
- Mobile-first: avval mobil uchun klasslar yoziladi, katta ekranlar uchun `sm:` / `md:` / `lg:` qo'shiladi. Har bir komponent 360px kenglikda ham to'g'ri ko'rinishi shart.
- Qayta ishlatiladigan framer-motion variantlari `lib/motion.ts`da turadi.
- `App.tsx`dagi `MotionConfig reducedMotion="user"` OS'dagi "harakatni kamaytirish" sozlamasini hurmat qiladi, har bir animatsiyada alohida tekshirish shart emas. Ichkariga kirish / orqaga qaytish uchun `slideSwitch` (`custom`: 1 yoki -1), bir joyda kontent almashishi uchun `fadeSwap` ishlatiladi.

### Kod uslubi
- Faqat named export (`export function HomePage`), default export ishlatilmaydi.
- Komponent fayllari `PascalCase.tsx`, hook'lar `useSomething.ts`, API fayllari `<resurs>.api.ts` / `.types.ts` / `.mockdata.ts`, qolganlari `camelCase.ts`.
- Props tipi `<Komponent>Props` deb nomlanadi va `type` bilan yoziladi.

## Yangi feature qo'shish tartibi

1. Resurs hali yo'q bo'lsa, `api/routes/<resurs>/` papkasida `<resurs>.types.ts`, `<resurs>.mockdata.ts` va `<resurs>.api.ts` yaratiladi.
2. `features/<nom>/api-hooks/`: TanStack Query hook'lari.
3. `features/<nom>/components/`: komponentlar.
4. `features/<nom>/Feature<Nom>.tsx`: hammasini yig'adigan kirish nuqtasi.
5. Sahifada `<Feature<Nom> />` chaqiriladi. Yangi sahifa bo'lsa, `ROUTES` va `router/index.tsx` yangilanadi.
6. `npm run build` va `npm run lint` tekshiriladi.

## Hali hal qilinmagan

Quyidagilar foydalanuvchi bilan kelishilmaguncha qo'shilmaydi:
- Global state (Zustand yoki Redux Toolkit).
- Ko'p tillilik (uz / ru / en) va admin panel.
- Haqiqiy backend ulanishi (hozircha barcha so'rovlar mock bilan ishlaydi).
