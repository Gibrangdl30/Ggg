<template>
<div class="w-100">
    <div class="w-100 position-relative" >
        <p class=" m-0 mb-1 pl-1" :class="`letra-${textcolor?textcolor:'gray3'}-16`">{{texto}}</p>
        <select class=" w-100 white-space-preline" :class="`${input?input:'regular'}-input`" @change="$emit('input',modelo); $emit('change',modelo)" v-model="modelo" :disabled="disabled" >
            <option :value="null" selected :disabled="(nulo)?false:true" >{{placeholder || 'Choose one'}}</option>
            <template v-for="e of opciones">
                <option :key="e.id" :value="e[llave || 'id']">{{e[nombre || 'nombre']}}</option>
            </template>
        </select>
        <div class="w-auto position-absolute bottom-0px right-0px" @click="remove()" v-if="cancel && modelo">
            <icono icono="close" clase="letra-gray-30" />
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            modelo: null,
        };
    },
    props: [   
                'texto',
                'input',
                'textcolor',
                'nulo',
                'opciones',
                'value',
                'nombre',
                'llave',
                'cancel',
                'placeholder',
                'disabled'
            ],
    computed: {
    },
    created() {
        this.modelo = this.value;
    },
    methods:{
        remove(){
            this.$emit('input',null);
            this.modelo = null;
        }
    },
}
</script>