export default class TodoFilters {
  constructor({
    data, $target, $targetTodoList, onClickFilter
  }){
    this.data = data
    this.$target = $target
    this.$targetTodoList = $targetTodoList

    this.$target.addEventListener('click', (e) => {
      const $targetClassName = e.target.classList[0];
      const filterDOMList = this.$target.querySelectorAll("li a")
      filterDOMList.forEach(val => {
        val.classList.remove('selected')
      })
      switch ($targetClassName){
        case "all":
          onClickFilter('undefined')
          e.target.classList.add("selected")
          break;
        case "active":
          console.log("active")
          onClickFilter('true')
          e.target.classList.add("selected")

          break;
        case "completed":
          onClickFilter('false')
          e.target.classList.add("selected")
          break;
        default:
          console.log("NO MATCH FILTER")
          break;
      }
    })
  }

  setState(filteredData){
    this.data = filteredData
    this.render()
  }
}
