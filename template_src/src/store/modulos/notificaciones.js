
const initialState = {
    enable: true,
    notificacion:{},
    pushNotification:{},
    push: null,
    opciones:{
        android:{
            senderID: '80519246540',
            forceShow:false,
        },
        ios: {
            alert: true,
            sound: true,
            badge: true,
        },     
    },
    token:null,
};
const state = JSON.parse(JSON.stringify(initialState));
const getters = { 
    notificacion(state){return state.notificacion;},
    pushNotification(state){return state.pushNotification;},
};
const mutations = {
    setNotificacionesData(state, data){
        if(data.notificacion && data.notificacion.id){
            state.notificacion = data.notificacion;
            this.commit('openModal',['modalNotificacion']);
        }
        else{
            state.notificacion = {};
            if(!state.pushNotification.tipo){
                this.commit('closeModal',['modalNotificacion']);
            }
        }
    },
    setNotificacionesPush(state, notificacion){
        let info = notificacion.additionalData.payload;
        if(info.tipo == 'nuevo_mensaje'){
            state.pushNotification = info;
            if(this.getters.getRuta.url != '/mensajes_chat'){
                this.dispatch('synchronizeData');
                this.commit('openModal',['modalNotificacion']);
            }
        }
        
    },
    initPushDeviceReady(state){
        if(state.enable){
            if(this.getters.deviceready){
                if(this.getters.getSession.token){
                    console.log("VOY INICIANDO PUSH");
                    if(!state.push){
                        let init = ()=>{
                            console.log("REGISTRANDO PUSH READY");
                            state.push = PushNotification.init(state.opciones);
                            PushNotification.hasPermission(data => {
                                if (data.isEnabled) {
                                    console.log('>>>>PUSH is Enabled');
                                }
                            });
                            let processNotificacion = (data)=>{
                                this.dispatch('synchronizeData');
                                this.commit('setNotificacionesPush',data);
                            };
                            state.push.on('registration', data => {
                                state.token = data.registrationId;
                                this.dispatch('postSaveToken');
                            });
                            state.push.on('notification', data => {
                                console.log("==== NOTI RECIBIDA", data);
                                processNotificacion(data);
                            });
                        };
                        init();
                    }
                }
            }

        }
        
    },
    cleanPush(state){
        state.push = null;
    },
    goToMensajes(state){
        this.commit('cerrarNotificacionMensaje');
        this.getters.getRouter.navigate('/mensajes',{reloadCurrent:true});
    }
};
const actions = {
    
    postSaveToken({state}){
        if(this.getters.getSession.token){
            let data ={
                app_version:    '1.10.0',
                app_identifier: 'com.jocose.jocose',
                type:           'usuarios',
                type_name:      'token',
                type_id:        this.getters.getSession.token,
                device_token:   state.token,
                platform:       device.platform,
            };
            this.dispatch('postPromiseNoError', ['pushbridge/savetoken', data]).then(res => {},error=>{});
        }
    },

    postupdateNotification({state}){
        let data ={
            notificacion: state.notificacion,
        };
        this.dispatch('postPromiseNoError', ['notificaciones/read_notificacion', data]).then(
            res => {
                this.dispatch('synchronizeData');
            },error=>{
                this.dispatch('synchronizeData');
            });
    },

    postPushPrueba({state},form){
        this.dispatch('postPromise', ['sync/push_prueba', form]).then(
            res => {this.dispatch('synchronizeData');},error=>{this.dispatch('synchronizeData');});
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};

// SRT001 