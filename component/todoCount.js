export const todoCountEl = document.querySelector(".todo-count");
export const countContainerEl = document.querySelector(".count-container");

export const handleCount=(length)=>{
    todoCountEl.innerHTML = `총 <strong>${length}</strong> 개`
}


