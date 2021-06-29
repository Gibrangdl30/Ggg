<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state">
        <div class="row w-100 m-0px px-3">
            <div class="row w-100 m-0 mt-5 back-color-blanco position-relative py-3 border-radius-15px">

                <div class="w-auto position-absolute right-5px top-5px z-100" @click="closeModal()">
                    <icono icono="clear" clase="letra-verde5-40" />
                </div>

                <div class="row w-100 m-0 py-2">
                   
                    <div class="row w-100 m-0 back-color-blanco  justify-content-start px-3" v-if="state">


                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 letra-gray4-18 fw-800">Cambia el destino de tu viaje:</div>
                        </div>

                        <div class="row w-100 m-0 py-12px back-color-blanco justify-content-start">
                            <div class="w-25px my-auto px-1">
                                <imagen clase="" :icono="true" src="pin" />
                            </div>
                            <div class="col my-auto letra-gray3-15">{{servicio.calle}}</div>
                        </div>
                        
                        <div class="row w-100 m-0 py-5px justify-content-start">
                            <div class="w-30px my-auto px-1">
                                <imagen clase="" :icono="true" src="pino" />
                            </div>
                            <div class="col my-auto pl-1">
                                <div class="row w-100 m-0 letra-gray3-15 pl-1" v-if="!cancel">{{fin.calle}}</div>
                                <div class="row w-100 m-0" v-else>
                                    <inputForm input="money" :autofocus="true" clase="pl-0" type="text" placeholder="¿A donde quieres ir?" @input="getResultados()" v-model="destino" />
                                </div>
                            </div>
                            <div class="col-auto my-auto px-1" @click="cancel=true">
                                <icono icono="cancel" clase="letra-verde4-34 pt-5px" />
                            </div>
                        </div>

                        <div class="row w-100 m-0" >
                            <div class="row w-100 m-0" v-if="destino && response.length">
                                <div class="row w-100 m-0 back-color-blanco overflow-hidden">
                                    <div class="row w-100 m-0 pt-5px " >
                                        <div class="row w-100 m-0 py-2 px-2 border-b-gray1-1" :class="`${place_id==p.place_id?'back-color-gray0':''}`" v-for="p of response" :key="p.place_id" @click="place_id = p.place_id" >
                                            <geoResultado :data="p" :emit="true" @click="getGeo" @direccion="set" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row w-100 m-0 pt-3" v-if="form.calle" >
                            <div class="row w-100 m-0" @click="cambiarDestino()">
                                <botonApp texto="Cambiar destino" tipo="verde" radius="30px" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>
<script>
const moment = require('moment');
export default {
    props:[
        'data',
        'map',
        'pin',
        'index',
    ],
    data(){
        return {
            name: 'modalCambioDestino',
            cancel: false,
            destino: null,

            post_id: null,
            autocomplete: null,
            geocoder: null,
            resultados: [],

            place_id: null,            
            form: {
                lat: null,
                lng: null,
                calle: null,
                direccion: null,
            }
        };
    },
   
    computed:{
        state() {return this.$store.getters.getModal(this.name)},
        servicio(){return this.$store.getters.servicioObject('servicio');},
        ubicacion(){return {lat: Number(this.servicio.lat), lng: Number(this.servicio.lng)}; },

        chofer(){return this.servicio.chofer || {}},
        fin(){return this.servicio.destino || {}},
        response(){return this.resultados.filter((a,x)=>{return x < 3})},
    },
    mounted() {
        this.autocomplete = new google.maps.places.AutocompleteService();
        this.geocoder = new google.maps.Geocoder();
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        cancelar(){
            this.closeModal();
        },
        set([calle, dir]){
            this.form.calle = calle;
            this.form.direccion = dir;
            this.destino = calle;
        },
        getResultadosInicio(){
            let options = {
                input:      this.inicio.calle,
                location:   new google.maps.LatLng(this.ubicacion.lat, this.ubicacion.lng),
                radius:      10000,
            };

            this.searchInicio = true;
            // console.log("PROBANDO", this.ubicacion);
            this.post_id =  _.uniqueId('post_');
            let id = this.post_id;
            this.postInicio(id,options);
        },
        
        getResultados(){
            let options = {
                input:      this.destino,
                location:   new google.maps.LatLng(this.ubicacion.lat, this.ubicacion.lng),
                radius:      10000,
            };

            // console.log("PROBANDO", this.ubicacion);
            this.searchInicio = false;
            this.post_id =  _.uniqueId('post_');
            let id = this.post_id;
            this.post(id,options);
        },

        post(id,options){
            this.autocomplete.getPlacePredictions(options, 
            (resultado,estatus)=>{
                if (estatus == 'OK') {
                    // console.log("resultados", resultado);
                    if(id == this.post_id){
                        this.resultados = resultado;
                    }
                }
                
            });
        },

        getGeo(place){
            this.$store.commit('initLoader');
            this.geocoder.geocode({'placeId': place.place_id, 'region': 'MX'},
            (results, status)=>{
                this.$store.commit('finishLoader');
                if (status == 'OK') {
                    let data = results[0];

                    this.form.lat = data.geometry.location.lat();
                    this.form.lng = data.geometry.location.lng();
                }
            });
        },

        trazarRuta(){
            console.log("TRAZANDO RUTA");
            this.$store.dispatch('postGetDistanciaResponse',[this.inicio, this.fin]).then(
                res=>{
                    console.log("RES",res);
                    let datos = res.routes.find(r=>{return true});
                    datos = datos.legs.find(r=>{return true});
                    this.$store.commit('setViajeStateObject',['ruta','distancia', datos.distance.value]);
                    this.$store.commit('setViajeStateObject',['ruta','tiempo', datos.duration_in_traffic.value]);

                },error=>{});
        },

        cambiarDestino(){
            this.$store.dispatch('postCambiarDestino', this.form);
        }
        
    },
}
</script>