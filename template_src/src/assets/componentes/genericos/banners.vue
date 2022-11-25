<template>
<div class="row w-100 m-0 slider-component">
    <div :class="id +' swiper-container slider-container'">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="i of galleria" :key="i.id" >
                <div class="row w-100 m-0 justify-content-center">
                    <imagen :create="1" :src="i.imagen" alt="foto_producto" />
                </div>
            </div>
        </div>

        <div class="row w-100 m-0 position-absolute z-1000000000 bottom-3 left-0px" v-if="total">
            <div class="row w-100 m-0 justify-content-center">
                <div class="col-auto px-0 pl-1" v-for="(i,x) in total">
                    <div class="w-10px h-10px border-radius-50" :class="`${x==index?'back-color-rojo':'back-color-gray2'}`"></div>
                </div>
            </div>
        </div>

        <!-- <div class="swiper-pagination"></div> -->
    </div>
</div>
</template>
<script>
import _ from 'lodash';
import Swiper from 'swiper';
export default {
    data(){
        return {
            id: _.uniqueId('banners_'),
            index: 0,
            slider:null,
        };
    },
    props: [
        'fotos'
        ],
    computed: {
        galleria(){return this.fotos || []},
        total(){return this.galleria.length || 0},
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
                // pagination: {
                //     el: '.swiper-pagination',
                //     type: 'bullets',
                // },
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