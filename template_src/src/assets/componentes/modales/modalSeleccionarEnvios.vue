<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" @click.self="closeModal()">
        <div class="row w-100 m-0px px-3  " @click.self="closeModal()" >
            <div class="row w-100 m-0 mt-3 back-color-blanco  py-3 border-radius-15px position-relative">

                <div class="w-auto position-absolute right-5px top-5px z-100" @click="closeModal()">
                    <icono icono="clear" clase="letra-gray3-40 fw-600" />
                </div>

                <div class="row w-100 m-0">

                    <div class="row w-100 m-0 pt-3 px-3">
                        <div class="row w-100 m-0 px-4">
                            <div class="row w-100 m-0 px-3 pt-2 letra-gray3-22 text-center justify-content-center">Selecciona el tipo de envio que deseas.</div>
                        </div>
                    </div>

                    <div class="row w-100 m-0 px-3 py-3">
                        <div class="row w-100 m-0 py-3 h-max-50vh scroll-y ">
                            <div v-for="e of envios" :key="e.id" class="row w-100 m-0 pb-2">
                                <div class="row w-100 m-0 pb-2">
                                    <div class="col-auto px-1 pr-2 my-auto" >
                                        <div class="row w-100 m-0" >
                                            <div class="w-auto" @click="click(e)" >
                                              <icono clase="letra-gray3-30" icono="radio_button_checked" v-if="(prodx.envio || {}).id == e.id" />
                                              <icono clase="letra-gray3-30" icono="radio_button_unchecked" v-else  />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col px-0 ">
                                        <div class="row w-100 m-0">
                                            <div class="row w-100 m-0">
                                                <div class="w-15vw mx-1 my-auto mr-2">
                                                    <imagen :icono="1" formato="png" :src="e.nombre" />
                                                </div>
                                                <div class="col px-0 ">
                                                    <div class="row w-100 m-0 letra-gray4-18">{{e.nombre}}</div>
                                                    <div class="row w-100 m-0 letra-rojo-14 fw-600">{{e.tipo}}</div>
                                                </div>
                                                <div class="col-auto px-0 my-auto letra-rojo-23 fw-600" v-if="e.precio" >{{e.precio | currency}}</div>
                                                <div class="col-auto px-0 my-auto letra-rojo-23 fw-600" v-else >Gratis</div>
                                            </div>
                                            <div class="row w-100 m-0 letra-gray3-14">{{e.dias}} dias aproximados Despues de la recolección con el emprendedor</div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
              
                    <div class="row w-100 m-0 pt-3 justify-content-space-between">
                        <div class="col-12 px-3">
                            <botonApp tipo="app" texto="Seleccionar" radius="30px" @click="cancelar()" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>


</transition>
</template>
<script>
export default {
    props: [
        'qr',
        'prod',
        'transaccion',
        'boton'
    ],
    data(){
        return {
            name: 'modalQr',
            razon: '',
            calificaion:0,
            cantidad:null,
        };
    },
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
        prodx(){return this.prod || {}},
        envios(){return this.prodx.envios || []},
    },

    mounted(){
        console.log("ENVIOS", this.prodx)
    },

    methods:{
        closeModal(){
            this.$emit('close', [this.name]);
        },
        cancelar(){
            this.closeModal();
        },
        click(e){
            this.prodx.envio = e;
            this.prodx.precio_envio = e.precio;
            this.$store.commit('selectEnvioProd',{prod: this.prodx, envio: e});
        },
    },
}
</script>