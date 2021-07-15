<template>
    <f7-page id="">
        <div class="vista">
            <nav-bar tipo="inicio" :backs="true" title="Crear ronda" :fix="1"  />
            <div class="contenedor-page-tabs back-color-blanco position-relative">
               
                <div class="row w-100 m-0 mt-3 justify-content-center">
                    <div class="row w-100 m-0">
                        <div class="col-11 mx-auto">
                            <inputForm type="text" texto="Nombre de la ronda" input="form" textcolor="verde2" v-model="form.nombre" />
                        </div>
                    </div>
                    
                    <div class="row w-100 m-0 pt-4">
                        <div class="row w-100 m-0 px-4 letra-verde-18">Niños a recolectar:</div>
                        <div class="row w-100 m-0" v-for="h of hijos" :key="h.id" @click="set(h)">
                            <hijosRow :data="h" :check="true" :select="hijosA.includes(h.id)"  />
                        </div>
                    </div>
                    
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 pt-4 px-4 letra-verde-18">Dias de la semana:</div>
                        <div class="row w-100 m-0 py-3 px-4">
                            <div class="col-auto px-0" v-for="d of dias" :key="d.id" @click="selectDia(`usuario_${d.id}`, session.id)">
                                <div class="w-50px h-50px border-radius-50 " :class="(form[`usuario_${d.id}`] == session.id)?'back-color-verde':'back-color-gray0'" >
                                    <div class="row w-100 m-0 justify-content-center pt-10px" :class="(form[`usuario_${d.id}`] == session.id)?'letra-blanco-18':'letra-gray4-18'" >{{d.text}}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row w-100 m-0 pt-4">
                        <div class="row w-100 m-0 px-4 letra-verde-18" @click="router.navigate('/seleccionar_padres_rondas')">
                            <div class="col my-auto px-0">Padres de familia:</div>
                            <div class="col-auto my-auto px-0">
                                <icono icono="add" clase="letra-verde-30" />
                            </div>
                        </div>
                        <div class="row w-100 m-0" v-if="!padresForm || !padresForm.length">
                            <div class="col-9 mx-auto letra-gray3-18 justify-content-center text-center ">Agrega padres de familia para crear la ronda</div>
                        </div>
                        <div class="row w-100 m-0" v-for="h of padresForm" :key="h.id">
                            <padreRow :data="h" :check="false" :del="true"  >
                                <div class="row w-100 m-0 pt-2">
                                    <div class="col-auto px-0" v-for="d of dias" :key="d.id" @click="selectDia(`usuario_${d.id}`, h.id)">
                                        <div class="w-50px h-50px border-radius-50 " :class="(form[`usuario_${d.id}`] == h.id)?'back-color-verde':'back-color-gray0'" >
                                            <div class="row w-100 m-0 justify-content-center pt-10px" :class="(form[`usuario_${d.id}`] == h.id)?'letra-blanco-18':'letra-gray4-18'" >{{d.text}}</div>
                                        </div>
                                    </div>
                                </div>
                            </padreRow>
                        </div>
                    </div>

                    <div class="row w-100 m-0 pt-5 pb-5">
                        <div class="col-11 mx-auto " @click="send()">
                            <botonApp texto="Aceptar y enviar" tipo="verde" radius="30px" />
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
                dias: [{id:'lunes', text: 'Lun'},{id:'martes', text: 'Mar'},{id:'miercoles', text: 'Mie'},{id:'jueves', text: 'Jue'},{id:'viernes', text: 'Vie'}],
                form:{
                    nombre: null,
                    usuario_lunes: null,
                    usuario_martes: null,
                    usuario_miercoles: null,
                    usuario_jueves: null,
                    usuario_viernes: null,
                },
                hijosA:[],
                
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            motivos(){return this.$store.getters.getCatalogo('motivos');},
            hijos(){return this.$store.getters.userStateArray('hijos');},
            padres(){return this.$store.getters.userStateArray('padres');},
            padresForm(){return this.$store.getters.userStateArray('padresForm');},
        },
        mounted() {
            this.$store.dispatch('initData', [this.$f7]);
        },
        methods:{
            selectDia(dia, id){
                if(this.form[dia] == id){
                    this.form[dia] = null;
                    return;
                }
                this.form[dia] = id;
            },
            send(){
                if(!this.form.nombre ){
                    swal("", "Ingresa el nombre de la ronda" ,"");
                    return;
                }
                if(!this.hijosA || !this.hijosA.length){
                    swal("", "Seleccione cual de sus hijos estara en las rondas" ,"");
                    return;
                }
                if(!this.padresForm || !this.padresForm.length){
                    swal("", "Seleccione padres para las rondas" ,"");
                    return;
                }
                if(!this.form.usuario_lunes && !this.form.usuario_martes && !this.form.usuario_miercoles && !this.form.usuario_jueves && !this.form.usuario_viernes){
                    swal("","Oraganiza los dias de recolección para las rondas","");
                    return;
                }
                this.$store.dispatch('userPostEnviarRonda',[this.form, this.hijosA, this.padresForm]);
            },
            
            set(h){
                const index = this.hijosA.findIndex(x=>x == h.id);
                if(index == -1){
                    this.hijosA.push(h.id);
                }
                else{
                    this.hijosA = this.hijosA.filter(x=>x != h.id);
                }
                console.log("hijosA", this.hijosA);
            }
          
        }
    }
</script>