<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state">
        <div class="row w-100 m-0px px-3">
            <template v-if="fase == 1">
                    <div class="row w-100 m-0 mt-5 back-color-blanco py-3 border-radius-15px position-relative">

                        <div class="w-auto position-absolute right-5px top-15px z-100" @click="closeModal()">
                            <icono icono="clear" clase="letra-gray4-40" />
                        </div>

                        <div class="row w-100 m-0 px-3 py-2 pb-3 border-b-gray01-1">
                            <div class="w-15vw h-15vw my-auto border-radius-50 overflow-hidden">
                                <imagen :create="true" :src="padre.foto" />
                            </div>
                            <div class="col my-auto px-0 pl-3">
                                <div class="row w-100 m-0 letra-gray4-19 text-capitalize">{{padre.nombre}}</div>
                            </div>
                        </div>

                        <div class="row w-100 m-0 border-b-gray01-1">
                            <div class="row w-100 m-0 py-2 gray4-23 fw-600 justify-content-center text-center " v-if="reco.tipo =='r'">Entregar</div>
                            <div class="row w-100 m-0 py-2 gray4-23 fw-600 justify-content-center text-center " v-if="reco.tipo =='i'">Recibir</div>
                        </div>

                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0" v-for="h of hijos" :key="h.id" @click="set(h)">
                                <hijosRow 
                                    :data="h" 
                                    :check="true" 
                                    :simple="true" 
                                    :select="usuarios.includes(h.id)"  />
                            </div>
                        </div>
                        

                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 pt-4">
                                <div class="col-10 mx-auto px-1">
                                    <botonApp texto="Entregar" @click="next(0)" tipo="verde" radius="30px" v-if="reco.tipo =='r'" />
                                    <botonApp texto="Recibir" @click="next(0)" tipo="verde" radius="30px" v-if="reco.tipo =='i'" />
                                </div>
                            </div>
                        </div>
                    </div>
            </template>

            <template v-if="fase == 2">
                    
            </template>

        </div>
    </div>


</transition>
</template>
<script>
const moment = require('moment');

export default {
    props: [
        'data',
    ],
    data(){
        return {
            name: 'modalCoorRecoleccionHijos',
            fase: 1,
            usuarios: [],
            form: {
                tiempo_extra: 0,
                emergencia: '0'
            },
            tiempos:[
                {nombre: '15 minutos', valor: 15},
                {nombre: '30 minutos', valor: 30},
                {nombre: '45 minutos', valor: 45},
                {nombre: '1 hora', valor: 60},
                {nombre: '2 horas', valor: 120},
            ],
        };
    },
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
        reco() {return this.data || {}},
        padre(){return this.reco.padre || {};  },
        hijos(){return this.reco.usuarios || []; },
    },
    methods:{
        closeModal(){
            this.fase = 1;
            this.usuarios = [];
            this.$store.commit('closeModal', [this.name]);
        },
        cancelar(){
            this.closeModal();
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
        },

        tarde(){
            if(!this.usuarios || !this.usuarios.length){
                swal("", `Seleccione cual de los hijos ${this.reco.tipo=='r'?'entregara':'recibira'}` ,"");
                return;
            }
            this.fase = 2;
        },

        next(tiempo){
            if(!this.usuarios || !this.usuarios.length || this.usuarios.length != this.hijos.length ){
                swal("", `Debes seleccionar y ${this.reco.tipo=='r'?'entregar':'recibir'} a todos los niños` ,"");
                return;
            }
            this.$store.dispatch('coorPostEntregarHijos',[this.reco, this.usuarios]);
            this.closeModal();
        }
    },
}
</script>







