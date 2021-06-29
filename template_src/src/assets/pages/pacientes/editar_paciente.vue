<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'New pacient'"/>
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="col-12 text-center pt-2 mb-3 position-relative">
                        <div class="w-30vw h-30vw mx-auto border-radius-30px border-blanco-3 overflow-hidden position-relative">
                            <uploadImagen class="border-radius-50 border-rojo-3 overflow-hidden" :user="false" v-model="form.imagen_id" />
                        </div>
                        <div class="col-12 py-2 letra-gray3-14 text-center">Add a profile photo or image</div>
                    </div>
                    <div class="row w-100 m-0 px-3">
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Resident name:" placeholder="" v-model="form.name" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="email" texto="Email:" placeholder="" v-model="form.email" />
                        </div>
                        <div class="col-12 mt-4">
                            <selectForm type="text" texto="Gender:" :opciones="generos" v-model="form.gender" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Unit:" placeholder="" v-model="form.unit" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Room/bed:" placeholder="" v-model="form.room_bred" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="date" texto="Birthday:" placeholder="" v-model="form.birthday" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="date" texto="Admission date:" placeholder="" v-model="form.admission_date" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="date" texto="Init Adm. Date:" placeholder="" v-model="form.inicial_admission_date" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="date" texto="Orig Adm. Date:" placeholder="" v-model="form.original_admission_date" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Resident #:" placeholder="" v-model="form.residentid" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="SNN:" placeholder="" v-model="form.snn" />
                        </div>
                        <div class="col-12 mt-4">
                            <selectForm type="text" texto="Hospital/HealthCare Facility:" nombre="name" :opciones="health" v-model="form.healthcarefacility_id" />
                        </div>
                        
                    </div>
                </div>

                <div class="row w-100 m-0 justify-content-center mt-4 pb-5">
                    <div class="col-12 py-2">
                        <botonApp tipo="rojo" texto="Create" radius="30px" @click="save" />
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
                generos:[
                    { id: 'male', nombre: 'Male'},
                    { id: 'female', nombre: 'Female'},
                ],
                form:{
                    id:                         this.$store.getters.pacienteStateFind('pacientes', 'paciente').id,
                    imagen_id:                  this.$store.getters.pacienteStateFind('pacientes', 'paciente').imagen_id,
                    name:                       this.$store.getters.pacienteStateFind('pacientes', 'paciente').name,
                    email:                      this.$store.getters.pacienteStateFind('pacientes', 'paciente').email,
                    gender:                     this.$store.getters.pacienteStateFind('pacientes', 'paciente').gender,
                    unit:                       this.$store.getters.pacienteStateFind('pacientes', 'paciente').unit,
                    room_bred:                  this.$store.getters.pacienteStateFind('pacientes', 'paciente').room_bred,
                    birthday:                   this.$store.getters.pacienteStateFind('pacientes', 'paciente').birthday,
                    admission_date:             this.$store.getters.pacienteStateFind('pacientes', 'paciente').admission_date,
                    inicial_admission_date:     this.$store.getters.pacienteStateFind('pacientes', 'paciente').inicial_admission_date,
                    original_admission_date:    this.$store.getters.pacienteStateFind('pacientes', 'paciente').original_admission_date,
                    residentid:                 this.$store.getters.pacienteStateFind('pacientes', 'paciente').residentid,
                    snn:                        this.$store.getters.pacienteStateFind('pacientes', 'paciente').snn,
                    healthcarefacility_id:      this.$store.getters.pacienteStateFind('pacientes', 'paciente').healthcarefacility_id,
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
                if(!this.form.name || !this.form.email || !this.form.gender){
                    swal("","Please fill all fields","");
                    return;
                }
                
                this.$store.dispatch('postPacientes_guardarPaciente',['patients',this.form, true]);
            }
          
        }
    }
</script>