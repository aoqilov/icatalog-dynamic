// Mock ma'lumotlar uchun haqiqiy ishlaydigan rasm URL'lari (Lorem Picsum — API kalitisiz, doim yuklanadi).
// `seed` bir xil bo'lsa, bir xil rasm qaytadi — shu bilan har bir mahsulot/kategoriya o'z rasmiga ega bo'ladi.
export function mockImage(seed: string | number, width = 600, height = 800) {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`
}
