<template>
    <f7-page class="" id="inicio">
        <div class="vista">
            <nav-bar    
                tipo="inicio" 
                title="Padres" 
                :backs="true" 
                :fix="1"
            />

            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0">

                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0" v-if="(padres && padres.length)">
                            <div class="row w-100 m-0" v-for="a of padres " :key="a.id">
                                <padreRow 
                                    :data="a" 
                                    :check="true"
                                    :select="padresForm.find(x=>x.id == a.id)"
                                />
                            </div>
                        </div>
                        <div class="row w-100 m-0 px-3" v-else>
                            <div class="row w-100 m-0 px-3">
                                <!-- <div class="row w-100 m-0 px-3 letra-gray3-17 text-center justify-content-center">Aquí puedes ver y agregar reuniones y regalos grupales, sólo da click al icono de + en la parte superior derecha.</div> -->
                            </div>
                        </div>
                    </div>


                </div>
            </div>
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
                hoy: moment().format('YYYY-MM-DD'),
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            padres(){return this.$store.getters.userStateArray('padres'); },
            padresForm(){return this.$store.getters.userStateArray('padresForm'); },
        },
        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            nuevo(){
                this.$store.commit('cleanForm');
                this.$store.commit('processRuteSession','/nuevo_evento_calendario')
            },
            send(estatus, u){
                this.$store.dispatch('userPostActulizarInvitacion',[this.evento, estatus, u]);
            }
        }
    }
</script>