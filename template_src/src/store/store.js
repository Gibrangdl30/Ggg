import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import swal from 'sweetalert';
import _ from 'lodash';
const moment = require('moment');

//  GENERALES
import apirtc from './modulos/generales/apirtc.js';
import data from './modulos/generales/data.js';
import camara from './modulos/generales/camara.js';
import carrito from './modulos/generales/carrito.js';
import catalogos from './modulos/generales/catalogos.js';
import chats from './modulos/generales/chats.js';
import escaner from './modulos/generales/escaner.js';
import fileunpload from './modulos/generales/fileunpload.js';
import maps from './modulos/generales/maps.js';
import navigation from './modulos/generales/navigation.js';
import notificaciones from './modulos/generales/notificaciones.js';
import provider from './modulos/generales/provider.js';
import servicio from './modulos/generales/servicio.js';
import session from './modulos/generales/session.js';
import sync from './modulos/generales/sync.js';
import usuario from './modulos/generales/usuario.js';

Vue.use(Vuex);
const general = {
    apirtc,
    data,
    camara,
    carrito,
    catalogos,
    chats,
    escaner,
    fileunpload,
    maps,
    navigation,
    notificaciones,
    provider,
    servicio,
    session,
    sync,
    usuario,
};

//custom
import coordinador from './modulos/custom/coordinador.js';
import post from './modulos/custom/post.js';
import viaje from './modulos/custom/viaje.js';
import restaurantes from './modulos/custom/restaurantes.js';
const custom = {
    post,
    coordinador,
    viaje,
    restaurantes,
};

const modules = {
    ...general,
    ...custom,
}


