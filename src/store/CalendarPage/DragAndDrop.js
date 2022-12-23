export default {
    state: {
        dragAndDrop:[]
    },
    getters: {
        getDragAndDrop(state){
            return state.dragAndDrop
        }
    },
    mutations: {
        SET_DRAGANDDROP(state,dragAndDrop){
            state.dragAndDrop=dragAndDrop
        },
    },
    actions: {
        setDragAndDrop({commit},dragAndDrop){
            commit('SET_DRAGANDDROP', dragAndDrop)
        },
    },
    modules: {
    }
}