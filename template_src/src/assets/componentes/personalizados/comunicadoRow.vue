<template>
<div class="row w-100 m-0 ">
    <div class="row w-100 m-0 px-3 py-3">
        <div class="row w-100 m-0 border-gray0-1 position-relative" @click="click()">
            <div class="w-auto position-absolute top--10px right--10px z-index-10000" v-if="!lectura" >
                <div class="w-20px h-20px back-color-verde border-radius-50 box-shadow"></div>
            </div>
            <div class="h-27vw w-27vw">
                <imagen :fit="true" :src="x.imagen" />
            </div>
            <div class="col my-auto px-0 pl-3">
                <div class="row w-100 m-0 letra-gray4-18">{{x.title}}</div>
                <div class="row w-100 m-0 letra-verde1-16">{{x.tipo || 'Importante'}}</div>
                <div class="row w-100 m-0 letra-verde-16">{{[x.created_at, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
            </div>
        </div>
    </div>
</div>
</template>
<script>

import _ from 'lodash';
import imagen from '../genericos/imagen.vue';
const moment = require('moment');

export default {
    props: [
        'data',
    ],
    data(){
        return {
        };
    },
    computed: {
        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},
        x(){return this.data || {}},
        lectura(){return this.x.lectura && this.x.lectura.id },
    },
    methods:{
        click(){
            console.log("LCICLC");
           this.$store.commit('updateCatalogosState',['comunicado', this.x.id]);
           this.router.navigate('/detalle_comunicado');
           this.$store.dispatch('userPostActulizarLectura',[this.x]);
        }
    },
}
</script>