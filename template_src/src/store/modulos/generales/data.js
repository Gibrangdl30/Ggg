import axios from 'axios';
import _ from 'lodash';

const initialState = {
    
    data: {

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
        state.data = {...state.data, ...data};
        // console.log("--------------------->>>>>>>>>>>>SET ROOT DATA", state.data);
    },
    setRootExtraData(state, data){
        state.data = {...state.data, ...data};
        console.log(" >>>>>>>>>>>>>>>EEEEXTRA SET ROOT DATA", data, state.data);
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

   
};

export default {
    state,
    getters,
    mutations,
    actions
};