import { todoStatus } from '../utils/constant.js'
import { todoClassName } from '../utils/constant.js'

export default function TodoStatus({ $target, onSetTodoStatus }) {
  if (!(this instanceof TodoStatus)) {
    throw new Error('TodoStatus must be called with new')
  }

  if (!$target) {
    throw new Error('$target must be injected')
  }
  this.$target = $target
  this.status = todoStatus.ALL

  const onClickHandler = (e) => {
    const parentNode = e.target.closest('ul')
    if (parentNode.className !== todoClassName.FILTERS) {
      return
    }

    if (e.target.classList.contains(todoClassName.ALL)) {
      this.status = todoStatus.ALL
    } else if (e.target.classList.contains(todoClassName.ACTIVE)) {
      this.status = todoStatus.ACTIVE
    } else if (e.target.classList.contains(todoClassName.COMPLETED)) {
      this.status = todoStatus.COMPLETED
    }
    onSetTodoStatus(this.status)
    this.render()
  }
  this.$target.addEventListener('click', onClickHandler)

  this.render = function () {
    this.$target
      .querySelector(`.${todoClassName.SELECTED}`)
      .classList.remove(todoClassName.SELECTED)

    switch (this.status) {
      case todoStatus.ALL:
        this.$target
          .querySelector(`.${todoClassName.ALL}`)
          .classList.add(todoClassName.SELECTED)
        break

      case todoStatus.ACTIVE:
        this.$target
          .querySelector(`.${todoClassName.ACTIVE}`)
          .classList.add(todoClassName.SELECTED)
        break

      case todoStatus.COMPLETED:
        this.$target
          .querySelector(`.${todoClassName.COMPLETED}`)
          .classList.add(todoClassName.SELECTED)
        break
    }
  }
}
