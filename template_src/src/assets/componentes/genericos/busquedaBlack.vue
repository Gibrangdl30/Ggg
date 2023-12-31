<template>
    <div class="row w-100 m-0 p-1px justify-content-center border-gray5-2 border-radius-30px ">
        <div class="col my-auto w-100 p-0">
            <div class="row w-100 m-0 position-relative">
                <div class="text-right left-0 ml-2 mt-2 position-absolute">
                    <i class="material-icons letra-gray0-25 mt-1">search</i>
                </div>

                <!-- <Autocomplete 
                    :key="'desktop-search'" 
                    @input="val => {$emit('input', val);}" 
                /> -->

                <ais-search-box>
                    <template v-slot="{ currentRefinement, isSearchStalled, refine }">
                        <input 
                            :id="id" 
                            type="search" 
                            @keyup.enter="enter" 
                            :value="currentRefinement"
                            :placeholder="holder || 'Buscar ...'" 
                            @input="updateSearchQueryState($event.currentTarget.value, refine)" 
                            class="busqueda-input w-100 p-0 pl-1 pr-4 border-radius-28px color-blanco">
                        <span :hidden="!isSearchStalled">Loading...</span>
                        <div v-if="currentRefinement != ''" class="position-absolute top-0 right-5 mt-1" @click="updateSearchQueryState(null, refine)">
                            <i class="material-icons letra-gray0-25 my-auto pt-5px">close</i>
                        </div>
                    </template>
                </ais-search-box>
                <!-- <input  :id="id" type="text" class="busqueda-input w-100 p-0 pl-1 pr-4 border-radius-28px color-blanco" 
                        :placeholder="holder || 'Buscar ...'" 
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
        },

        updateSearchQueryState(query, refineFunction){
            query = !query || query.length < 1 || '' ? null : query;
            refineFunction(query);
            this.$store.commit('setSearchQuery', query);
        }
    },
}
</script>

<style>
.ais-SearchBox {
    width: 100%;
    position: relative;
    padding-left: 2rem;
}
.aa-Autocomplete .aa-Form {
    width: 100%;
    background: transparent;
    border: none;
}

.aa-Label {
    width: 47px;
    height: auto;
    margin-bottom: 0px;
}

.aa-Label svg {
    color: #989797;
}
</style>