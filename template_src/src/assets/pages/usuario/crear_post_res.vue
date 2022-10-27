<template>
    <f7-page class="" id="inicio">
        <div class="vista"  >
            <nav-bar tipo="inicio" title="Compartir resultado" :backs="true" :fix="1"   />

            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0 pt-4 ">
                    <div class="row w-100 m-0 px-3">
                        <div class="col px-0">
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 justify-content-center text-center ">
                                    <div class="w-25vw h-25vw border-radius-50 overflow-hidden">
                                        <imagen :perfil="1" />
                                    </div>
                                </div>
                                <div class="row w-100 m-0 pt-2 justify-content-center text-center letra-gray3-16">{{session.nombre}}</div>
                            </div>
                            <div class="row w-100 m-0 px-4">
                                <div class="row w-100 m-0 pt-2 border-b-gray0-2"></div>
                            </div>
                            <div class="row w-100 m-0 pt-3" @click="selectUser('user_equipo')">
                                <div class="row w-100 m-0 justify-content-center text-center ">
                                    <div class="w-25vw h-25vw border-radius-50 overflow-hidden">
                                        <imagen :user="1" :src="equipo.foto" />
                                    </div>
                                </div>
                                <div class="row w-100 m-0 pt-2 justify-content-center text-center  letra-gray3-16">{{equipo.nombre || 'Selecciona un usuario'}}</div>
                            </div>
                        </div>

                        <div class="col-auto my-auto px-0 px-1 letra-azul-25 fw-800">VS</div>
                        <template>
                            <div class="col px-0">
                                <div class="row w-100 m-0" @click="selectUser('user_rival1')">
                                    <div class="row w-100 m-0 justify-content-center text-center ">
                                        <div class="w-25vw h-25vw border-radius-50 overflow-hidden">
                                            <imagen :user="1" :src="rival1.foto" />
                                        </div>
                                    </div>
                                    <div class="row w-100 m-0 pt-2 justify-content-center text-center  letra-gray3-16">{{rival1.nombre || 'Selecciona un usuario'}}</div>
                                </div>
                                <div class="row w-100 m-0 px-4">
                                    <div class="row w-100 m-0 pt-2 border-b-gray0-2"></div>
                                </div>
                                <div class="row w-100 m-0 pt-3" @click="selectUser('user_rival2')">
                                    <div class="row w-100 m-0 justify-content-center text-center ">
                                        <div class="w-25vw h-25vw border-radius-50 overflow-hidden">
                                            <imagen :user="1" :src="rival2.foto" />
                                        </div>
                                    </div>
                                    <div class="row w-100 m-0 pt-2 justify-content-center text-center letra-gray3-16">{{rival2.nombre || 'Selecciona un usuario'}}</div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>

                <div class="row w-100 m-0 px-4">
                    <div class="row w-100 m-0 pt-2 border-b-gray0-2"></div>
                </div>

                <div class="row w-100 m-0 px-4">
                    <div class="row w-100 m-0 pt-4 letra-gray4-17">Marcador</div>
                    <div class="row w-100 m-0 py-3">
                        <div class="col-4 px-0 px-1" v-for="s of form.sets" >
                            <div class="row w-100 m-0 border-gray01-1 border-radius-10px ">
                                <div class="row w-100 m-0 justify-content-center text-center letra-rojo-25 fw-800">{{s.set}}</div>
                                <div class="row w-100 m-0 justify-content-center text-center letra-rojo-20 fw-600">Set</div>
                                <div class="row w-100 m-0 py-2">
                                    <div class="col-auto my-auto px-0 pt-5px" @click="s.local?s.local--: s.local">
                                        <icono icono="chevron_left" class="letra-azul-40" />
                                    </div>
                                    <div class="col my-auto px-0 justify-content-center text-center letra-gray3-27 " >{{s.local}}</div>
                                    <div class="col-auto my-auto px-0 pt-5px" @click="s.local<7?s.local++:s.local" >
                                        <icono icono="chevron_right" class="letra-azul-40" />
                                    </div>
                                </div>
                                
                                <div class="row w-100 m-0 py-2">
                                    <div class="col-auto my-auto px-0 pt-5px" @click="s.visitante?s.visitante--: s.visitante">
                                        <icono icono="chevron_left" class="letra-azul-40" />
                                    </div>
                                    <div class="col my-auto px-0 justify-content-center text-center letra-gray3-27 " >{{s.visitante}}</div>
                                    <div class="col-auto my-auto px-0 pt-5px" @click="s.visitante<7?s.visitante++:s.visitante" >
                                        <icono icono="chevron_right" class="letra-azul-40" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div class="row w-100 m-0">
                    <div class="col-12 mt-3" v-if="0" >
                        <inputForm type="text" texto="Título de post:" placeholder="" v-model="form.titulo" />
                    </div>
                    
                    <div class="col-12 mt-3" v-if="0" >
                        <inputForm type="text" texto="Tipo de post:" placeholder="" v-model="form.tipo" />
                    </div>
                    
                    <div class="col-12 mt-3" >
                        <inputForm :textarea="1" :rows="4" type="text" texto="Comentarios:" placeholder="" v-model="form.comentarios" />
                    </div>
                </div>

                <div class="row w-100 m-0 py-3"></div>

            </div>

            <div class="row w-100 m-0 px-2 py-2 border-t-azul-2">
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
                    juego: 1,
                    imagen: null,
                    titulo: null,
                    post: null,
                    comentarios: null,
                    tipo: 1,
                    sets:[
                        {id: 1, set: '1er', local: 0, visitante: 0, ganador: 'local' },
                        {id: 2, set: '2do', local: 0, visitante: 0, ganador: 'local' },
                        {id: 3, set: '3er', local: 0, visitante: 0, ganador: 'local' },
                    ],
                    user_equipo: null,
                    user_rival1: null,
                    user_rival2: null,
                },
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            usuarios(){return this.$store.getters.info('usuarios') },
            getx(){ return (x)=>{ return this.$store.getters.postStateObject(x) } },
            equipo(){return this.usuarios.find(u=>u.id == this.getx('user_equipo')) || {}},
            rival1(){return this.usuarios.find(u=>u.id == this.getx('user_rival1')) || {}},
            rival2(){return this.usuarios.find(u=>u.id == this.getx('user_rival2')) || {}},

        },

        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
            console.log("USUARIOS", this.equipo )
        },

        methods:{

            go(ruta){
                this.router.navigate(ruta);
            },

            selectUser(u){
                this.$store.commit('setPostState',['campo', u]);
                this.router.navigate('/seleccionar_usuarios_post');
                console.log("GO POST");
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
                this.form.user_equipo = this.getx('user_equipo');
                this.form.user_rival1 = this.getx('user_rival1');
                this.form.user_rival2 = this.getx('user_rival2');

                this.$store.dispatch('postPostCrearPost',[ this.form, ()=>{
                    this.router.back();
                    swal({title:"",text:"Post creado, podrás verlo en el feed",icon:"success", button: 'Entendido'});  
                }]);
            },

        }
    }
</script>