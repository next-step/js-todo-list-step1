// class App{

    // constructor(){

    //     this.listEditor = new listEditor({
    //         addList : todo => {
    //             const $newList = document.createElement("li");
    //             $newList.innerHTML = `
    //                 <div class="view">
    //                     <input class="toggle" type="checkbox"/>
    //                     <label class="label">${todo}</label>
    //                     <button class="destroy"></button>
    //                 </div>
    //                 <input class="edit" value=${todo} />`;

    //             this.listEditor.allList.push($newList);

    //             this.setState(true);
    //         },
    //         setState : () => {
    //             this.setState();
    //         }
    //     });

    // }

    // setState () { 
    //     if(this.listEditor.state === "all"){
    //         this.listEditor.currentList = this.listEditor.allList;
    //     }
    //     else if(this.listEditor.state === "active"){
    //         this.listEditor.currentList = [];
    //         this.listEditor.allList.forEach($item => {
    //             if($item.querySelector(".toggle").checked === false){
    //                 this.listEditor.currentList.push($item);
    //             }
    //         });
    //     }
    //     else if(this.listEditor.state === "completed"){
    //         this.listEditor.currentList = [];
    //         this.listEditor.allList.forEach($item => {
    //             if($item.querySelector(".toggle").checked === true){
    //                 this.listEditor.currentList.push($item);
    //             }
    //         });
    //     }
    //     this.render();
    // }

    // render() {
    //     this.listEditor.todoList.innerHTML = ``;
    //     this.listEditor.currentList.forEach($item => {
    //         this.listEditor.todoList.appendChild($item);
    //     });

    //     document.querySelectorAll(".toggle").forEach($item => {
    //         $item.addEventListener("click", () => {
    //             if($item.checked === true){
    //                 $item.parentNode.parentNode.classList.add("completed");
    //             }
    //             else{
    //                 $item.parentNode.parentNode.classList.remove("completed");
    //             }
    //         })
    //     });

    //     document.querySelectorAll(".destroy").forEach($item => {
    //         $item.addEventListener("click", () => {
    //             let pos = -1;
    //             for(let i = 0; i < this.listEditor.allList.length; i++){
    //                 if(this.listEditor.allList[i].querySelector(".label").innerText === $item.parentNode.querySelector(".label").innerText){
    //                     pos = i; break;
    //                 }
    //             }
    //             if(pos >= 0){
    //                 this.listEditor.allList.splice(pos, 1);
    //             }
    //             this.setState();
    //         });
    //     });

    //     document.querySelectorAll(".label").forEach($item => {
    //         $item.addEventListener("dblclick", () => {
    //             $item.parentNode.parentNode.classList.add("editing");
    //             $item.parentNode.parentNode.addEventListener("keyup", e => {
    //                 if(e.key === 'Escape'){
    //                     $item.parentNode.parentNode.classList.remove("editing");
    //                 }
    //             })
    //         })
    //     });

    //     document.querySelector(".todo-count").innerHTML = 
    //         `총 <strong>${document.querySelectorAll(".label").length}</strong> 개`;
    // }

// }

new TodoApp();