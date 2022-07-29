<template>
<div class="row w-100 m-0 p-1px justify-content-center border-gray0-2 border-radius-30px">
    <div class="w-10vw text-right">
        <i class="material-icons letra-gray0-25 my-auto pt-5px">search</i>
    </div>
    <div class="col my-auto p-0">

        <div class="row w-100 m-0">
            <!-- <div class="w-auto position-absolute top-0px right-5px z-200" @click="$emit('input', null)">
                <icono icono="clear" :clase=" `letra-gray3-26` " />
            </div> -->
            <input  :id="id" type="text" class="busqueda-input w-100 p-0 pl-1 pr-4 border-radius-28px" 
                    :placeholder="holder || 'Search ...'" 
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
        'date',
        'type',
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
        'texto' ,
        'scroll',
        'offset',
        'fixed',
        'contendorId' ,
        'textcolor'
    ],
    data(){
        return {
            id: _.uniqueId('input_'),
            elemento: null,
        };
    },
    computed:{
        android(){
            // console.log("ANDORIDNG", this.$store.getters.deviceready);
            if(this.$store.getters.deviceready){
                return typeof device != 'undefined' && device.platform == 'Android'
            }
            return false;
        },
    },
    mounted() {
        setTimeout(
            ()=>{
                this.initElemento();
        },350);
    },
    methods:{
        initElemento(){
            if(document.getElementById(this.id)){
                this.elemento = document.getElementById(this.id);
                if(this.elemento){
                    this.focus();
                }
            }
            else{
                setTimeout(this.initElemento, 300);
            }
        },

        focus(){
            if(!this.fixed){
                if(this.android || this.scroll){
                    $(`#${this.id}`).focus(()=>{
                        setTimeout(()=>{
                            const offset = this.offset || 450;
                            console.log("SETING OFFSET", offset);
                            if(this.contendorId){
                                $(`#${this.contendorId}`).animate({ scrollTop: offset }, 330);
                            }
                            else{
                                $('.contenedor-page-tabs').animate({ scrollTop: offset }, 330);
                            }
                        },350);
                    });
                }
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