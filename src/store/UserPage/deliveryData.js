export default {
    state:{
        deliveryData:[]
    },
    getters:{
        getDeliveryData(state){
            return state.deliveryData
        }
    },
    mutations:{
        SET_DELIVERYDATA(state,deliveryData){
            state.deliveryData=deliveryData
        }
    },
    actions: {
        setDeliveryData({commit},deliveryData){
            commit('SET_DELIVERYDATA', deliveryData)
        },
    }
}