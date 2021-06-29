<template>
<div class="row w-100 m-0 estatus-pedido">
    <!-- <div class="row w-100 m-0">
        <div class="col-auto letra-verde-15">{{pedido.estatus}} - {{estatus}}</div>
    </div> -->

    <div class="row w-100 m-0 justify-content-start" v-if="estatus == 7">
        <div class="col-auto px-0">
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 justify-content-center text-center">
                    <div class="w-80px text-center justify-content-center align-content-center">
                        <icono icono="radio_button_unchecked" clase="letra-gray3-25" v-if="estatus < 1"/>
                        <icono icono="radio_button_checked" clase="letra-amar2-25" v-if="estatus == 1 || estatus == 2"/>
                        <icono icono="check_circle" clase="letra-verde3-25" v-if="estatus > 2"/>
                    </div>
                </div>
                <div class="row w-100 m-0 justify-content-center text-center letra-gray3-11" v-if="estatus < 1">En preparacion</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-amar2-11" v-if="estatus == 1 || estatus == 2">En preparacion</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-verde3-11" v-if="estatus > 2">En preparacion</div>
            </div>
        </div>
        <div class="col-auto px-0">
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 justify-content-center text-center">
                    <div class="w-80px text-center justify-content-center align-content-center">
                        <icono icono="radio_button_unchecked" clase="letra-gray3-25" v-if="estatus < 7"/>
                        <icono icono="highlight_off" clase="letra-rojo1-25" v-if="estatus == 7"/>
                        <icono icono="highlight_off" clase="letra-rojo1-25" v-if="estatus > 7"/>
                    </div>
                </div>
                <div class="row w-100 m-0 justify-content-center text-center letra-gray3-11" v-if="estatus < 7">Cancelado</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-rojo1-11" v-if="estatus == 7">Cancelado</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-rojo1-11" v-if="estatus > 7">Cancelado</div>
            </div>
        </div>
    </div>

    <div class="row w-100 m-0 justify-content-start" v-else-if="estatus == 8">
        <div class="col-auto px-0">
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 justify-content-center text-center">
                    <div class="w-80px text-center justify-content-center align-content-center">
                        <icono icono="radio_button_unchecked" clase="letra-gray3-25" v-if="estatus < 1"/>
                        <icono icono="radio_button_checked" clase="letra-amar2-25" v-if="estatus == 1 || estatus == 2"/>
                        <icono icono="check_circle" clase="letra-verde3-25" v-if="estatus > 2"/>
                    </div>
                </div>
                <div class="row w-100 m-0 justify-content-center text-center letra-gray3-11" v-if="estatus < 1">En preparacion</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-amar2-11" v-if="estatus == 1 || estatus == 2">En preparacion</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-verde3-11" v-if="estatus > 2">En preparacion</div>
            </div>
        </div>
        <div class="col-auto px-0">
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 justify-content-center text-center">
                    <div class="w-80px text-center justify-content-center align-content-center">
                        <icono icono="radio_button_unchecked" clase="letra-gray3-25" v-if="estatus < 8"/>
                        <icono icono="highlight_off" clase="letra-rojo1-25" v-if="estatus == 8"/>
                        <icono icono="highlight_off" clase="letra-rojo1-25" v-if="estatus > 8"/>
                    </div>
                </div>
                <div class="row w-100 m-0 justify-content-center text-center letra-gray3-11" v-if="estatus < 8">Cancelado cliente</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-rojo1-11" v-if="estatus == 8">Cancelado cliente</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-rojo1-11" v-if="estatus > 8">Cancelado cliente</div>
            </div>
        </div>
    </div>

    <div class="row w-100 m-0 justify-content-start" v-else-if="estatus == 9">
        <div class="col-auto px-0">
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 justify-content-center text-center">
                    <div class="w-80px text-center justify-content-center align-content-center">
                        <icono icono="radio_button_unchecked" clase="letra-gray3-25" v-if="estatus < 1"/>
                        <icono icono="radio_button_checked" clase="letra-amar2-25" v-if="estatus == 1 || estatus == 2"/>
                        <icono icono="check_circle" clase="letra-verde3-25" v-if="estatus > 2"/>
                    </div>
                </div>
                <div class="row w-100 m-0 justify-content-center text-center letra-gray3-11" v-if="estatus < 1">En preparacion</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-amar2-11" v-if="estatus == 1 || estatus == 2">En preparacion</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-verde3-11" v-if="estatus > 2">En preparacion</div>
            </div>
        </div>
        <div class="col-auto px-0">
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 justify-content-center text-center">
                    <div class="w-80px text-center justify-content-center align-content-center">
                        <icono icono="radio_button_unchecked" clase="letra-gray3-25" v-if="estatus < 9"/>
                        <icono icono="highlight_off" clase="letra-rojo1-25" v-if="estatus == 9"/>
                        <icono icono="highlight_off" clase="letra-rojo1-25" v-if="estatus > 9"/>
                    </div>
                </div>
                <div class="row w-100 m-0 justify-content-center text-center letra-gray3-11" v-if="estatus < 9">No entregado</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-rojo1-11" v-if="estatus == 9">No entregado</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-rojo1-11" v-if="estatus > 9">No entregado</div>
            </div>
        </div>
    </div>

    <div class="row w-100 m-0 justify-content-start" v-else>
        <div class="col px-0">
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 justify-content-center text-center">
                    <div class="w-80px text-center justify-content-center align-content-center">
                        <icono icono="radio_button_unchecked" clase="letra-gray3-25" v-if="estatus < 1"/>
                        <icono icono="radio_button_checked" clase="letra-amar2-25" v-if="estatus == 1 || estatus == 2"/>
                        <icono icono="check_circle" clase="letra-verde3-25" v-if="estatus > 2"/>
                    </div>
                </div>
                <div class="row w-100 m-0 justify-content-center text-center letra-gray3-11" v-if="estatus < 1">En preparacion</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-amar2-11" v-if="estatus == 1 || estatus == 2">En preparacion</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-verde3-11" v-if="estatus > 2">En preparacion</div>
            </div>
        </div>
        <div class="col px-0">
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 justify-content-center text-center">
                    <div class="w-80px text-center justify-content-center align-content-center">
                        <icono icono="radio_button_unchecked" clase="letra-gray3-25" v-if="estatus < 3"/>
                        <icono icono="radio_button_checked" clase="letra-amar2-25" v-if="estatus == 3"/>
                        <icono icono="check_circle" clase="letra-verde3-25" v-if="estatus > 3"/>
                    </div>
                </div>
                <div class="row w-100 m-0 justify-content-center text-center letra-gray3-11" v-if="estatus < 3">Listo</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-amar2-11" v-if="estatus == 3">Listo</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-verde3-11" v-if="estatus > 3">Listo</div>
            </div>
        </div>
        <div class="col px-0">
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 justify-content-center text-center">
                    <div class="w-80px text-center justify-content-center align-content-center">
                        <icono icono="radio_button_unchecked" clase="letra-gray3-25" v-if="estatus < 4"/>
                        <icono icono="radio_button_checked" clase="letra-amar2-25" v-if="estatus == 4 || estatus == 5"/>
                        <icono icono="check_circle" clase="letra-verde3-25" v-if="estatus > 5"/>
                    </div>
                </div>
                <div class="row w-100 m-0 justify-content-center text-center letra-gray3-11" v-if="estatus < 4">En camino</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-amar2-11" v-if="estatus == 4 || estatus == 5">En camino</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-verde3-11" v-if="estatus > 5">En camino</div>
            </div>
        </div>
        <div class="col px-0">
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 justify-content-center text-center">
                    <div class="w-80px text-center justify-content-center align-content-center">
                        <icono icono="radio_button_unchecked" clase="letra-gray3-25" v-if="estatus < 6"/>
                        <icono icono="check_circle" clase="letra-verde3-25" v-if="estatus == 6 "/>
                        <icono icono="check_circle" clase="letra-verde3-25" v-if="estatus > 6"/>
                    </div>
                </div>
                <div class="row w-100 m-0 justify-content-center text-center letra-gray3-11" v-if="estatus < 6">Entregado</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-verde3-11" v-if="estatus == 6 ">Entregado</div>
                <div class="row w-100 m-0 justify-content-center text-center letra-verde3-11" v-if="estatus > 6">Entregado</div>
            </div>
        </div>
    </div>
    
</div>
</template>
<script>
import _ from 'lodash';
const moment = require('moment');
export default {
    props: [
        'data',
    ],
    data(){
        return {
        };
    },
    computed: {
        pedido(){return this.data || {}},
        estatus(){
            switch(this.pedido.estatus){
                case 'pendientes':
                    return 1;
                case 'confirmados':
                    return 2;
                case 'terminados':
                    return 3;
                case 'recolectados':
                    return 4;
                case 'en_ruta':
                    return 5;
                case 'entregados':
                    return 6;
                case 'cancelado':
                    return 7;
                case 'cancelado_cliente':
                    return 8;
                case 'no_entregado':
                    return 9;
                default:
                    return 0;
            }
        },
    },
    methods:{
        update(id){
           this.$emit('input',id);
        },
        personalizar(){
            this.$store.commit('openModal',['modalFecha']);
        },
    },
}
</script>