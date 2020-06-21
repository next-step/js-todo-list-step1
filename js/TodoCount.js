function TodoCount($todoCount, data){
    this.$todoCount = $todoCount
    this.count = data.length
    
    this.updateCount = (data) => {
        this.count = data.length
        this.render()
    }

    this.render = () => {
        this.$todoCount.innerHTML = `총 <strong>${this.count}</strong> 개`
    }

    this.render();
}