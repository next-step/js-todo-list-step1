import Button from "./Button.js"

export default function TodoCount({ selector }) {
  if (new.target !== TodoCount) return new TodoCount({ selector })

  this.init = () => {
    const $counterContainerFragment = document.createDocumentFragment()
    const $counterContainerDiv = document.createElement('div')
    $counterContainerDiv.className = 'count-container'

    this.$countNode = document.createElement('span')
    this.$countNode.className = 'todo-count'
    this.render() // 완료 개수 render

    const $filterUlNode = document.createElement('ul')
    $filterUlNode.className = 'filters'

    //button create start
    const buttonInfos = [
      { $target: $filterUlNode, className: 'all selected', text: '전체보기', callback: () => {}},
      { $target: $filterUlNode, className: 'active', text: '해야할 일', callback: () => {}},
      { $target: $filterUlNode, className: 'completed', text: '완료한 일', callback: () => {}},
    ]
    buttonInfos.forEach((buttonInfo) => new Button(buttonInfo))
    //button create end
    
    $counterContainerDiv.appendChild(this.$countNode)
    $counterContainerDiv.appendChild($filterUlNode)
    
    $counterContainerFragment.appendChild($counterContainerDiv)
    const $target = document.querySelector(selector)
    $target.appendChild($counterContainerFragment)
  }
  this.render = () => {
    this.$countNode.innerHTML = `총 <strong>0</strong>개`
  }

  this.init()
}
