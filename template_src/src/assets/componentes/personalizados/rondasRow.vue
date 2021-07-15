<template>
<div class="row w-100 m-0" @click="click()">
    <div class="row w-100 m-0 px-3 py-2">

        <div class="row w-100 m-0 py-2 pl-2 border-gray0-1 border-radius-10px">
            <div class="row w-100 m-0">
                <div class="w-16vw h-16vw border-radius-50 overflow-hidden">
                    <imagen :src="session.foto" />
                </div>
                <div class="col px-0 pl-3">
                    <div class="row w-100 m-0 letra-gray4-18">{{session.nombre}}</div>
                    <div class="row w-100 m-0 letra-gray3-17">Ronda {{info.nombre}}</div>
                    <div class="row w-100 m-0 letra-verde-17">
                        <div class="row w-100 m-0 justify-content-start " >
                            <div class="col-auto px-0" v-if="info.usuario_lunes == session.id">Lunes</div>
                            <div class="col-auto px-0 pl-2" v-if="info.usuario_martes == session.id">Martes</div>
                            <div class="col-auto px-0 pl-2" v-if="info.usuario_miercoles == session.id">Miercoles</div>
                            <div class="col-auto px-0 pl-2" v-if="info.usuario_jueves == session.id">Jueves</div>
                            <div class="col-auto px-0 pl-2" v-if="info.usuario_viernes == session.id">Viernes</div>
                        </div>
                    </div>
                    <div class="row w-100 m-0 pr-3" @click="salir()">
                        <div class="col-auto px-0 ml-auto letra-verde1-16 border-b-verde1-1">Salir de la ronda</div>
                    </div>
                </div>
            </div>

            <div class="row w-100 m-0 py-3" v-if="show" >
                <!-- <div class="row w-100 m-0 letra-gray3-16">Niños a bordo</div> -->
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
            show: true,
            detalles: false,
            dias:[
                'Lunes',
                'Martes',
                'Miercoles',
                'Jueves',
                'Viernes',
            ],
        };
    },
    props:[
       'index',
       'data',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},
        dia(){return moment()},
        info(){return this.data || {}},
        escuela(){return this.info.escuela || {}},
        driver(){return this.info.driver || {}},
        usuarios(){return this.info.hijos || {}},
    },
    methods:{
        click(){
            this.$emit('click');
        },
        salir(){
            this.$store.dispatch('userPostSalirRonda',[this.info]);
        }
    },
}
</script>