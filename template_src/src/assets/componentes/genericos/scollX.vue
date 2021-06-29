<template>
<div class="row w-100 m-0 slider-component">
    <div :class="id +' w-100 swiper-container slider-container'">
        <div class="swiper-wrapper">
            <slot></slot>
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
            id: _.uniqueId('swc_'),
            slider:null,
        };
    },
    props: ['objetos', 'cantidad'],
    computed: {
    },
    mounted() {
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
                    slidesPerView: this.cantidad || "auto",
                    // pagination: {
                    //     el: '.swiper-pagination',
                    //     type: 'bullets',
                    // },   
                });
        },

    },
}
</script>