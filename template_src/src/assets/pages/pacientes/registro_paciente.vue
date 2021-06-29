<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'New pacient'"/>
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="col-12 text-center pt-2 mb-3 position-relative">
                        <div class="w-30vw h-30vw mx-auto border-radius-30px border-blanco-3 overflow-hidden position-relative">
                            <uploadImagen class="border-radius-50 border-rojo-3" :user="false" v-model="form.imagen_id" />
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
                    imagen_id:                  null,
                    name:                       null,
                    email:                      null,
                    gender:                     null,
                    unit:                       null,
                    room_bred:                  null,
                    birthday:                   null,
                    admission_date:             null,
                    inicial_admission_date:     null,
                    original_admission_date:    null,
                    residentid:                 null,
                    snn:                        null,
                    healthcarefacility_id:      null,
                },
            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            health(){return this.$store.getters.getCatalogo('health');},
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