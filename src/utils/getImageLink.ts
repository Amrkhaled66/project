export default function getImageLink(image: string ) {

  return `${import.meta.env.VITE_API_URL}${image}`;
}
