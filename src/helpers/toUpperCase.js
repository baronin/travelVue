export const toUpperCase = (cityToUpperCase) => {
  let letterToUpperCaseAfterSlash = cityToUpperCase
    .split(' ')
    .map((elemnt) => elemnt.charAt(0) + elemnt.slice(1).toLowerCase())
    .join(' ')
  return letterToUpperCaseAfterSlash
    .split('/')
    .map((elemnt) => elemnt.charAt(0).toUpperCase() + elemnt.slice(1))
    .join('/')
}
