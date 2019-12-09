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
            localStorage.setItem('token', token);
        })
        .catch(err=>console.log(err))
    },
    setAuth({commit}, req){
        let token;
        if(req){
            token = Cookies.get('token');
        }else{
            token = localStorage.getItem('token');
        }
        if(token){
            return axios.get("https://pushbots-fend-challenge.herokuapp.com/api/me",{
                headers:{
                    Authorization: 'Bearer ' + token
                }
            })
            .then(res=>{
                const user = res.data;
                if(token && user){
                    commit('setAuthData', {
                        token: token,
                        user: user
                    });
                }
            }).catch(err=>console.log(err));
        }
    },
    logout({commit}){
        Cookies.remove('token');
        Cookies.remove('user');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return commit("unsetAuthData");
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
