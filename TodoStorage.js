function TodoStorage(){

    this.$todoStorage = [];
    this.$checked = [];

    this.init = () => {

        this.$todoStorage = JSON.parse(localStorage.getItem("todolist"));
        this.$checked = JSON.parse(localStorage.getItem("checked"));

        if(this.$todoStorage == null) return [];

        let todoItems = [];

        for(let i = 0; i < this.$todoStorage.length; i++){
            todoItems.push(new TodoItem(this.$todoStorage[i], this.$checked[i]));
        }

        return todoItems;
    }

    this.update = myStorage => {
        this.$todoStorage = [];
        this.$checked = [];

        myStorage.forEach($item => {
            this.$todoStorage.push($item.querySelector(".label").innerText);
            this.$checked.push($item.querySelector(".toggle").checked);
        });
        localStorage.setItem("todolist", JSON.stringify(this.$todoStorage));
        localStorage.setItem("checked", JSON.stringify(this.$checked));
    }
}