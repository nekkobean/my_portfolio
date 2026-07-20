export function resolveProjectImage(image?: string | null): string {
  if (!image) return "/elogo.png";
  if (/^https?:\/\//i.test(image)) return image;        // full URL, e.g. Cloudinary link
  return image.startsWith("/") ? image : `/${image}`;    // public folder file, e.g. "name.png" -> "/name.png"
}