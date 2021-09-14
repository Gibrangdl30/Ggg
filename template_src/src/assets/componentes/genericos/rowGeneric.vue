<template>
<div class="w-30vw">
    <div class="row w-100 m-0 px-1 py-2" @click="click()">
        <div class="row w-100 m-0 carta border-radius-15px overflow-hidden">
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 pt-2 justify-content-center">
                    <div class="w-27vw h-27vw p-5px">
                        <imagen clase="border-radius-15px" :fit="true" :src="info.imagen" v-if="info.imagen" />
                    </div>
                </div>
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 pb-2">
                        <div class="row w-100 m-0 h-55px justify-content-center text-center letra-gray4-14 align-content-center">{{info.nombre | truncate(26)}}</div>
                        <div class="row w-100 m-0 justify-content-center text-center letra-azul1-15">{{info.precio | currency}} {{info.currency}}</div>
                        <div class="row w-100 m-0 justify-content-center text-center letra-gray3-15">{{info.vendedor}}</div>
                    </div>
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
        };
    },
    props:[
        'data',
        'full',
        'tipo',
        'regalo',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        info(){return this.data || {}},
        ruta(){return this.$store.getters.viajeObject('ruta')},

    },
    methods:{
        click(){
            console.log("THIS", this.tipo);
            if(this.tipo == 1){
                this.$store.commit('updateCatalogosState',['producto', this.info.id]);
                this.$store.commit('setCarritosState',['producto', this.info.id]);
                this.router.navigate('/detalle_producto_lista');
                return;
            }
            if(this.regalo){
                this.$store.commit('updateCatalogosState',['producto', this.info.id]);
                this.$store.commit('setCarritosState',['producto', this.info.id]);
                this.router.navigate('/detalle_producto_evento');
                return;
            }
            else{
                this.$store.commit('updateCatalogosState',['producto', this.info.id]);
                this.$store.commit('setCarritosState',['producto', this.info.id]);
                this.router.navigate('/detalle_producto');
                return;
            }
        },
    },
}
</script>