<template>
<div class="row w-100 m-0 py-2">
    <div class="row w-100 m-0 px-3 py-12px back-color-blanco carta justify-content-start border-radius-25px" v-if="paso == 0" @click="next()">
        <div class="w-25px my-auto px-1">
            <imagen clase="" :icono="true" src="pin" />
        </div>
        <!-- <div class="col my-auto letra-gray3-15 pl-1">¿Donde te recolectamos?</div> -->
        <div class="col my-auto letra-gray3-15 pl-1">Punto de partida</div>
    </div>

    <div class="row w-100 m-0 px-3 back-color-blanco carta justify-content-start border-radius-25px" v-if="paso == 1">

        

        <div class="row w-100 m-0 pt-15px pb-10px justify-content-start">
            <div class="w-25px my-auto px-1">
                <imagen clase="" :icono="true" src="pin" />
            </div>
            <!-- <div class="col my-auto letra-gray3-15 pl-1">{{inicio.calle}}</div> -->
            <div class="col my-auto pl-1 pr-0">
                <div class="row w-100 m-0">
                    <inputForm input="money"  clase="pl-0 pt-2" type="text" placeholder="Punto de partida" @input="getResultadosInicio()" v-model="inicio.calle" />
                </div>
            </div>
            <div class="col-auto my-auto pl-1 pr-0" @click="centrar()">
                <icono icono="my_location" clase="letra-verde4-30 pt-8px" />
            </div>
            <div class="col-auto my-auto pl-1 pr-0" v-if="inicio.calle" @click="clear('inicio')">
                <icono icono="clear" clase="letra-gray3-30 pt-8px" />
            </div>
        </div>

        <div class="row w-100 m-0 pt-10px pb-5px justify-content-start">
            <div class="w-30px my-auto px-1">
                <imagen clase="" :icono="true" src="pino" />
            </div>
            <div class="col my-auto pl-1">
                <div class="row w-100 m-0">
                    <inputForm input="money" :autofocus="true" clase="pl-0 pt-2" type="text" placeholder="¿A donde quieres ir?" @input="getResultados()" v-model="destino" />
                </div>
            </div>
            <div class="col-auto my-auto pl-1 pr-0" v-if="destino" @click="destino = null; clear('destino')">
                <icono icono="clear" clase="letra-gray3-30 pt-8px" />
            </div>
        </div>
    </div>

    <div class="row w-100 m-0" v-if="paso==1">
        <div class="row w-100 m-0" v-if="searchInicio">
            <div class="row w-100 m-0" v-if="inicio.calle && responseInicio.length">
                <div class="row w-100 m-0 carta back-color-blanco border-radius-25px overflow-hidden">
                    <div class="row w-100 m-0 pt-5px " >
                        <div class="row w-100 m-0 py-2 px-2 border-b-gray1-1" v-for="p of responseInicio" :key="p.place_id" >
                            <geoResultado :data="p" :inicio="true" @click="getGeoInicio" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row w-100 m-0" v-if="destino && response.length">
            <div class="row w-100 m-0 carta back-color-blanco border-radius-25px overflow-hidden">
                <div class="row w-100 m-0 pt-5px " >
                    <div class="row w-100 m-0 py-2 px-2 border-b-gray1-1" v-for="p of response" :key="p.place_id" >
                        <geoResultado :data="p" @click="getGeo" v-model="destino" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row w-100 m-0 px-3 back-color-blanco carta justify-content-start border-radius-25px" v-if="paso == 2">

        <div class="row w-100 m-0 pt-15px justify-content-start">
            <div class="w-25px my-auto px-1">
                <imagen clase="" :icono="true" src="pin" />
            </div>
            <div class="col my-auto letra-gray3-13 pl-10px">{{inicio.calle}}</div>
        </div>
         <div class="row w-100 m-0 justify-content-start py-5px">
            <div class="col px-0 my-auto">
                <div class="row w-100 m-0 border-b-gray0-1"></div>
            </div>
            <div class="col-auto my-auto pl-1 pr-0" @click="change()" v-if="inicio.calle && fin.calle">
                <icono icono="swap_vert" clase="letra-verde4-30 pt-8px" />
            </div>
            <div class="col px-0 my-auto">
                <div class="row w-100 m-0 border-b-gray0-1"></div>
            </div>
        </div>
        <div class="row w-100 m-0 pb-15px justify-content-start" @click="back()">
            <div class="w-30px my-auto px-1">
                <imagen clase="" :icono="true" src="pino" />
            </div>
            <div class="col my-auto letra-gray3-13 pl-1">{{fin.calle}}</div>
        </div>

        <div class="row w-100 m-0 px-2 pb-2">
            <div class="row w-100 m-0 py-1">
                <div class="col my-auto px-0">
                    <div class="row w-100 m-0 letra-gray3-15">El viajes es para alguien mas:</div>
                </div>
                <div class="col-auto my-auto px-0">
                    <toggle :checked="some" v-model="some" />
                </div>
            </div>
            <div class="row w-100 m-0 py-1 pb-2 border-b-gray1-1 " v-if="some">
                <inputForm input="money" clase="pl-0 pt-2 pb-0" type="text" placeholder="Ingresa el nombre para quien es el viaje" v-model="otro" />
            </div>
        </div>
    </div>
