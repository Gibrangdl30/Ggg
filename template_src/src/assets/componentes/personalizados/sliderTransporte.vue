<template>
<div class="row w-100 m-0 px-0 transporte-slide" v-show="!openK" >
    <div :class="`${id} swiper-container slider-container w-100`">
        <div class="swiper-wrapper pl-3">
            <div class="swiper-slide w-auto" v-for="(a, ind) of filtrado" :key="ind" > 
               <cardTransporte :data="a" @click="set" />
            </div>
        </div>
        <!-- <div class="swiper-pagination position-absolute top-10px left-0px z-150"></div> -->
    </div>
</div>
</template>
<script>
import _ from 'lodash';
import Swiper from 'swiper';
const moment = require('moment');
export default {
    data(){
        return {
            id: _.uniqueId('swiperTras_'),
            openK: false,
            slider:null,
            index: 0,
        };
    },
    props: [
        'data',
    ],
    computed: {
        router(){return this.$store.getters.getRouter;},
        ruta(){return this.$store.getters.viajeObject('ruta')},
        metodos(){return this.$store.getters.getMetodos},
        session(){return this.$store.getters.getSession;},

        filtrado(){ return [
            {id: 2, icono:'https://miviaapp.com/appfiles/r7.jpg', precio: 10.5, nombre: 'Taxi', personas: '1-4', },
            {id: 5, icono:'https://miviaapp.com/appfiles/r6.jpg', precio: 11, nombre: 'Economic', personas: '1-4', },
            {id: 1, icono:'https://miviaapp.com/appfiles/r1.jpg', precio: 13, nombre: 'Girl', personas: '1-4', },
            {id: 3, icono:'https://miviaapp.com/appfiles/r3.jpg', precio: 16, nombre: 'SUV Comfort', personas: '1-4', },
            {id: 4, icono:'https://miviaapp.com/appfiles/r4.jpg', precio: 19, nombre: 'VAN Passenger', personas: '4-6', },
            {id: 5, icono:'https://miviaapp.com/appfiles/r5.jpg', precio: 22, nombre: 'Carseat', personas: '1-3', },
        ];},
    },
    mounted() {
        this.init();
        setTimeout(this.initSlider,300);
    },
    methods:{
        initSlider(){
            this.slider = new Swiper (`.${this.id}`, {
                    initialSlide: 0,
                    centeredSlides: false, 
                    preloadImages: true, 
                    observer: true,
                    observeParents: true,
                    observeSlideChildren: true,
                    slidesPerView: 'auto',
                    // pagination: {
                    //     el: '.swiper-pagination',
                    //     type: 'bullets',
                    // },   
                });
                this.slider.on('slideChange',()=>{
                    this.index = this.slider.realIndex;
                });
        },
        init(){
            window.addEventListener('keyboardWillShow', (event) => {
                this.openK = true;
            });
            window.addEventListener('keyboardWillHide', (event) => {
                this.openK = false;
            });
        },
        set(a){
            console.log("SETING");
            if( !this.session.ine_frente || !this.session.ine_atras ){
                swal("","Agrega las fotos de tu INE para continuar","");
                return;
            }
            if(!this.metodos || !this.metodos.length){
                swal("","Ingresa un metodo de pago para continuar","");
                return;
            }
            this.$store.commit('setViajeStateObject',['ruta','costo_km', a.precio]);
            this.$store.commit('setViajeStateObject',['ruta','total_km', this.ruta.banderazo + Number( a.precio * this.ruta.distancia / 1000 )]);
            this.$store.commit('setViajeState',['transporte',a]);
            this.$store.dispatch('postPedirViaje');
        }
    },
}
</script>