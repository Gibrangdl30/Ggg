<template>
    <f7-page class="" id="inicio">

        <div class="vista">
            <nav-bar tipo="inicio" :no_border="1" title="" :backs="1" :logo="0" :profile="0"  />

            <div class="contenedor-page-tabs position-relative">

                <div class="row w-100 m-0 ">

                    <div class="row w-100 m-0 z-10000 position-absolute  top-0px left-0px">
                        <div class="h-70vw w-100 ">
                            <imagen :src="evento.foto"  />
                        </div>
                    </div>

                    <div class="row w-100 m-0 z-10000000 pt-3">
                        <div class="w-35vw h-35vw carta back-color-blanco border-radius-50 mx-auto overflow-hidden p-3">
                            <imagen :src="evento.imagen" clase="border-radius-50" />
                        </div>
                    </div>

                    <div class="row w-100 m-0 z-10000000">
                        <div class="row w-100 m-0 py-3 px-3">
                            <div class="row w-100 m-0 carta px-3 py-3">
                                <div class="row w-100 m-0 letra-gray4-20 fw-600">{{evento.name_field}}</div>
                                <div class="row w-100 m-0 pt-1 letra-gray3-16 text-capitalize " v-if="evento.address"> {{evento.address}}</div>
                                <div class="row w-100 m-0 pt-1 letra-gray3-16 text-capitalize " v-if="dire && dire.street"> {{dire.street}} {{ dire.num_ext }}, {{ dire.neighborhood }} </div>
                                <div class="row w-100 m-0 pt-1 letra-gray3-17 " @click="$store.dispatch('call', evento.phone )" >
                                    <div class="col-auto px-0">
                                        <icono icono="call" clase="letra-gray4-28" />
                                    </div>
                                    <div class="col px-0">{{evento.phone}}</div>
                                </div>
                                <div class="row w-100 m-0 pt-1 letra-gray3-17 ">
                                    <div class="col-auto px-0">
                                        <icono icono="location_on" clase="letra-gray4-28" />
                                    </div>
                                    <div class="col px-0">A {{(evento.tiempo || 25)}} min de ti</div>
                                </div>
                                <template v-if="0" >
                                    <div class="row w-100 m-0 pt-1 letra-gray3-17 ">
                                        <div class="col px-0">{{campos.length?campos.length+' canchas disponibles':'Sin canchas disponibles'}}</div>
                                        <div class="col px-0">$500.00 - $1000.00</div>
                                    </div>
                                </template>
                                <div class="row w-100 m-0 letra-gray4-23 "></div>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <template v-if="0" >
                    <div class="row w-100 m-0 px-3 letra-gray3-18">Amenidades</div>
                    <div class="row w-100 m-0 pt-2 pb-2"  >
                        <div class="row w-100 m-0 px-3">
                            <amenidades />
                        </div>
                    </div>
                </template>

                <template v-if="gale && gale.length" >
                    <div class="row w-100 m-0 px-3 letra-gray3-18">Galeria</div>
                    <div class="row w-100 m-0 pt-2 pb-2"  >
                        <div class="row w-100 m-0 px-3">
                            <carruselFotos :fotos="gale" />
                        </div>
                    </div>
                </template>
                
                <div class="row w-100 m-0 px-3 letra-gray3-18">Canchas disponibles</div>
                <div class="row w-100 m-0 pt-2 pb-2"  >
                    <div class="row w-100 m-0 px-3 py-2" v-for="a of campos" :key="a.id" >
                        <instalcionesComponent :data="a" :campo="1" v-model="selected" />
                    </div>
                </div>

                <div class="row w-100 m-0 py-4"></div>

            </div>

            <template v-if="selected && selected.id" >
                <template v-if="step==1">
                    <div  @click.self="selected = null" class="row w-100 h-100 m-0 back-color-negro1 z-10000000 position-absolute bottom-0px left-0px">
                        
                        <div class="row w-100 m-0 carta my-auto " >
                            <div class="row w-100 m-0 px-2 ">
                                <div class="col-auto px-0 ml-auto" @click="selected = null" >
                                    <icono icono="close" clase="letra-rojo-40" />
                                </div>   
                            </div>
                            <div class="row w-100 m-0 px-3 pb-3">
                                <instalcionesComponent :data="selected" :campo="1"  />
                            </div>
                            <div class="row w-100 m-0">
                                <calendario v-model="form" :data="selected" />
                            </div>
                            <div class="row w-100 m-0 px-2 pb-4">
                                <div class="row w-100 m-0 back-color-azul border-radius-30px">
                                    <div class="row w-100 m-0 py-2 px-3 justify-content-start ">
                                        <div class="col-auto px-0" @click="form.horas>1?form.horas--:form.horas++">
                                            <icono icono="chevron_left" clase="letra-blanco-30" />
                                        </div>
                                        <div class="w-20vw">
                                            <div class="row w-100 m-0 letra-blanco-20 justify-content-center text-center ">{{form.horas}} {{form.horas==1?'hora':'horas'}}</div>
                                        </div>
                                        <div class="col-auto px-0" @click="form.horas++">
                                            <icono icono="chevron_right" clase="letra-blanco-30" />
                                        </div>
                                        <div @click="step=2; pre();" class="col-auto mx-auto px-2 letra-blanco-20 text-center fw-800">Reservar</div>
                                        <div @click="step=2; pre();" class="col-auto px-0 letra-blanco-20">{{(form.horas*Number(selected.price)) | currency }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-if="step == 2" >
                    <div @click.self="step = 1" class="row w-100 h-100 m-0 back-color-negro1 z-10000000 position-absolute bottom-0px left-0px">
                        
                        <div class="row w-100 m-0 carta my-auto ">
                            <div class="row w-100 m-0 px-3 py-3">
                                <instalcionesComponent :data="selected" :campo="1"  />
                                <div class="w-auto px-0 position-absolute top-15px right-15px z-1000000000">
                                    <icono clase="letra-gray4-25" icono="close" />
                                </div>
                            </div>
                            <div class="row w-100 m-0 px-3 py-2">
                                <div class="row w-100 m-0 letra-gray4-18 fw-600">Fecha: {{form.fecha | fechaD}}</div>
                                <div class="row w-100 m-0 pt-1 letra-gray3-18 fw-600">Tiempo: {{form.horas}} {{form.horas==1?'hora':'horas'}}</div>
                                <div class="row w-100 m-0 pt-1 letra-rojo1-18 justify-content-start ">
                                    <div class="col-auto px-0">Hora:</div>
                                    <div class="col-auto px-0 pl-1">{{form.hora | horaH}} </div>
                                    <div class="col-auto px-1 px-0">-</div>
                                    <div class="col-auto px-0">{{form.fin | horaH}}</div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 px-2 pt-3 pb-4">
                                <div class="row w-100 m-0 back-color-azul border-radius-30px">
                                    <div class="row w-100 m-0 py-2 px-3 justify-content-start ">
                                     
                                        <div @click="reservar()" class="col-auto mx-auto px-2 letra-blanco-20 text-center fw-800">Reservar</div>
                                        <div @click="reservar()" class=" col-auto px-0 letra-blanco-20">{{(form.horas*Number(selected.price)) | currency }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </template>

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
                ins: 0,
                b: null,
                modal: null,
                modal2: null,
                c: 15,
                step: 1,
                add: 5,
                selected: null,
                hoy: moment().format('YYYY-MM-DD'),
                form: {
                    id: null,
                    precio: null,
                    fecha: moment().format('YYYY-MM-DD'),
                    hora: '14:00:00',
                    fin: null,
                    horas: 1,
                },
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            instalciones(){return this.$store.getters.info('instalciones') },
            evento(){return this.$store.getters.dataFind('instalciones', 'instalacion') },
            dire(){return this.evento.dire || {}},
            campos(){return this.evento.campos || {}},
            gale(){return this.evento.gale || []},

            lugar(){return this.evento.lugar || {}},
            zonas(){return this.evento.lugar || []},
        },

        mounted(){
        },

        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },

            back(ruta){
                this.router.back(ruta);
            },

            cancelar(){
                let form = this.asignado;
                form.cancelar = 1;
                this.$store.dispatch('userPostCrearPost',[ form ]);
                form.cancelar = 0;
            },

            reco(tipo = 1){
                this.$store.commit('setUsD',['tipo', tipo]);
                this.$store.commit('openModal',['modalHijosRecoleccion']);
            },

            pre(){
                this.form.fin = moment(this.form.hora,'HH:mm:ss').add(this.form.horas, 'hours').format('HH:mm:ss');
                this.form.id = this.selected.id;
                this.form.precio = this.selected.price;
            },
            
            reservar(){
                this.form.fin = moment(this.form.hora,'HH:mm:ss').add(this.form.horas, 'hours').format('HH:mm:ss');
                this.form.id = this.selected.id;
                this.form.precio = this.selected.price;

                console.log("RES RES", this.form, this.selected);
                this.$store.dispatch('postCrearReservacion', {form: this.form,});
            },

        }
    }
</script>