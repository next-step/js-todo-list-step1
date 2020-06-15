export default class TodoCount {
  constructor({
    data, $target, targetTodoFilters
  }){
    this.data = data
    this.$target = $target
    this.targetTodoFilters = targetTodoFilters

    this.render()
  }
  setState(nextData){
    this.data = nextData
    this.render()
  }
  render(){
    const renderedHTML = this.data && this.data.length
    this.$target.innerHTML = `총 <strong>${renderedHTML}</strong> 개`
  }
}