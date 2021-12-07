<template>
<div class="row w-100 m-0 pb-2 slider-component">
    <div :class="id +' swiper-container slider-container w-100'">
        <div class="swiper-wrapper">
            <div class="swiper-slide px-1 text-center w-auto ">
                <div class="w-auto text-center position-relative " @click="go('/seleccionar_amigo_request')">
                    <div class="w-13vw h-13vw mx-auto app-degra border-radius-50 ">
                        <div class="row w-100 m-0 justify-content-center text-center pt-9px">
                            <icono icono="add" clase="letra-blanco-35" />
                        </div>
                    </div>
                    <div class="row w-100 m-0 justify-content-center text-center letra-gray2-14">Request</div>
                </div>
            </div>
            <div class="swiper-slide px-1 text-center w-auto "  v-for="i of lastrequest" :key="i.x" @click="update(i.usuario)">
                <div class="w-auto text-center position-relative ">
                    <div class="w-13vw h-13vw mx-auto border-radius-50 overflow-hidden">
                        <imagen :user="true" :src="i.usuario.foto" :show="i.imagen" />
                    </div>
                    <div class="row w-100 m-0 letra-gray2-14 text-capitalize justify-content-center text-center">{{(i.usuario.nombre.split(" ") || [] )[0]}}</div>

                    <div class="w-14px h-14px back-color-azul1 position-absolute right-0px top-0px border-radius-50" v-if="newMsg(i.usuario.id)" ></div>

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
        newMsg(){
            return (usuarios_id) =>{
                return this.$store.getters.getMensajeNuevoChat(usuarios_id)
            }
        }
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