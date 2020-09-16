export function getStorage() {
    return JSON.parse(localStorage.getItem("todoItems")) || [];
};

export function setStorage(todoItems) {
    return localStorage.setItem("todoItems", JSON.stringify(todoItems));
};

