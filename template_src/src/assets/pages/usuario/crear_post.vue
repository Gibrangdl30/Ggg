<template>
    <f7-page class="" id="inicio">
        <div class="vista">
            <nav-bar tipo="inicio" title="Nuevo post" :customBack="true" :fix="1"   />

            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0">
                        <imagen :create="true" :src="formPost.imagen" />
                    </div>
                </div>
                <div class="row w-100 m-0 border-b-gray0-2 " v-if="0" >
                    <div class="row w-100 m-0 py-3 ">
                        <div class="col px-0 pl-3 ">
                            <busquedaInput v-model="b" :scroll="1" :offset="200" />
                        </div>
                        <div class="col px-0">
                            <div class="row w-100 m-0 px-2" @click="publico()">
                                        <!-- :class="`${formPost.usuarios.length==0?'letra-blanco-18 back-color-azul1 border-azul1-1 ':'letra-gray3-18 border-gray3-1'}`" > -->
                                <div    class="row w-100 m-0 py-2px border-radius-30px " 
                                        :class="`${formPost.usuarios.length==amigos.length?'letra-blanco-18 back-color-verde2 border-verde2-1 ':'letra-gray3-18 border-gray3-1'}`" >
                                    <div class="col-auto px-0 my-auto ml-auto">Everybody</div>
                                    <div class="col-auto px-0 pl-2 mr-auto">
                                        <icono icono="done" clase="letra-blanco-26 pt-4px" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 pt-2 px-3" v-if="1" >
                    <div class="row w-100 m-0 letra-gray4-18">Selecciona el usuario al que le tomaste foto</div>
                    <!-- <div class="row w-100 m-0" v-for="a of filtrado" :key="a.id">
                        <amigosRow :data="a" v-model="formPost" :check="formPost.para_id == a.id" @set="formPost.para_id = a.id"  />
                    </div> -->
                    <div class="row w-100 m-0" v-for="a of amigos" :key="a.id">
                        <!-- :solicitud="a" -->
                        <amigosRow 
                            :data="a" 
                            :selectable="1"
                            :check="formPost.para_id == a.id"
                            @set="formPost.para_id = a.id"  />
                    </div>
                </div>

            </div>

            <div class="row w-100 m-0 px-2 py-2">
                <div class="row w-100 m-0 px-3 py-2 pb-3" @click="save()">
                    <botonApp texto="Enviar" tipo="azul" radius="30px" />
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
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            formPost(){return this.$store.getters.userStateObject('formPost');},
            posts(){return this.$store.getters.postStateArray('posts')},
            share(){return this.posts.filter(s=>s.type == 's' && s.usuarios_id != this.session.id)},
            amigos(){return this.$store.getters.userStateArray('amigos').filter(a=>a.fotos_horario == 'todo');},
            filtrado(){
                if(this.b){
                    return this.amigos.filter(x => { return x.nombre.toLowerCase().includes(this.b.toLowerCase()) || x.telefono.toLowerCase().includes(this.b.toLowerCase()) } )
                }
                return this.amigos;
            },
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
                this.$store.dispatch('userPostCrearPost',[ this.formPost ]);
            },

        }
    }
</script>