import axios from 'axios';
const moment = require('moment');
const storage1 = 'storage1';
const comision = 0;

const initialState = {
    posts:{a:[]},
    privados:{a:[]},
    favoritos:{a:[]},
    fa:{a:[]},
    post: null,
};

const state=JSON.parse(JSON.stringify(initialState));
const getters={   
    postStateArray:(state)=>(obj)=>{return state[obj].a},
    postStateObject:(state)=>(obj)=>{return state[obj]},
    postStateFind:(state)=>(obj,data)=>{return state[obj].a.find(a=>{return a.id == state[data]})},
    postStateFindInside:(state)=>(obj,data,key,id)=>{return state[obj].a.find(a=>{return a.id == state[data]})[key].find(x=>{return x.id == state[id]})},
    
};
const mutations={
    initPostState(state,data){
        console.log("XXXX ======================>", 'posts' in data)
        if('posts' in data){
            state.posts = { a: data.posts };
        }
        if('privados' in data){
            state.privados = { a: data.privados };
        }
        if('favoritos' in data){
            state.favoritos = { a: data.favoritos };
        }
    },
    
    setPostState(state,[campo,id]){
        console.log("SET SATTE", state);
        state[campo] = id;
    },
  
};

const actions={

    postPostReportar({ commit, state }, [ comentario, full = true, razon = '', fn = ()=>{} ]){
        let data = {
            comentario: comentario,
            post_id: state.post,
            full: full,
            razon: razon,
        };
        let finish = ()=>{
            if(fn){
                fn();
            }
        }
        let load = { 
            url: 'servicios/reportar',
            data: data,
            alert:true,
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    postPostSaveComentario({ commit, state }, [ comentario ]){
        let data = {
            comentario: comentario,
            post_id: state.post,
        };
        let finish = ()=>{}
        let load = { 
            url: 'servicios/save_comentario',
            data: data,
            alert:false,
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    postPostSaveFav({ commit, state }, [ post ]){
        let data = {
            post: post,
        };
        let finish = ()=>{}
        let load = {
            url: 'datos/save_favorito',
            data: data,
            loader: false,
            alert: false,
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },
    
};

export default {
    state,
    getters,
    mutations,
    actions
};