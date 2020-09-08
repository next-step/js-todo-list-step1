const toDoForm = document.querySelector(".toDojs");
const toDoInput = toDoForm.querySelector(".new-todo");
const toDolist = document.querySelector(".todo-list");
const toDofilters = document.querySelector(".filters");
let toDocountNum = 0;
const TODOS_LS = "toDos";
let toDos = [];


function saveToDo() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function OUT(closestLi){
    closestLi.classList.remove("editing");
}
function edited(text, li){
    const label = li.querySelector(".label");
    removetoDosObj(label.innerText);
    label.innerText = text;
    li.classList.remove("editing");
    if(li.className === "completed"){
        PushToDos(text,"checked");
    }
    else{
        PushToDos(text,"unchecked");
    }
    saveToDo();
}
function count(Num){
    const toDocount = document.querySelector(".todo-count");
    const toDoNum = toDocount.querySelector("strong");
    toDoNum.innerHTML = Num;
} 
function handlekeyup(event){
    const target = event.target;
    const closestInput = target.closest("input");
    const closestLi = target.closest("li");
    
    if ( event.key === "Enter"){
        edited(closestInput.value, closestLi);
    }
    else if(event.key === "Escape"){
        OUT(closestLi);
    }
}
function removetoDosObj(text){
    const finditem = toDos.find(function(item){
        return item.text === text
    });
    toDos.splice(toDos.indexOf(finditem),1);
    saveToDo();
}
function editing(closestLi){
    if( closestLi.classList.contains ("editing"))        
        closestLi.classList.remove("editing");    
    else{
        closestLi.classList.add("editing");
    }
}
function handledbclick(event){
    const target = event.target;
    const closestLi = target.closest("li");
    editing(closestLi);
  
}
function completed(closestLi){
      if( closestLi.classList.contains("completed"))        
        closestLi.classList.remove("completed");
      else{
          closestLi.classList.add("completed");
        }
}     
function deleteTodoItem  (closestLi){
    const textlabel = closestLi.querySelector(".label");
    closestLi.remove();
    removetoDosObj(textlabel.innerText);
    toDocountNum = toDolist.childElementCount;
    count(toDocountNum);
}

function PushToDos(text,check){
    const toDosObj = { 
        text : text, 
        check : check 
    };
    toDos.push(toDosObj);
console.log(toDos);

}
function Detecting(list,val){
    
    if(val==="active"){
        if(list.classList.contains("completed")){
            list.classList.add("hidden");
        }
        else{
            list.classList.remove("hidden");
        }
            return list;
    }
    
    else if(val==="completed"){
        if(list.classList.contains("completed")){
            list.classList.remove("hidden");
        }
        else{
            list.classList.add("hidden");
        }
            return list;
    }

    if(val==="all"){
        if(list.classList.contains("hidden")){
            list.classList.remove("hidden");
        }
        return list;
    }   
}
function active(){
    const list = toDolist.getElementsByTagName("li");
    for(let i=0; i<toDocountNum; i++) {
        Detecting(list[i],"active");
    }
}
function completeAll(){
    const list = toDolist.getElementsByTagName("li");
    for(let i=0; i<toDocountNum; i++) {
        Detecting(list[i],"completed");
    }
}
function All(){
    const list = toDolist.getElementsByTagName("li");
    for(let i=0; i<toDocountNum; i++) {
        Detecting(list[i],"all");
    }
}
 function handleclick(event){
    const target = event.target;
    const closestLi = target.closest("li");
    if ( target.className === "destroy"){
        deletebtn(closestLi);
    }
    else if(target.className === "toggle"){
        completed(closestLi);
    }
    else if(target.className === "active"){
        active();
    }
    else if(target.className === "completed"){
        completeAll();
    }
    else if(target.className === "all selected"){
        All();
    }
    
}
function paintToDo(text,val){
   return `
   <li class=${val}>
     <div class="view">
       <input class="toggle" type="checkbox"/>
       <label class="label">${text}</label>
       <button class="destroy"></button>
     </div>
     <input class="edit" value="${text}"/>
   </li>
 `;
}

function handleSumit(event) {
    // event.preventDefault();
    toDolist.insertAdjacentHTML("beforeend", paintToDo(toDoInput.value,""));
    PushToDos(toDoInput.value,"unchecked");
    saveToDo();
    toDocountNum = toDolist.childElementCount;
    count(toDocountNum);
    toDoInput.value="";
}
function loadToDos() {
    const loadedToDos =localStorage.getItem(TODOS_LS);
    if(toDos !== null){
    const parsedToDos  = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo)
    {
        if(toDo.check==="checked"){
            toDolist.insertAdjacentHTML("beforeend", paintToDo(toDo.text,"completed"))
                
        }
        else{
            toDolist.insertAdjacentHTML("beforeend", paintToDo(toDo.text,""));
        }
        PushToDos(toDo.text,toDo.check); 
    });
    const liComplete = toDolist.querySelectorAll(".completed");
 
    for(let i=0; i<liComplete.length; i++){
    let completeToggle = liComplete[i].querySelector(".toggle");
        completeToggle.checked = true; 
    }
    }
}
function init(){  
    loadToDos();
    toDocountNum = toDolist.childElementCount;
    count(toDocountNum);
    toDoForm.addEventListener("submit", handleSumit);
    toDolist.addEventListener("click",handleclick);
    toDolist.addEventListener("dblclick",handledbclick);
    toDolist.addEventListener("keyup",handlekeyup);
    toDofilters.addEventListener("click",handleclick);
}
init();


