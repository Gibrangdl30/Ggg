<template>
<div class="row w-100 m-0 slider-component">
    <div :class="id +' swiper-container slider-container w-100 position-realitve '">

        <div class="swiper-wrapper" v-if="full" >
            <div class="swiper-slide" v-for="i of imagenes" :key="i.imagen" >
                <div class="row w-100 m-0 justify-content-center">
                    <div class="row w-100 m-0 h-39vh justify-content-center">
                        <imagen clase="" :create="true" :fit="true" :src="i.imagen" />
                    </div>
                </div>
            </div>
        </div>
        
        <div class="swiper-wrapper" v-else >
            <div class="swiper-slide" v-for="i of imagenes" :key="i.id" >
                <div class="row w-100 m-0 justify-content-center">
                    <div class="row w-100 m-0 h-39vh justify-content-center">
                        <imagen :show="1" clase="" :create="true" :fit="true" :src="i.imagen" />
                    </div>
                </div>
            </div>
        </div>

        <div class="row w-100 m-0 position-absolute z-1000000 bottom-20px left-0px">
            <div class="row w-100 m-0 justify-content-center">
                <div class="col-auto px-1" v-for="(x, xs) of imagenes" :key="x.imagen" >
                    <div class="w-12px h-12px border-radius-50" :class="`${index==xs?'back-color-rojo':'back-color-gray2'}`"></div>
                </div>
            </div>
        </div>

    </div>
</div>
</template>
<script>

import _ from 'lodash';
import Swiper from 'swiper';
export default {
    props: [
        'info',
        'full',
    ],
    data(){
        return {
            index: 0,
            id: _.uniqueId('slider'),
            slider: null,

        };
    },
    computed: {
        platillo(){return this.info || {} },
        imagenes(){return this.platillo.imagenes || [] },
    },
    mounted() {
        setTimeout(this.initSlider,300);
    },
    methods:{
         initSlider(){
            this.slider = new Swiper (`.${this.id}`, {
                centeredSlides: true, 
                preloadImages: true, 
                observer: true,
                observeParents: true,
                observeSlideChildren: true,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                },
                autoplay: {
                    delay: 1800,
                },
            });
            this.slider.on('slideChange',()=>{
                this.index = this.slider.realIndex;
            });
      }
    },
}
</script>