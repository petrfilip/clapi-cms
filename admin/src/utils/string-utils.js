export const slugify = (text) => {
  return text
    .toString() // Cast to string
    .toLowerCase() // Convert the string to lowercase letters
    .normalize('NFD') // The normalize() method returns the Unicode Normalization Form of a given string.
    .trim() // Remove whitespace from both sides of a string
    .replace(/\s+/g, '_') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-+/g, '_') // Replace  - with single _
    .replace(/\_\_+/g, '_') // Replace multiple _ with single _
}

export const slugifyContent = (text) => {
  return text
    .toString() // Cast to string
    .toLowerCase() // Convert the string to lowercase letters
    .normalize('NFD') // The normalize() method returns the Unicode Normalization Form of a given string.
    .trimStart() // Remove whitespace from both sides of a string
    .replace(/\s+/g, '_') // Replace spaces with -
    .replace(/[^\w\-]+/g, '-') // Remove all non-word chars
    .replace(/\_+/g, '-') // Replace  - with single _
    .replace(/\-\-+/g, '-') // Replace multiple _ with single _
}

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) {
    return '0 Bytes'
  }

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
