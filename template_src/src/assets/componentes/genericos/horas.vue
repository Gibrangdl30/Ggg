<template>
<div class="row w-100 m-0 py-2 slider-component">
    <div :class="id +' swiper-container slider-container w-100'">
        <div class="swiper-wrapper">
           
            <div class="swiper-slide w-auto px-1 text-center"  v-for="i of byCampo" :key="i.x" @click="update(i.hora)" >
                <div class="w-auto text-center " v-if="red">
                    <div :class="compro(i.hora) && 0?' back-color-blanco':''" class="row w-100 m-0 px-2 py-1 border-blanco-1 border-radius-30px ">
                        <div class="col px-0 px-2">
                            <div class="row w-100 m-0 text-capitalize justify-content-center text-center"  :class="compro(i.hora) && 0?' letra-rojo1-18 ':'letra-blanco-18'">{{i.hora}}</div>
                        </div>
                    </div>
                </div>
                <div class="w-auto text-center " v-else >
                    <div :class="compro(i.hora)?' back-color-rojo1':''" class="row w-100 m-0 px-2 py-1 border-rojo1-1 border-radius-30px ">
                        <div class="col px-0 px-2">
                            <div class="row w-100 m-0 text-capitalize justify-content-center text-center"  :class="compro(i.hora)?' letra-blanco-18 ':'letra-rojo1-18'">{{i.hora}}</div>
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
            realH: Number(moment().format('H')),
        };
    },
    props: [
        'value',
        'red',
        'campo',
    ],
    computed: {
        categorias(){ 
            let x = [];
            for(let s = 8; s<21; s++){
                if(this.red){
                    x.push({hora: s+':00'});
                }else{
                    if(s > this.realH){
                        x.push({hora: s+':00'});
                    }
                }
            }
            // console.log("SWSWSWSWSWS",x);
            return x.filter(w => 1);
        },
        byDia(){
            if(this.campo && this.campo.id){
                return this.campo.dias.filter(x=>x.fecha == this.value.fecha);
            }
            return [];
        },
        byCampo(){
            return this.categorias.filter(s => !this.byDia.some(x=> moment(s.hora,'HH:mm').format('HH:mm:ss') >= x.inicio && moment(s.hora,'HH:mm').format('HH:mm:ss') < x.fin) );
        },
    },

    mounted() {
        console.log("123456789 ---------------------- CATEGORIAS", this.categorias );
        if(!this.byCampo.some(s=>s.hora == this.value.hora)){
            if(!this.red){
                // console.log("HORA HORA", this.byCampo.find(s=>1).hora )
                this.value.hora = moment(this.byCampo.find(s=>1).hora, 'HH:mm').format('HH:mm:ss');
                this.$emit('input', this.value );
            }

        }
        setTimeout(this.initSlider,300);
    },
    methods:{

        compro(dia){
            return this.value.hora ==  moment(dia, 'HH:mm').format('HH:mm:ss');
        },
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

        update(h){
            this.value.hora = moment(h, 'HH:mm').format('HH:mm:ss');
            // console.log("HORA SET", moment(h, 'HH:mm').format('HH:mm:ss'));
            this.$emit('input', this.value);
        },

    },
}
</script>