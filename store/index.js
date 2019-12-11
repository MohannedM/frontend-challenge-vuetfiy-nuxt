import Vuex from "vuex";
import axios from 'axios'
import auth from './modules/auth'
const createStore = () => {
  return new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {
      nuxtServerInit({commit, dispatch}, {req}){
        let token;
        if(req){
          if(!req.headers.cookie){
            return;
          }
            const jwtCookie = req.headers.cookie.split(";").find(c => c.trim().startsWith("token="));
            if(!jwtCookie){
                return;
            }
            token = jwtCookie.split("=")[1];

          }
          if(!token){
            return;
          }
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
            }).catch(err=>{
              dispatch("logout");
              console.log(err);
            });
          }
    },
    modules:{
      auth
    }
  });
};

export default createStore;
