function TodoItem(title, nextId){
    return {
        id: nextId,
        title: title,
        type: "active"
    }
};

export default TodoItem;