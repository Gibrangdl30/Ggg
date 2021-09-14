<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state">
        <div class="row w-100 m-0px px-3">
            <div class="row w-100 m-0 mt-5 back-color-blanco py-3 border-radius-15px position-relative">

                <div class="w-auto position-absolute right-5px top-15px z-100" @click="closeModal()">
                    <icono icono="clear" clase="letra-gray4-40" />
                </div>

            </div>
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
            name: 'modalName',
        };
    },
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
    },
    mounted() {
        
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        cancelar(){
            this.closeModal();
        },
    },
}
</script>







