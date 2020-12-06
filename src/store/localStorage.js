
export const saveToDos = (key , toDos) => {
    localStorage.setItem(key, JSON.stringify(toDos))
}