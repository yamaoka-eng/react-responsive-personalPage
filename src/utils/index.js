export const getImage = (imgUrl) => {
  return new URL(`/src/assets/images/${imgUrl}`, import.meta.url).href;
}