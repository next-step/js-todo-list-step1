export default {
    addItem(context, payload){
        context.commit('addItem', payload);
    },
    clearItem(context, payload){
        context.commit('clearItem', payload);
    },
    toggleItem(context, payload){
        context.commit('toggleItem', payload);
    }

}