export default {
    state:{
        homeDrag: [{text: 'Сегодня', value: '', data: []},
            {text: 'Завтра', value: '', data: []},
            {text: 'Cледующий день', value: '', data: []}]
    },
    getters:{
        getHomeDrag(state){
            return state.homeDrag
        }
    },
    mutations:{
        SET_HOMEDRAG(state,homeDrag){
            state.homeDrag=homeDrag
        }
    },
    actions: {
        setHomeDrag({commit},homeDrag){
            commit('SET_HOMEDRAG', homeDrag)
        },
    }
}