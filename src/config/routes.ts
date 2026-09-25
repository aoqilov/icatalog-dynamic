export const ROUTES = {
  home: '/',
  catalog: '/catalog',
  product: (id: string | number) => `/catalog/${id}`,
  newArrivals: '/new',
  wardrobe: '/wardrobe',
  profile: '/profile',
  // dizayn-tizim komponentlarini ko'rish uchun, menyuda yo'q
  playground: '/playground',
}
