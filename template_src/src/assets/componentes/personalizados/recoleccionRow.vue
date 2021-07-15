<template>
<div class="row w-100 m-0" @click="click()">

    <template v-if="coor" >
        <div class="row w-100 m-0 px-3 py-2">
            <div class="row w-100 m-0 py-2 px-3 border-gray01-1 border-radius-10px">
                <div class="row w-100 m-0">
                    <div class="w-18vw h-18vw my-auto border-radius-50 overflow-hidden">
                        <imagen :create="true" :src="padre.foto" />
                    </div>
                    <div class="col my-auto px-0 pl-3">
                        <!-- <div class="row w-100 m-0 letra-rojo-19 text-capitalize"> {{reporte.id}}</div> -->
                        <div class="row w-100 m-0 letra-gray4-19 text-capitalize">{{padre.nombre}}</div>

                        <div class="row w-100 m-0 " v-if="reporte.hora_recoleccion">
                            <div class="row w-100 m-0 letra-verde1-16">
                                <div class="col-auto px-0">{{tipo=='r'?'Entregado:':'Recibido'}} </div>
                                <div class="col-auto px-0 ml-auto">{{[reporte.hora_recoleccion, 'YYYY-MM-DD HH:mm:ss'] | moment('HH:mm [hrs]' ) }}</div>
                                <div class="col-auto px-0 pl-1">{{[reporte.hora_recoleccion, 'YYYY-MM-DD HH:mm:ss'] | moment('DD/MM/YYYY' ) }}</div>
                            </div>
                        </div>

                        <div class="row w-100 m-0 " v-else-if="Number(reporte.tiempo_extra)">
                            <div class="row w-100 m-0 letra-gray3-16">
                                <div class="col-auto px-0">Retraso reportado de:</div> 
                                <div class="col-auto px-0 ml-auto">{{reporte.tiempo_extra}} minutos</div>
                            </div>
                            <div class="row w-100 m-0 letra-verde1-16">
                                <div class="col-auto px-0">Llegada aproximada: </div>
                                <div class="col-auto px-0 ml-auto">{{[tiempoLlegada, 'YYYY-MM-DD HH:mm:ss'] | moment('HH:mm [hrs]') }}</div>
                            </div>
                        </div>

                        <div class="row w-100 m-0 letra-verde1-16" v-else>
                            <!-- <div class="col px-0">{{[reporte.tiempo, 'YYYY-MM-DD HH:mm:ss'] | moment('DD/MM/YYYY') }}</div> -->
                            <div class="col-auto px-0 ml-auto">{{[reporte.tiempo, 'YYYY-MM-DD HH:mm:ss'] | moment('from') }}</div>
                        </div>



                        <!-- <div class="row w-100 m-0 letra-verde-17 justify-content-start">
                            <div class="col-auto px-0 ml-auto letra-verde-17" @click="show=!show" v-if="show">Ver menos</div>
                            <div class="col-auto px-0 ml-auto letra-verde-17" @click="show=!show" v-else>Ver detalles</div>
                        </div> -->
                    </div>
                </div>
                <div class="row w-100 m-0 pt-3 pb-4" v-if="historial">
                    <div class="row w-100 m-0" v-for="h of usuarios" :key="h.id">
                        <hijosRow 
                            :data="h" 
                            :simple="true" 
                            :small="true"
                            :noborder="true"
                            py="py-2px"
                        />
                    </div>
                </div>
            </div>
        </div>
    </template>

    <template v-else>
        <div class="row w-100 m-0 px-3 py-2">
            <div class="row w-100 m-0 py-2 px-3 border-gray01-1 border-radius-10px">
                <div class="row w-100 m-0">
                    <div class="col px-0">
                        <div class="row w-100 m-0 letra-gray4-18" v-if="reporte.hora_recoleccion">
                            <div class="col px-0">{{[reporte.hora_recoleccion, 'YYYY-MM-DD HH:mm:ss'] | moment('DD/MM/YYYY') }}</div>
                            <div class="col-auto px-0">{{[reporte.hora_recoleccion, 'YYYY-MM-DD HH:mm:ss'] | moment('HH:mm [hrs]') }}</div>
                        </div>
                        <div class="row w-100 m-0 letra-gray4-18" v-else-if="reporte.tiempo">
                            <div class="col px-0">{{[reporte.tiempo, 'YYYY-MM-DD HH:mm:ss'] | moment('DD/MM/YYYY') }}</div>
                            <div class="col-auto px-0">{{[reporte.tiempo, 'YYYY-MM-DD HH:mm:ss'] | moment('HH:mm [hrs]') }}</div>
                        </div>

                        <div class="row w-100 m-0 letra-gray3-17 text-capitalize">{{session.nombre}}</div>
                        <div class="row w-100 m-0 letra-verde-17 justify-content-start">
                            <div class="col-auto px-0 ml-auto letra-verde-17" @click="show=!show" v-if="show">Ver menos</div>
                            <div class="col-auto px-0 ml-auto letra-verde-17" @click="show=!show" v-else>Ver detalles</div>
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
    </template>

</div>
</template>
<script>
const moment = require('moment')

export default {
    data(){
        return {
            detalles: false,
            show: false,
        };
    },
    props:[
       'data',
       'historial',
       'ruta'
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        debug(){return this.$store.getters.debug;},
        session(){return this.$store.getters.getSession;},
        coor(){return this.$store.getters.coor;},

        reporte(){return this.data || {}},
        tipo(){return this.reporte.tipo || null},
        falta(){return this.data || {}},
        padre(){return this.falta.padre || {}},
        usuarios(){return this.falta.usuarios || {}},
        tiempoLlegada(){return moment(this.reporte.tiempo, 'YYYY-MM-DD HH:mm:ss').add(Number(this.reporte.tiempo_extra), 'minutes').format('YYYY-MM-DD HH:mm:ss') },
    },
    mounted() {
        console.log("BEDU", this.debug, this.$store.getters.deviceready);
    },
    methods:{
        click(){
            this.$emit('click', this.reporte);
        },
    },
}
</script>