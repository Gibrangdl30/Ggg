<template>
<div class="row w-100 m-0" @click="click()">
    <div class="row w-100 m-0 " :class="full?'pt-3':'px-3 py-2'">

        <div class="row w-100 m-0 " :class="full?'':'py-2 pl-2 border-gray0-1 border-radius-10px'">
            <div class="row w-100 m-0">
                <div class="w-16vw h-16vw border-radius-50 overflow-hidden">
                    <imagen :src="driver.imagen" />
                </div>
                <div class="col px-0 pl-3">
                    <div class="row w-100 m-0 letra-gray4-18">{{driver.name}}</div>
                    <div class="row w-100 m-0 letra-verde1-17">Chofer</div>
                    <div class="row w-100 m-0 letra-verde-17">En ruta</div>
                </div>
            </div>
            <div class="row w-100 m-0 px-3">
                <div class="row w-100 m-0">
                    <div class="col px-0 letra-gray4-17">En ruta</div>
                    <div class="col-auto px-0 letra-verde-17" v-if="!full" @click="click">{{show?'Ver menos':'Ver detalles'}}</div>
                </div>
                <div class="row w-100 m-0 letra-verde1-17">Autobus 01</div>
                <div class="row w-100 m-0 letra-gray3-17">Hacia la escuela {{escuela.name}}</div>
            </div>
            <div class="row w-100 m-0 pt-4" v-if="full">
                <div class="row w-100 m-0 h-40vh">
                    <mapaRutaEscuela 
                        :origen="escuela" 
                        :usuarios="usuarios" 
                    />
                </div>
            </div>

            <div class="row w-100 m-0 py-3" v-if="full" >
                <div class="row w-100 m-0 letra-gray3-16">Niños a bordo</div>
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
export default {
    data(){
        return {
            show: false,
            detalles: false,
        };
    },
    props:[
       'data',
       'full',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        info(){return this.data || {}},
        escuela(){return this.info.escuela || {}},
        driver(){return this.info.driver || {}},
        usuarios(){return this.info.usuarios || {}},
    },
    methods:{
        click(){
            this.$emit('click');
            this.$store.commit('setUsD',['detalle', this.info.id]);
            this.router.navigate('/detalle_ruta');
        },
    },
}
</script>