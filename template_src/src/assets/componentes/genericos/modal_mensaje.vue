<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center px-1" v-if="state" @click.self="closeModal()">

        <div class="row w-100 m-0px mt-80px px-3 pt-40px" @click.self="closeModal()">

            <div class="row w-100 m-0 mt-5 back-color-blanco pt-3  border-radius-15px overflow-hidden">

            <div class="row w-100 m-0 pb-3">
                <div class="row w-100 m-0 px-0">
                    <div class="row w-100 m-0 justify-content-center py-2" v-if="titulo || texto">
                        <div class="row w-100 m-0">
                            <div class="col-12 py-2 text-center px-2" v-if="titulo">
                                <div class="row w-100 m-0 letra-gray4-21 fw-600 justify-content-center">{{titulo}}</div>
                            </div>
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col-8 mx-auto justify-content-center text-center letra-gray3-18 px-2" v-if="texto">{{texto}}</div>
                        </div>
                    </div>
                    <div class="row w-100 m-0" v-if="info">
                        <div class="col-12 mt-3">
                            <p class="letra-gray-light-4-4vw m-0 mb-2">{{descripcion}}</p>
                            <textarea type="text" rows="5" class="regular-textarea w-100 m-0" placeholder="Descripción" @input="$emit('input',razon)" v-model="razon"></textarea>
                        </div>
                    </div>
                    <div class="row w-100 m-0" v-if="custom">
                        <slot></slot>
                    </div>
                </div>
            </div>

            <div class="row w-100 m-0 back-color-blanco pb-3 px-2">
                <div class="row w-100 m-0" v-if="oneButton">
                    <div class="col-12 px-2" @click="closeModal(); $emit('click')">
                        <botonApp tipo="azul" radius="35px" :texto="boton" />
                    </div>
                </div>
                <div class="row w-100 m-0" v-else-if="cuenta">
                    <div class="col-6 pl-0 pr-2" @click="registro()">
                        <boton-app clase="back-color-blanco" :outline="true" texto="Crea una cuenta" radius="30px"></boton-app>
                    </div>
                    <div class="col-6 pl-2 pr-0" @click="logout()">
                        <boton-app texto="Inicia sesión" radius="30px"></boton-app>
                    </div>
                </div>
                <div class="row w-100 m-0" v-else-if="boton=='status'" >
                    <div class="col-12 px-3" @click="click()">
                        <botonApp tipo="rojo" texto="Change patient facility" radius="30px" />
                    </div>
                    <div class="col-12 px-3 pt-4 pb-3" @click="$emit('set')">
                        <botonApp tipo="verde" texto="Change status" radius="30px" />
                    </div>
                </div>
                <div class="row w-100 m-0" v-else-if="boton=='changestatus'" >
                    <div class="col-12 px-3" @click="$emit('set')">
                        <botonApp tipo="verde" texto="Discharge" radius="30px" />
                    </div>
                    <div class="col-12 px-3 pt-4 pb-3" @click="closeModal()">
                        <botonApp tipo="gris" texto="Cancel" radius="30px" />
                    </div>
                </div>
                <div class="row w-100 m-0" v-else-if="boton=='yes'">
                    
                    <div class="col-6 px-1" @click="closeModal(true)">
                        <botonApp tipo="rojo" texto="NO" radius="30px" />
                    </div>

                    <div class="col-6 px-1" @click="click()">
                        <botonApp texto="Si" tipo="verde" radius="30px" />
                    </div>
                </div>
                <div class="row w-100 m-0" v-else>
                    <div class="col-6 px-1" @click="closeModal()">
                        <botonApp tipo="gris" texto="Cancelar" radius="30px" />
                    </div>
                    <div class="col-6 px-1" @click="click()">
                        <botonApp :texto="boton" tipo="rojo" radius="30px" />
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
            name: 'modalMensaje',
            razon: '',
        };
    },
    props: [
        'titulo',
        'texto',
        'texto2',
        'info',
        'descripcion',
        'boton',
        'cuenta',
        'oneButton',
        'custom'
    ],
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
    },
    methods:{
        closeModal(e = false){
            this.$store.commit('closeModal', [this.name]);
            if(e){
                this.$emit('close');
            }
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
        click(){
            this.$emit('click');
            this.closeModal();
        }
    },
}
</script>