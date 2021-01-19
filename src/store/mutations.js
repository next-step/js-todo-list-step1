import {saveToDos} from './localStorage.js'

const TODOS_LIST = 'todoList';

export default {
    addToDo(state, payload){
        state.items.push(payload);
        saveToDos(TODOS_LIST, state.items);
        return state;
    },
    destroyToDo(state, payload){
        state.items.splice(payload-1, 1); //인덱스 배열 삭제
        saveToDos(TODOS_LIST, state.items);
        return state;
    },
    toggleToDo(state, payload){
        payload.completed = !payload.completed; //토글
        state.items.splice(payload.id-1, 1, payload);
        saveToDos(TODOS_LIST, state.items);
        return state;
    },
    editToDo(state, payload){
        state.items.splice(payload.id-1, 1, payload);
        saveToDos(TODOS_LIST, state.items);
        return state;
    },
    setFilterType(state, payload){
        state.filterType=payload;
    },
}