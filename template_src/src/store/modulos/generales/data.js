import axios from 'axios';
import _ from 'lodash';

const initialState = {
    
    data: {
        //GET 1
        banners: null,
        categorias: null,
        domicilios: null,
        favoritos: null,
        metodosPago: null,
        pedidos: null,
        servicioCom: null,
        stripe: null,
        usuario: null,
        usuarios: null,
        usx: null,

        //GET 2
        ceros: null,
        productos: null,
        producto: null,
        popux: null,
        popu: null,
        perderX: null,
        perder: null,
        promocionesX: null,
        promociones: null,

        //GET 3
        convenio: null,
        conveniox: null,
        declaracion: null,
        declaracionx: null,
        politica: null,
        politicax: null,
        tcondiciones: null,
        tcondicionesx: null,
        terminos: null,
        terminosx: null,
    },
    evento: null,
    instalacion: null,
    campo: null,
    fila: null,
    asiento: null,
    boletos: null,
    comunicado: null,
    id: null,

};

const state=JSON.parse(JSON.stringify(initialState));

const getters={   
    getData(state){return state},
    getInfo:(state)=>(x)=>{ return state.data[x] || [] },
    info:(state)=>(x)=>{ return state.data[x] || [] },
    infoX:(state)=>(x)=>{ return state.data[x] },
    infoObj:(state)=>(x)=>{ return state[x] },
    
    stateDataFindId:(state)=>(obj,id)=>{return state.data[obj].find(a=>{return a.id == id })},
    stateDataFindFieldId:(state)=>(obj,key,id)=>{return state.data[obj].find(a=>{return a[key] == id })},

    stateFind:(state)=>(obj,data)=>{return state[obj].find(a=>{return a.id == state[data]})},
    dataFind:(state)=>(obj,data)=>{return state.data[obj].find(a=>{return a.id == state[data]})},
    dataFindLeve1:(state)=>(obj, data, obj2, key)=>{return state.data[obj].find(a=>{return a.id == state[data]})[obj2].find(a=>{return a.id == state[key]})  },

};

const mutations={
    setStData(state,[key,value]){
        state[key] = value;
    },

    setRootData(state, data){
        // state.data = {...state.data, ...data};
        for(let s in data){
            state.data[s] = data[s];
        }
        // console.log("--------------------->>>>>>>>>>>>SET ROOT DATA", state.data);
    },

    setRootExtraData(state, data){
        // state.data = {...state.data, ...data};
        for(let s in data){
            if(s == 'popu' || s == 'promociones' || s == 'perder'){
                if(!state.data[s]){
                    state.data[s] = data[s];
                }
            }else{
                state.data[s] = data[s];
            }
            // console.log("STATE",s, state.data);
        }
        // console.log(" >>>>>>>>>>>>>>>EEEEXTRA SET ROOT DATA", data, state.data);
    },
    
    setVersion(state,data){
        if(data.version) state.version  = data.version;
    },

    initStripeData(state,data){
        if(data.stripe){
            if(data.stripe.key){
                try{
                    if(data.stripe.key.includes('live')){
                        state.modo = 'live';
                    }
                    else if(data.stripe.key.includes('test')){
                        state.modo = 'test';
                    }
                    else{
                        state.modo = 'undefined';
                    }
                    if(this.getters.deviceready){
                        cordova.plugins.stripe.setPublishableKey(data.stripe.key,
                            (res)=>{ 
                                console.log("CORRECTO STRIPE SET PUBLIC KEY",res);
                            },
                            (error) => {
                                console.error("ERROR STRIPE SET PUBLIC KEY", error);
                            });
                    }
                }catch(e){console.log("TRYE STRIPE ERROR",e);}
            }
        }
    },
    
};
const actions={

    actionEnviarContacto({ commit, state }, [ form, callback = null ]){
        let data = {
            form: form,
        };
        let finish = (res)=>{
            swal({
                title:  "Mensaje Enviado",
                // text:   "Muchas gracias por tu participación.",
                icon:   "success",
                button: "Entendido",
            });
            if(callback){
                callback(res.data.prod);
            }
        };

        let load = {
            loader: 1,
            alert: 0,
            url: 'chats/enviar_mensaje',
            data: data,
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },

    actionCalificarProd({ commit, state }, [ form, callback = null ]){
        let data = {
            form: form,
        };
        let finish = (res)=>{
            swal({
                title:  "Creador calificado",
                text:   "Muchas gracias por tu participación.",
                icon:   "success",
                button: "Entendido",
            });
            if(callback){
                callback(res.data.prod);
            }
        };

        let load = {
            loader: 1,
            alert: 0,
            url: 'fechas/calificar_empre',
            data: data,
        }
        this.dispatch('superPostLoader', load).then(
        res => {
            finish(res);
        },error=>{});
    },
    
    actionReportarProblema({ commit, state }, [ form, callback ]){
        let data = {
            form: form,
        };
        let finish = (res)=>{
            swal({
                title: "Muchas gracias",
                text: "Hemos reportado tu problema a nuestro equipo de atención al cliente.\nSi necesitas más ayuda puedes comunicarte\na ayuda@mexicolimited.com o al WhatsApp de +52 1 33 1708 5870",
                icon: "success",
                button: "Entendido",
            });
            if(callback){
                callback(res.data.prod);
            }
        };

        let load = {
            loader: 1,
            alert: 0,
            url: 'fechas/reportar_problema',
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