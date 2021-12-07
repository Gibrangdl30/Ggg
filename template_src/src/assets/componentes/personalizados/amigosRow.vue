<template>
<div :class="card?'w-25vw py-1':'row w-100 m-0'">
    <template v-if="card">
        <div class="row w-100 m-0 py-2  border-radius-15px position-relative " :class="color?'border-gray0-1':'border-gray0-1'" @click="click()">

            <div class="row w-100 m-0 justify-content-center ">
                <div class="w-18vw h-18vw my-auto ">
                    <imagen clase="border-radius-50" :user="true" :src="info.foto" />
                </div>
            </div>

            <div class="w-auto position-absolute top-0px right-0px z-index-10000000 " v-if="selectable" @click.stop="$emit('set', info)">
                <icono icono="check_circle" clase="letra-azul1-30" v-if="check" />
                <icono icono="radio_button_unchecked" clase="letra-azul1-30" v-else  />
            </div>

            <div class="row w-100 m-0">
                <div class="row w-100 m-0 px-1 h-60px align-content-center letra-gray3-15 justify-content-center text-center ">{{info.nombre}}</div>
            </div>
        </div>
    </template>
    <template v-else>
        <div class="row w-100 m-0 py-2" @click="click()">
            <div class="row w-100 m-0 justify-content-center">
                <div class="w-11vw h-11vw my-auto ">
                    <imagen clase="border-radius-30px " :user="true" :src="info.foto" />
                </div>
                <div class="col px-0 pl-3 my-auto">
                    <div class="row w-100 m-0 letra-gray3-18 ">{{info.nombre | truncate(26)}}</div>
                </div>
                <div class="col-auto px-0" v-if="value" @click.stop="$emit('set', info)" >
                    <div class="row w-100 m-0">
                        <icono icono="check_circle" clase="letra-azul1-30" v-if="check" />
                        <icono icono="radio_button_unchecked" clase="letra-gray2-30" v-else  />
                    </div>
                </div>
                <div class="col-auto px-0" v-if="selectable" @click.stop="$emit('set', info)" >
                    <div class="row w-100 m-0">
                        <icono icono="check_circle" clase="letra-azul1-30" v-if="check" />
                        <icono icono="radio_button_unchecked" clase="letra-gray2-30" v-else  />
                    </div>
                </div>
            </div>
        </div>
    </template>

</div>
</template>
<script>
export default {
    data(){
        return {
        };
    },
    props:[
        'data',
        'card',
        'color',
        'value',
        'selectable',
        'check',
        'full',
        'tipo',
        'regalo',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        info(){return this.data || {}},
    },
    methods:{
        click(){
            this.$emit('click', this.info);
        },
    },
}
</script>