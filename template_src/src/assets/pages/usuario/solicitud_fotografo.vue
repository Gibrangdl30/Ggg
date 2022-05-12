<template>
    <f7-page id="inicio" >
        <modalSearchDireccion @resultado="resultado"/>
        
        <div class="vista" v-vistak>

            <nav-bar clase="pt-0px" tipo="inicio" :backs="true" :color="false" :title="'Solicita un Paparatz'" :fix="1" />

            <div id="direccionnueva" class="contenedor-page back-color-blanco">

                <div class="row w-100 m-0 pt-2 pb-2">
                    <!-- <div class="row w-100 m-0 letra-gray4-18 justify-content-center text-center ">Pide un Paparatz</div> -->
                    <div class="row w-100 m-0 letra-gray3-15 px-4 justify-content-center text-center ">Escribe una breve descripcion de porque necesitas un paparatz y tu ubicación</div>
                </div>

                <div class="row w-100 m-0 px-3">
                    <inputForm :textarea="true" :rows="2" :auto="true" type="text" placeholder="" input="form" v-model="form.descripcion"  />
                </div>

                <div class="row w-100 m-0 pt-2 "> 
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 letra-gray4-18 justify-content-center text-center ">Rango de distancia</div>
                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 py-1">
                                <div class="col px-1" @click="form.rango = 5">
                                    <div :class="`${form.rango == 5?'letra-blanco-16 back-color-verde1':'letra-verde1-16'}`" class="row w-100 m-0 py-2px border-verde1-1 justify-content-center text-center border-radius-10px " >5 metros</div>
                                </div>
                                <div class="col px-1" @click="form.rango = 10">
                                    <div :class="`${form.rango == 10?'letra-blanco-16 back-color-verde1':'letra-verde1-16'}`" class="row w-100 m-0 py-2px border-verde1-1 justify-content-center text-center border-radius-10px " >10 metros</div>
                                </div>
                                <div class="col px-1" @click="form.rango = 10*50">
                                    <div :class="`${form.rango == 10*50?'letra-blanco-16 back-color-verde1':'letra-verde1-16'}`" class="row w-100 m-0 py-2px border-verde1-1 justify-content-center text-center border-radius-10px " >500 metros</div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="row w-100 m-0 letra-gray3-16 justify-content-center text-center ">500 mts</div> -->
                    </div>
                    <div class="row w-100 m-0 h-30vh">
                        <div class="row w-100 m-0 h-30vh">
                            <mapaPick v-model="form"  @search="$store.commit('openModal',['modalDireccion'])" />
                        </div>
                    </div>
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 pt-2">
                            <div class="col px-1" @click="form.time = 30">
                                <div :class="`${form.time == 30?'letra-blanco-16 back-color-verde1':'letra-verde1-16'}`" class="row w-100 m-0 py-2px border-verde1-1 justify-content-center text-center border-radius-10px " >30 minutos</div>
                            </div>
                            <div class="col px-1" @click="form.time = 60*4">
                                <div :class="`${form.time == 60*4?'letra-blanco-16 back-color-verde1':'letra-verde1-16'}`" class="row w-100 m-0 py-2px border-verde1-1 justify-content-center text-center border-radius-10px " >4 horas</div>
                            </div>
                            <div class="col px-1" @click="form.time = 60*8">
                                <div :class="`${form.time == 60*8?'letra-blanco-16 back-color-verde1':'letra-verde1-16'}`" class="row w-100 m-0 py-2px border-verde1-1 justify-content-center text-center border-radius-10px " >Todo el dia</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 px-3 py-2" v-if="0">
                    <div class="row w-100 m-0 py-2">
                        <div class="col px-0 letra-gray3-4-2vw">Ubicación</div>
                    </div>
                    <div class="row w-100 m-0 letra-gray38-4-1vw">
                        <div class="w-65 pl-0 pr-1 my-auto ">{{form.direccion}}</div>
                        <div class="w-35 pl-1 pr-0 my-auto ">
                            <inputForm type="text" :scroll="true" contendorId="direccionnueva" texto="Numero interior:" placeholder="123" v-model="form.numero_interior"  />
                        </div>
                    </div>
                    <div class="row w-100 m-0 py-2 pt-4">
                        <inputForm type="text" :scroll="true" contendorId="direccionnueva" :textarea="true" rows="4" texto="Indicaciones:" placeholder="" v-model="form.indicaciones" />
                    </div>
                </div>

                <div class="row w-100 m-0 pt-3 pb-3 px-2 ">
                    <div class="col-12 mx-auto px-0">
                        <botonApp @click="save()" tipo="verde" texto="¡Solicitar Paparatz!" radius="20px" />
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
                    descripcion: null,
                    direccion: null,
                    numero_interior: null,
                    indicaciones: null,
                    lat: null,
                    lng: null,
                    rango: 500,
                    time: 30,
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
                this.form.solicitud = 1;
                this.$store.dispatch('userPostCrearPost',[ this.form ]);
            },

        }
    }
</script>