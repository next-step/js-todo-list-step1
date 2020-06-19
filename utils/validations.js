export const checkSelector = (selector) => {
  const target = document.querySelector(selector)
  console.log(target)
  if(!target) throw new Error('Not Found Element')
}
