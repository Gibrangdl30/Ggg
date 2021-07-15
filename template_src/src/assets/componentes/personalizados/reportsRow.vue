<template>
<div class="row w-100 m-0" @click="click()">
    <div class="row w-100 m-0 px-3 py-2">

        <div class="row w-100 m-0 py-2 px-3 border-gray01-1 border-radius-10px">
            <div class="col px-0">
                <div class="row w-100 m-0 letra-gray4-18">{{reporte.titulo}}</div>
                <div class="row w-100 m-0 letra-verde1-17 text-capitalize">{{reporte.prioridad}}</div>
                <div class="row w-100 m-0 letra-verde-17">
                    <div class="col px-0">{{[reporte.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from') }}</div>
                    <div class="col-auto px-0">Ver detalles</div>
                </div>
            </div>
        </div>
        
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            detalles: false,
        };
    },
    props:[
       'data',
       'ruta'
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        reporte(){return this.data || {}},
    },
    methods:{
        click(){
            this.$emit('click');
            this.$store.commit('setUsuarioData',['detalle', this.reporte.id]);
            this.router.navigate(this.ruta);
        },
    },
}
</script>