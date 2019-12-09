import Vuex from "vuex";
import auth from "./modules/auth";
import * as Cookies from 'js-cookie'
const createStore = () => {
  return new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {
      nuxtServerInit({commit}, context){
        let token;
        token = Cookies.get('token');
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
      }
    },
    modules: {
      auth
    }
  });
};

export default createStore;