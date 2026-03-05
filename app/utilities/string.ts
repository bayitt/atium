export const capitalize = (param: string) => {
  const paramSplits = param
    .split(' ')
    .map((paramSlice) => paramSlice.charAt(0).toUpperCase() + paramSlice.slice(1).toLowerCase())
  return paramSplits.join(' ')
}

export const generateRandomString = (length: string): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let stringValue = '#'

  for (let i = 1; i < 8; i++) {
    stringValue = stringValue + characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return stringValue
}
