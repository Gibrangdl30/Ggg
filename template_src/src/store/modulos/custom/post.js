import axios from 'axios';
const moment = require('moment');
const storage1 = 'storage1';
const comision = 0;

const initialState = {
    posts:{a:[]},
    privados:{a:[]},
    favoritos:{a:[]},
    misposts:{a:[]},
    mispaparatz:{a:[]},
    misclientes:{a:[]},
    fa:{a:[]},
    post: null,
    paparatz: null,
    msn: null,

    user_equipo:null,
    user_rival1:null,
    user_rival2:null,
    campo: null,
};

const state=JSON.parse(JSON.stringify(initialState));
const getters={   
    postStateArray:(state)=>(obj)=>{return state[obj].a},
    postStateObject:(state)=>(obj)=>{return state[obj]},
    postStateFind:(state)=>(obj,data)=>{return state[obj].a.find(a=>{return a.id == state[data]})},
    postStateFindKey:(state)=>(obj,data,key)=>{return state[obj].a.find(a=>{return a[key] == state[data]})},
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
        if('misposts' in data){
            state.misposts = { a: data.misposts };
        }
        if('mispaparatz' in data){
            state.mispaparatz = { a: data.mispaparatz };
        }
        if('misclientes' in data){
            state.misclientes = { a: data.misclientes };
        }
    },
    
    setPostState(state,[campo,id]){
        console.log("SET SATTE", campo, id);
        state[campo] = id;
    },
  
};

const actions={

    postPostCrearPost({ commit, state }, [ form, callback = null]){
        let data = {
            form,
        };
        let finish = ()=>{
            if(callback){
                callback();
            }
        }
        let load = { 
            url: 'posts/crear_post', 
            data: data,
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

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

    postPostSaveMensaje({ commit, state }, [ mensaje ]){
        let data = {
            mensaje,
        };
        let finish = ()=>{};

        let load = {
            url: 'datos/save_mensaje',
            data: data,
            back: 1,
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
    
    postBorrarPost({ commit, state }, [ post ]){
        let data = {
            post: post,
        };
        let finish = ()=>{}
        let load = {
            url: 'posts/borrar_post',
            data: data,
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