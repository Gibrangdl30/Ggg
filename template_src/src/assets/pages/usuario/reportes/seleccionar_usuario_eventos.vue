<template>
    <f7-page id="">
        <div class="vista">
            <nav-bar tipo="inicio" :backs="true" title="Agendar faltas" :fix="1"  />
            <div class="contenedor-page-tabs back-color-blanco position-relative">
               
                <div class="row w-100 m-0 mt-3 justify-content-center">
                    <div class="row w-100 m-0">
                        <div class="col-11 mx-auto">
                            <selectForm 
                                texto="Motivo de falta"
                                llave="nombre" 
                                input="form" 
                                textcolor="verde2" 
                                :opciones="motivos" 
                                v-model="form.motivo" 
                            />
                        </div>
                    </div>
                    
                    <div class="row w-100 m-0 pt-4 pl-3 pr-3">
                        <div class="col-6">
                            <inputForm texto="Inicio de la falta" input="form" type="date" textcolor="verde2" v-model="form.inicio" />
                        </div>
                        <div class="col-6">
                            <inputForm texto="Fin de la falta" input="form" type="date" textcolor="verde2" v-model="form.fin" />
                        </div>
                    </div>

                    <div class="row w-100 m-0 pt-4">
                        <div class="col-11 mx-auto">
                            <inputForm :textarea="true" texto="Comentarios extras" input="form" textcolor="verde2" v-model="form.comentarios" />
                        </div>
                    </div>

                    <div class="row w-100 m-0 pt-4">
                        <div class="row w-100 m-0 px-4 letra-verde-18">Faltaran:</div>
                        <div class="row w-100 m-0" v-for="h of hijos" :key="h.id" @click="set(h)">
                            <hijosRow :data="h" :check="true" :select="usuarios.includes(h.id)"  />
                        </div>
                    </div>

                    <div class="row w-100 m-0 pt-5 pb-5">
                        <div class="col-11 mx-auto " @click="send()">
                            <botonApp texto="Aceptar y finalizar" tipo="verde" radius="30px" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment')

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                form:{
                    motivo: 'Enfermedad',
                    inicio: moment().format('YYYY-MM-DD'),
                    fin: moment().format('YYYY-MM-DD'),
                    comentarios: null,
                },
                usuarios:[],
                
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            motivos(){return this.$store.getters.getCatalogo('motivos');},
            hijos(){return this.$store.getters.userStateArray('hijos');},
        },
        mounted() {
            this.$store.dispatch('initData', [this.$f7]);
        },
        methods:{
            send(){
                if(this.form.inicio > this.form.fin){
                    swal("", "El inicio y fin de la falta no son correctos" ,"");
                    return;
                }
                if(!this.usuarios || !this.usuarios.length){
                    swal("", "Seleccione cual de sus hijos faltara" ,"");
                    return;
                }
                this.$store.dispatch('userPostEnviarFalta',[this.form, this.usuarios]);
            },
            
            set(h){
                const index = this.usuarios.findIndex(x=>x == h.id);
                if(index == -1){
                    this.usuarios.push(h.id);
                }
                else{
                    this.usuarios = this.usuarios.filter(x=>x != h.id);
                }
                console.log("USUARIOS", this.usuarios);
            }
          
        }
    }
</script>