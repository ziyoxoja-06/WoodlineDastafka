export default {
    state:{
        userData:[]
    },
    getters:{
        getUserData(state){
            return state.userData
        }
    },
    mutations:{
        SET_USERDATA(state,userData){
            state.userData=userData
        }
    },
    actions: {
        setUserData({commit},userData){
            commit('SET_USERDATA', userData)
        },
    }
}