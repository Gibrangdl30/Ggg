<template>
<div class="row w-100 h-100 m-0 position-relative">

    <div class="row w-100 m-0 position-absolute top-10px right-0px z-index-10000 text-center">
        <div class="row w-100 m-0 px-1 justify-content-center">
            <div class="col-10 px-1" @click="$store.dispatch('synchronizeData')">
                <div class="row w-100 m-0 letra-blanco-17 back-color-verde4 fw-600 border-radius-30px py-10px justify-content-center">{{estatus}}</div>
            </div>
        </div>
    </div>

   

    <div class="row w-100 m-0 position-absolute bottom-30px right-0px z-index-10000 text-center">
        <div class="row w-100 m-0 px-1 py-2">
            <div class="col-4 px-1" @click="$store.commit('openModal',['modalAvisar'])">
                <botonApp tipo="azul" texto="Compartir" radius="30px" />
            </div>
        </div>
        <div class="row w-100 m-0">
            <rowChofer />
        </div>
        <div class="row w-100 m-0 px-1 py-2">
            <div class="col-4 px-1" @click="$store.dispatch('call','911')">
                <botonApp tipo="azul" texto="Emergencia" radius="30px" />
            </div>
            <div class="col-8 px-1" @click="$emit('input',1); $store.commit('openModal',['modalMensaje'])" >
                <botonApp texto="Cancelar viaje" tipo="verde" radius="30px" />
            </div>
        </div>
    </div>

    <div class="w-50px h-50px position-absolute top-38 right-10px z-index-10000 text-center" @click="map.panTo(centro)">
        <div class="w-100 h-100 text-center">
            <icono class="mt-2" icono="my_location" clase="letra-negro-40" />
        </div>
    </div>

    <div :id="id" class="w-100 h-100"></div>
</div>
</template>
<script>
export default {
    data()
    {
        return {
            id:_.uniqueId('mapa_'),
            map: null,
            pin: null,
            pinChofer: null,
            drag: false,
            icon: {
                url: require('../../iconos/pin.svg'),
                scaledSize:{height: 30, width: 30}
            },
        };
    },
    props:  ['cuenta'],
    computed: {
        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},
        servicio(){return this.$store.getters.servicioObject('servicio');},
        centro(){return {lat: Number(this.servicio.lat), lng: Number(this.servicio.lng),}},
        chofer(){return {lat: Number(20.680154), lng: Number(-103.355225),}},
        estatus(){return this.$store.getters.estatusUsuario;},
        boton(){return this.$store.getters.nextEstatusBoton},
    },
    watch: {
        centro(){
            this.updateCentro();
        },
        servicio(){
            if(this.servicio.estatus == 'llegado_reco' || this.servicio.estatus == 'llegado_reco'){
                if(this.pin){
                    this.pin.setMap(null);
                }
            }
        },
    },
    mounted() {
        this.$store.dispatch('initData', [this.$f7]);
        setTimeout(this.initMapa,350);
    },
    methods:{
        goto(ruta){
            this.router.navigate(ruta);
        },
        initMapa(){
            try{
                if(!this.map){
                    this.map = new google.maps.Map(document.getElementById(this.id),{
                        center: this.centro,                       
                        zoom: 15,    
                        disableDefaultUI:true,
                        clickableIcons:false,
                    });

                    this.pin = new google.maps.Marker({
                        position: this.centro, 
                        map: this.map,
                        icon: this.icon,
                    });

                    this.pinChofer = new google.maps.Marker({
                        position: this.chofer, 
                        map: this.map,
                        icon: {
                            url: 'https://miviaapp.com/appfiles/car.svg',
                            scaledSize:{height: 60, width: 60}
                        },
                    });

                    this.map.addListener('dragstart',this.dragstart);
                    this.map.addListener('dragend',this.dragend);
                    this.map.addListener('center_changed',this.centerchange);
                    this.centerchange();

                }
            }
            catch(e){
                setTimeout(this.initMapa,500);
                return;
            }
        },
        updateCentro(){
            if(this.miUbicacion){
                this.miUbicacion.setPosition(this.centro);
                if(!this.drag){
                    this.map.panTo(this.centro);
                }
            }
        },
        setCenter(data){
            this.drag = true;
            this.$emit('lugar', data);
            this.map.panTo({lng: Number(data.lng),lat: Number(data.lat)});
            this.busqueda = '';
        },
        dragstart(event){
            this.drag = true;
        },
        dragend(){
        },
        centerchange(){
           
        },
        centrar(){
            this.map.panTo(this.$store.getters.getPosicion);
        },
    },
}
</script>