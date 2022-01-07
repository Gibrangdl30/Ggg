<template>
    <f7-page id="mi_cuenta">
        <modalMensaje
            :texto="`Are you sure you want to delete your account?`"
            :boton="'Accept'"
            @click="$store.commit('logout', $f7router)"
        />
    <div class="vista">
        <nav-bar tipo="inicio" title="SETTINGS" :backs="true" :fix="1" />
        
        <div class="contenedor-page-tabs">
            <div class="row m-0 justify-content-center">
                <div class="row w-100 m-0 justify-content-center">
                        <div class="col-12 px-0 pt-4">
                            <div class="row w-100 m-0 justify-content-center text-center">
                                <!-- <div class="w-40vw h-40vw">
                                    <imagen clase="border-radius-50 overflow-hidden" :fit="true" :perfil="true" alt="" />
                                </div> -->
                                <div class="w-40vw h-40vw">
                                    <uploadImagen 
                                        rad="50"
                                        bcolor="azul1"
                                        bsize="3"
                                        :user="false" 
                                        v-model="form.foto" 
                                        :imagen="foto" 
                                        @end="save"
                                        />
                                </div>
                            </div>
                        </div>
                        <div class="col-12 text-center pt-2 pb-3">
                            <div class="row m-0 w-100 letra-azul1-23 justify-content-center">{{session.nombre}}</div>
                            <div class="row m-0 w-100 letra-gray3-18 justify-content-center">{{session.telefono}}</div>
                        </div>
                </div>
                
                <div class="row w-100 m-0 back-color-blanco">
                <div class="col-12 p-0">

                        <!-- <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/editar_perfil')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col my-auto letra-gray3-5-1vw p-0">Edit profile</div>
                                    <div class="col-auto p-0">
                                        <icono icono="chevron_right" clase="letra-gray3-30" />
                                    </div>
                                </div>
                            </button>
                        </div> -->

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1" v-if="false" >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/post_favoritos')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col my-auto letra-gray3-5-1vw p-0">Favorite posts</div>
                                    <div class="col-auto p-0">
                                        <icono icono="chevron_right" clase="letra-gray3-30" />
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1"  >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="show = true">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col my-auto letra-gray3-5-1vw p-0">More options</div>
                                    <div class="col-auto p-0">
                                        <icono icono="expand_more" clase="letra-gray3-30" />
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1" v-if="show" @click="$store.commit('openM')" >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" >
                            <div class="row m-0 w-100 justify-content-between">
                                <div class="col my-auto letra-gray3-5-1vw p-0">Delete account</div>
                                <div class="col-auto p-0">
                                    <icono icono="chevron_right" clase="letra-gray3-30" />
                                </div>
                            </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1"  >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="router.navigate('/terminos_condiciones')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col my-auto letra-gray3-5-1vw p-0">Terms and conditions</div>
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
                show: false,
                form:{
                    id: this.$store.getters.getSession.id,
                    foto: this.$store.getters.getSession.fotos_id,
                    nombre: this.$store.getters.getSession.nombre,
                },
                foto: this.$store.getters.getSession.foto,
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
            save(){
                if(!this.form.nombre){
                    swal("No puedes dejar campos vacios", "","info");
                    return;
                }
                this.$store.dispatch('postEditCuenta', [this.form, this.fotoUpdate, false]);
            },
            openBrowser(url){
                this.$store.dispatch('openBrowser',url);
            }
        }
    }
</script>