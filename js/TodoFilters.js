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
          e.target.classList.add("selected")
          break;
        case "active":
          e.target.classList.add("selected")

          break;
        case "completed":
          e.target.classList.add("selected")
          break;
        default:
          console.log("NO MATCH FILTER")
          break;
      }
      onClickFilter()
    })
  }

  setState(filteredData){
    this.data = filteredData
  }
}
