export default {
    addItem(state, payload){
        state.items.push(payload);
        return state;
    },
    clearItem(state, payload){
        state.items.splice(payload.index, 1); //인덱스 배열 삭제
        return state;
    },
    toggleItem(state, payload){
        console.log(payload)
        return state;
    }
}