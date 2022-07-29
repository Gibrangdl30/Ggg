<template>
    <f7-page id="inicio" >
        
        <div class="vista" v-vistak>

            <nav-bar clase="pt-0px" tipo="inicio" :backs="true" :color="false" :title="'Contacto'" :fix="1" />

            <div id="direccionnueva" class="contenedor-page back-color-blanco">

                <div class="row w-100 m-0 pt-3 px-3">
                    <inputForm :auto="true" type="text" texto="Asunto" input="form" v-model="form.asunto"  />
                </div>

                <div class="row w-100 m-0 pt-3 px-3">
                    <inputForm :auto="true" type="text" texto="Titulo de menasje" input="form" v-model="form.titulo"  />
                </div>
               
                <div class="row w-100 m-0 px-3 py-2 pt-4">
                    <inputForm type="text" contendorId="direccionnueva" :textarea="true" rows="4" texto="Descripcion:" placeholder="" v-model="form.descripcion" />
                </div>

                <div class="row w-100 m-0 pt-5 pb-3 px-2 ">
                    <div class="col-12 mx-auto px-0">
                        <botonApp @click="save()" tipo="azul" texto="Enviar mensaje" radius="20px" />
                    </div>
                </div>

                <div class="row w-100 m-0 py-4"></div>

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
                form: {
                    usuarios_id: this.$store.getters.getSession.id,
                    asunto: null,
                    titulo: null,
                    descripcion: null,
                },
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
        },
        mounted(){
            this.$store.dispatch('synchronizeData');
        },
        methods:{
            next(){
                if(!this.form.direccion){
                    swal("","Debes ingresar una direccion","info");
                    return;
                }
                this.$store.dispatch('postSaveDireccion',this.form);
            },
            resultado(e){
                this.form.lat = e.geometry.location.lat();
                this.form.lng = e.geometry.location.lng();
                this.form.direccion = e.formatted_address;
                console.log("THIS FORM", this.form);
            },
            save(){
                this.$store.dispatch('postPostSaveMensaje',[ this.form ]);
            },

        }
    }
</script>