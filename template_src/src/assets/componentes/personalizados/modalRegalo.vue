<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state">
        <div class="row w-100 m-0px px-3 pt-5">
           <div class="row w-100 m-0 back-color-blanco border-radius-10px position-relative">

                <div class="w-auto position-absolute right-5px top-5px z-100" @click="closeModal()">
                    <icono icono="clear" clase="letra-rojo2-40 fw-600" />
                </div>

                <div class="row w-100 m-0 px-3 py-2 pt-4 position-relative">
                    <div class="w-20vw h-20vw my-auto">
                        <imagen :clase="`border-radius-50 border-${data.usuario.nivel}-3`" :user="true" :src="data.usuario.foto" :fit="true" />
                    </div>
                    <div class="col pl-3 pr-0 my-auto">
                        <div class="row w-100 m-0 letra-gray4-18">{{data.usuario.nombre}}</div>
                        <div class="row w-100 m-0 letra-gray3-16">{{data.usuario.nombre}} te hizo un regalo</div>
                        <div class="row w-100 m-0 letra-azul1-15">{{[data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('HH:mm [hrs] DD/MM/YY')}}</div>
                    </div>
                </div>
                <div class="row w-100 m-0 py-2 pl-3">
                    <div class="row w-100 m-0" v-if=" data.productos && data.productos.length ">
                        <div class="row w-100 m-0 letra-gray3-15">Regalos</div>
                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 px-3 py-2" v-for="u of data.productos" :key="u.id">
                                <div class="row w-100 m-0">
                                    <div class="w-10vw h-10vw">
                                        <imagen clase="border-radius-5px" :src="u.imagen" :fit="true" />
                                    </div>
                                    <div class="col my-auto px-0 pl-2">
                                        <div class="row w-100 m-0 letra-gray4-16">{{u.nombre}}</div>
                                    </div>
                                </div>
                                <div class="row w-100 m-0 pt-2 pb-3">
                                    <div class="row w-100 m-0 letra-gray4-18 ">
                                        <div class="col-auto px-0">{{u.precio | currency}}  </div>
                                        <div class="col px-0 pl-2">x{{u.cantidad }}</div>
                                        <div class="col-auto px-0 fw-800">{{u.total | currency}} {{ u.producto.currency }}</div>
                                    </div>
                                </div>
                            </div>
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
        'data',
    ],
    data(){
        return {
            name: 'modalRegalo',
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