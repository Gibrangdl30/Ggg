<template>
    <f7-page class="" id="inicio">
        <modal-mensaje 
            v-if="t==1"
            :texto="''"
            :boton="'status'"
            @click="()=>{}"
            @set="t = 2"
        />
        <modal-mensaje 
            v-if="t==2"
            :titulo="'Change pacient status'"
            :boton="'changestatus'"
            @click="discharge()"
        />

        <div class="vista">
            <nav-bar tipo="inicio" title="Contacts" :backs="true" />

            <div class="contenedor-page-tabs back-color-blanco">

                  
                <div class="row w-100 m-0 py-1 px-3 border-b-gray0-1" v-for="i of contactos" :key="i.id" @click="go(i.id, '/editar_contacts')" >
                   <div class="row w-100 m-0">
                       <div class="col px-0">
                           <div class="row w-100 m-0 letra-gray4-18">{{i.name}}</div>
                           <div class="row w-100 m-0 letra-gray3-16">{{i.type}}</div>
                           <div class="row w-100 m-0 letra-gray3-16">{{i.relationship}}</div>
                           <div class="row w-100 m-0 letra-gray3-15">{{i.phone}}</div>
                           <div class="row w-100 m-0 letra-gray3-15">{{i.address}}</div>
                       </div>
                        <div class="col-auto my-auto px-0">
                           <div class="row w-100 m-0">
                               <icono clase="letra-gray2-30" icono="edit" />
                           </div>
                        </div>
                        <div class="col-auto my-auto px-0">
                           <div class="row w-100 m-0">
                               <icono clase="letra-gray2-30" icono="chevron_right" />
                           </div>
                        </div>
                   </div>
                </div>

            </div>

            <div class="row w-100 m-0" @click="router.navigate('/agregar_contacto')" >
                <div class="row w-100 m-0 py-15px back-color-rojo letra-blanco-20 justify-content-center text-center">Add contact</div>
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
            pacientes(){return this.$store.getters.pacienteStateArray('pacientes');},
            paciente(){return this.$store.getters.pacienteStateFind('pacientes', 'paciente');},
            contactos(){ return this.paciente.contacts; },
        },

        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
            // console.log("···············", this.zona);
        },

        methods:{
            go(id, url){
                this.$store.commit('updatePacienteState',['contacto',id]);
                this.router.navigate(url);
            },
            setCovid(){
                console.log("this", this.covid);
                this.$store.dispatch('postPacientes_guardarPaciente',['patients',this.form, false]);
            },
            discharge(){
                swal("","Status changed","success");
            }
        }
    }
</script>