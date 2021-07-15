import axios from 'axios';
import swal from 'sweetalert';
const moment = require('moment');

const initialState = {
    grados: {a:[]},
    grupos: {a:[]},
    recolecciones: {a:[]},
    grado: null,
    grupo: null,
    alumno: null,
    usuario: null,
};

const state=JSON.parse(JSON.stringify(initialState));
const getters={   
    coorObject:(state)=>(obj)=>{return state[obj]},
    coorArray:(state)=>(obj)=>{return state[obj].a},
    coorFind:(state)=>(obj,data)=>{return state[obj].a.find(a=>{return a.id == state[data]})},
    coorFindInside:(state)=>(obj,data,key,id)=>{return state[obj].a.find(a=>{return a.id == state[data]})[key].find(x=>{return x.id == state[id]})},
};
const mutations={
    setCoorState(state,[key,data]){
        state[key] = data;
    },

    initCoorState(state,data){
        if(data.grados){
            state.grados = {a: data.grados};
        }
        if(data.grupos){
            state.grupos = {a: data.grupos};
        }
        if(data.recolecciones){
            state.recolecciones = {a: data.recolecciones};
        }
    },
    
};

const actions={
    userPostAccesoTercero({ commit, state }, [ form ]){
        let data = {
            form: form,
        };
        let finish = ()=>{
        }
        let load = { 
            url: 'datos/guardar_acceso', 
            data: data, 
            back: true,
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    coorPostEntregarHijos({ commit, state }, [ form, usuarios ]){
        let data = {
            form: form,
            usuarios: usuarios,
        };
        let finish = ()=>{
        }
        let load = { 
            url: 'servicios/entrega_hijos', 
            data: data, 
            back: false,
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