<template>
<div class="row w-100 h-100 m-0 position-relative mapaPick">
    <div :id="id" class="mapa w-100 h-100"></div>

    <div class="w-50px h-50px border-radius-50 back-color-blanco position-absolute top-5px right-5px z-index-10000 text-center carta" @click="search()">
        <div class="w-100 h-100 text-center">
            <icono class="mt-9px" icono="search" clase="letra-rojo-7-8vw" />
        </div>
    </div>
    
    <div class="w-50px h-50px border-radius-50 back-color-blanco position-absolute bottom-5px right-5px z-index-10000 text-center carta" @click="centrar()">
        <div class="row w-100 m-0 justify-content-center text-center">
            <icono class="mt-8px" icono="my_location" clase="letra-rojo-30 " />
        </div>
    </div>
</div>
</template>
<script>
    export default {
        props: ['value'],
        data(){
            return{
                id: _.uniqueId('map_'),
                map: null,
                pin: null,
                set: true,
            }
        },
        computed:{
            centro(){
                if(this.value.lat && this.value.lng){
                    return {lat:this.value.lat, lng:this.value.lng};
                }
                return this.$store.getters.getPosicion;
            },
        },
        watch:{
            centro(){
                if(this.map.getCenter().lat() != this.value.lat && this.map.getCenter().lng() != this.value.lng){
                    console.log("SET CENTER",this.value);
                    this.map.setCenter({lat: this.value.lat, lng:this.value.lng });
                    this.dragend();
                }
            },
        },
      
        mounted(){
            setTimeout(this.initMapa,150);
        },
        
        methods:{
            initMapa(){
                try{
                    if(!this.map){
                        this.map = new google.maps.Map(document.getElementById(this.id),{
                            center: this.centro,                       
                            zoom: 15,    
                            disableDefaultUI:true,
                        });
                        
                        this.pin = new google.maps.Marker({
                            position: this.centro, 
                            map: this.map,
                            icon: {
                                url: 'https://mexicolimited.com/apiv1/iconos/pin1.svg',
                                scaledSize:{height: 35, width: 35}
                            },
                        });

                        this.map.addListener('zoom_changed',this.zoom_changed);
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
            zoom_changed(){
               this.set = false;
                //console.log("ZOOOOOOMING");
            },
            dragstart(){
               this.set = true;
                //console.log("DRAAGGING");
            },

            dragend(){
                // console.log("OIN", this.pin);
                // console.log("SET",this.value);
                this.pin.setPosition(this.map.getCenter());
                this.value.lat = this.map.getCenter().lat();
                this.value.lng = this.map.getCenter().lng();
                this.$emit('input', this.value);
                this.getDireccion();
            },

            centerchange(){
                // console.log("OIN", this.pin);
                
                this.pin.setPosition(this.map.getCenter());
                // console.log("SET",this.value);
                // this.value.lat = this.map.getCenter().lat();
                // this.value.lng = this.map.getCenter().lng();
                // this.$emit('input', this.value);
                // this.getDireccion();
            },
            getDireccion(){
                this.$store.dispatch('getDireccionPosicion',[this.value]).then(
                    res=>{
                        console.log("TRAYANEOD LA DIRECCIONS", res);
                        this.value.infox = res;
                        res = res[0];
                        this.value.direccion = res.formatted_address;
                        this.value.calle = res.formatted_address;
                        this.value.datax = res.address_components;
                        this.$emit('input', this.value);
                    },error=>{}
                );
            },
            centrar(){
                this.map.panTo(this.$store.getters.getPosicion);
            },
            search(){
                this.$emit('search');
            }
        }
    }
</script>