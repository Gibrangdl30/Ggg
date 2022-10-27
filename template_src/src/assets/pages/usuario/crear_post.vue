<template>
    <f7-page class="" id="inicio">
        <div class="vista">
            <nav-bar tipo="inicio" title="Crear post" :backs="true" :fix="1"   />

            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0 pt-4 ">
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 pb-2 letra-gray3-18 justify-content-center text-center">Selecciona una foto:</div>
                        <div class="w-30vw h-30vw mx-auto border-azul-2 border-radius-15px overflow-hidden ">
                            <uploadImagen v-model="form.imagen" />
                        </div>
                    </div>
                </div>
               
                <div class="row w-100 m-0">
                    <div class="col-12 mt-3" >
                        <inputForm type="text" texto="Título de post:" placeholder="" v-model="form.titulo" />
                    </div>
                    
                    <div class="col-12 mt-3" v-if="0" >
                        <inputForm type="text" texto="Tipo de post:" placeholder="" v-model="form.tipo" />
                    </div>
                    
                    <div class="col-12 mt-3" >
                        <inputForm :textarea="1" :rows="4" type="text" texto="Post:" placeholder="" v-model="form.post" />
                    </div>
                </div>

                

            </div>

            <div class="row w-100 m-0 px-2 py-2">
                <div class="row w-100 m-0 px-3 py-2 pb-3" @click="save()">
                    <botonApp texto="Publicar" tipo="app" radius="30px" />
                </div>
            </div>

            
        </div>

    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment');

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                b: null,
                form:{
                    imagen: null,
                    titulo: null,
                    post: null,
                    tipo: 1,
                },
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
        },

        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
        },

        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },

            set(u){
                let index = this.formPost.usuarios.findIndex(i=>{return i.id == u.id});
                if(index == -1){
                    this.formPost.usuarios.push(u);
                }
                else{
                    this.formPost.usuarios = this.formPost.usuarios.filter(x=>x.id != u.id);
                }
            },

            publico(){
                if(this.formPost.usuarios.length < this.amigos.length ){
                    this.formPost.usuarios = [];
                    this.amigos.map(x=>{
                        this.formPost.usuarios.push(x);
                    });
                }else{
                    this.formPost.usuarios = [];
                }
            },

            save(){
                this.$store.dispatch('postPostCrearPost',[ this.form, ()=>{
                    this.router.back();
                    swal("","Post creado","success");  
                }]);
            },

        }
    }
</script>