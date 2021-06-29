import axios from 'axios';
import swal from 'sweetalert';
const moment = require('moment')

const comision = 0;
const lastStorage = 'lastStorage';
const initialState = {

    fechas: {a:[]},
    invitaciones: {a:[]},
    listasAmigos: {a:[]},
    misFechas: {a:[]},
    misEventos: {a:[]},
    fechasAmigos: {a:[]},

    amigo: null,
    detalle: null,
    evento: null,
    eventos: null,
    fecha:  null,
    tipos:[
        'nuevoEvento',
        'editarEvento',
        'nuevaFecha',
        'editarFecha',
    ],
    tipo: 'nuevaFecha',
    serie: 'lista',
    misListas: {a:[]},
    lista:  null,
    type:  '1',

    nuevoEventoForm: {
        imagen:     null,
        nombre:     null,
        lugar:     null,
        domicilios_id:     null,
        otro:           null,
        tipo:           'party',
        cooperacion:    'si',
        externo:        'no',
        esusuario:        'no',
        para_usuarios_id: null,
        fecha:          moment().format('YYYY-MM-DD'),
        hora:           '12:00',
        repeticion:     'Unico',
        repeticion:     'Unico',
    },

    historial:{a:[]},
    servicios:{a:[]},
    usuariosForm:{a:[]},
    regalosForm:{a:[]},
    listaRegalosForm:{a:[]},
    usuarios:{a:[]},
    lugares:{a:[]},
    amigos:{a:[]},
    regalosAmigos:{a:[]},
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
        usuario.cooperar = true;
        usuario.propio = false;
        let x = state.usuariosForm.a.findIndex(x=>{return x.id == usuario.id});
        if(x == -1){
            state.usuariosForm.a.push(usuario);
        }
        state.usuariosForm = {a: JSON.parse(JSON.stringify(state.usuariosForm.a)) };
    },

    removeUser(state,id){
        let x = state.usuariosForm.a.findIndex(x=>{return x.id == id});
        if(x != -1){
            state.usuariosForm.a.splice(x,1);
        }
        state.usuariosForm = {a: JSON.parse(JSON.stringify(state.usuariosForm.a)) };
    },

    addRegalo(state,regalo){
        if(state.serie == 'amenidad'){
            let x = state.listaRegalosForm.a.findIndex(x=>{return x.id == regalo.id});
            if(x == -1){
                regalo.serie = state.serie;
                if(!regalo.cantidad){
                    regalo.cantidad = 1;
                }
                console.log("cantidad", regalo);
                state.listaRegalosForm.a.push(regalo);
            }
            else{
                regalo.serie = state.serie;
                state.listaRegalosForm.a[x].cantidad = state.listaRegalosForm.a[x].cantidad + 1;
            }
            state.listaRegalosForm = {a: JSON.parse(JSON.stringify(state.listaRegalosForm.a)) };
        }
        else{
            let x = state.regalosForm.a.findIndex(x=>{return x.id == regalo.id});
            if(x == -1){
                regalo.serie = state.serie;
                if(!regalo.cantidad){
                    regalo.cantidad = 1;
                }
                console.log("cantidad", regalo);
                state.regalosForm.a.push(regalo);
            }
            else{
                regalo.serie = state.serie;
                state.regalosForm.a[x].cantidad = state.regalosForm.a[x].cantidad + 1;
            }
            state.regalosForm = {a: JSON.parse(JSON.stringify(state.regalosForm.a)) };
        }
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
        if(data.fechas){
           state.fechas = {a: data.fechas};
        }
        if(data.misFechas){
           state.misFechas = {a: data.misFechas};
        }
        if(data.misEventos){
           state.misEventos = {a: data.misEventos};
        }
        if(data.listasAmigos){
           state.listasAmigos = {a: data.listasAmigos};
        }
        if(data.fechasAmigos){
           state.fechasAmigos = {a: data.fechasAmigos};
        }
        if(data.invitaciones){
           state.invitaciones = {a: data.invitaciones};
        }
        if(data.misListas){
           state.misListas = {a: _.orderBy( data.misListas, ['creado'], ['desc'])};
        }
        if(data.lugares){
           state.lugares = {a: data.lugares};
        }
        if(data.usuarios){
           state.usuarios = {a: data.usuarios};
        }
        if(data.amigos){
           state.amigos = {a: data.amigos};
        }
        if(data.regalosAmigos){
           state.regalosAmigos = {a: data.regalosAmigos};
        }
        if(data.historial){
           state.historial = {a: data.historial};
        }
        if(data.servicios){
           state.servicios = {a: data.servicios};
        }
    },
};

