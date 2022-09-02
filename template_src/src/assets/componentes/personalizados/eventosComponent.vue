<template>
<div :class="size?`${size || ''} py-1` :'row w-100 m-0'">
    
    <template v-if="row">
        <div class="row w-100 m-0 border-gray3-1 border-radius-10px "  @click="set1()">
            <div class="row w-100 m-0 ">
                <div class="w-25vw h-25vw mb-auto mr-auto">
                    <imagen clase="border-radius-10px" :create="true" :src="pres.imagen" />
                </div>
                <div class="col px-0 pl-3">
                    <div class="row w-100 m-0 letra-blanco-16 fw-600">{{pres.nombre}}</div>
                    <div class="row w-100 m-0 letra-blanco-16 ">{{[info.fecha, info.hora] | fechaE}}</div>
                    <div class="row w-100 m-0 letra-blanco-16 ">{{lugar.nombre}}</div>
                    <div class="row w-100 m-0 letra-rojo3-16 ">{{'$850.00 - $1500.00'}}</div>
                </div>
            </div>
        </div>
    </template>

    <template v-if="zona">
        <div :class="`row w-100 m-0 border-${show?'rojo3' :'gray3'}-1 border-radius-5px`" @click="show = 1" >

            <div class="row w-100 m-0 px-3 py-2">
                <div class="w-10vw h-10vw mb-auto my-auto">
                    <imagen clase="border-radius-5px" :create="true" :src="info.imagen" />
                </div>
                <div class="col-auto my-auto px-0 pl-3">
                    <div class="row w-100 m-0 letra-blanco-18 fw-600">{{info.nombre}}</div>
                </div>
                <div class="col-auto px-0 pl-3 pt-8px ">
                    <icono icono="keyboard_arrow_right" clase="letra-blanco-25" />
                </div>
                 <div class="col my-auto px-0 pl-3">
                    <div class="row w-100 m-0 letra-rojo3-20 fw-600 justify-content-end ">{{info.precio | currency}}</div>
                </div>
            </div>
            <div class="row w-100 m-0" v-if="show">
                <div class="row w-100 m-0 px-3 pt-2 pb-3">
                    <div class="col my-auto px-0 pr-2">
                        <div class="row w-100 m-0 px-2 back-color-gray4 border-radius-30px">
                            <div class="col-auto px-0 pt-3px " @click="cantidad>1?cantidad = cantidad-1 : cantidad">
                                <icono icono="remove" clase="letra-gray0-35" />
                            </div>
                            <div class="col px-0 my-auto">
                                <div class="row w-100 m-0 letra-gray0-25 justify-content-center fw-600 ">{{cantidad}}</div>
                            </div>
                            <div class="col-auto px-0 pt-3px" @click="cantidad = cantidad + 1">
                                <icono icono="add" clase="letra-gray0-35" />
                            </div>
                        </div>
                    </div>
                    <div class="col-7 my-auto pl-2 pr-0" @click.stop="set2()">
                        <botonApp texto="Seleccionar asientos" tipo="app" radius="30px" />
                    </div>
                </div>
            </div>

        </div>
    </template> 

    <template v-if="boleto">
        <div :class="`row w-100 m-0 border-${show?'rojo3' :'gray3'}-1 border-radius-5px`"  @click="set3()" >

            <div class="row w-100 m-0 px-2 py-2 ">
                 <div class="col-auto my-auto px-0 pr-3 ">
                    <div class="row w-100 m-0 letra-blanco-20 fw-600">{{objCustom.id + 1}}</div>
                </div>
                <div class="w-10vw h-10vw mb-auto my-auto">
                    <imagen clase="border-radius-5px" :create="true" :src="objCustom.imagen" />
                </div>
                <div class="col-auto my-auto px-0 pl-3">
                    <div class="row w-100 m-0 letra-blanco-18 fw-600">{{objCustom.nombre}}</div>
                </div>
                <div class="col-auto px-0 pl-3 pt-8px ">
                    <icono icono="keyboard_arrow_right" clase="letra-blanco-25" />
                </div>
                 <div class="col my-auto px-0 pl-2">
                    <div class="row w-100 m-0 letra-rojo3-18 fw-600 justify-content-end ">Asiento: {{objCustom.fila || '-'}}{{objCustom.asiento?'-'+objCustom.asiento:''}}</div>
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
            show:0,
            cantidad: 1,
        };
    },
    props:[
        'data',
        'value',
        'row',
        'zona',
        'boleto',
        'card',
        'size',
        'objCustom',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        info(){return this.data || {}},
        pres(){return this.info.presentador || {}},
        lugar(){return this.info.lugar || {}},
        
    },
    mounted() {

    },
    methods:{
        click(){
            if(this.existente){
                this.$emit('create', this.amistad);
            }else{
                this.$emit('click', this.info);
            }
        },

        set1(){
            console.log("NAVEGANDO TO RUTA");
            this.$store.commit('setStData',['evento', this.info.id]);
            this.router.navigate('/eventos_zonas');
            this.$store.dispatch('synchronizeData');
        },

        set2(){
            this.$store.commit('setStData',['zona', this.info.id]);
            let boletos = [];
            for(let i = 0; i < this.cantidad; i++){
                let ins = {
                    id: i, 
                    fila_id: null,
                    fila: null,
                    asiento_id: null, 
                    asiento: null, 
                };
                boletos.push(ins);
            }
            this.$store.commit('setStData',['boletos', boletos]);
            console.log("NAVEGANDO TO RUTA");
            this.router.navigate('/eventos_boletos');
            this.$store.dispatch('synchronizeData');
        },

        set3(){
            console.log("NAVEGANDO TO RUTA 33333", this.objCustom.id);
            this.$store.commit('setStData',['boleto', this.objCustom.id]);
            this.router.navigate('/eventos_seleccionar_boletos');
            this.$store.dispatch('synchronizeData');
        }
    },
}
</script>