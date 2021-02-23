export default function ItemDestroy({id, removeTodo}) {
    this.element = document.createElement("span");
    this.element.classList.add("destroy");
    this.element.textContent = '삭제';
}

ItemDestroy.prototype.render = function(){
    return this.element;
}