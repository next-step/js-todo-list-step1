function TodoStorage({ loadLocalStorage }){

    this.todoStorage = [];
    this.checked = [];

    try{
        this.todoStorage = JSON.parse(localStorage.getItem("todolist"));
        this.checked = JSON.parse(localStorage.getItem("checked"));

        if(this.todoStorage == null) {
            this.todoStorage = [];
            this.checked = [];
        }
    }
    catch(exception){
        this.todoStorage = [];
        this.checked = [];
    }

    loadLocalStorage(this.todoStorage, this.checked);

    this.update = (newStorage, newChecked) => {
        this.todoStorage = [];
        this.checked = [];
        try{
            newStorage.forEach($item => {
                this.todoStorage.push($item);
            });
            newChecked.forEach($item => {
                this.checked.push($item);
            });
        }
        catch(exception){
            this.todoStorage = [];
            this.checked = [];
        }
        localStorage.setItem("todolist", JSON.stringify(this.todoStorage));
        localStorage.setItem("checked", JSON.stringify(this.checked));
    }
}