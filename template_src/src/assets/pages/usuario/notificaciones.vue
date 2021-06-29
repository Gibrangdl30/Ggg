<template>
    <f7-page class="" id="inicio">
        <modal-mensaje 
            :texto="`¿Deseas reportar este contenido?`"
            :boton="'Reportar'"
            @click="toreportar()"
        />
        <modalParty v-if="info" :data="info" />

        <div class="vista">
            <nav-bar tipo="inicio" :backs="true" :title="'Notificaciones'"/>
            
            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0 px-3 pt-3" v-if="!paginado || !paginado.length" >
                    <div class="row w-100 m-0 px-3 letra-gray4-22 justify-content-center text-center ">No hay notificaciones</div>
                </div>

                <div class="row w-100 m-0">

                <div class="row w-100 m-0 " v-for=" f of paginado " :key="f.id">

                <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1 " v-if="f.tipo=='2'" @click="set(f.data)">
                    <div class="row w-100 m-0 overflow-hidden back-color-fondo" > 
                        <!-- <div class="row w-100 m-0 position-relative">
                            <div class="row w-100 m-0 position-absolute top-0px left-0px">
                                <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px text-capitalize">{{f.data.evento.tipo}}</div>
                            </div>
                        </div> -->

                        <div class="row w-100 m-0 px-3 py-2">
                            <div class="w-20vw h-20vw my-auto">
                                <imagen clase="border-radius-50" :user="true" :src="f.data.usuario.foto" :fit="true" />
                            </div>
                            <div class="col pl-3 pr-0 my-auto">
                                <div class="row w-100 m-0 letra-gray4-17 text-capitalize">{{f.data.usuario.nombre}}</div>
                                <div class="row w-100 m-0 letra-gray3-15">Esta solicitando cooperar para la {{f.data.evento.type}} {{f.data.evento.nombre}}</div>
                                <div class="row w-100 m-0 letra-gray3-13">El {{[f.data.evento.fecha, 'YYYY-MM-DD'] | moment('DD [de] MMMM [de] YYYY')}}</div>
                                <div class="row w-100 m-0 letra-azul1-13">Agregado hace {{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="row w-100 m-0 forfor border-b-gray0-1" v-if="f.tipo=='3'" >
                    <div class="row w-100 m-0 px-2 py-2">
                        <div class="row w-100 m-0 overflow-hidden border-radius-20px back-color-fondo ">
                            <div class="row w-100 m-0 px-3 py-2 position-relative">
                                <div class="w-20vw h-20vw my-auto">
                                    <imagen clase="border-radius-50" :user="true" :src="f.data.usuario.foto" :fit="true" />
                                </div>
                                <div class="col pl-3 pr-0 my-auto">
                                    <div class="row w-100 m-0 letra-gray4-17">{{f.data.usuario.nombre}}</div>
                                    <div class="row w-100 m-0 letra-gray3-15">{{f.data.usuario.nombre}} agrego la fecha {{f.data.nombre}}</div>
                                    <div class="row w-100 m-0 letra-azul1-13">Agregado hace {{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                                </div>
                                <!-- <div class="row w-100 m-0 position-absolute top-0px left-0px">
                                    <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px">Fecha</div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1" v-if="f.tipo=='4'" @click="set(f.data)" >
                    <div class="row w-100 m-0 border-radius-20px overflow-hidden back-color-fondo  " >
                        <!-- <div class="row w-100 m-0 position-relative">
                            <div class="row w-100 m-0 position-absolute top-0px left-0px">
                                <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px text-capitalize">{{f.data.evento.tipo}}</div>
                            </div>
                        </div> -->

                        <div class="row w-100 m-0 px-3 py-2">
                            <div class="w-20vw h-20vw my-auto">
                                <imagen clase="border-radius-50" :user="true" :src="f.data.usuario.foto" :fit="true" />
                            </div>
                            <div class="col pl-3 pr-0 my-auto">
                                <div class="row w-100 m-0 letra-gray4-17 text-capitalize">{{f.data.usuario.nombre}}</div>
                                <div class="row w-100 m-0 letra-gray3-15">{{f.data.usuario.nombre}} te invito a su {{f.data.evento.type}}</div>
                                <div class="row w-100 m-0 letra-gray3-13">{{f.data.evento.nombre}} el {{[f.data.evento.fecha, 'YYYY-MM-DD'] | moment('DD [de] MMMM [de] YYYY')}}</div>
                                <div class="row w-100 m-0 letra-azul1-13">Agregado hace {{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1" v-if="f.tipo=='5'" @click="verDeseosLista(f.data)" >
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 position-relative">
                            <!-- <div class="row w-100 m-0 position-absolute top-0px left-0px">
                                <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px">Wishlist</div>
                            </div> -->
                        </div>
                        <div class="row w-100 m-0 px-3 py-2">
                            <div class="w-20vw h-20vw my-auto">
                                <imagen clase="border-radius-50" :user="true" :src="f.data.usuario.foto" :fit="true" />
                            </div>
                            <div class="col pl-3 pr-0 my-auto">
                                <div class="row w-100 m-0 letra-gray4-17 text-capitalize">{{f.data.usuario.nombre}}</div>
                                <div class="row w-100 m-0 letra-gray3-15">Agrego una nueva wishlist: {{f.data.nombre}}</div>
                                <div class="row w-100 m-0 letra-azul1-13">Agregado hace {{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                            </div>
                        </div>

                    </div>
                </div>

                    <div class="row w-100 m-0 forfor border-b-gray0-1" v-if="f.tipo=='7'" >
                        <div class="row w-100 m-0 px-3 py-2">
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 px-3 py-2 position-relative">
                                    <div class="w-20vw h-20vw my-auto">
                                        <imagen clase="border-radius-50" :user="true" :src="f.data.usuario.foto" :fit="true" />
                                    </div>
                                    <div class="col pl-3 pr-0 my-auto">
                                        <div class="row w-100 m-0 letra-gray4-17">{{f.data.usuario.nombre}}</div>
                                        <div class="row w-100 m-0 letra-gray3-15">{{f.data.usuario.nombre}} te hizo un regalo</div>
                                        <div class="row w-100 m-0 letra-azul1-13">{{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                                    </div>
                                    <!-- <div class="row w-100 m-0 position-absolute top-0px left-0px">
                                        <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px">Regalo</div>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row w-100 m-0 pt-4">
                    <div class="row w-100 m-0">
                        <div class="col-8 px-0 mx-auto" v-if="c < general.length" @click="c += add">
                            <botonApp texto="Ver mas" tipo="azul" radius="30px" />
                        </div>
                    </div>
                </div>
                </div>

            </div>
            <tabs />
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
// const moment = require('moment-timezone');

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                info: null,
                c: 15,
                add: 5,
                zona: null,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            fechas(){return this.$store.getters.userStateArray('fechas');},
            filtrado(){ return this.fechas.filter(x=>{return this.amigos.find(y=>{return y.usuarios_id == x.usuarios_id || y.amigos_id == x.usuarios_id }) != undefined }); },

            fechasAmigos(){return this.$store.getters.userStateArray('fechasAmigos');},
            listasAmigos(){return this.$store.getters.userStateArray('listasAmigos').filter(x=>{ return x.tipo != 'Privada' });},
            misListas(){return this.$store.getters.userStateArray('misListas');},


            amigos(){return this.$store.getters.userStateArray('amigos').filter(x=>{return x.estatus == 'aceptado'});},

            eventos(){return this.$store.getters.userStateArray('misEventos'); },
            invitaciones(){return this.$store.getters.userStateArray('invitaciones');},
            cobros(){return this.invitaciones.filter(x=>{ return x.cobro && x.cobro.id });},
            misFechas(){return this.$store.getters.userStateArray('misFechas');},
            regalosAmigos(){return this.$store.getters.userStateArray('regalosAmigos');},

            general(){
                let a = [];
                // this.eventos.map(x=>{
                //     let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                //     a.push({ id: _.uniqueId('x'), tipo: '1', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                //     // a.push({ id: _.uniqueId('x'), tipo: '1', creado: x.creado, data: x });
                // });

                this.cobros.map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('y'), tipo: '2', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('y'), tipo: '2', creado: x.creado, data: x });
                });

                this.fechasAmigos.map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('q'), tipo: '3', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('q'), tipo: '3', creado: x.creado, data: x });
                });

                this.invitaciones.map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('w'), tipo: '4', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('w'), tipo: '4', creado: x.creado, data: x });
                });

                this.listasAmigos.map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('w'), tipo: '5', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('w'), tipo: '5', creado: x.creado, data: x });
                });

                // this.misListas.map(x=>{
                //     let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                //     a.push({ id: _.uniqueId('ww'), tipo: '5.5', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                //     // a.push({ id: _.uniqueId('ww'), tipo: '5.5', creado: x.creado, data: x });
                // });

                // this.misFechas.map(x=>{
                //     let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                //     a.push({ id: _.uniqueId('z'), tipo: '6', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                //     // a.push({ id: _.uniqueId('z'), tipo: '6', creado: x.creado, data: x });
                // });

                this.regalosAmigos.map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('r'), tipo: '7', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('r'), tipo: '7', creado: x.creado, data: x });
                });

                return _.orderBy(a, ['creado'], ['desc']);
            }, 
            paginado(){
                return this.general.filter((x,y) => {return y <= this.c});
            }
        },
        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
            // console.log("···············", this.zona);
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            verEvento(e){
                this.$store.commit('setUsuarioData',['evento', e.id]);
                this.router.navigate('/detalle_eventos');
            },
            set(f){
                this.info = f;
                this.$store.commit('openModal', ['modalParty']);
            },
            verDeseos(e){
                this.$store.commit('setUsuarioData', ['amigo',e.amistad.id]);
                this.router.navigate('/deseos_amigos');
            },
            verDeseosFecha(e){
                this.$store.commit('setUsuarioData', ['amigo',e.id]);
                this.router.navigate('/deseos_fechas_amigos');
            },
            verDeseosLista(e){
                this.$store.commit('setUsuarioData', ['amigo',e.amistad.id]);
                this.$store.commit('setUsuarioData', ['detalle',e.id]);
                this.router.navigate('/deseos_amigo');
            },
            reportar(){
                this.$store.commit('openModal',['modalMensaje']);
            },
            toreportar(){
                swal("","Contenido reportado","success");
            },
            editarF(a){
                this.$store.commit('setUsuarioData',['fecha',a.id]);
                this.router.navigate('/editar_evento_fecha');
            },
            editarD(a){
                this.$store.commit('setUsuarioData',['lista',a.id]);
                this.$store.commit('setUsuarioData',['type',a.type]);
                console.log("TIPE", a.type);
                this.router.navigate('/detalle_lista');
            },
            
        }
    }
</script>