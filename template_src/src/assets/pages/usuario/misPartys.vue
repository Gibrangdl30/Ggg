<template>
    <f7-page class="" id="inicio">
    <modalParty v-if="info" :data="info" />

        <div class="vista">
            <div v-if="$store.getters.deviceIos"  @click="$store.dispatch('scrollBottom','partystt')" class="w-45px h-45px border-radius-50 position-absolute bottom-12 right-44 opacity-7 back-color-gray1 justify-content-center text-center align-content-center z-index-10000 ">
                <icono icono="keyboard_arrow_down" clase="letra-blanco-45 pt-1px" />
            </div>

            <nav-bar tipo="inicio" :backs="true" :title="'Mis regalos grupales'" :right="true" icon="add" @right=" $store.commit('processRuteSession','/nuevo_evento_calendario')" />

            <div class="row w-100 m-0">
                <div class="row w-100 m-0 border-b-azul1-1 ">
                    <div class="col-6 px-0" @click="tab=1">
                        <div class="row w-100 m-0 justify-content-center text-center py-15px" :class="`${(tab==1)?'back-color-azul1 letra-blanco-20':'back-color-blanco letra-azul1-20'}`">Confirmados</div>
                    </div>
                    <div class="col-6 px-0" @click="tab=2">
                        <div class="row w-100 m-0 justify-content-center text-center py-15px" :class="`${(tab==2)?'back-color-azul1 letra-blanco-20':'back-color-blanco letra-azul1-20'}`">No confirmados</div>
                    </div>
                </div>
            </div>

            <div id="partystt" class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0">

                    <div class="row w-100 m-0" v-if="tab==1" >
                        <div class="row w-100 m-0">

                            <div class="row w-100 m-0" v-for="a of misEventos " :key="a.id" @click="next(a)">
                                <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                                    <div class="w-18vw h-18vw my-auto" v-if="a.imagen">
                                        <imagen :fit="true" clase="border-radius-15px" :create="true" :src="a.imagen" />
                                    </div>
                                    <div class="w-18vw h-18vw my-auto" v-else >
                                        <imagen :fit="true" clase="border-radius-15px" src="https://socialflow.app/backend/apiv1/imagenes/e1.jpg" />
                                    </div>
                                    <div class="col my-auto px-0 pl-3">
                                        <div class="row w-100 m-0 letra-azul1-17 text-capitalize">{{a.tipo}}</div>
                                        <div class="row w-100 m-0 letra-gray4-16">{{a.nombre}}</div>
                                        <div class="row w-100 m-0 letra-gray3-15 text-capitalize" v-if="a.fecha">{{a.fecha | moment('DD [de] MMMM [del] YYYY')}}</div>
                                        <!-- <div class="row w-100 m-0 letra-gray3-15 text-capitalize" v-if="a.hora">{{[a.hora, 'HH:mm:ss'] | moment('HH:mm [hrs]')}}</div> -->
                                    </div>
                                        <!-- <div class="col-auto px-0 my-auto " v-if=" a.usuarios_id == session.id ">
                                            <div class="row w-100 m-0">
                                                <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" eliminar(a) ">
                                                    <icono icono="delete" clase="letra-azul1-20 pt-4px" />
                                                </div>
                                            </div>
                                        </div> -->
                                </div>
                            </div>

                            <div class="row w-100 m-0 px-3 py-3" v-for=" f of aceptado " :key="`in_${f.id}`"  @click="set(f)">
                                <div class="row w-100 m-0 carta border-radius-20px overflow-hidden back-color-fondo">
                                    <div class="row w-100 m-0">
                                        <div class="row w-100 m-0 h-15vh" v-if="f.evento.imagen" >
                                            <imagen clase="" :create="true" :src="f.evento.imagen" :fit="true" />
                                        </div>
                                        <div class="row w-100 m-0 h-15vh" v-else >
                                            <imagen clase="" src="https://socialflow.app/backend/apiv1/imagenes/e1.jpg" :fit="true" />
                                        </div>
                                    </div>
                                    <div class="row w-100 m-0 px-3 py-2">
                                        <div class="w-20vw h-20vw my-auto">
                                            <imagen clase="border-radius-50" :user="true" :src="f.usuario.foto" :fit="true" />
                                        </div>
                                        <div class="col pl-3 pr-0 my-auto">
                                            <div class="row w-100 m-0 letra-gray4-17 text-capitalize">{{f.usuario.nombre}}</div>
                                            <div class="row w-100 m-0 letra-gray3-15">{{f.usuario.nombre}} te invito a su {{f.evento.tipo}}</div>
                                            <div class="row w-100 m-0 letra-gray3-13">{{f.evento.nombre}} el {{[f.evento.fecha, 'YYYY-MM-DD'] | moment('DD [de] MMMM [de] YYYY')}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="row w-100 m-0" v-if="tab==2">
                        <div class="row w-100 m-0 px-3 py-3" v-for=" f of invitaciones " :key="`in_${f.id}`" >
                            <div class="row w-100 m-0 carta border-radius-20px overflow-hidden back-color-fondo"  @click="set(f)">
                                <div class="row w-100 m-0">
                                    <div class="row w-100 m-0 h-15vh" v-if="f.evento.imagen" >
                                        <imagen clase="" :create="true" :src="f.evento.imagen" :fit="true" />
                                    </div>
                                    <div class="row w-100 m-0 h-15vh" v-else >
                                        <imagen clase="" src="https://socialflow.app/backend/apiv1/imagenes/e1.jpg" :fit="true" />
                                    </div>
                                </div>
                                <div class="row w-100 m-0 px-3 py-2">
                                    <div class="w-20vw h-20vw my-auto">
                                        <imagen clase="border-radius-50" :user="true" :src="f.usuario.foto" :fit="true" />
                                    </div>
                                    <div class="col pl-3 pr-0 my-auto">
                                        <div class="row w-100 m-0 letra-gray4-17 text-capitalize">{{f.usuario.nombre}}</div>
                                        <div class="row w-100 m-0 letra-gray3-15">{{f.usuario.nombre}} te invito a su {{f.evento.tipo}}</div>
                                        <div class="row w-100 m-0 letra-gray3-13">{{f.evento.nombre}} el {{[f.evento.fecha, 'YYYY-MM-DD'] | moment('DD [de] MMMM [de] YYYY')}}</div>
                                    </div>
                                </div>
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
const moment = require('moment')
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                tab:    1,
                hoy: moment().format('YYYY-MM-DD'),
                info: null,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            misEventos(){return this.$store.getters.userStateArray('misEventos').filter(x=>{ return x.tipo == 'party' });},
            invitaciones(){return this.$store.getters.userStateArray('invitaciones').filter( x=>{ return x.estatus == 'enviado' && x.evento.tipo == 'party' } );},
            aceptado(){return this.$store.getters.userStateArray('invitaciones').filter( x=>{ return x.estatus == 'aceptado' && x.evento.tipo == 'party' } );},

        },
        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            eliminar(a){
                this.$store.dispatch('postEliminarEvento',a);
            },
            next(a){
                this.$store.commit('setUsuarioData',['evento', a.id]);
                this.router.navigate('/detalle_eventos');
            },
            set(f){
                console.log("SETING PARTY");
                this.info = f;
                this.$store.commit('openModal', ['modalParty']);
            },
        }
    }
</script>