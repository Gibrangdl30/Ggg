<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Buscar amigos'" ></nav-bar>
            <div class="contenedor-page">
               <div class="row w-100 m-0">
                   <div class="row w-100 m-0">
                       <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                           <div class="col px-0 letra-gray3-20">Invitar por correo electronico</div>
                            <div class="col-auto my-auto px-0">
                                <div class="row w-100 m-0">
                                    <div class="w-50px border-radius-5px back-color-azul1 py-1 justify-content-center text-center" @click=" router.navigate('/enviar_invitacion') ">
                                        <icono icono="send" clase="letra-blanco-20 pt-4px" />
                                    </div>
                                </div>
                            </div>
                       </div>
                   </div>
                   <div class="row w-100 m-0">
                       <div class="row w-100 m-0 border-b-azul1-1">
                            <div class="col-6 px-0" @click="tab = 1" >
                               <div class="row w-100 m-0 justify-content-center py-2" :class="(tab==1?'letra-blanco-18 back-color-azul1':'letra-azul1-18 back-color-blanco')">Usuarios Socialflow</div>
                            </div>
                           <div class="col-6 px-0" @click="tab = 2">
                               <div class="row w-100 m-0 justify-content-center py-2" :class="(tab==2?'letra-blanco-18 back-color-azul1':'letra-azul1-18 back-color-blanco')">Mi agenda</div>
                           </div>
                       </div>
                   </div>
                   <template v-if="tab == 1">
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 px-3 py-3">
                            <busquedaInput v-model="b" />
                        </div>
                    </div>
                    <div class="row w-100 m-0 px-2 border-b-gray0-1">
                        <div class="row w-100 m-0 px-3 py-2">
                            <div class="col my-auto px-0 letra-gray3-18">Invitar a todos</div>
                            <div class="col-auto my-auto px-0 letra-gray3-18">
                                <div class="row w-100 m-0">
                                    <div class="w-45px border-radius-5px back-color-azul1 py-2px justify-content-center text-center" @click="init()">
                                        <icono icono="check_box" clase="letra-blanco-30 pt-4px" v-if="todos" />
                                        <icono icono="check_box_outline_blank" clase="letra-blanco-30 pt-4px" v-else />
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto my-auto my-auto px-0" v-if="!all || !all.length">
                                <div class="row w-100 m-0">
                                    <div class="w-50px border-radius-5px py-8px justify-content-center text-center">
                                        <icono icono="send" clase="letra-blanco-20 pt-4px" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 m-0" v-for="a of busqueda" :key="a.id">
                       <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                           <div class="w-15vw h-15vw my-auto">
                               <imagen clase="border-radius-50" :src="a.foto" :fit="true" :user="true" />
                           </div>
                            <div class="col my-auto px-0 pl-3">
                               <div class="row w-100 m-0 letra-gray4-18">{{a.nombre}}</div>
                               <div class="row w-100 m-0 letra-gray3-16">{{a.email | truncate(20)}}</div>
                               <!-- <div class="row w-100 m-0 letra-gray3-16">{{a.usuario.email}}</div> -->
                            </div>

                            <div class="col-auto my-auto px-0">
                                <div class="row w-100 m-0 pr-2">
                                    <div class="w-45px border-radius-5px back-color-azul1 py-2px justify-content-center text-center" @click=" add(a) ">
                                        <icono icono="check_box" clase="letra-blanco-30 pt-4px" v-if="all.find(x=>{return x == a.id})" />
                                        <icono icono="check_box_outline_blank" clase="letra-blanco-30 pt-4px" v-else />
                                    </div>
                                </div>
                            </div>

                            <div class="col-auto my-auto px-0" v-if="!all || !all.length">
                                <div class="row w-100 m-0">
                                    <div class="w-50px border-radius-5px back-color-azul1 py-8px justify-content-center text-center" @click=" send(a) ">
                                        <icono icono="send" clase="letra-blanco-20 pt-4px" />
                                    </div>
                                </div>
                            </div>
                       </div>
                    </div>
                   </template>

                   <template v-if="tab == 2">
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 px-3 py-3">
                            <busquedaInput v-model="c" />
                        </div>
                    </div>
                    <div class="row w-100 m-0" v-for="a of contactos" :key="a.id">
                       <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                           <div class="w-15vw h-15vw my-auto">
                               <imagen clase="border-radius-50" :src="a.foto" :fit="true" :user="true" />
                           </div>
                            <div class="col my-auto px-0 pl-3">
                               <div class="row w-100 m-0 letra-gray4-18">{{a.nombre}}</div>
                               <div class="row w-100 m-0 letra-verde3-17">Tel. {{a.telefono}}</div>
                            </div>

                            <div class="col-auto my-auto px-0">
                                <div class="row w-100 m-0">
                                    <div class="w-50px border-radius-5px back-color-azul1 py-8px justify-content-center text-center" @click=" sendX(a) ">
                                        <icono icono="send" clase="letra-blanco-20 pt-4px" />
                                    </div>
                                </div>
                            </div>
                       </div>
                    </div>
                   </template>

               </div>
            </div>

            <div class="row w-100 m-0" v-if="tab == 1" >
                <div class="row w-100 m-0 pb-4 pt-3 back-color-blanco border-t-azul1-1" v-if="all && all.length" >
                    <div class="row w-100 m-0 px-3 pb-3 pb-ios-30px" @click="sends()">
                    <botonApp texto="Enviar" tipo="azul" radius="30px" />
                    </div>
                </div>
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
                b: null,
                c: null,
                tab: 1,
                todos: false,
                all: [],
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            usuarios(){return this.$store.getters.userStateArray('usuarios');},
            amigos(){return this.$store.getters.userStateArray('amigos');},
            filtrado(){ return this.usuarios.filter( x=>{ return this.amigos.find( y=>{ return y.amigos_id == x.id || y.usuarios_id == x.id; } ) == undefined } ); },
            busqueda() { 
                if(this.b){
                    return this.filtrado.filter( x=>{ return x.email.toLowerCase().includes( this.b.toLowerCase() ) } );
                }
                return this.filtrado;
            },

            agenda(){ return this.$store.getters.getCatalogo('contactos') },

            contactos(){
                if(this.c){
                    return this.agenda.filter(x => { return x.nombre.toLowerCase().includes( this.c.toLowerCase() ) });
                }
                return this.agenda;
            },
        },
        methods:{
            send(a){
                this.$store.dispatch('postEnviarSolicitud', a );
            },

            init(){
                if(this.todos){
                    this.all = [];
                    this.todos = false;
                }
                else{
                    this.all = [];
                    this.filtrado.map(x=>{
                        this.all.push(x.id);
                    });
                    this.todos = true;
                    console.log("PUSHING", this.all, this.todos, this.agenda);
                }
            },

            sendX(s){
                if(!s.telefono){
                    swal("el numero de teléfono no es correcto");
                    return;
                }

                let texto = `Hola, te invito a descargar la app de Socialflow en https://socialflow.app`;
                
                texto = texto.replace(/ /g,'%20');
                // console.log("========>", texto);

                let url = `https://api.whatsapp.com/send?phone=${s.telefono}&text=${texto}`;
                try{
                    cordova.InAppBrowser.open(url, '_system');
                }catch(e){};
            },

            sends(){
                this.$store.dispatch('postEnviarSolicitudes', this.all );
            },
            add(e){
                let i = this.all.findIndex(x=>{return x == e.id});
                if(i != -1){
                    this.all.splice(i, 1);
                }
                else{
                    this.all.push(e.id);
                }
            }
        }
    }
</script>