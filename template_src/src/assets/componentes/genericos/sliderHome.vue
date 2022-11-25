<template>
<div class="row w-100 px-0 m-0 contenedor-slide ">
      <div :class="`${id} swiper-container slider-container w-100 position-relative`">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="row w-100 m-0 justify-content-center">
                        <imagen clase="" :src="imagen('ob1.jpg')" /> 
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="row w-100 m-0 justify-content-center">
                        <imagen clase="" :src="imagen('ob2.jpg')" /> 
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="row w-100 m-0 justify-content-center">
                        <imagen clase="" :src="imagen('ob3.jpg')" /> 
                    </div>
                </div>
            </div>
            <!-- <div class="swiper-pagination position-absolute bottom-27 left-0px z-150"></div> -->
      </div>


        <!-- <div class="row w-100 m-0 position-absolute bottom-7 left-0px z-100 justify-content-center"> -->
        <div class="row w-100 m-0 z-100 justify-content-center">
            <div class="row w-100 m-0 px-3 pt-1 justify-content-space-between">

                <div class="col-12 px-0 px-4" v-if="index==0" >
                    <div class="row w-100 m-0" @click="continuar()">
                        <div class="row w-100 m-0 pb-12px letra-rojo-18 fw-600 justify-content-center text-center ">Siguiente</div>
                    </div>
                    <div class="row w-100 m-0" @click="goLogin()">
                        <botonApp tipo="negro" texto="Comenzar"  radius="30px" />
                    </div>
                </div>

                <div class="row w-100 m-0 px-4" v-if="index==1">
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0">
                            <div class="col px-0">
                                <div class="row w-100 m-0" @click="regresar()">
                                    <div class="row w-100 m-0 pb-12px letra-rojo-18 fw-600 justify-content-center text-center ">Anterior</div>
                                </div>
                            </div>
                            <div class="col px-0">
                                <div class="row w-100 m-0" @click="continuar()">
                                    <div class="row w-100 m-0 pb-12px letra-rojo-18 fw-600 justify-content-center text-center ">Siguiente</div>
                                </div>
                            </div>
                        </div>
                        <div class="row w-100 m-0 pt-2" >
                            <div class="row w-100 m-0" @click="goLogin()">
                                <botonApp tipo="negro" texto="Comenzar"  radius="30px" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 px-4" v-if="index==2">
                    <div class="row w-100 m-0" @click="regresar()">
                        <div class="row w-100 m-0 pb-12px letra-rojo-18 fw-600 justify-content-center text-center ">Anterior</div>
                    </div>
                    <div class="row w-100 m-0" @click="goLogin()">
                        <botonApp tipo="negro" texto="Comenzar"  radius="30px" />
                    </div>
                </div>

            </div>
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
            id: _.uniqueId('swiperhome_'),
            slider:null,
            index: 0,
        };
    },
    props: [
        'objetos', 
        'cantidad'
    ],
    computed: {
        router(){return this.$store.getters.getRouter;},
        imagen(){return (id)=>{ return `${this.$store.getters.baseImg}${id}`} }
    },
    mounted() {
        setTimeout(this.initSlider,300);
        setTimeout(()=>{
            this.$store.commit('closeModal',['loader', 1]);
        },1000*3);

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
                    slidesPerView: 1,
                    // pagination: {
                    //     el: '.swiper-pagination',
                    //     type: 'bullets',
                    // },   
                });
                this.slider.on('slideChange',()=>{
                    this.index = this.slider.realIndex;
                });
        },
        goLogin(){
            this.router.navigate('/login');
        },
        regresar(){
            this.slider.slidePrev();
        },
        continuar(){
            if(this.index < 2 ){
                this.slider.slideNext();
            }
            else{
                this.router.navigate('/login');
            }
        },

    },
}
</script>