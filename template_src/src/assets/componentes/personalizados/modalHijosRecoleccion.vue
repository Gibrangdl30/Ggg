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

                        <div class="row w-100 m-0 border-b-gray01-1">
                            <div class="row w-100 m-0 py-2 gray4-23 fw-600 justify-content-center text-center " v-if="tipo == 'r'">Recolectar</div>
                            <div class="row w-100 m-0 py-2 gray4-23 fw-600 justify-content-center text-center " v-if="tipo == 'i'">Ingresar</div>
                        </div>

                        <div class="row w-100 m-0 border-b-gray01-1" v-if="tipo == 'r'">
                            <div class="row w-100 m-0 px-3 py-3">
                                <div class="col-auto my-auto px-0">
                                    <toggle :v="'1'" :f="'0'" v-model="form.emergencia" />
                                </div>
                                <div class="col my-auto px-0 pl-3 gray3-18">Es una emergencia</div>
                            </div>
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
                            <div class="row w-100 m-0 pt-4" v-if="tipo=='r'">
                                <div class="col-6 px-1">
                                    <botonApp texto="Voy tarde" tipo="rojo"  @click="tarde()" radius="30px"  />
                                </div>
                                <div class="col-6 px-1">
                                    <botonApp texto="Recolectar" @click="next(0)" tipo="verde" radius="30px" />
                                </div>
                            </div>
                            <div class="row w-100 m-0 pt-4" v-if="tipo=='i'">
                                <div class="col-10 px-1 mx-auto">
                                    <botonApp texto="Ingresar" @click="next(0)" tipo="verde" radius="30px" />
                                </div>
                            </div>
                        </div>
                    </div>
            </template>

            <template v-if="fase == 2">
                    <div class="row w-100 m-0 mt-5 back-color-blanco py-3 border-radius-15px">
                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 py-2 gray4-23 fw-600 justify-content-center text-center ">Timepo de retraso</div>
                        </div>

                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 py-1 px-3" v-for="h of tiempos" :key="h.valor" @click="next(h.valor)" >
                                <div class="row w-100 m-0 py-5px px-3 border-gray01-1 border-radius-30px">
                                    <div class="col my-auto px-0 gray3-18">{{h.nombre}}</div>
                                    <div class="col-auto my-auto px-0">
                                        <icono :r="true" clase="letra-gray2-30 pt-5px" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 pt-4 px-3">
                                <div class="col-12 px-1">
                                    <botonApp texto="Cancelar recolección" tipo="rojo"  @click="closeModal()" radius="30px"  />
                                </div>
                            </div>
                        </div>
                    </div>
            </template>

        </div>
    </div>


</transition>
</template>
<script>
const moment = require('moment');

export default {
    props: [
    ],
    data(){
        return {
            name: 'modalHijosRecoleccion',
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
        tipo(){return this.$store.getters.userStateObject('tipo'); },
        hijos(){return this.$store.getters.userStateArray('hijos'); },
    },
    methods:{
        closeModal(){
            this.fase = 1;
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
                swal("", "Seleccione cual de sus hijos recolectara" ,"");
                return;
            }
            this.fase = 2;
        },

        next(tiempo){
            if(!this.usuarios || !this.usuarios.length){
                swal("", `Seleccione cual de sus hijos ${this.tipo=='r'?'recolectara':'ingresara'}` ,"");
                return;
            }
            this.form.tiempo_extra = tiempo;
            this.$store.dispatch('servicioPostEnviarRecoleccion',[ this.form, this.usuarios, this.tipo ]);
            this.closeModal();
        }
    },
}
</script>