const state = {
    base:   { 
        url:    "https://mexicolimited.com/apiv1/api/",
        img:    "https://mexicolimited.com/apiv1/img/",
        iconos: "https://mexicolimited.com/apiv1/iconos/",
    },

    procesando: false,
    api: '3'
};
const getters = {
    baseUrl(state){return state.base.url;},
    baseImg(state){return state.base.img;},
    baseIconos(state){return state.base.iconos;},
    ready(state){return !state.procesando;},
    getArrayFotos:()=>(fotos)=>{
        let a = [];
        fotos.forEach(f=>{if(!f.id && f.url) a.push(f.url)});
        return a;
    },
    formatImagenesToArray:()=>(imagenes)=>{
        let a = [];
        imagenes.forEach(i=>{ a.push({id: i.id, url:i.imagenes_id})});
        a = a.concat(Array(4-a.length).fill({url:null}));
        return a;
    },
};
const mutations = {
    procesando(){state.procesando = true;},
    stop(){state.procesando = false;},
    initLoader(){this.commit('openModal',['loader']);},
    finishLoader(){this.commit('closeModal',['loader']);},
};
const actions = {
    
    postPromise({state}, [url, data, loader = false]){
        try{
            if(loader)this.commit('openModal',['loader']);
            if(this.getters.getSession.token) data.token = this.getters.getSession.token;
            return new Promise((resolve, reject) => {
                axios.post(state.base.url + url, data,  
                    { headers: { 'content-type' : 'text/plain' }, timeout: 500000 }).then(
                        response=>{
                            if(!response.data.status){
                                if(response.data.msg != 'Usuario inexistente') swal(response.data.msg, "", "error");
                                reject(response.data);
                                this.commit('closeModal',['loader']);
                                return;
                            }
                            resolve(response.data);
                        }).catch(error => {
                            swal("","Hubo un error de red, por favor verifique su conexión", "error");
                            reject(error);
                            this.commit('closeModal',['loader']);
                        }).finally( () => {
                            // console.log("Finally");
                        });
                    });
        }
        catch (e){
            console.error("ERROR",e);
            this.commit('closeModal',['loader']);
        }
    },
    
    //POMESA CON LOADER
    postPromiseLoader({state}, [url, data]){
        try{
            this.commit('openModal',['loader']);
            if(this.getters.getSession.token) data.token = this.getters.getSession.token;
            return new Promise((resolve, reject) => {
                axios.post(state.base.url + url, data,  
                    { headers: { 'content-type' : 'text/plain' }, timeout: 5000000 }).then(
                        response=>{
                            this.commit('closeModal',['loader']);
                            if(!response.data.status){
                                if(response.data.msg == 'Usuario no encontrado' || response.data.msg == 'Usuario o contraseña incorrecta') {
                                    swal({title: response.data.msg, text:"", icon:"error", button: 'Reintentar'});
                                }
                                else if(response.data.msg != 'Usuario inexistente') {
                                    swal(response.data.msg, "", "error");
                                }
                                reject(response.data);
                                return;
                            }
                            resolve(response.data);
                        },
                        err=>{
                            this.dispatch('synchronizeData');
                            this.commit('closeModal',['loader']);
                            swal("","Hubo un error de red, por favor verifique su conexión", "error");
                            reject(err);
                        });
                    });
        }
        catch (e){
            this.dispatch('synchronizeData');
            this.commit('closeModal',['loader']);
            console.error("ERROR",e);
        }
    },
    postPromiseLoaderImage({state}, [url, data, foto]){
        try{
            this.commit('openModal',['loader']);
            if(this.getters.getSession.token) data.token = this.getters.getSession.token;
            return new Promise((resolve, reject) => {
                this.dispatch('unploadImage',[data,foto,url]).then(
                    response => {
                        this.commit('finishLoader');
                        resolve(response);
                        this.dispatch('synchronizeData');
                    },
                    error=>{
                        this.dispatch('synchronizeData');
                        this.commit('finishLoader');
                        reject(error);
                    });
            });
        }
        catch (e){
            this.commit('closeModal',['loader']);
            console.error("ERROR",e);
        }
    },

    postPromiseLoaderSync({state}, [url, data, alerta = true]){
        try{
            this.commit('openModal',['loader']);
            if(this.getters.getSession.token) {
                data.token = this.getters.getSession.token;
            }
            return new Promise((resolve, reject) =>{
                axios.post(state.base.url + url, data, { headers: { 'content-type' : 'text/plain' }, timeout: 5000000 }).then(
                        response=>{   
                            if(!response.data.status){
                                swal(response.data.msg, "", "error");
                                reject(response.data);
                                this.commit('closeModal',['loader']);
                                return;
                            }
                            let respuesta = response.data;
                            this.dispatch('postPromiseNoError',['sync/get',{}]).then(
                                res=>{
                                    this.commit('setData', [res.data]);
                                    this.commit('closeModal',['loader']);
                                    if(alerta){
                                        swal(respuesta.msg, "", "success");
                                    }
                                    resolve(respuesta);
                                },
                                er=>{
                                    this.dispatch('postGetSync');
                                    this.commit('closeModal',['loader']);
                                    if(alerta){
                                        swal(respuesta.msg, "", "success");
                                    }
                                    resolve(respuesta);
                                });
                        },
                        err=>{
                            this.commit('closeModal',['loader']);
                            swal("","Hubo un error de red, por favor verifique su conexión", "error");
                            reject(err);
                        });
                    }).catch(ee=>{
                        reject(ee);
                        this.commit('closeModal',['loader']);
                    });
        }
        catch (e){
            console.error("ERROR",e);
        }
    },
    //PROMESA SIN ERROR
    postPromiseNoError({state}, [url, data]){
        if(this.getters.getSession.token) data.token = this.getters.getSession.token;
        return new Promise((resolve, reject) =>
        {
            axios.post(state.base.url + url, data,  
                { headers: { 'content-type' : 'text/plain' }, timeout: 5000000 }).then(
                response=>{   
                    if(!response.data.status){
                        reject(response.data);
                        return;
                    }
                    resolve(response.data);
                },
                err=>{
                    reject(err);
                });
        });
    },
};

export const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules,   
});