<template>
<div class="row w-100 h-100 m-0 position-relative">

    <div class="w-50px h-50px position-absolute top-40 right-5px z-index-10000 text-center" @click="map.panTo(centro)">
        <div class="w-100 h-100 text-center">
            <icono class="mt-2" icono="my_location" clase="letra-negro-30" />
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
            drag: false,
            pins:[],
            s:null,
        };
    },
    props:  [
        'cuenta',
        'tipo'
    ],
    computed: {
        router(){return this.$store.getters.getRouter;},
        paso(){return this.$store.getters.viajeObject('paso')},
        centro(){return this.$store.getters.getPosicion;},
        ubicacion(){return this.$store.getters.viajeObject('ubicacion')},
        posts(){return this.$store.getters.postStateArray('posts')},
        type(){return this.tipo },
    },

    watch: {
        centro(){
            this.updateCentro();
        },
        type(){
            this.updateSocios();
        },
    },

    mounted() {
        this.$store.dispatch('initData', [this.$f7]);
        setTimeout(this.initMapa,350);
        setTimeout(this.updateSocios,400);
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
                        zoom: 11,    
                        disableDefaultUI:true,
                        clickableIcons:false,
                    });

                    this.pin = new google.maps.Marker({
                        position: this.centro, 
                        map: this.map,
                        icon: {
                            url: 'https://grupoargestioninmobiliaria.online/apiv1/iconos/per.svg',
                            scaledSize:{height: 40, width: 40}
                        },
                    });

                    this.map.addListener('dragstart',this.dragstart);
                    this.map.addListener('dragend',this.dragend);
                    this.map.addListener('center_changed',this.centerchange);
                    this.centerchange();
                    this.updateSocios();

                }
            }
            catch(e){
                setTimeout(this.initMapa,500);
                return;
            }
        },

        updateSocios(){
            if(this.map){
                this.pins.map(w=>{w.setMap(null)});
                  
                this.posts.map(s=>{
                    s.centro = {
                        lat: Number(s.lat),
                        lng: Number(s.lng),
                    };

                    s.pin = new google.maps.Marker({
                        position: s.centro, 
                        map: this.map,
                        icon: {
                            url: `https://grupoargestioninmobiliaria.online/apiv1/iconos/ho.svg`,
                            scaledSize:{height: 40, width: 40}
                        },
                    });

                  
                    s.pin.addListener("click", () => {
                        console.log("C PIN", s);
                        this.s = s;
                        this.$store.commit('setPostState', ['post', s.id ] );
                        this.router.navigate('/post_comentarios');
                    });
                    this.pins.push(s.pin);


                    if(this.type){
                        if(s.pin){
                            console.log("TYOE TYPE ", this.type, s.tipo);
                            if(this.type == 1){
                                if(s.tipo == 'renta'){
                                    s.pin.setMap(null);
                                }
                            }
                            if(this.type == 2){
                                if(s.tipo == 'venta'){
                                    s.pin.setMap(null);
                                }
                            }
                        }
                    }
                });
            }
        },

        updateCentro(){
            if(this.miUbicacion){
                // this.miUbicacion.setPosition(this.centro);
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
                // this.pin.setPosition(this.map.getCenter());
                // this.getDireccion();
        },

        getDireccion(){
            // console.log("ubicacion", this.ubicacion);
            this.$store.dispatch('getDireccionPosicion',[this.ubicacion]).then(
                res=>{
                    this.$store.commit('setViajeStateObject',['ubicacion','direccion',res]);
                    this.$store.commit('setViajeStateObject',[ 'ubicacion','calle', (res.split(','))[0] ]);
                    this.$store.commit('setViajeState',['inicio', {lat: this.ubicacion.lat, lng: this.ubicacion.lng, direccion: this.ubicacion.direccion, calle: this.ubicacion.calle,}]);
                },error=>{}
            );
        },

        centrar(){
            this.map.panTo(this.$store.getters.getPosicion);
        },
       
    },
}
</script>