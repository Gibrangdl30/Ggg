<template>
<div class="row w-100 m-0 slider-component">
    <div :class="id +' swiper-container slider-container w-100'">
        <div class="swiper-wrapper">
            <div class="swiper-slide px-1 text-center w-auto "  v-for="i of privados" :key="i.x" @click="update(i.id)">
                <div class="w-auto text-center">
                    <div class="w-13vw h-13vw mx-auto border-radius-50 overflow-hidden">
                        <imagen :user="true" :src="i.usuario.foto" :show="i.imagen" />
                    </div>
                    <div class="row w-100 m-0 h-40px letra-azul1-16 text-capitalize justify-content-center text-center">{{i.usuario.nombre}}</div>
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
    props: [],
    computed: {
        privados(){return this.$store.getters.postStateArray('privados')},
        categoria(){return this.$store.getters.catalogoGetObject('categoria') || null;},
        categorias(){return this.$store.getters.getCatalogo('categorias');}
    },
    mounted() {
        console.log("CATEGORIAS", this.categoria, this.categorias);
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
            this.$store.commit('updateCatalogosState',['categoria', id])
        }

    },
}
</script>