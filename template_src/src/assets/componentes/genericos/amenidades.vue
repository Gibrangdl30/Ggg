<template>
<div class="row w-100 m-0 slider-component">
    <div :class="id +' swiper-container slider-container w-100'">
        <div class="swiper-wrapper">
           
            <div class="swiper-slide w-auto px-1 text-center"  v-for="i of categorias" :key="i.x" @click="update(i.id)">
                <div class="w-auto text-center  ">
                    <div class="row w-100 m-0 px-2 py-1 border-negro-1 border-radius-10px ">
                        <div class="col-auto px-0 pt-6px">
                            <icono :icono="i.icono" clase="letra-negro-35" />
                        </div>
                        <div class="col px-0 pl-2 mb-auto">
                            <div class="row w-100 m-0 letra-negro-17 pt-2 text-capitalize justify-content-center text-center">{{i.categoria}}</div>
                        </div>
                    </div>
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
            id: _.uniqueId('sw_catxd'),
            slider:null,
        };
    },
    props: [],
    computed: {
        categorias(){return [
            {icono: 'wc', categoria: 'Baños'},
            {icono: 'visibility', categoria: 'Accesibilidad'},
            {icono: 'verified_user', categoria: 'Seguridad'}
        ] },
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
                        slidesPerView: 4.5,
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
            this.$store.commit('updateCatalogosState',['categoria', id])
        }

    },
}
</script>