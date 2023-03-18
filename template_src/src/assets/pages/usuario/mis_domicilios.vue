<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            
            <!-- <div @click="$store.dispatch('scroll','y708')" class="w-45px h-45px border-radius-50 position-absolute bottom-3 right-44 opacity-7 back-color-gray1 justify-content-center text-center align-content-center z-index-10000 " >
                <icono icono="keyboard_arrow_down" clase="letra-blanco-45 pt-1px" />
            </div> -->

            <nav-bar tipo="inicio" :backs="true" :fix="1" :title="'Mis direcciones'"></nav-bar>

            <div class="row w-100 m-0 back-color-rojo py-10px " @click="nuevo()">
                <div class="row w-100 m-0 px-3 letra-blanco-16 justify-content-center text-center ">
                    <div class="col-auto my-auto pr-0 pl-25px ml-auto pb-5px">Nueva dirección</div>
                    <div class="col-auto my-auto px-0 ml-auto"  >
                        <icono icono="add" clase="letra-blanco-30 fw-600" />
                    </div>
                </div>
            </div>
            
            <div id="y708" class="contenedor-page">
                <!-- <div class="row w-100 m-0 pt-2 px-3 justify-content-center">
                    <div class="col-8 px-0 pt-3 pb-2">
                        <imagen src="https://joomy.app/fixeapi/imagenes/avi.png" />
                    </div>
                </div> -->
                <div class="row w-100 m-0">
                    
                   <div class="row w-100 m-0" v-for="a of domicilios" :key="a.id">
                       <div class="row w-100 m-0 px-2 py-2 border-b-gray0-1" @click="set(a.id)" >
                            <div class="col my-auto px-0 ">
                               <div class="row w-100 m-0 letra-gray3-17">{{a.calle}} {{a.numero}}</div>
                               <!-- <div class="row w-100 m-0 letra-gray4-15">{{`${a.municipio}, ${a.estado}`}}</div> -->
                            </div>
                           <div class="col-auto my-auto px-0 mr-4">
                                <icono icono="radio_button_checked" clase="letra-rojo-30" v-if="domicilio.id == a.id" />
                                <icono icono="radio_button_unchecked" clase="letra-gray3-30" v-else  />
                                <!-- <toggle 
                                    :auto="true" 
                                    :checked="domicilio.id == a.id" 
                                    :v="a.id"
                                    @change="set" 
                                /> -->
                           </div>
                           <div class="col-auto my-auto px-0 ml-2 pb-8px">
                                <boton-icono @click="eliminar(a)" :noborder="true" icono="delete"/>
                            </div>
                       </div>
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
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            domicilios(){return this.$store.getters.carritoArray('domicilios');},
            domicilio(){
                console.log("SETIND", );
                return this.$store.getters.carritoFind('domicilios','domicilio');
            },
        },
        methods:{
            nuevo(){
                if(!this.session.token){
                    this.$store.commit('openModal',['modalSession']);
                    return;
                }
                this.router.navigate('/nuevo_domicilio');
            },
            set(id){
                this.$store.commit('setCarritosState',['domicilio', id]);
                console.log("SETTING",id,this.domicilio);
                // this.$store.dispatch('synchronizeData');
            },
            eliminar(a){
                this.$store.dispatch('postEliminarDireccion',a);
            }
            
        }
    }
</script>