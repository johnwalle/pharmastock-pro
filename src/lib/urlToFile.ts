// lib/urlToFile.ts
export async function urlToFile(url: string, filename: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  const mimeType = blob.type || 'image/jpeg';
  return new File([blob], filename, { type: mimeType });
}
