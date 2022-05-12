<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar z-100000000000 w-100 m-0 p-0 justify-content-center" v-if="state" @click.self="closeModal()">
        <div class="row w-100 m-0px px-3 h-max-95vh scroll-y " @click.self="closeModal()">
            <div class="row w-100 m-0 mt-5 back-color-blanco py-3 border-radius-15px position-relative" @click.self="closeModal()">

                <div class="w-auto position-absolute right-2px top-2px z-100" @click="closeModal()" >
                    <icono icono="clear" clase="letra-gray4-40" />
                </div>

                <template v-if="cancelado" >

                    <template v-if="info.papara && info.papara.length" >

                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0" v-for="p of info.papara" :key="p.usuarios_id" >
                                <div class="row w-100 m-0 pt-4 py-5px px-2 " >
                                    <div class="w-15vw h-15vw my-auto ">
                                        <imagen clase="border-radius-50" :create="1" :src="p.foto" :user="true" />
                                    </div>
                                    <div class="col px-0 pl-3" >
                                        <div class="row w-100 m-0 letra-gray4-17 fw-600" >!{{p.nombre}} es tu nuevo pararatz¡</div> 
                                        <div class="row w-100 m-0 letra-gray3-14">{{p.descripcion}}</div>
                                        <div class="row w-100 m-0 pt-1">
                                            <div class="col-auto px-0 ml-auto pr-2 " @click="$store.commit('goToChat',[ p.usuarios_id ])" >
                                                <div class="w-43px h-43px back-color-negro border-radius-5px">
                                                    <div class="row w-100 m-0 pt-8px justify-content-center text-center">
                                                        <icono icono="chat_bubble" clase="letra-blanco-28" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-auto px-0 pr-3 text-rigth " @click="limpiar(p)" >
                                                 <div class="w-43px h-43px back-color-negro border-radius-5px">
                                                    <div class="row w-100 m-0 pt-5px justify-content-center text-center">
                                                        <icono icono="cancel" clase="letra-blanco-32" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div class="row w-100 m-0">
                                    <div class="row w-100 m-0 px-3 py-2 letra-gray3-16">Conoce a {{p.nombre}}</div>
                                    <div class="row w-100 m-0 px-3 justify-content-center ">
                                        <div class="w-22vw h-22vw mx-1 mt-2 mr-auto oveflow-hidden" v-for="(i,y) of p.fotos" :key="y" >
                                             <imagen clase="border-radius-10px" :create="1" :show="i.imagen" :src="i.imagen" />
                                        </div>
                                        <div class="w-22vw h-22vw mx-1 mt-2 mr-auto oveflow-hidden " v-if="!((p.fotos.length+1)%3)" >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                        <div class="row w-100 m-0 px-3 pb-3">
                            <div class="row w-100 m-0 pt-3 pb-3 ">
                                <div class="row w-100 m-0 letra-gray4-18">El servicio de Paparatz solicitado fue:</div>
                                <div class="row w-100 m-0 letra-gray3-17 text-capitalize ">{{[info.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('[El] DD [de] MMMM [a las] HH:mm [hrs]') }}</div>
                                <div class="row w-100 m-0 letra-gray4-18">Para el motivo de:</div>
                                <div class="row w-100 m-0 letra-gray3-17 ">{{ info.descripcion }}</div>
                            </div>
                        </div>
                    
                        <div class="row w-100 m-0 px-2 pt-2 pb-2 justify-content-center text-center ">
                            <div class="col-7 px-1 " @click="cancelar()">
                                <botonApp texto="Cancelar Paparatz" tipo="gris" radius="30px" />
                            </div>
                            <div class="col-5 px-1 " @click="closeModal()">
                                <botonApp texto="Aceptar" tipo="verde" radius="30px" />
                            </div>
                        </div>
                    </template>

                    <template v-else>
                        <div class="row w-100 m-0 pt-3">
                            <div class="row w-100 m-0 letra-gray4-19 fw-600 justify-content-center text-center " >Estas esperando paparatz</div> 
                        </div>
                        <div class="row w-100 m-0 px-3">
                            <div class="row w-100 m-0 pt-3 pb-3 border-b-gray0-1">
                                <div class="row w-100 m-0 letra-gray2-16">Mensaje:</div>
                                <div class="row w-100 m-0 pt-3 letra-gray3-16">{{info.descripcion}}</div>
                            </div>
                        </div>
                    
                        <div class="row w-100 m-0 py-2 pt-3 px-3">
                            <div class="row w-100 m-0 justify-content-start ">
                                <div class="col-auto px-0">
                                    <icono icono="place" clase="letra-gray4-30" />
                                </div>
                                <div class="col-auto px-0 pt-1px letra-gray3-18 pl-2">Buscando en un rango de</div>
                                <div class="col-auto px-0 pt-1px letra-gray4-18 fw-600 pl-2">{{info.rango || 500}} m</div>
                            </div>
                        </div>
                        <div class="row w-100 m-0 px-2 pt-2 pb-2 justify-content-center text-center ">
                            <div class="col-7 px-1 " @click="cancelar()">
                                <botonApp texto="Cancelar Paparatz" tipo="gris" radius="30px" />
                            </div>
                            <div class="col-5 px-1 " @click="closeModal()">
                                <botonApp texto="Aceptar" tipo="verde" radius="30px" />
                            </div>
                        </div>
                    </template>
                </template>

                <template v-else >
                    <div class="row w-100 m-0 pt-2">
                        <div class="row w-100 m-0 py-5px px-2 pt-4 " >
                            <div class="w-15vw h-15vw mb-auto ">
                                <imagen clase="border-radius-50" :src="usuario.foto" :user="true" />
                            </div>
                            <div class="col px-0 pl-3 " >
                                <div class="row w-100 m-0 letra-gray4-17 fw-600" >!{{usuario.nombre}}, necesita un pararatz ¡</div> 
                                <div class="row w-100 m-0 letra-gray4-17" >para</div>
                                <div class="row w-100 m-0 letra-gray3-16">{{info.descripcion}}</div>
                                <div class="row w-100 m-0 letra-gray3-14">{{[info.creado, 'YYYY-MM-DD HH:mm:ss'] |  moment('from') }}</div>
                                <div class="row w-100 m-0 letra-gray4-17 pt-2 fw-600" >Te contamos un poco sobre {{usuario.nombre}}</div>
                                <div class="row w-100 m-0 letra-gray3-17 " >{{usuario.descripcion}}</div>
                            </div>
                        </div> 
                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 px-3 py-2 letra-gray3-16" v-if="usuario.fotos && usuario.fotos.length">Conoce a {{usuario.nombre}}</div>
                            <div class="row w-100 m-0 px-3 justify-content-center ">
                                <div class="w-22vw h-22vw mx-1 oveflow-hidden" v-for="(i,y) of usuario.fotos" :key="y" >
                                        <imagen clase="border-radius-10px" :create="1" :show="i.imagen" :src="i.imagen" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 m-0 py-2 px-3">
                        <div class="row w-100 m-0 justify-content-start ">
                            <div class="col-auto px-0 letra-gray3-18">a</div>
                            <div class="col-auto px-0 letra-gray4-18 fw-600 pl-2">{{info.metros}} </div>
                            <div class="col-auto px-0 letra-gray3-18 pl-2">metros de ti</div>
                        </div>
                    </div>
                    <div class="row w-100 m-0" v-if="0">
                        <div class="row w-100 m-0 py-3 px-3 " >
                            <div class="w-10vw h-10vw my-auto ">
                                <imagen clase="border-radius-50" :src="usuario.foto" :user="true" />
                            </div>
                            <div class="col px-0 pl-3" >
                                <div class="row w-100 m-0 letra-gray4-17 fw-600" >{{usuario.nombre}}</div>
                                <div class="row w-100 m-0 letra-gray3-17 " >{{usuario.descripcion}}</div>
                            </div>
                        </div> 
                    </div>
                    <div class="row w-100 m-0 pt-3 pb-3" v-if="0" >
                        <div class="row w-100 m-0 letra-gray3-16 text-center justify-content-center ">
                            <div class="col my-auto letra-gray3-16 p-0 pl-3">Aceptar los terminos y condiciones  </div>
                            <!-- <div class="col my-auto letra-gray4-13 p-0 pl-3">He leído y acepto los <a class="color-azul1" href="/terminos_condiciones" >Términos y Condiciones</a> y el <a class="color-azul1" href="/aviso_privacidad" >Aviso de privacidad</a> de SocialFlow</div> -->
                            <div class="col-auto my-auto px-0 pl-3 pr-2 my-auto" >
                                <toggle :auto="true" :checked="acepto" @change="acepto = !acepto" />
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 m-0 justify-content-center text-center ">
                        <div class="col-11 mt-1 " @click="save()">
                            <botonApp texto="¡Convertirme paparatz!" tipo="verde" radius="30px" />
                        </div>
                    </div>
                </template>

                



            </div>
        </div>
    </div>
</transition>
</template>

<script>
const moment = require('moment');

export default {
    props: [
        'state',
        'cancelado',
        'data'
    ],
    data(){
        return {
            name: 'modalName',
            acepto: 0,
        };
    },
    computed: {
        // state() {return this.$store.getters.getModal(this.name)},
        info(){return this.data || {}},
        usuario(){return this.info.usuario || {}},
        papa(){return this.info.papa || {}},
        aceptar(){return this.info.usuario || {}},
    },
    mounted() {
        
    },
    methods:{
        closeModal(){
            this.$emit('close')
        },
        cancelar(){
            this.closeModal();
        },

        save(){
            // if(!this.acepto){
            //     swal("","Debes aceptar los terminos y condiciones para ser Paparatz","");
            //     return;
            // }

            let form = this.info;
            form.aceptar = 1;
            this.$store.dispatch('userPostCrearPost',[ form ]);
            this.closeModal();
        },

        limpiar(p){
            p.limpiar = 1;
            this.$store.dispatch('userPostCrearPost',[ p ]);
            this.closeModal();
        },

        cancelar(){
            let form = this.info;
            form.cancelar = 1;
            this.$store.dispatch('userPostCrearPost',[ form ]);
            this.closeModal();
        },
    },
}
</script>







