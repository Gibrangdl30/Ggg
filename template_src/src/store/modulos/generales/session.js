import axios from 'axios';
import _ from 'lodash';

const storage = 'sedestageSlotXW1';

const initialState = {
    session : JSON.parse(localStorage.getItem(storage)) || {token: null, tipo: 'usuario'},
    cuentas: {a:[]},
    metodos_pago: {a:[]},
    registro: {
        foto:       null,
        nombres:    null,
        nombre:     null,
        email:      null,
        telefono:   null,
        password:   null,
    },
    ready: 0,
    login: 0,
};

const state = JSON.parse(JSON.stringify(initialState));

const getters = {   
   getSession(state){return state.session},
   esUsuario(state){return state.session.tipo == 'usuario'},
   user(state){return state.session.tipo == 'usuario'},
   chofer(state){return state.session.tipo == 'chofer'},
   coor(state){return state.session.tipo == 'coordinador'},
   maestro(state){return state.session.tipo == 'maestro'},
   login:(state)=>{return state.login;},
   getMetodos:(state)=>{return state.metodos_pago.a;},
   getMetodoPago:(state)=>(id)=>{return state.metodos_pago.a.find(m=>{return m.id == id}) || {};},
   getFormRegistro(state){return state.registro}, 
};

const mutations = {

    setToken(state, data){
        state.session = {
            token: data.token, 
            tipo: data.tipo || 'usuario',
        };
        // console.log("TOKESN", data, state.session, this.getters.getSession);
        localStorage.setItem(storage,JSON.stringify(state.session));
    },

    setLogin(state, val){
        if(!state.ready || !val){
            state.ready = 1;
            state.login = val;
        }
    },

    setSession(state, data){
        if(data.usuario){
            state.session = data.usuario;
            // console.log("usuarios", state.session);
        }
        if(data.metodosPago){
            state.metodos_pago = {a:data.metodosPago};
            this.commit('initMetodoPago',data.metodosPago);
        }
    },

    logout(state){
        localStorage.clear();
        state.session = {token: null, tipo: 'usuario'};
        this.getters.getRouterView('login').navigate('/login',{reloadCurrent: true});
        this.commit('changeView','login');
        this.commit('cleanPush');
        this.commit('initVista');
        this.commit('logoutApirtc');
    },

    processSession(state, fn){
        if(!state.session.token){
            this.commit('openModal',['modalSession']);
            return;
        }
        fn();
    },

    processRuteSession(state, ruta){
        if(!state.session.token){
            this.commit('openModal',['modalSession']);
            return;
        }
        this.getters.getRouter.navigate(ruta);
    },
    
    setFormRegistro(state, form){state.registro = form;},
    initWatcher(state,id){state.GPSWatcher = id},
    cleanWatcher(state){
        navigator.geolocation.clearWatch(state.GPSWatcher);
        state.GPSWatcher = false
    },
    initVista(state){
        this.getters.getRouterView('usuario').navigate('/inicio',{reloadCurrent:true});
        // this.getters.getRouterView('coor').navigate('/inicio_coor',{force:true});
    }
};

const actions = {

    postRegistro({ commit, state }, form){
        this.dispatch('postPromiseLoader', ['usuarios/registro', form, true]).then(
            res => {
                this.commit('setToken', res.data);
                this.commit('setLogin', 1);
                this.dispatch('synchronizeData',true);
                this.commit('changeView', 'usuario');
                swal({
                    title:`Bienvenido ${form.nombre}`,
                    text:"",
                    icon:"success",
                    button: 'Entendido'
                });
            },error=>{});
    },

    postLogin({ commit, state }, [data, callback = null]){
         this.dispatch('postPromiseLoader', ['usuarios/login', data]).then(
            res => {


                //USUARIO NORMAL
                if(res.data.cliente == 3){
                    this.commit('setToken', res.data);
                    this.commit('setLogin', 1);
                    this.dispatch('synchronizeData', true);
                    this.commit('initVista');
                    this.commit('changeViewByTipe');
                }

                // USUARIO NO DE LA APP
                if(res.data.cliente == 2){
                    if(callback){
                        callback(res.data);
                    }
                }

                // USUARIO DE LA APP Y CREADOR
                if(res.data.cliente == 1){
                    res.data.callback = ()=>{
                        this.commit('setToken', res.data);
                        this.commit('setLogin', 1);
                        this.dispatch('synchronizeData', true);
                        this.commit('initVista');
                        this.commit('changeViewByTipe');
                    };

                    if(callback){
                        callback(res.data);
                    }
                }
            },
            error=>{});
    },

   

    postrecoverPassword({ commit, state }, [data]){
         this.dispatch('postPromiseLoader', ['usuarios/reset_password', data]).then(
            res => {
                this.dispatch('synchronizeData');
                this.getters.getRouter.back();
                swal("","Hemos enviado instrucciones a tu correo","success");
            },
            error=>{});
    },

    postChangePassword({ commit, state }, data){
         this.dispatch('postPromise', ['usuarios/edit', data]).then(
            res => {
                this.dispatch('synchronizeData');
                this.getters.getRouter.back();
                swal("",res.msg,"success");
            },
            error=>{});
    },
    postEditCuenta({ commit, state }, [data, update = false, back = true]){
        this.dispatch('postPromiseLoader', ['usuarios/edit', data]).then(
            res => {
                this.dispatch('synchronizeData');
                swal("","Datos guardados","success");
                if(back){
                    this.getters.getRouter.back();
                }
            },
            error=>{});
    },
    postSetActive({ commit, state }, active){
        let data = {
            id: this.getters.getSession.id,
            nombre: this.getters.getSession.nombre,
            email: this.getters.getSession.email,
            active: active,
        };
        this.dispatch('postPromise', ['usuarios/edit', data]).then(
            res => {
                this.dispatch('synchronizeData');
            },
            error=>{});
    },
    postAddMetodoPago({ commit, state }, data){
        data.modo = this.getters.stripeModo;
        this.dispatch('postPromiseLoader', ['metodospago/add', data]).then(
            res => {
                this.dispatch('synchronizeData');
                this.getters.getRouter.back();
                swal({title:res.msg,text:"",icon:"success", button: 'Entendido'});
            },
            error=>{});
    },
    postUpdatePrincipal({ commit, state }, data){
         this.dispatch('postPromiseLoader', ['metodospago/update_principal', data]).then(
            res => {
                this.dispatch('synchronizeData');
                // swal(res.msg,"","success");
            },
            error=>{});
    },
    postRemoveMetodoPago({ commit, state }, data){
        let form = {
            metodos_id: data.id
        };
        this.dispatch('postPromiseLoader', ['metodospago/remove', form]).then(
            res => {
                this.dispatch('synchronizeData');
                swal(res.msg,"","success");
            },
            error=>{});
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};