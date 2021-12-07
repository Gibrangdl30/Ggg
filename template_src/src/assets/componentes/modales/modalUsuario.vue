<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">

    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" @click.self="closeModal()">
        <div class="row w-100 m-0px px-3" @click.self="closeModal()" >
            <div class="row w-100 m-0 mt-5 back-color-blanco py-3 border-radius-15px position-relative">

                <div class="w-auto position-absolute right-5px top-5px z-100" @click="closeModal()">
                    <icono icono="clear" clase="letra-gray3-40 fw-600" />
                </div>

                <div class="row w-100 m-0">

                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 px-3 py-4">
                            <imagen clase="border-radius-15px" :src="usuario.foto" />
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
        'usuario',
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
            this.$emit('close');
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