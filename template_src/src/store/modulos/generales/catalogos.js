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

    loadContacts: 0,

    contactos:  { a:[] },
    comunicados:  { a:[] },
    categorias:  { a:[] },
    motivos:  { a:[] },
    tipos_familia:  { a:[] },

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
    updateCatalogosState(state,[key,value]){
        state[key] = value;
    },
    
    setVersion(state,data){
        if(data.version) state.version  = data.version;
    },

    initContactosAgenda(state){
        if(0){
            if(!state.loadContacts){
                navigator.contactsPhoneNumbers.list(r=>{
                    if(r && r.length){
                        r.map(x=>{
                            x.nombre = x.displayName;
                            x.telefono = (x.phoneNumbers.find(y=>{return y.normalizedNumber.includes('+')}) || {}).normalizedNumber;
                            if(!x.telefono){
                                x.telefono = `+521${ (x.phoneNumbers.find(y => { return true }) || {}).normalizedNumber } `;
                            }
                            x.usuario = ( this.getters.userStateArray('amigos').find(a=>{ return x.telefono.includes(a.telefono) }) || {}).id || null;
                        })
                    }
    
                    // let con = r.filter(y=>{ return y.usuario == null });

                    state.contactos = { a: _.orderBy(r, ['nombre'], ['asc'])};

                    console.log("CONTACTOS STATE", r, state.contactos);
                    this.dispatch('userSaveContacs', [ r ]);
                    
                    
                }, e=>{
                    console.log("ERROR GETTING CONTACTS");
                });
                state.loadContacts = 1;
            }
        }
    },

    setCatalogos(state,data){
        if(data.comunicados){
            state.comunicados  = {a:data.comunicados};
        } 
        if(data.categorias){
            state.categorias  = {a:data.categorias};
        } 
        if(data.motivos){
            state.motivos  = {a:data.motivos};
        } 
        if(data.tipos_familia){
            state.tipos_familia  = {a:data.tipos_familia};
        } 
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