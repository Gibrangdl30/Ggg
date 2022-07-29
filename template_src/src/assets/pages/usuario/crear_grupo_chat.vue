<template>
    <f7-page class="" id="inicio">

        <div class="vista">
            <nav-bar tipo="inicio" title="New group" :fix="1" :backs="true"   />

             <div class="row w-100 m-0 mt-3 px-3 justify-content-center">
                        <div class="col-auto px-0 text-center my-auto position-relative">
                            <div class="w-30vw h-30vw mx-auto" >
                                <uploadImagen 
                                rad="50"
                                bcolor="azul1"
                                bsize="3"
                                :user="false" 
                                v-model="form.imagen" 
                                 />
                            </div>
                        </div>
                    </div>

            <div class="row w-100 m-0">
                <div class="row w-100 m-0 py-3 px-3">
                    <inputForm texto="Name:" type="text" placeholder="" v-model="form.nombre" />
                </div>
            </div>

            <div class="row w-100 m-0">
                <div class="row w-100 m-0 letra-gray3-18 justify-content-center text-center ">Select the users to join on your group</div>
            </div>

            <div class="row w-100 m-0">
                <div class="row w-100 m-0 px-3 py-3">
                    <busquedaInput v-model="b" />
                </div>
            </div>

            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0 pt-2 px-4">
                    <div class="row w-100 m-0" v-for="a of filtrado" :key="a.id">
                        <amigosRow 
                            :selectable="true" 
                            :data="a"
                            :check="usuarios.some(x=>x.id == a.id)"
                            @set="set"
                        />
                    </div>
                    
                </div>

            </div>

            <div class="row w-100 m-0 border-t-gray0-1">
                <div class="row w-100 m-0 py-3 px-3">
                    <div class="col-7 mx-auto px-0" @click="next()">
                        <botonApp texto="Create group" tipo="azul" radius="30px" />
                    </div>
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
                form:{
                    imagen: null,
                    nombre: null,
                },
                usuarios: [],
                b: null,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
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
                let indx = this.usuarios.findIndex(x=>{return x.id == u.id});
                if(indx == -1){
                    this.usuarios.push(u);
                }
                else{
                    this.usuarios = this.usuarios.filter(s=>s.id != u.id);
                }
                console.log("USUARIOS", this.usuarios);
            },

            next(){
                console.log("INIT CHATD");
                if(!this.form.nombre){
                    swal("","Enter name to continue","");
                    return;
                }
                if(!this.usuarios.length){
                    swal("","Select users for your group","");
                    return;
                }
                this.$store.dispatch('userPostCreateGroup',[this.form, this.usuarios]);
            },

        }
    }
</script>