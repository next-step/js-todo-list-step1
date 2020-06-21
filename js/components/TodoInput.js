export default function TodoInput({ $target, onAddTodo }) {
  if (!(this instanceof TodoInput)) {
    throw new Error('TodoInput must be called with new')
  }

  if (!$target) {
    throw new Error('$target must be injected')
  }

  this.$target = $target

  const onKeyPressEventHandler = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      onAddTodo(e.target.value)
      e.target.value = ''
    }
  }
  this.$target.addEventListener('keypress', onKeyPressEventHandler)
}
