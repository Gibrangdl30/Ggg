import axios from 'axios';
import swal from 'sweetalert';
const moment = require('moment')

const comision = 0;
const lastStorage = 'lastStorage';

const setS = (name,val)=>{
    localStorage.setItem(name,val);
};

const initS = (name)=>{
    return JSON.parse(localStorage.getItem(name));
};

const initialState = {
    amigos:{a:[]},
    lastrequest:{a:[]},
    request:{a:[]},
    takePhoto: false,

    tel: null,
    tipo: null,
    init: initS('nameeSlot1') || false,
    
    formPost:{
        imagen: null,
        publico: 1,
        url: null,
        usuarios: [],
    },
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
        if(campo == 'init'){
            setS('nameeSlot1', 100);
        }
    },

    setUsuarioDataForm(state,[form,campo,id]){
        state[form][campo] = id;
        state[form] = JSON.parse(JSON.stringify(state[form]));
    },

    setUsuarioInfo(state,data){
        if('amigos' in data){
           state.amigos = {a: data.amigos};
        }
        if('lastrequest' in data){
           state.lastrequest = {a: data.lastrequest};
        }
        
        if('request' in data){
           state.request = data.request;
            if(state.request.id){
                if(state.request.estatus == 'e'){
                    this.commit('openMsnTipo',{ 
                        data: state.request, 
                        tipo: 'newrequest',
                        one: true,
                        boton: 'Let´s go!',
                        fn: ()=>{

                            this.dispatch('userPostRequestLectura',[state.request]);
                        }
                    });
                }    
            }
        }
       
    },
};

const actions={

    userPostRegistoTelefono({ commit, state }, [ form, tipo = 'registro' ]){
        let data = {
            form: form,
        };

        let finish = ()=>{
            this.commit('setUsD',['tel', form.tel]);
            this.commit('setUsD',['tipo', tipo]);
            this.getters.getRouter.navigate('/registro_code');
        }

        let load = { 
            url: tipo=='login'?'usuarios/login_telefono':'usuarios/registrar_telefono', 
            data: data,
            alert:false,
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    userPostConfirmarTelefono({ commit, state }, [ form ]){
        let data = {
            form: {
                tel: state.tel,
                code: form.code,
            },
        };

        let finish = (res)=>{
        }

        let callback = (res)=>{
            this.commit('setToken', res.data);
            this.commit('changeView', 'usuario');
        }

        let load = { 
            url: 'usuarios/confirmar_telefono', 
            data: data, 
            alert: state.tipo == 'registro',
            customAlert: 'Account created succesfully',
            callback: callback,
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    userPostCrearPost({ commit, state }, [ form ]){
        let data = {
            form,
        };
        let finish = ()=>{

        }
        let load = { 
            url: 'servicios/crear_post', 
            data: data,
            back: true,
            toBack: '/inicio'
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    userPostRequestFoto({ commit, state }, [ usuario ]){
        let data = {
            usuario: usuario,
        };

        let finish = ()=>{};

        let load = { 
            url: 'datos/request_foto', 
            data: data,
            back: true,
            toBack: '/inicio',
            alert: true,
            customSwal:{
                title:  'Your request has been sent',
                text:   "Wait for the other's person answer.",
                button: 'Understood',
                icon:   'success',
            }
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    userPostRequestLectura({ commit, state }, [ request ]){
        let data = {
            request: request,
        };

        let finish = ()=>{
            this.commit('setUsD',[ 'takePhoto', true ]);
            this.commit('goToChat',[ request.usuarios_id ]);
        };

        let load = { 
            url: 'datos/request_lectura', 
            data: data,
            alert: false,
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    userPostCreateGroup({ commit, state }, [ form, usuarios ]){
        let data = {
            form: form,
            usuarios: usuarios,
        };

        let finish = (res)=>{
            if(res.data){
                console.log("RESTING DATA NAV", res, res.id);
                this.commit('setChats', res.data);
                this.commit('selectChat', res.id)
                setTimeout(()=>{
                    this.getters.getRouter.navigate('/mensajes_chat');
                }, 1000);
            }
        };

        let load = { 
            url: 'chats/create_group', 
            data: data,
            alert: false,
            back: true,
            toBack: '/chats'
        };
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