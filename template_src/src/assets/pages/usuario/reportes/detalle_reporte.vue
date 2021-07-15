<template>
    <f7-page id="">
        <div class="vista">
            <nav-bar tipo="inicio" :backs="true" title="Reporte detalle" :fix="1"  />
            <div class="contenedor-page-tabs back-color-blanco position-relative">

                <div class="row w-100 m-0 px-3 pt-3">
                    <div class="row w-100 m-0 letra-gray4-20 fw-600">Reporte de {{reporte.tipo}}
                    </div>
                </div>
                <div class="row w-100 m-0 px-3 pt-3">
                    <div class="row w-100 m-0 gray3-18 text-capitalize">{{reporte.prioridad}}</div>
                </div>

                <div class="row w-100 m-0 px-3 pt-3">
                    <div class="row w-100 m-0 verde-18 text-capitalize">Titulo: {{reporte.titulo}}</div>
                </div>

                <div class="row w-100 m-0 px-3 pt-4">
                    <div class="row w-100 m-0 gray3-16">{{reporte.descripcion}}</div>
                </div>
               
                <div class="row w-100 m-0 pt-4">
                    <div class="row w-100 m-0" v-for="h of reporte.usuarios" :key="h.id" @click="set(h)">
                        <hijosRow :data="h"   />
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
            reporte(){return this.$store.getters.userStateFind('reportes','detalle');},
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