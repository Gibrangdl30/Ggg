<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state" @click.self="closeModal()">
        <div class="row w-100 m-0px px-3" @click.self="closeModal()" >
            <div class="row w-100 m-0 mt-5 back-color-blanco py-3 border-radius-15px position-relative">

                <div class="w-auto position-absolute right-5px top-5px z-100" @click="closeModal()">
                    <icono icono="clear" clase="letra-gray3-40 fw-600" />
                </div>

                <div class="row w-100 m-0">

                    <div class="row w-100 m-0 pt-3 px-3">
                        <div class="row w-100 m-0 px-4">
                            <div class="row w-100 m-0 letra-gray3-22 text-center justify-content-center">Muestralo al establecimiento para que se valide.</div>
                        </div>
                    </div>

                    <div class="row w-100 m-0 px-3 py-3">
                        <div class="row w-100 m-0 px-3 py-3">
                            <div class="col-7 px-0 mx-auto py-2">
                                <imagen :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qr || 'socialFlow'}`" />
                            </div>
                        </div>
                    </div>
              
                    <div class="row w-100 m-0 pt-3 justify-content-space-between">
                        <!-- <div class="col-12 px-3">
                            <botonApp tipo="gris" texto="Cancelar" radius="30px" @click="cancelar()" />
                        </div> -->
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
        'grupo',
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
        contactos(){return this.grupo.contactos || []},
        a(){ return this.grupo || {}},
        total(){
            let t = 0;
            this.a.productos.map(x=>{
                t = t + Number(x.precio);
            });
            return t;
        },
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        cancelar(){
            this.closeModal();
        },
        click(){
            swal("","Solicitud enviada","success");
            this.closeModal();
            // this.$emit('click', this.cantidad);
        },
    },
}
</script>