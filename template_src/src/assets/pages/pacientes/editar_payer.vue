<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Payer information'"/>
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="row w-100 m-0 px-3">
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Primarly payer:" placeholder="" v-model="form.primary_payer" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Second payer:" placeholder="" v-model="form.second_payer" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Medical payment" placeholder="" v-model="form.medical_payment" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Group #:" placeholder="" v-model="form.group_number" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Insurance company:" placeholder="" v-model="form.insurance_company" />
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
                    patient_id:            this.$store.getters.pacienteStateFind('pacientes', 'paciente').id,
                    primary_payer:         this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','payer').primary_payer     || null,
                    second_payer:          this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','payer').second_payer      || null,
                    medical_payment:       this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','payer').medical_payment   || null,
                    group_number:          this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','payer').group_number      || null,
                    insurance_company:     this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','payer').insurance_company || null,
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
                this.$store.dispatch('postPacientes_guardarPaciente',['patiten_has_payerinformations',this.form, true]);
            }
          
        }
    }
</script>