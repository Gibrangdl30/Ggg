<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center px-1" v-if="state" @click.self="closeModal()">
        <div class="row w-100 m-0px mt-60px px-3 pt-40px" @click.self="closeModal()">

            <div class="row w-100 m-0 mt-5 back-color-blanco pt-3 border-radius-8px overflow-hidden position-relative">

                <div class="w-auto position-absolute top-8px right-8px" @click="closeModal()">
                    <icono icono="clear" clase="letra-gray2-30" />
                </div>

            <div class="row w-100 m-0 pb-3" v-if="a.tipo == 'newrequest'" >
                <div class="row w-100 m-0 px-0">
                    <div class="col-7 px-0 mx-auto letra-azul1-20 fw-600 justify-content-center text-center white-space-preline">Your friend send you a photo request!</div>
                </div>
                <div class="row w-100 m-0 px-0 pt-4 pb-3">
                    <div class="col-9 px-0 mx-auto letra-gray3-19 justify-content-center text-center white-space-preline">Your friend wants a photo, lets send it</div>
                </div>
            </div>

            <div class="row w-100 m-0 pb-3" v-else>
                <div class="row w-100 m-0 justify-content-center">
                    <div class="row w-100 m-0 justify-content-center" v-if="a.icono=='success'">
                            <div class="w-80px h-80px border-radius-50 overflow-hidden border-verde3-3 text-center align-content-center">
                            <icono icono="done_outline" clase="letra-verde3-49 fw-800 ml-13px mt-7px" />
                        </div>
                    </div>
                </div>
                <div class="row w-100 m-0 px-0">
                    <div class="row w-100 m-0 justify-content-center py-2">
                       <div class="row w-100 m-0 px-3 letra-gray3-17 justify-content-center text-center white-space-preline">{{a.texto}}</div>
                    </div>
                </div>
            </div>

            <div class="row w-100 m-0 back-color-blanco">
                <div class="row w-100 m-0 justify-content-center pb-3" v-if="a.one">
                    <div class="col-11 px-0" @click="click()">
                        <botonApp radius="30px" py="py-9px" :texto="a.boton" />
                    </div>
                </div>
                <div class="row w-100 m-0" v-else-if="a.cuenta">
                    <div class="col-6 pl-0 pr-2" @click="registro()">
                        <boton-app clase="back-color-blanco" :outline="true" texto="Crea una cuenta" radius="30px"></boton-app>
                    </div>
                    <div class="col-6 pl-2 pr-0" @click="logout()">
                        <boton-app texto="Inicia sesión" radius="30px"></boton-app>
                    </div>
                </div>
                <div class="row w-100 m-0 px-2 pb-3" v-else-if="a.boton=='Finalizar pedido'">
                    <div class="col px-2" @click="closeModal()">
                        <botonApp clase="back-color-blanco" tipo="gris" py="py-8px" texto="Agregar mas" radius="5px" />
                    </div>
                    <div class="col px-2" @click="goCarrito()">
                        <botonApp tipo="azul" texto="Finalizar pedido" py="py-8px" radius="5px" />
                    </div>
                </div>
                <div class="row w-100 m-0" v-else>
                    <div class="col-6 px-0" @click="closeModal()">
                        <boton-app :outline="true"  texto="Cancelar" radius="0px"></boton-app>
                    </div>
                    <div class="col-6 px-0" @click="click()">
                        <boton-app :texto="a.boton" side="br" radius="0px"></boton-app>
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
    data(){
        return {
            name: 'globalMsn',
            razon: '',
        };
    },
    props: [],
    computed: {
        router(){return this.$store.getters.getRouter;},
        state() {return this.$store.getters.getModal(this.name)},
        a() {return this.$store.getters.getMsn || {}},
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        logout(){
            this.$store.commit('logout');
            this.closeModal();
        },
        registro(){
            this.$store.commit('logout');
            this.$store.getters.getRouterView('login').navigate('/registro');
            this.closeModal();
        },
        goCarrito(){
            this.router.navigate('/carrito', {reloadCurrent: true});
            this.closeModal();
        },
        click(){
            if(this.a.fn){
                this.a.fn();
            }
            else{
                this.$emit('click');
            }
            this.closeModal();
        }
    },
}
</script>