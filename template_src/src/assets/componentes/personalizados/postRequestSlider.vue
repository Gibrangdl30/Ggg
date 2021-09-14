<template>
<div class="row w-100 m-0 slider-component">
    <div :class="id +' swiper-container slider-container w-100'">
        <div class="swiper-wrapper">
            <div class="swiper-slide px-1 text-center w-auto "  v-for="i of lastrequest" :key="i.x" @click="update(i.usuario)">
                <div class="w-auto text-center">
                    <div class="w-13vw h-13vw mx-auto border-radius-50 overflow-hidden">
                        <imagen :user="true" :src="i.usuario.foto" :show="i.imagen" />
                    </div>
                    <div class="row w-100 m-0 h-40px letra-azul1-14 text-capitalize justify-content-center text-center">{{i.usuario.nombre}}</div>
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
    props: [],

    data(){
        return {
            id: _.uniqueId('sw_cat'),
            slider:null,
        };
    },

    computed: {
        lastrequest(){return this.$store.getters.userStateArray('lastrequest')},
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
                    slidesPerView: 'auto',
                    // pagination: {
                    //     el: '.swiper-pagination',
                    //     type: 'bullets',
                    // },   
                });
        },

        update(u){
            // this.$store.dispatch('userPostRequestFoto',[u]);
            this.$store.commit('goToChat',[u.id]);
        }

    },
}
</script>