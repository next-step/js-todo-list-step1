export default {
    addToDo(state, payload){
        state.items.push(payload);
        return state;
    },
    destroyToDo(state, payload){
        state.items.splice(payload-1, 1); //인덱스 배열 삭제
        return state;
    },
    toggleToDo(state, payload){
        payload.completed = !payload.completed; //토글
        state.items.splice(payload.id-1, 1, payload);
        return state;
    },
    editToDo(state, payload){
        state.items.splice(payload.id-1, 1, payload);
        return state;
    }
}