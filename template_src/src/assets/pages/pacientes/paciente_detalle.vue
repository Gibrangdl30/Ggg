<template>
    <f7-page class="" id="inicio">
        <modal-mensaje 
            v-if="t==1"
            :texto="''"
            :boton="'status'"
            @click="router.navigate('/paciente_hospital')"
            @set="t = 2"
        />
        <modal-mensaje 
            v-if="t==2"
            :titulo="'Change pacient status'"
            :boton="'changestatus'"
            @set="t = 3"
        />

        <modal-mensaje 
            v-if="t==3"
            :titulo="'Are you sure to discharge the patient?'"
            :boton="'Acept'"
            @click="discharge()"
        />

        <div class="vista">
            <nav-bar tipo="inicio" :title="paciente.name" :backs="true" />

            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0">
                    <rowPaciente :data="paciente" />
                </div>

                <div class="row w-100 m-0 border-t-gray0-1">
                    <div class="row w-100 m-0 py-1 px-3 border-b-gray0-1" >
                        <div class="col px-0 my-auto letra-gray3-18">COVID 19 infectious</div>
                        <div class="col-auto px-0 pr-2 my-auto letra-gray3-13">Positive</div>
                        <div class="col-auto px-0 my-auto">
                            <toggle :v="'1'" :f="'0'" v-model="form.covid" @change="setCovid" />
                            <!-- <icono clase="letra-verde-30" icono="check_circle" /> -->
                        </div>
                        <div class="col-auto px-0 pl-2 my-auto">
                            <icono clase="letra-gray3-30" icono="chevron_right" />
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 ">
                    <!-- <div class="row w-100 m-0 py-1 px-3 border-b-gray0-1" v-for="i of info" :key="i.id" @click="go(i.url)" >
                        <div class="col px-0 my-auto letra-gray3-18">{{i.name}}</div>
                        <div class="col-auto px-0 my-auto">
                            <icono clase="letra-verde-30" icono="check_circle" />
                        </div>
                        <div class="col-auto px-0 pl-2 my-auto">
                            <icono clase="letra-gray3-30" icono="chevron_right" />
                        </div>
                    </div> -->
                    <div class="row w-100 m-0 py-1 px-3 border-b-gray0-1" v-for="i of info" :key="i.id" @click="go(i.url)" >
                        <rowInfoPaciente :data="i" />
                    </div>
                </div>

            </div>

            <div class="row w-100 m-0" @click="t=1; $store.commit('openM');" >
                <div class="row w-100 m-0 py-15px back-color-rojo letra-blanco-20 justify-content-center text-center">Modify patient´s status</div>
            </div>

        </div>

    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment-timezone');

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                t:1,
                form:{
                    id:     this.$store.getters.pacienteStateFind('pacientes', 'paciente').id,
                    covid:  this.$store.getters.pacienteStateFind('pacientes', 'paciente').covid,
                }
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            info(){return this.$store.getters.pacienteStateObject('info');},
            pacientes(){return this.$store.getters.pacienteStateArray('pacientes')},
            paciente(){return this.$store.getters.pacienteStateFind('pacientes', 'paciente');},
        },

        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
            // console.log("···············", this.zona);
        },

        methods:{
            go(url){
                this.router.navigate(url);
            },
            setCovid(){
                console.log("this", this.covid);
                this.$store.dispatch('postPacientes_guardarPaciente',['patients',this.form, false]);
            },
            discharge(){
                this.form.status = 'discharge';
                this.$store.dispatch('postPacientes_guardarPaciente',['patients',this.form, true]);
            }
        }
    }
</script>