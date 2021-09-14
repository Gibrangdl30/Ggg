<template>
    <f7-page class="" id="inicio">
        <div class="vista">
            <nav-bar tipo="inicio" title="" :backs="true"   />

            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0">
                        <imagen :create="true" :src="formPost.imagen" />
                    </div>
                </div>
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 py-3 ">
                        <div class="col px-0 pl-3 ">
                            <busquedaInput v-model="b" />
                        </div>
                        <div class="col px-0">
                            <div class="row w-100 m-0 px-2" @click="publico()">
                                <div    class="row w-100 m-0 py-2px border-radius-30px " 
                                        :class="`${formPost.usuarios.length==0?'letra-blanco-18 back-color-azul1 border-azul1-1 ':'letra-gray3-18 border-gray3-1'}`" >
                                    <div class="col-auto px-0 my-auto ml-auto">Everybody</div>
                                    <div class="col-auto px-0 pl-2 mr-auto">
                                        <icono icono="done" clase="letra-blanco-26 pt-4px" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 pt-2 px-3">
                    <div class="row w-100 m-0 letra-gray4-18">Friends</div>
                    <div class="row w-100 m-0" v-for="a of filtrado" :key="a.id">
                        <amigosRow :data="a" v-model="formPost" :check="formPost.usuarios.some(x=>x.id == a.id)" @set="set"  />
                    </div>
                </div>

            </div>

            <div class="row w-100 m-0 px-2 py-2">
                <div class="row w-100 m-0 px-3 py-2 pb-3" @click="save()">
                    <botonApp texto="Create post" tipo="azul" radius="30px" />
                </div>
            </div>

            
        </div>

    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment-timezone');

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                b: null,
                zona: moment.tz.guess(),
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            formPost(){return this.$store.getters.userStateObject('formPost');},
            amigos(){return this.$store.getters.userStateArray('amigos');},
            filtrado(){
                if(this.b){
                    return this.amigos.filter(x => { return x.nombre.toLowerCase().includes(this.b.toLowerCase()) || x.telefono.toLowerCase().includes(this.b.toLowerCase()) } )
                }
                return this.amigos;
            },
        },

        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
            // console.log("···············", this.zona);
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
                this.formPost.usuarios = [];
            },

            save(){
                this.$store.dispatch('userPostCrearPost',[ this.formPost ]);
            },

        }
    }
</script>