</div>
</template>
<script>
const moment = require('moment');
export default {
    data(){
        return {
            searchInicio: false,
            destino: null,
            busqueda: '',
            autocomplete: null,
            geocoder: null,
            post_id: _.uniqueId('post_'),
            resultadosInicio: [],
            resultados: [],
            directionsRenderer: null,
            some: false,
            otro: null,
        };
    },
    props:[
        'data',
        'map',
        'pin',
        'index',
    ],
    computed:{
        paso(){return this.$store.getters.viajeObject('paso')},
        centro(){return this.$store.getters.getPosicion;},
        ubicacion(){return this.$store.getters.viajeObject('ubicacion')},
        inicio(){return this.$store.getters.viajeObject('inicio')},
        fin(){return this.$store.getters.viajeObject('destino')},
        responseInicio(){return this.resultadosInicio.filter((a,x)=>{return x < 3})},
        response(){return this.resultados.filter((a,x)=>{return x < 3})},
    },
    mounted() {
        this.autocomplete = new google.maps.places.AutocompleteService();
        this.geocoder = new google.maps.Geocoder();
    },
    methods:{
        centrar(){
            this.map.panTo(this.$store.getters.getPosicion);
        },
        change(){
            let nuevo = {lat: this.inicio.lat, lng: this.inicio.lng, direccion: this.inicio.direccion, calle: this.inicio.calle,};
            this.$store.commit('setViajeState',['inicio', {lat: this.fin.lat, lng: this.fin.lng, direccion: this.fin.direccion, calle: this.fin.calle,}]);
            this.$store.commit('setViajeState',['destino', {lat: nuevo.lat, lng: nuevo.lng, direccion: nuevo.direccion, calle: nuevo.calle,}]);
            this.trazarRuta();
        },
        next(){
            if(this.paso == 0){
                console.log("PIN", this.ubicacion);
                this.$store.commit('setViajeState',['inicio', {lat: this.ubicacion.lat, lng: this.ubicacion.lng, direccion: this.ubicacion.direccion, calle: this.ubicacion.calle,}]);
            }
            this.$store.commit('setViajeState',['paso',1]);
        },

        clear(a){
            this.$store.commit('setViajeState',[a, {lat: null, lng: null, direccion: null, calle: null,}]);
        },

        click(){
            this.$emit('click');
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

        postInicio(id,options){
            this.autocomplete.getPlacePredictions(options, 
            (resultado,estatus)=>{
                if (estatus == 'OK') {
                    // console.log("resultados", resultado);
                    if(id == this.post_id){
                        this.resultadosInicio = resultado;
                    }
                }
                
            });
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

        back(){
            this.$store.commit('setViajeState',['paso',1]); 
            this.pin.setMap(this.map);
        },

        getGeoInicio(place){
            this.$store.commit('initLoader');
            this.geocoder.geocode({'placeId': place.place_id, 'region': 'MX'},
            (results, status)=>{
                this.$store.commit('finishLoader');
                if (status == 'OK') {
                    this.resultadosInicio = [];
                    let data = results[0];
                    // console.log("RRRRRRR", data);
                    this.$store.commit('setViajeStateObject',['inicio','lat',data.geometry.location.lat()]);
                    this.$store.commit('setViajeStateObject',['inicio','lng', data.geometry.location.lng()]);
                    if(this.inicio.calle && this.fin.calle){
                        this.trazarRuta();
                        this.$store.commit('setViajeState',['paso',2]);
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
                    this.resultados = [];
                    let data = results[0];
                    // console.log("RRRRRRR", data);
                    this.$store.commit('setViajeStateObject',['destino','lat',data.geometry.location.lat()]);
                    this.$store.commit('setViajeStateObject',['destino','lng', data.geometry.location.lng()]);
                    if(this.inicio.calle && this.fin.calle){
                        this.trazarRuta();
                        this.$store.commit('setViajeState',['paso',2]);
                    }
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

                    this.directionsRenderer = new google.maps.DirectionsRenderer({
                        map: this.map,
                        polylineOptions: {
                            clickable: false,
                            strokeColor: "#4cd77c",
                        },
                    });
                    this.directionsRenderer.setDirections(res);
                    this.pin.setMap(null);
                },error=>{});
        }
        
    },
}
</script>