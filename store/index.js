import Vuex from "vuex";
import axios from 'axios'
import auth from './modules/auth'
import apps from './modules/apps'
const createStore = () => {
  return new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {
      nuxtServerInit({commit}, context){
        const token = context.req.headers.cookie.split(";").find(c=>c.trim().startsWith("token=")).split("=")[1];
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
          }).catch(err=>console.log(err));
        }
    },
    modules:{
      auth,
      apps
    }
  });
};

export default createStore;
