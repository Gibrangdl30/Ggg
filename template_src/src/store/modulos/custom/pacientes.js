import axios from 'axios';
import swal from 'sweetalert';
const moment = require('moment');
const storage1 = 'storage1';
const comision = 0;

const initialState = {
    info:[
        {id: '1',   name: 'Resident information',       status: true, url: '/editar_paciente' },
        {id: '2',   name: 'Payer information',          status: true, url: '/editar_payer' },
        {id: '3',   name: 'Other information',          status: true, url: '/editar_other' },
        {id: '4',   name: 'Care providers',             status: true, url: '/editar_careproviders' },
        {id: '5',   name: 'Pharmacy',                   status: true, url: '/editar_pharmacy' },
        {id: '6',   name: 'External facilities',        status: true, url: '/editar_facilities' },
        {id: '7',   name: 'Contacts',                   status: true, url: '/paciente_contactos' },
        {id: '8',   name: 'Diagnosis information',      status: true, url: '/paciente_diagnosticos' },
        {id: '9',   name: 'Advance directive',          status: true, url: '/editar_directive' },
        {id: '10',  name: 'Miscellanius information',   status: true, url: '/editar_misscellanous' },
    ],
    pacientes: {a:[]},
    paciente: null,
    contacto: null,
    diagnostico: null,

};

const state=JSON.parse(JSON.stringify(initialState));
const getters={   
    pacienteStateArray:(state)=>(obj)=>{return state[obj].a},
    pacienteStateObject:(state)=>(obj)=>{return state[obj]},
    pacienteStateFind:(state)=>(obj,data)=>{return state[obj].a.find(a=>{return a.id == state[data]})},
    pacienteStateFindFiel:(state)=>(obj,data, field)=>{return (state[obj].a.find(a=>{return a.id == state[data]}) || {})[field] || {} },
    pacienteStateFindInside:(state)=>(obj,data,key,id)=>{return state[obj].a.find(a=>{return a.id == state[data]})[key].find(x=>{return x.id == state[id]})},
    
};
const mutations={

    setPacienteState(state,data){
        if(data.pacientes){
            state.pacientes = {a: data.pacientes};
        }
    },

    updatePacienteState(state,[campo,id]){
        state[campo] = id;
    },
  
};

const actions={

    postPacientes_guardarPaciente({ commit, state }, [tabla, form, back = false]){
        let data = {
            tabla: tabla,
            form: form,
        };

        let finish = (res)=>{
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
            swal("","Patient saved","success");
            if(back){
                this.getters.getRouter.back();
            }
        };

        this.dispatch('postPromiseLoader', ['datos/add_paciente', data]).then(
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