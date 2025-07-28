function getImgUrl(imageName) {
  
  return new URL(`../assets/books/${imageName}`, import.meta.url).href;
}
export { getImgUrl };
export default getImgUrl;