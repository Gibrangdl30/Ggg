<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Care providers'"/>
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="row w-100 m-0 px-3">
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Provider:" placeholder="" v-model="form.provider" />
                        </div>
                        <div class="col-6 mt-4">
                            <inputForm type="text" texto="Phone" placeholder="" v-model="form.phone" />
                        </div>
                        <div class="col-6 mt-4">
                            <inputForm type="text" texto="fax" placeholder="" v-model="form.fax" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Adress:" placeholder="" v-model="form.address" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="UPIN:" placeholder="" v-model="form.upin" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="NPI:" placeholder="" v-model="form.npin" />
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
                    provider:       this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','careProviders').provider     || null,
                    phone:                      this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','careProviders').phone      || null,
                    fax:                 this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','careProviders').fax   || null,
                    address:             this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','careProviders').address      || null,
                    upin:                   this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','careProviders').upin || null,
                    npin:   this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','careProviders').npin || null,
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
                this.$store.dispatch('postPacientes_guardarPaciente',['patiten_has_careproviders',this.form, true]);
            }
          
        }
    }
</script>