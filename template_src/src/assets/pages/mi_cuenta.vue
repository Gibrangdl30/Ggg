<template>
    <f7-page id="mi_cuenta">
        <modalMensaje
            :texto="`¿Estas seguro de cerrar sesión?`"
            :boton="'Aceptar'"
            @click="$store.commit('logout', $f7router)"
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
                            <div class="row m-0 w-100 letra-gray4-19 justify-content-center">{{session.email}}</div>
                            <div class="row m-0 w-100 letra-gray3-18 justify-content-center">{{session.telefono}}</div>
                            <div class="row m-0 w-100 letra-gray3-18 justify-content-center">Codigo: {{session.codigoparareferir}}</div>
                        </div>
                </div>
                
                <div class="row w-100 m-0 back-color-blanco">

                
                <div class="col-12 p-0">
                    <div class="row w-100 m-0 px-2">
                        <div class="col px-1 my-auto " @click="router.navigate('/fotos_para_mi')"  >
                            <div class="row w-100 m-0 px-2 py-2 border-negro-1 back-color-negro  border-radius-5px justify-content-center text-center ">
                                <div class="col-auto my-auto px-0 letra-blanco-15">Fotos para mi</div>
                                <div class="col-auto my-auto px-0 ml-auto" >
                                    <div class="w-33px h-33px back-color-blanco border-radius-50" v-if="mias" >
                                        <div class="row w-100 m-0 letra-negro-18 pt-2px justify-content-center text-center fw-600">{{mias}}</div>
                                    </div>
                                     <div class="w-33px h-33px back-color-negro border-radius-50" v-else ></div>
                                </div>
                            </div>
                        </div>
                        <div class="col px-1 my-auto " @click="router.navigate('/fotos_de_cliente')" >
                            <div class="row w-100 m-0 px-2 py-2 border-gray4-1 back-color-gray4  border-radius-5px justify-content-center text-center ">
                                <div class="col-auto my-auto px-0 letra-blanco-15">Fotos tomadas</div>
                                <div class="col-auto my-auto px-0 ml-auto" >
                                    <div class="w-33px h-33px back-color-blanco border-radius-50" v-if="tom" >
                                        <div class="row w-100 m-0 letra-gray4-18 pt-2px justify-content-center text-center fw-600">{{tom}}</div>
                                    </div>
                                    <div class="w-33px h-33px back-color-gray4 border-radius-50" v-else >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 p-0">

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col-auto my-auto letra-gray3-5-1vw p-0">Puntos</div>
                                    <div class="col-auto px-0 pl-3" @click="modal = 1" >
                                        <icono icono="help_outline" clase="letra-gray3-30" />
                                    </div>
                                    <div class="col-auto px-0 ml-auto my-auto letra-negro-22 fw-600">{{50 + puntos + extraPuntos + referidos }} pts</div>
                                </div>
                            </button>
                        </div>

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

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/editar_galeria')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col my-auto letra-gray3-5-1vw p-0">Mi galeria</div>
                                    <div class="col-auto p-0">
                                        <icono icono="chevron_right" clase="letra-gray3-30" />
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1"  >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/chats')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col my-auto letra-gray3-5-1vw p-0">Chats</div>
                                    <div class="col-auto p-0">
                                        <icono icono="chevron_right" clase="letra-gray3-30" />
                                    </div>
                                </div>
                            </button>
                        </div>

                        <!-- <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1"  >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="router.navigate('/acercade')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col my-auto letra-gray3-5-1vw p-0">Mis fotos</div>
                                    <div class="col-auto p-0">
                                        <icono icono="chevron_right" clase="letra-gray3-30" />
                                    </div>
                                </div>
                            </button>
                        </div> -->

                        

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1"  >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="router.navigate('/acercade')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col my-auto letra-gray3-5-1vw p-0">Sobre nosotros</div>
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
                                    <div class="col my-auto letra-gray3-5-1vw p-0">Aviso de privacidad</div>
                                    <div class="col-auto p-0">
                                        <icono icono="chevron_right" clase="letra-gray3-30" />
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1"  >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="router.navigate('/terminos_privacidad')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col my-auto letra-gray3-5-1vw p-0">Terminos de privacidad</div>
                                    <div class="col-auto p-0">
                                        <icono icono="chevron_right" clase="letra-gray3-30" />
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1"  >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="router.navigate('/concidencias')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col my-auto letra-gray3-5-1vw p-0">Condiciones de operación</div>
                                    <div class="col-auto p-0">
                                        <icono icono="chevron_right" clase="letra-gray3-30" />
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div v-if="0" class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1"  >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="router.navigate('/acercade')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col my-auto letra-gray3-5-1vw p-0">Ajustes de seguridad</div>
                                    <div class="col-auto p-0">
                                        <icono icono="chevron_right" clase="letra-gray3-30" />
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1"  @click="$store.commit('openM')" >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" >
                            <div class="row m-0 w-100 justify-content-between">
                                <div class="col my-auto letra-gray3-5-1vw p-0">Cerrar sesion</div>
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
            openBrowser(url){
                this.$store.dispatch('openBrowser',url);
            }
        }
    }
</script>