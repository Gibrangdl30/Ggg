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
    notShow:[],

    tel: null,
    tipo: null,
    init: initS('nameeSlot1') || false,
    
    formPost:{
        imagen: null,
        para_id: null,
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
        if('notShow' in data){
           state.notShow = data.notShow;
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

    userReportPost({ commit, state }, [ post ]){
        let data = {
            post,
        };

        let finish = (res)=>{
           
        };

        let load = { 
            url: 'datos/reportar_post', 
            data: data,
            alert: 0,
        };

        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    postAddFavorito({ commit, state }, form){
        let data = {
            data: form,
        };

        let finish = (res)=>{
            this.dispatch('synchronizeData');
            swal({
                title:"Inmueble agregado a tus favoritos",
                text:"",
                icon:"success",
                button: 'Entendido',
            });
        };

        this.dispatch('postPromiseLoader', ['datos/add_favorito', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    userGetImg({ commit, state }, [ imagen ]){
        let data = {
            imagen,
        };

        let finish = (res)=>{
            console.log("RES RES", res.data.imagen );
            if(res.data && res.data.imagen){
                this.dispatch('saveGallery', res.data);
            }
        };

        let load = { 
            url: 'chats/get_img', 
            data: data,
            alert: 0,
        };
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    userSaveContacs({ commit, state }, [ contactos ]){
        let data = {
            contactos: contactos,
        };

        let finish = (res)=>{};

        let callback = (res)=>{}

        let load = { 
            url: 'usuarios/save_contactos',
            data: data,
            errorMsg:false,
            loader:false,
            alert:false,
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    userPostRegistoTelefono({ commit, state }, [ form, tipo = 'registro' ]){
        let data = {
            form: form,
        };

        let finish = (res)=>{
           
        }

        let callback = (res)=>{
            console.log("RES DATA", res.data);
            this.commit('setUsD',['tel', form.tel]);
            this.commit('setUsD',['tipo', tipo]);
            console.log("NAVEGAR AL REGISTRO");
            this.getters.getRouter.navigate('/registro_code');
            
            // this.commit('setToken', res.data)
            // this.commit('changeView', 'usuario');
        }

        let load = { 
            url: tipo=='login'?'usuarios/login_telefono':'usuarios/registrar_telefono', 
            data: data,
            alert:false,
            callback: callback,
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
            console.log("---------> cambiar vista");
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
            back: !form.cal?1:0,
            toBack: '/inicio',
            alert:1,
            customSwal:{
                title: '',
                text: 'res',
                button: 'entendido',
                icon: 'success'
            },
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    userPostBorrarPost({ commit, state }, [ form ]){
        let data = {
            form,
        };
        let finish = ()=>{

        }
        let load = { 
            url: 'servicios/crear_post', 
            data: data,
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    userPostBorrarVariosPost({ commit, state }, [ posts ]){
        let data = {
            posts,
        };
        let finish = ()=>{

        }
        let load = { 
            url: 'servicios/borrar_post', 
            data: data,
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    userPostRequestFoto({ commit, state }, [ usuarios ]){
        let data = {
            usuarios: usuarios,
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
    
    userleaveGroup({ commit, state }, [ grupo ]){
        let data = {
            grupo,
        };

        let finish = (res)=>{
        };

        let load = { 
            url: 'chats/dejar_grupo', 
            data: data,
            alert: true,
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