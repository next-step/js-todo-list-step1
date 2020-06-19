export default function TodoCount({ data, $target }) {
  if (!(this instanceof TodoCount)) {
    throw new Error('TodoCount must be called with new')
  }

  if (!$target) {
    throw new Error('$target must be injected')
  }
  this.todos = data
  this.$target = $target

  this.setState = function (nextData) {
    this.todos = nextData
    this.render()
  }

  this.render = function () {
    this.$target.innerHTML = this.todos.length
  }

  this.render()
}
