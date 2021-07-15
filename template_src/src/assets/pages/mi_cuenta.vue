<template>
    <f7-page id="mi_cuenta">
    <div class="vista">
        <nav-bar tipo="inicio" title="Mi cuenta" :backs="false" :profile="true" />
        
        <div class="contenedor-page-tabs">
            <div class="row m-0 justify-content-center">
                <div class="row w-100 m-0 justify-content-center">
                        <div class="col-12 px-0 pt-4 pb-4">
                            <div class="row w-100 m-0 justify-content-center text-center">
                                <div class="w-30vw h-30vw">
                                    <imagen clase="border-radius-50 overflow-hidden" :fit="true" :perfil="true" alt="" />
                                </div>
                                <div class="w-30vw h-30vw">
                                    <imagen clase="border-radius-50 overflow-hidden" :fit="true" :src="escuela.imagen" alt="" />
                                </div>
                            </div>
                        </div>
                        <div class="col-12 text-center pb-3">
                            <div class="row m-0 w-100 pt-2 pb-1 letra-gray4-4-6vw fw-800 justify-content-center">{{session.nombre}}</div>
                            <div class="row m-0 w-100 pb-1 letra-verde-18 justify-content-center">{{session.email}}</div>
                            <div class="row m-0 w-100 pb-1 letra-gray3-18 justify-content-center">{{escuela.name}}</div>
                        </div>
                </div>
                
                <div class="row w-100 m-0 back-color-blanco">
                <div class="col-12 p-0">

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/editar_perfil')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col my-auto letra-gray3-5-1vw p-0">Editar perfil</div>
                                    <div class="col-auto p-0">
                                        <icono icono="chevron_right" clase="letra-gray3-30" />
                                    </div>
                                </div>
                            </button>
                        </div>

                        <template v-if="user" >
                            <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                                <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/hijos_usuario')">
                                    <div class="row m-0 w-100 justify-content-between">
                                        <div class="col my-auto letra-gray3-5-1vw p-0">Alumnos relecionados a mi cuenta</div>
                                        <div class="col-auto p-0">
                                            <icono icono="chevron_right" clase="letra-gray3-30" />
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                                <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/agendar_faltas')">
                                    <div class="row m-0 w-100 justify-content-between">
                                        <div class="col my-auto letra-gray3-5-1vw p-0">Agendar faltas</div>
                                        <div class="col-auto p-0">
                                            <icono icono="chevron_right" clase="letra-gray3-30" />
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                                <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/personas_confianza')">
                                    <div class="row m-0 w-100 justify-content-between">
                                        <div class="col my-auto letra-gray3-5-1vw p-0">Personas de confianza</div>
                                        <div class="col-auto p-0">
                                            <icono icono="chevron_right" clase="letra-gray3-30" />
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                                <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/rondas')">
                                    <div class="row m-0 w-100 justify-content-between">
                                        <div class="col my-auto letra-gray3-5-1vw p-0">Rondas</div>
                                        <div class="col-auto p-0">
                                            <icono icono="chevron_right" clase="letra-gray3-30" />
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                                <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/reportes_hijos')">
                                    <div class="row m-0 w-100 justify-content-between">
                                        <div class="col my-auto letra-gray3-5-1vw p-0">Reportes</div>
                                        <div class="col-auto p-0">
                                            <icono icono="chevron_right" clase="letra-gray3-30" />
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                                <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/historial_faltas')">
                                    <div class="row m-0 w-100 justify-content-between">
                                        <div class="col my-auto letra-gray3-5-1vw p-0">Historial</div>
                                        <div class="col-auto p-0">
                                            <icono icono="chevron_right" clase="letra-gray3-30" />
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                                <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/notificaciones')">
                                    <div class="row m-0 w-100 justify-content-between">
                                        <div class="col my-auto letra-gray3-5-1vw p-0">Notificaciones</div>
                                        <div class="col-auto p-0">
                                            <icono icono="chevron_right" clase="letra-gray3-30" />
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                                <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/quejas_usuario')">
                                    <div class="row m-0 w-100 justify-content-between">
                                        <div class="col my-auto letra-gray3-5-1vw p-0">Quejas y sugerencias</div>
                                        <div class="col-auto p-0">
                                            <icono icono="chevron_right" clase="letra-gray3-30" />
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </template>

                        
                       
                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="$store.commit('logout', $f7router)">
                            <div class="row m-0 w-100 justify-content-between">
                                <div class="col my-auto letra-gray3-5-1vw p-0">Salir</div>
                                <div class="col-auto p-0">
                                    <icono icono="chevron_right" clase="letra-gray3-30" />
                                </div>
                            </div>
                            </button>
                        </div>
                </div>
                </div>
                <div class="row m-0 pt-4 justify-content-center letra-gray4-4-1vw">V.{{version}}</div>
            </div>
        </div>
        <tabs />
    </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            user(){return this.$store.getters.user;},
            escuela(){return this.session.escuela || {};},
            version(){return this.$store.getters.vr;},
        },
        mounted(){
            this.$store.dispatch('synchronizeData');
        },
        methods:{
            goTo(ruta){
                this.router.navigate(ruta);
            },
            openBrowser(url){
                this.$store.dispatch('openBrowser',url);
            }
        }
    }
</script>