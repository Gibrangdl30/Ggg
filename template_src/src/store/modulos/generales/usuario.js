import axios from 'axios';
import swal from 'sweetalert';
const moment = require('moment')

const comision = 0;
const lastStorage = 'lastStorage';

const initialState = {

    eventos: {a:[]},
    usuarios: {a:[]},
    hijos: {a:[]},
    reportes: {a:[]},
    rutas: {a:[]},
    faltas: {a:[]},
    recolecciones: {a:[]},
    rondas: {a:[]},
    padres: {a:[]},
    
    detalle: null,
    tipo: 'r',
    
    padresForm: {a:[]},
};
    
const state=JSON.parse(JSON.stringify(initialState));

const getters={   
    userStateArray:(state)=>(obj)=>{return state[obj].a},
    userStateObject:(state)=>(obj)=>{return state[obj]},
    userStateDetalle:(state)=>(obj)=>{return state[obj].a.find(a=>{return a.id == state.detalle})},
    userStateFind:(state)=>(obj, campo)=>{return state[obj].a.find(a=>{return a.id == state[campo]})},
    userStateFindField:(state)=>(obj,id,campo)=>{return state[obj].a.find(a=>{return a[id] == state[campo]})},
    userStateFindInside:(state)=>(obj,data,key,id)=>{return state[obj].a.find(a=>{return a.id == state[data]})[key].find(x=>{return x.id == state[id]})},
};

const mutations={
    setUsuarioData(state,[campo,id]){
        state[campo] = id;
    },

    setUsD(state,[campo,id]){
        state[campo] = id;
    },

    setUsuarioDataForm(state,[form,campo,id]){
        state[form][campo] = id;
        state[form] = JSON.parse(JSON.stringify(state[form]));
    },

    cleanForm(state){
        state.nuevoEventoForm = JSON.parse(JSON.stringify(initialState.nuevoEventoForm));
        state.usuariosForm = {a:[]};
        state.regalosForm = {a:[]};
        state.listaRegalosForm = {a:[]};
    },

    addUser(state,usuario){
        let x = state.padresForm.a.findIndex(x=>{return x.id == usuario.id});
        if(x == -1){
            state.padresForm.a.push(usuario);
        }
        state.padresForm = {a: JSON.parse(JSON.stringify(state.padresForm.a)) };
    },

    removeUser(state,id){
        let x = state.padresForm.a.findIndex(x=>{return x.id == id});
        if(x != -1){
            state.padresForm.a.splice(x,1);
        }
        state.padresForm = {a: JSON.parse(JSON.stringify(state.padresForm.a)) };
    },

    addConcepto(state,regalo){
        state.listaRegalosForm.a.push(regalo);
        state.listaRegalosForm = {a: JSON.parse(JSON.stringify(state.listaRegalosForm.a)) };
    },

    removeConcepto(state,index){
        state.listaRegalosForm.a.splice(index,1);
        state.listaRegalosForm = {a: JSON.parse(JSON.stringify(state.listaRegalosForm.a)) };
    },

    removeRegalo(state,id){
        let x = state.regalosForm.a.findIndex(x=>{return x.id == id});
        if(x != -1){
            state.regalosForm.a.splice(x,1);
        }
        state.regalosForm = {a: JSON.parse(JSON.stringify(state.regalosForm.a)) };
    },

    setUsuarioInfo(state,data){
        if(data.eventos){
           state.eventos = {a: data.eventos};
        }
        if(data.usuarios){
           state.usuarios = {a: data.usuarios};
        }
        if(data.hijos){
           state.hijos = {a: data.hijos};
        }
        if(data.reportes){
           state.reportes = {a: data.reportes};
        }
        if(data.faltas){
           state.faltas = {a: data.faltas};
        }
        if(data.recolecciones){
           state.recolecciones = {a: data.recolecciones};
        }
        if(data.rutas){
           state.rutas = {a: data.rutas};
        }
        if(data.rondas){
           state.rondas = {a: data.rondas};
        }
        if(data.padres){
           state.padres = {a: data.padres};
        }
    },
};

const actions={

    userPostActulizarInvitacion({ commit, state }, [evento, status = false, persona = null, invitacion = {}]){
        let data = {
            evento: evento.id,
            status: status?'aceptado':'rechazado',
            persona: persona,
            invitacion: invitacion,
        };

        let finish = ()=>{

        }

        let load = { 
            url: 'datos/actulizar_invitacion_evento', 
            data: data, 
            back: false,
            backTo: '/eventos',
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    userPostActulizarLectura({ commit, state }, [ form ]){
        let data = {
            id: form.id,
        };
        let finish = ()=>{

        }
        let load = { 
            url: 'datos/actulizar_lectura', 
            data: data, 
            errorMsg: false,
            loader: false,
            alert: false,
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    userPostEnviarFalta({ commit, state }, [form, usuarios]){
        let data = {
            form: form,
            usuarios: usuarios,
        };
        let finish = ()=>{
            
        }
        let load = { 
            url: 'datos/guardar_falta', 
            data: data, 
            back: true,
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    userPostDelFalta({ commit, state }, [form, usuarios = []]){
        let data = {
            form: form,
            usuarios: usuarios,
        };
        let finish = ()=>{
            
        }
        let load = { 
            url: 'datos/eliminar_falta', 
            data: data, 
            back: false,
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    userPostEnviarPersona({ commit, state }, [form, usuarios = []]){
        let data = {
            form: form,
            usuarios: usuarios,
        };
        let finish = ()=>{

        }
        let load = { 
            url: 'datos/guardar_persona', 
            data: data, 
            back: true,
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },
    
    userPostEnviarQueja({ commit, state }, [form, usuarios = []]){
        let data = {
            form: form,
            usuarios: usuarios,
        };
        let finish = ()=>{

        }
        let load = { 
            url: 'datos/guardar_queja', 
            data: data, 
            back: true,
            customSwal: {
                title: 'Queja o sugerencia enviada.',
                text:'Se tomaran en cuenta sus comentarios.',
                icon: 'success',
                button: 'Entendido',
            }
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    userPostEnviarRegistro({ commit, state }, [ form ]){
        let data = {
            form: form,
        };
        let finish = ()=>{

        }
        let load = { 
            url: 'datos/guardar_prospecto', 
            data: data, 
            back: true,
            customSwal: {
                title: '',
                text:'Información enviada',
                icon: 'success',
                button: 'Entendido',
            }
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    userPostEnviarRonda({ commit, state }, [ form, hijos, padres ]){
        let data = {
            form: form,
            hijos: hijos,
            padres: [...padres, ...[this.getters.getSession] ],
        };
        console.log("GETTERS", this.getters.getSession);
        let finish = ()=>{

        }
        let load = { 
            url: 'datos/guardar_ronda', 
            data: data, 
            back: true,
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    userPostSalirRonda({ commit, state }, [ ronda ]){
        let data = {
            ronda: ronda,
        };
        let finish = ()=>{

        }
        let load = { 
            url: 'datos/actualizar_ronda', 
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