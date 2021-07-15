<template>
<div class="row w-100 m-0" @click="click()" >
    <div class="row w-100 m-0 px-3 py-2">

        <div class="row w-100 m-0 py-2 px-3" >
            <div class="col px-0">
                <div class="row w-100 m-0 letra-verde1-18 fw-600 ">Grupo {{info.group}}</div>
                <div class="row w-100 m-0 letra-gray4-17">{{alumnos}} {{alumnos>1?'alumnos':'alumno'}}</div>
                <div class="row w-100 m-0 letra-verde-17">
                    <div class="col px-0">Ciclo {{ '2021-2021' }}</div>
                </div>
            </div>
        </div>

        <template v-if="coor">
            <div class="row w-100 m-0" v-if=" maestro && maestro.id " >
                <div class="w-15vw h-15vw my-auto border-radius-50 overflow-hidden " >
                    <imagen clase="asd" :src="maestro.imagen" />
                </div>
                <div class="col px-0 my-auto">
                    <div class="row w-100 m-0 letra-gray3-17">Maestro</div>
                    <div class="row w-100 m-0 letra-gray4-19">{{maestro.name}}</div>
                </div>
            </div>
        </template>

        
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
       'ruta',
       'card'
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        coor(){return this.$store.getters.coor;},

        info(){return this.data || {}},
        maestro(){return this.info.maestro},
        alumnos(){return this.info.alumnos.length},

    },
    methods:{
        click(){
            this.$emit('click');
            this.$store.commit('setCoorState',['grupo', this.info.id]);
            console.log("RUTA", this.ruta);
            this.router.navigate(this.ruta);
        },
    },
}
</script>