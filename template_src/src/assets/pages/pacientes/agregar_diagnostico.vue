<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Add diagnosis'" />
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="row w-100 m-0 px-3">
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Code:" placeholder="" v-model="form.code" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="date" texto="Onset date" placeholder="" v-model="form.onset_date" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Description" placeholder="" v-model="form.description" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Rank:" placeholder="" v-model="form.rank" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Clasification" placeholder="" v-model="form.clasification" />
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
                    code:           null,
                    onset_date:     null,
                    description:    null,
                    rank:           null,
                    clasification:  null,
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
                this.$store.dispatch('postPacientes_guardarPaciente',['patiten_has_diagnoses',this.form, true]);
            }
          
        }
    }
</script>