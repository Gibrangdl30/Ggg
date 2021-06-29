<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Other information'"/>
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="row w-100 m-0 px-3">
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Most recent hospital stay:" placeholder="" v-model="form.mostrecent_hospital_stay" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Allergies:" placeholder="" v-model="form.allergies" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Admission type" placeholder="" v-model="form.admission_type" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Hairdressing notes:" placeholder="" v-model="form.hairdressign_notes" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Incontinence:" placeholder="" v-model="form.incontinence" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="date" texto="Medicarl recertification date:" placeholder="" v-model="form.medical_recertification_date" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Medicare coverage:" placeholder="" v-model="form.medicare_coverage" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Part D Carrier:" placeholder="" v-model="form.part_dcarrier" />
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
                    patient_id:                     this.$store.getters.pacienteStateFind('pacientes', 'paciente').id,
                    mostrecent_hospital_stay:       this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','other').mostrecent_hospital_stay     || null,
                    allergies:                      this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','other').allergies      || null,
                    admission_type:                 this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','other').admission_type   || null,
                    hairdressign_notes:             this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','other').hairdressign_notes      || null,
                    incontinence:                   this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','other').incontinence || null,
                    medical_recertification_date:   this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','other').medical_recertification_date || null,
                    medicare_coverage:              this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','other').medicare_coverage || null,
                    part_dcarrier:                  this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','other').part_dcarrier || null,
                },
            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            health(){return this.$store.getters.getCatalogo('health');},
            paciente(){return this.$store.getters.pacienteStateFind('pacientes', 'paciente');},
        },
        methods:{
            save(){
                this.$store.dispatch('postPacientes_guardarPaciente',['patiten_has_otherinformations',this.form, true]);
            }
          
        }
    }
</script>