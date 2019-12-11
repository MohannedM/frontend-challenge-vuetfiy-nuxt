import axios from 'axios'
import * as Cookies from 'js-cookie'

const state = {
    token: null,
    user: {
      id: null,
      email: null,
      name: null,
      avatar: null,
      plan: null,
      totalApps: null,
      totalDevices: null
    }
}

const getters = {
    userData(state){
        return state.user;
    },
    userToken(state){
        return state.token;
    },
    isAuth(state){
        return state.token !== null;
    }
}

const mutations = {
    setAuthData(state, authData){
        state.token = authData.token;
        state.user = authData.user;
    },
    unsetAuthData(state){
        state.token = null;
        state.user.id = null;
        state.user.email = null;
        state.user.name = null;
        state.user.avatar = null;
        state.user.plan = null;
        state.user.totalApps = null;
        state.user.totalDevices = null;
    }
}

const actions = {
    login({commit}, authData){
        return axios.post("https://pushbots-fend-challenge.herokuapp.com/login",{
            email: authData.email,
            password: authData.password
        })
        .then(res=>{
            const token = res.data.token;
            const user = res.data.user;
            commit('setAuthData', {
                token: token,
                user: user
            });
            Cookies.set('token', token);
        })
        .catch(err=>{
            return Promise.reject(err);
        })
    },
    logout({commit}){
        Cookies.remove('token');
        Cookies.remove('user');
        return commit("unsetAuthData");
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
