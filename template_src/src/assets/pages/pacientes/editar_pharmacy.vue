<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Pharmacy'"/>
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="row w-100 m-0 px-3">
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Pharmarcy:" placeholder="" v-model="form.name" />
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
                    patient_id: this.$store.getters.pacienteStateFind('pacientes', 'paciente').id,
                    name:       this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','pharmacy').name      || null,
                    phone:      this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','pharmacy').phone     || null,
                    fax:        this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','pharmacy').fax       || null,
                    address:    this.$store.getters.pacienteStateFindFiel('pacientes', 'paciente','pharmacy').address   || null,
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
                this.$store.dispatch('postPacientes_guardarPaciente',['patiten_has_pharmacies',this.form, true]);
            }
          
        }
    }
</script>