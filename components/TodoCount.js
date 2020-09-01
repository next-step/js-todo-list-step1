import { checkSelector } from "../utils/validations.js"

export default function TodoCount({ selector, count }) {
  if (new.target !== TodoCount) {
    return new TodoCount({ selector, count })
  }
  checkSelector(selector)

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.setState(count)
  }

  this.setState = (count) => {
    this.$target.innerHTML = `총 <strong>${count}</strong> 개`
  }

  this.init()
}
