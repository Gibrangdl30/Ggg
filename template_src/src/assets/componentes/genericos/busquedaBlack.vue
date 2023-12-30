<template>
    <div class="row w-100 m-0 p-1px justify-content-center border-gray5-2 border-radius-30px ">
        <!-- <div class="w-10vw text-right">
            <i class="material-icons letra-gray0-25 my-auto pt-5px">search</i>
        </div> -->
        <div class="col my-auto w-100 p-0">
            <div class="row w-100 m-0">
                <!-- <div class="w-auto position-absolute top-0px right-5px z-200" @click="$emit('input', null)">
                    <icono icono="clear" :clase=" `letra-gray3-26` " />
                </div> -->
<<<<<<< HEAD
                <input  :id="id" type="text" class="busqueda-input w-100 p-0 pl-1 pr-4 border-radius-28px color-blanco" 
                        :placeholder="holder || 'Buscar...'" 
=======
                <Autocomplete 
                    :key="'desktop-search'" 
                    @input="val => {$emit('input', val);}" 
                />
                <!-- <ais-search-box /> -->
                <!-- <input  :id="id" type="text" class="busqueda-input w-100 p-0 pl-1 pr-4 border-radius-28px color-blanco" 
                        :placeholder="holder || 'Buscar ...'" 
>>>>>>> algolia-integration
                        :value="value" 
                        @input="$emit('input',$event.target.value); initX();" 
                        @change="$emit('change', $event.target.value); "
                        @keyup.enter="enter" > -->
            </div>
        </div>

        <!-- <div v-if="close && value" class="col-auto text-right px-0 pr-2" @click="$emit('input', null)">
            <i class="material-icons letra-gray0-25 my-auto pt-5px">close</i>
        </div> -->
    </div>
</template>
    
<script>
import Autocomplete from './Autocomplete.vue';
const moment = require('moment');

export default {
    components: {
        Autocomplete,
    },
    props: [
        'value',
        'holder',
        'close',
        'date',
        'type',
        'loader',
        'input',
        'password',
        'clase',
        'noNumeros',
        'placeholder',
        'maxlength',
        'disabled',
        'auto',
        'textarea',
        'rows',
        'texto',
        'scroll',
        'offset',
        'fixed',
        'contendorId',
        'textcolor'
    ],
    data() {
        return {
            id: _.uniqueId('input_'),
            elemento: null,
            hora: null,
        };
    },
    computed: {
        android() {
            // console.log("ANDORIDNG", this.$store.getters.deviceready);
            if (this.$store.getters.deviceready) {
                return typeof device != 'undefined' && device.platform == 'Android'
            }
            return false;
        },
    },
    mounted() {
        setTimeout(
            () => {
                this.initElemento();
            }, 350);
    },
    methods: {
        initElemento() {
            if (document.getElementById(this.id)) {
                this.elemento = document.getElementById(this.id);
                if (this.elemento) {
                    this.focus();
                }
            }
            else {
                setTimeout(this.initElemento, 300);
            }
        },

        initX() {
            console.log("inti 123");
            if (!this.hora) {
                this.hora = moment().format('YYYY-MM-DD HH:mm:ss');
            } else {
                let n = moment().format('YYYY-MM-DD HH:mm:ss');
                setTimeout(() => {
                    console.log("SE EJUCUTA TIME", this.hora, n, n == this.hora)
                    if (this.hora) {
                        if (this.hora == n) {
                            if (this.value) {
                                if (this.loader) {
                                    this.$store.commit('initLoader');
                                    setTimeout(() => {
                                        this.$store.commit('finishLoader');
                                    }, 1000 * 1.5);
                                }
                            }
                        }
                    }
                }, 1000 * 0.8);
                this.hora = moment().format('YYYY-MM-DD HH:mm:ss');
            }
        },

        focus() {
            if (!this.fixed) {
                if (this.android || this.scroll) {
                    $(`#${this.id}`).focus(() => {
                        setTimeout(() => {
                            const offset = this.offset || 450;
                            // console.log("SETING OFFSET", offset);
                            if (this.contendorId) {
                                $(`#${this.contendorId}`).animate({ scrollTop: offset }, 330);
                            }
                            else {
                                $('.contenedor-page-tabs').animate({ scrollTop: offset }, 330);
                            }
                        }, 350);
                    });
                }
            }
        },

        enter() {
            if (this.elemento) {
                this.elemento.blur();
            }
            this.$emit('enter');
        }
    },
}
</script>

<style>
.aa-Autocomplete .aa-Form{
    width: 100%;
    background: transparent;
    border: none;
}
.aa-Label{
    width: 47px;
    height: auto;
    margin-bottom: 0px;
}
.aa-Label svg{
    color: #989797;
}
</style>