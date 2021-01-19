export default {
    addToDo(context, payload){
        context.commit('addToDo', payload);
    },
    destroyToDo(context, payload){
        context.commit('destroyToDo', payload);
    },
    toggleToDo(context, payload){
        context.commit('toggleToDo', payload);
    },
    editToDo(context, payload){
        context.commit('editToDo', payload);
    },
    setFilterType(context, payload){
        context.commit('setFilterType', payload);
    }
}