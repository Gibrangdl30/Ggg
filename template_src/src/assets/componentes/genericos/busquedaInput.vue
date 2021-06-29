<template>
<div class="row w-100 m-0 p-1px justify-content-center carta border-radius-10px">
    <div class="w-10vw text-right">
        <i class="material-icons letra-gray0-25 my-auto pt-5px">search</i>
    </div>
    <div class="col my-auto p-0">

        <div class="row w-100 m-0">
            <div class="w-auto position-absolute top-0px right-5px z-200" @click="$emit('input', null)">
                <icono icono="clear" :clase=" `letra-gray3-26` " />
            </div>
            <input  :id="id" type="text" class="busqueda-input w-100 p-0 pl-1 pr-4 " 
                    :placeholder="holder || 'Buscar ...'" 
                    :value="value" 
                    @input="$emit('input',$event.target.value)" 
                    @change="$emit('change', $event.target.value)"
                    @keyup.enter="enter" >
        </div>
        
    </div>
</div>
</template>
<script>
export default {
    props:  [
        'value',
        'holder',
        ],
    data(){
        return {
            id: _.uniqueId('input_'),
            elemento: null,
        };
    },
    computed:{ },
    mounted() {
        this.initElemento();
    },
    methods:{
        initElemento(){
            if(document.getElementById(this.id)){
                this.elemento = document.getElementById(this.id);
            }
            else{
                setTimeout(this.initElemento, 300);
            }
        },
        enter(){
            if(this.elemento){
                this.elemento.blur();
            }
            this.$emit('enter');
        }
    },
}
</script>