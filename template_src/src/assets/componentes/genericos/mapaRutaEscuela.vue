<template>
<div class="row w-100 h-100 m-0">
    <div :id="id" class="mapa w-100 h-100"></div>
</div>
</template>
<script>
    export default {
        props: [
            'origen',
            'usuarios',
        ],
        data(){
            return{
                id: _.uniqueId('map_'),
                map: null,
                pinOrigen: null,
                pinFin: null,
                directionsRenderer: null,

            }
        },
        computed:{
            centro(){
                if(this.origen.lat && this.origen.lng){
                    return {lat:Number(this.origen.lat), lng:Number(this.origen.lng)};
                }
            },
        },
        mounted(){
            console.log("MAPA SERVICIO");
            setTimeout(this.initMapa,350);
        },
        methods:{
            initMapa(){
                // try{
                    if(!this.map){
                        if(!this.centro.lat){
                            swal("","NO tengo escuela lat y lng","");
                            return;
                        }
                        console.log("GETTING MAP");
                        this.map = new google.maps.Map(document.getElementById(this.id),{
                            center: this.centro,                       
                            zoom: 14,    
                            // gestureHandling: 'none',
                            disableDefaultUI:true,
                        });
                        this.map.addListener('dragstart',this.dragstart);
                        this.map.addListener('dragend',this.dragend);
                        this.map.addListener('center_changed',this.centerchange);
                        this.trazarRuta();
                        this.centerchange();
                    }
                // }
                // catch(e){
                //     setTimeout(this.initMapa,500);
                //     return;
                // }
            },
            trazarRuta(){
                let options = {
                    map: this.map,
                    suppressMarkers: true,
                    polylineOptions: {
                        clickable: false,
                        strokeColor: "#00c8a3"
                    },
                }
                this.usuarios.map((x,y)=>{
                    if(y == 0){
                        console.log("XX", x.lat, x.lng);
                        if(x.lat && x.lng){
                            this.$store.dispatch('postGetDistanciaResponse',[this.origen, x]).then(
                                res=>{
                                    this.directionsRenderer = new google.maps.DirectionsRenderer(options);
                                    this.directionsRenderer.setDirections(res);
                            },error=>{})
                        }
                    }
                    else{
                        console.log("XX", x.lat, x.lng);
                        if(x.lat && x.lng){
                            this.$store.dispatch('postGetDistanciaResponse',[this.usuarios[y-1], x]).then(
                                res=>{
                                    this.directionsRenderer = new google.maps.DirectionsRenderer(options);
                                    this.directionsRenderer.setDirections(res);
                            },error=>{})
                        }
                    }
                });
            },

            dragstart(){},
            centerchange(){},
            dragend(){},
            
        }
    }
</script>