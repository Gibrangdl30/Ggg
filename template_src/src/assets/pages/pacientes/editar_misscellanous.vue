<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Miscellaneous information'" />
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="row w-100 m-0 px-3">
                        <div class="col-12 mt-4">
                            <inputForm type="date" texto="Date of discharge:" placeholder="" v-model="form.date_of_discharge" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="time" texto="Time:" placeholder="" v-model="form.time_of_discharg" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Length of stay:" placeholder="" v-model="form.lenght_of_stay" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Discharged to (Mortician name and licence No):" placeholder="" v-model="form.discharged" />
                        </div>
                        <!-- <div class="col-12 mt-4">
                            <inputForm type="text" texto="Signature:" placeholder="" v-model="form.signature" />
                        </div> -->
                        <div class="col-12 mt-4">
                            <inputForm type="date" texto="Date:" placeholder="" v-model="form.date" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="time" texto="Time:" placeholder="" v-model="form.time" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Personal effects sent with:" placeholder="" v-model="form.personal_effects_sent_with" />
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 justify-content-center mt-4 pb-5">
                    <div class="col-12 py-2">
                        <botonApp tipo="rojo" texto="Save" radius="30px" @click="save" />
                    </div>
                </div>
            </div>
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
import Swiper from 'swiper';
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                form:{
                    patient_id:             this.$store.getters.pacienteStateFind('pacientes', 'paciente').id,
                    date_of_discharge:      this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','misscellaneous').date_of_discharge      || null,
                    time_of_discharg:       this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','misscellaneous').time_of_discharg      || null,
                    lenght_of_stay:         this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','misscellaneous').lenght_of_stay      || null,
                    discharged:             this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','misscellaneous').discharged      || null,
                    date:                   this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','misscellaneous').date      || null,
                    time:                   this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','misscellaneous').time      || null,
                    personal_effects_sent_with:       this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','misscellaneous').personal_effects_sent_with      || null,
                },
            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            health(){return this.$store.getters.getCatalogo('health');},
            paciente(){ return this.$store.getters.pacienteStateFind('pacientes', 'paciente'); },
        },
        methods:{
            save(){
                this.$store.dispatch('postPacientes_guardarPaciente',['patiten_has_misscellanousinformations', this.form, true]);
            }
          
        }
    }
</script>