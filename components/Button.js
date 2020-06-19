export default function Button(props){
  if (new.target !== Button) return new Button(props)
  const { $target, className, text, callback } = props
  // 렌더링 시점 때문에 selector가 아닌 $target을 받음.

  this.init = () => {
    const $button = document.createElement('li')
    $button.addEventListener('click', callback) // event binding

    const $anchor = document.createElement('a')
    $anchor.className = className
    $anchor.innerHTML = text
    $anchor.href = '#'

    $button.appendChild($anchor)
    $target.appendChild($button)
  }
  this.init()
}
