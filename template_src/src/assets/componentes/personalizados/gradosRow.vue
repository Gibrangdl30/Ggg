<template>
<div class="row w-100 m-0" @click="click()">
    <div class="row w-100 m-0 px-3 py-2">

        <div class="row w-100 m-0 py-2 px-3 border-gray01-1 border-radius-10px">
            <div class="col px-0">
                <div class="row w-100 m-0 letra-verde1-18 fw-600 ">Grado {{info.grade_id}}</div>
                <div class="row w-100 m-0 letra-gray3-17">{{alumnos}} {{alumnos>1?'alumnos':'alumno'}}</div>
                <div class="row w-100 m-0 letra-gray4-17">
                    <div class="col px-0">Ciclo {{ '2021-2021' }}</div>
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
        info(){return this.data || {}},
        alumnos(){return this.info.alumnos.length},
    },
    methods:{
        click(){
            this.$emit('click');
            this.$store.commit('setCoorState',['grado', this.info.id]);
            console.log("RUTA", this.ruta);
            this.router.navigate(this.ruta);
        },
    },
}
</script>