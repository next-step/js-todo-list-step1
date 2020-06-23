import {checkSelector} from "../utils/validations.js"
import { ALL, ACTIVE, COMPLETED} from "../utils/constants.js"

function getStatus(className) {
  switch(className) {
    case 'all selected':
      return ALL
    case 'active':
      return ACTIVE
    case 'completed':
      return COMPLETED
    default:
      throw new Error('Unhandled Case')
  }
}

export default function TodoFilter({ selector, onFilter }){
  if (new.target !== TodoFilter) {
    return new TodoFilter({ selector, onFilter })
  }
  checkSelector(selector)

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.bindEvent()
  }

  this.bindEvent = () => {
    this.$target.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'a') {
        e.preventDefault()
        onFilter(getStatus(e.target.className))
      }
    })
  }

  this.init()
}
