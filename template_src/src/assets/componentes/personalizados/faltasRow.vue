<template>
<div class="row w-100 m-0" @click="click()">
    <div class="row w-100 m-0 px-3 py-2">

        <div class="row w-100 m-0 py-2 px-3 border-gray01-1 border-radius-10px">
            <div class="row w-100 m-0">
                <div class="col px-0">
                    <div class="row w-100 m-0 letra-gray4-18">
                        <div class="col my-auto px-0">Falta #{{reporte.id}}</div>
                        <div class="col-auto my-auto px-0" v-if="eliminable" @click="$store.dispatch('userPostDelFalta',[reporte])" >
                            <botonApp texto="Eliminar" tipo="gris" radius="30px" py="py-5px" />
                        </div>
                    </div>
                    <div class="row w-100 m-0 letra-verde1-17 text-capitalize">{{reporte.motivo}}</div>
                    <div class="row w-100 m-0 letra-gray3-17">Agendado el {{[reporte.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('DD/MM/YYYY') }}</div>
                    <div class="row w-100 m-0 letra-verde-17 justify-content-start">
                        <div class="col-auto px-0">{{[reporte.inicio, 'YYYY-MM-DD'] | moment('DD/MM/YYYY') }}</div>
                        <div class="col-auto px-0"> - </div>
                        <div class="col-auto px-0">{{[reporte.fin, 'YYYY-MM-DD'] | moment('DD/MM/YYYY') }}</div>
                        <div class="col-auto px-0 ml-auto letra-gray3-17" @click="show=!show" v-if="show">Ver menos</div>
                        <div class="col-auto px-0 ml-auto letra-gray3-17" @click="show=!show" v-else>Ver detalles</div>
                    </div>
                </div>
            </div>
            <div class="row w-100 m-0 pb-4" v-if="show">
                <div class="row w-100 m-0 " v-for="h of usuarios" :key="h.id">
                    <hijosRow 
                        :data="h" 
                        :simple="true" 
                    />
                </div>
            </div>
        </div>
        
    </div>
</div>
</template>
<script>
const moment = require('moment');

export default {
    data(){
        return {
            detalles: false,
            show: false,
        };
    },
    props:[
       'data',
       'ruta'
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        reporte(){return this.data || {}},
        falta(){return this.data || {}},
        eliminable(){return this.data.inicio >= moment().format('YYYY-MM-DD') },
        usuarios(){return this.falta.usuarios || {}},
    },
    methods:{
        click(){
            this.$emit('click');
        },
    },
}
</script>