const actions={

    postGuardarFecha({ commit, state }, form){
        let data = {
            data: form,
        };

        let finish = (res)=>{
            if(form.id){
                swal("","Fecha actulizada","success");
                this.getters.getRouter.back();
            }
            else{
                this.commit('cleanForm');
                swal("","Fecha agregada","success");
                this.commit('setUsuarioData',['fecha', res.data.id]);
                this.commit('setUsuarioData',['tipo', 'nuevaFecha']);
                this.getters.getRouter.navigate('/lista_nuevo_evento');
                // console.log("RES RES RES", res.data.id );
            }
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['fechas/create', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postEditarFecha({ commit, state }, [form, regalos]){
        let data = {
            data: form,
            regalos: regalos,
        };

        let finish = (res)=>{
            if(form.id){
                swal("","Fecha actulizada","success");
                this.getters.getRouter.back();
            }
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['fechas/create', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postGuardarRegalosFechas({ commit, state }, form ){
        let data = {
            fecha: state.fecha,
            regalos: form,
        };

        let finish = (res)=>{
            swal("","Regalos guardados","success");
            this.getters.getRouter.back('/mis_fechas', {force: true} );
            this.commit('cleanForm');
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['fechas/agregar_regalos_fechas', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postEliminarFecha({ commit, state }, form){
        let data = {
            data: form,
        };

        let finish = (res)=>{
            swal("","Fecha eliminada","success");
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['fechas/borra_fecha', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postEliminarEvento({ commit, state }, form){
        let data = {
            data: form,
        };

        let finish = (res)=>{
            swal("","Evento eliminado","success");
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['fechas/borra_evento', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postGuardarLista({ commit, state }, form){
        let data = {
            data: form,
        };

        let finish = (res)=>{
            swal("","Wishlist creada","success");
            this.getters.getRouter.back();
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['fechas/create_lista', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postBorrarLista({ commit, state }, form){
        let data = {
            data: form,
        };

        let finish = (res)=>{
            swal("","Wishlist borrada","success");
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['fechas/borrar_lista', data]).then(
        res => {
            finish(res);
        },error=>{});
    },
    
    postGuardarProducto({ commit, state }, form){
        let data = {
            data: form,
        };
        data.data.listas_id = state.lista;

        let finish = (res)=>{
            swal("","Producto creado","success");
            this.getters.getRouter.back();
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['fechas/create_producto', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postEliminarProducto({ commit, state }, form){
        let data = {
            data: form,
        };

        let finish = (res)=>{
            swal("","Producto eliminado","success");
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['fechas/delete_producto', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postActulizarSolicitudAmistad({ commit, state }, [form, estatus]){
        let data = {
            solicitud: form,
            estatus: estatus,
        };

        let finish = (res)=>{
            swal("","Solicitud actulizada","success");
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['datos/actulizar_solicitud', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postSetFavorito({ commit, state }, [form, estatus]){
        let data = {
            solicitud: form,
            estatus: estatus,
        };

        let finish = (res)=>{
            if(estatus == '1'){
                swal("","Haz agregado a este usuario a tus personas importantes. Podras verlo en tu perfl.","success");
            }
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['datos/set_favorito', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postEnviarSolicitud({ commit, state }, usuario){
        let data = {
            usuario: usuario,
        };

        let finish = (res)=>{
            swal("","Solicitud enviada","success");
            // this.getters.getRouter.back();
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['datos/enviar_solicitud', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postEnviarSolicitudes({ commit, state }, usuarios){
        let data = {
            usuarios: usuarios,
        };

        let finish = (res)=>{
            swal("","Solicitudes enviadas","success");
            // this.getters.getRouter.back();
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['datos/enviar_solicitudes', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

     postEnviarInvitacion({ commit, state }, form ){
        let data = {
            data: form,
        };

        let finish = (res)=>{
            swal("","Solicitud enviada","success");
            this.getters.getRouter.back();
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['contactos/enviar_invitacion', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postAgregarEvento({ commit, state }, form ){
        let data = {
            form: form,
            usuarios: state.usuariosForm.a,
            regalos: state.regalosForm.a,
            conceptos: state.listaRegalosForm.a,
        };

        let finish = (res)=>{
            swal("","Evento creado","success");
            this.commit('setUsuarioData',['nuevoEventoForm', initialState.nuevoEventoForm ]);
            this.commit('cleanForm');

            this.getters.getRouter.back();
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['datos/agregar_evento', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postEnviarCobro({ commit, state }, [form, cantidad] ){
        let data = {
            form: form,
            cantidad: cantidad,
        };

        let finish = (res)=>{
            swal("","Cobro enviado","success");
            this.commit('cleanForm');
            this.getters.getRouter.back();
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['datos/cobrar_evento', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postActulizarSolicitud({ commit, state }, [form, estatus]){
        let data = {
            invitacion: form,
            estatus: estatus,
        };

        let finish = (res)=>{
            swal("","Invitación actualizada","success");
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['datos/actulizar_invitacion', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postActulizarCobro({ commit, state }, [form, estatus]){
        let data = {
            cobro: form,
            estatus: estatus,
        };

        let finish = (res)=>{
            swal("","Cobro actulizado","success");
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['datos/actulizar_cobro', data]).then(
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