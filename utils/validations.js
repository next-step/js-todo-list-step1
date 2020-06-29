export const checkSelector = (selector) => {
  const target = document.querySelector(selector)
  if(!target) throw new Error('Not Found Element')
}
