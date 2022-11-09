<template>
<div class="row w-100 m-0 slider-component">
    <div :class="id +' swiper-container slider-container w-100'">

        <div class="swiper-wrapper">

            <div class="swiper-slide w-auto px-1 text-center" v-if="0">
                <div class="w-auto text-center">
                    <div class="w-30vw h-23vw mx-auto border-radius-15px overflow-hidden position-relative  " :class="value==null?'border-rojo2-1':''" @click="update(null)" >
                        <imagen clase="" :fit="true" :logo="1" />
                        <div class="h-100 w-100 position-absolute top-0px left-0px back-color-negro1  ">
                            <div class="row w-100 h-100 m-0 fw-600 align-content-center letra-blanco-20 justify-content-center text-center">Todas</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="swiper-slide w-auto px-1 text-center"  v-for="i of categorias" :key="i.x" @click="update(i.id)">
                <div class="w-auto text-center">
                    <div class="w-40vw h-20vw mx-auto border-radius-15px overflow-hidden position-relative  " :class="value==i.id?'border-rojo1-3':''">
                        <imagen clase="" :fit="true" :src="i.imagen" />
                        <div class="h-100 w-100 position-absolute top-0px left-0px  " :class="value==i.id && 0?'back-color-verd1':'back-color-negro1 '" >
                            <div class="row w-100 h-100 m-0 fw-600 align-content-center letra-blanco-17 justify-content-center text-center">{{i.name}}</div>
                        </div>
                    </div>
                    <!-- <div class="row w-100 m-0 h-40px align-content-center letra-verde3-3-2vw pt-2 text-capitalize justify-content-center text-center">{{i.nombre}}</div> -->
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
            id: _.uniqueId('sw_cat'),
            slider:null,
        };
    },
    props: [
        'value',
    ],
    computed: {
        categoria(){return this.$store.getters.catalogoGetObject('categoria') || null;},
        categorias(){return this.$store.getters.getCatalogo('categorias');}
    },
    watch:{
        categorias(){
            this.initSlider();
        }
    },
    mounted() {
        // console.log("CATEGORIAS", this.categoria, this.categorias);
        setTimeout(this.initSlider,300);
    },
    methods:{
        initSlider(){
            if(this.categorias && this.categorias.length){
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
            }
            else{
                setTimeout(this.initSlider,300);
            }
        },
        update(id){
            if(this.value == id){
                this.$emit('input', null);
            }else{
                this.$emit('input', id);
            }
        }

    },
}
</script>