<template>
    <f7-page id="mi_cuenta">
        <modalMensaje v-if= "m==1"
            :texto="`¿Estas seguro de cerrar sesión?`"
            :boton="'Aceptar'"
            @click="$store.commit('logout', $f7router)"
        />
        <modalMensaje v-if="m==2"
            :texto="`¿Estas seguro de eliminar tu cuenta?`"
            :boton="'Aceptar'"
            @click="$store.commit('logout', $f7router); borrardo(); "
        />
        <modalMensajeStatic
            v-if="modal"
            :texto="`puntos`"
            :oneButton="1"
            :boton="'Aceptar'"
            @close="modal=0"
        />

    <div class="vista">
        <nav-bar tipo="inicio" title="Mi cuenta" :backs="true" :fix="1" />
        
        <div class="contenedor-page-tabs">
            <div class="row m-0 justify-content-center">
                <div class="row w-100 m-0 justify-content-center">
                        <div class="col-12 px-0 pt-4">
                            <div class="row w-100 m-0 justify-content-center text-center">
                                <div class="w-40vw h-40vw">
                                    <imagen clase="border-radius-50 overflow-hidden" :fit="true" :perfil="true" alt="" />
                                </div>
                            </div>
                        </div>
                        <div class="col-12 text-center pt-2 pb-3">
                            <div class="row m-0 w-100 letra-azul1-23 justify-content-center">{{session.nombre}}</div>
                            <div class="row m-0 w-100 letra-gray4-19 justify-content-center">{{session.email}}</div>
                            <div class="row m-0 w-100 letra-gray3-18 justify-content-center">{{session.telefono}}</div>
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


                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1"  >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="router.navigate('/terminos_condiciones')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col my-auto letra-gray3-5-1vw p-0">Terminos y Condiciones</div>
                                    <div class="col-auto p-0">
                                        <icono icono="chevron_right" clase="letra-gray3-30" />
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1"  >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="router.navigate('/aviso_privacidad')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col my-auto letra-gray3-5-1vw p-0">Privacidad</div>
                                    <div class="col-auto p-0">
                                        <icono icono="chevron_right" clase="letra-gray3-30" />
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1"  @click=" m=1; $store.commit('openM')" >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" >
                            <div class="row m-0 w-100 justify-content-between">
                                <div class="col my-auto letra-gray3-5-1vw p-0">Cerrar sesion</div>
                                <div class="col-auto p-0">
                                    <icono icono="chevron_right" clase="letra-gray3-30" />
                                </div>
                            </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1"   @click="borrar()" >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" >
                            <div class="row m-0 w-100 justify-content-between">
                                <div class="col my-auto letra-gray3-5-1vw p-0">Eliminar cuenta</div>
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
                m:1,
                show: false,
                modal: false,
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
            referidos(){return this.session.puntosR;},

            user(){return this.$store.getters.user;},
            escuela(){return this.session.escuela || {};},
            version(){return this.$store.getters.vr;},

            posts(){return this.$store.getters.postStateArray('misposts')},
            mias(){return this.posts.filter(s => s.para_id == this.session.id).length},
            tom(){return this.posts.filter(s => s.usuarios_id == this.session.id && s.type == 'f' && s.para_id != null ).length },
            puntos(){return this.posts.filter(s => s.usuarios_id == this.session.id && s.type == 'f' && s.para_id != null && s.calificacion_foto != null && Number(s.calificacion_foto) > 2 ).length },
            extraPuntos(){
                let t = 0;
                this.posts.filter(s => s.usuarios_id == this.session.id && s.type == 'f' && s.para_id != null ).map(w=>{
                    t = t + w.puntos;
                });
                return t;
            },
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

            borrar(){
                this.m=2; 
                this.$store.commit('openM');
            },
            borrardo(){
                swal("Cuenta eliminada","","success");
            },

            openBrowser(url){
                this.$store.dispatch('openBrowser',url);
            }
        }
    }
</script>