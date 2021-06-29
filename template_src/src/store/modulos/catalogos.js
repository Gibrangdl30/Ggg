import axios from 'axios';
import _ from 'lodash';

const initialState = {
    modo: 'undefined',
    meses:{a:[
        {numero: '01', mes: 'Enero', dias: 31},
        {numero: '02', mes: 'Febrero', dias: 28},
        {numero: '03', mes: 'Marzo', dias: 31},
        {numero: '04', mes: 'Abril', dias: 30},
        {numero: '05', mes: 'Mayo', dias: 31},
        {numero: '06', mes: 'Junio', dias: 30},
        {numero: '07', mes: 'Julio', dias: 31},
        {numero: '08', mes: 'Agosto', dias: 31},
        {numero: '09', mes: 'Septiembre', dias: 30},
        {numero: '10', mes: 'Octubre', dias: 31},
        {numero: '11', mes: 'Noviembre', dias: 30},
        {numero: '12', mes: 'Diciembre', dias: 31},
    ]},
    health:  {a:[]},
    bancos:  {a:[]},
    estados:  {a:[]},
    banners:  {a:[]},
    contactos:  {a:[]},
    
    categorias:  {a:[]},
    tipos_fechas:  {a:[]},
    repeticiones:  {a:[]},
    productos:  {a:[]},
    producto: null,
    categoria: null,
    cambioUSD: 20,
};
const state=JSON.parse(JSON.stringify(initialState));
const getters={   
    stripeModo(state){return state.modo},
    getCatalogos(state){return state},
    getCatalogo:(state)=>(cat)=>{return (state[cat]||{}).a || []},
    catalogoGetObject:(state)=>(key)=>{return state[key]},
    catalogoGetFind:(state)=>(key,id)=>{return state[key].a.find(x=>{return x.id == state[id]}) || {} },
};
const mutations={
    setVersion(state,data){
        if(data.version) state.version  = data.version;
    },

    setContactos(state){
        if(this.getters.deviceready){
            navigator.contactsPhoneNumbers.list(r=>{
                if(r && r.length){
                    r.map(x=>{
                        x.nombre = x.displayName;
                        x.telefono = (x.phoneNumbers.find(y=>{return y.normalizedNumber.includes('+')}) || {}).normalizedNumber;
                        if(!x.telefono){
                            x.telefono = (x.phoneNumbers.find(y => { return true }) || {}).normalizedNumber;
                        }
                    })
                }
                console.log("CONTACTOS", r);
                state.contactos = { a: _.orderBy(r, ['nombre'], ['asc'])};
            }, e=>{
                console.log("ERROR GETTING CONTACTS");
            });
        }
    },

    setCatalogos(state,data){
        if(data.cambioUSD){
            state.cambioUSD  = data.cambioUSD;
        } 
        if(data.cambioIva){
            state.cambioIva  = data.cambioIva;
        } 
        if(data.costoEnvio){
            state.costoEnvio  = data.costoEnvio;
        }
        
        if(data.health){
            state.health  = {a:data.health};
        } 
        if(data.estados){
            state.estados  = {a:data.estados};
        } 
        if(data.banners){
            state.banners  = {a:data.banners};
        } 
        if(data.categorias){
            state.categorias  = {a:data.categorias};
        } 
        if(data.tipos_fechas){
            state.tipos_fechas  = {a:data.tipos_fechas};
        } 
        if(data.repeticiones){
            state.repeticiones  = {a:data.repeticiones};
        } 
        if(data.productos){
            data.productos.map(x=>{
                x.precio = Number(x.precio);
            });
            state.productos  = {a:data.productos};
        } 
    },

    updateCatalogosState(state,[key,value]){
        state[key] = value;
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