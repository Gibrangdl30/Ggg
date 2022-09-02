<template>
<div :class="size?`${size || ''} py-1` :'row w-100 m-0'">
    
        <div :class="`row w-100 m-0 border-${show?'rojo3' :'gray3'}-1 border-radius-5px`" v-if="info && info.id "  @click="show = !show" >
            <div class="row w-100 m-0 px-3 py-2 ">
                 <div class="col-auto my-auto px-0 pr-3 ">
                    <div class="row w-100 m-0 letra-negro-20 fw-600">{{info.id}}</div>
                </div>
                <div class="col my-auto px-0 pl-3">
                    <div class="row w-100 m-0 letra-blanco-18 fw-600">{{info.nombre}}</div>
                </div>
                <div class="col-auto px-0 pl-3 pt-8px " >
                    <icono :icono="show?'keyboard_arrow_up' :'keyboard_arrow_down'" clase="letra-blanco-30" />
                </div>
            </div>
        </div>

        <div class="row w-100 m-0 py-3" v-show="show" >
            <div class="row w-100 m-0 justify-content-start ">
                <scollX cantidad="auto" >
                    <div class="swiper-slide w-auto px-1 text-center" v-for="a of asientos" :key="a.id" >
                        <div class="w-40px h-40px border-radius-50 overflow-hidden" 
                        :class="a.ocupado? 'border-negro-2 back-color-blanco' :(selected(a)?'border-rojo3-2' :(apartado(a)? 'border-negro-2 back-color-rojo3' :'border-blanco-2') )" @click="setModel(a)" >
                            <div class="row w-100 m-0 justify-content-center " 
                            :class="a.ocupado? 'letra-negro-22' : (selected(a)?'letra-rojo3-22 fw-600' :(apartado(a)? 'letra-negro-22' :'letra-blanco-22'))"
                            >{{a.numero}}</div>
                        </div>
                    </div>
                </scollX>
            </div>
        </div>

</div>
</template>
<script>
import swal from 'sweetalert';

export default {
    data(){
        return {
            show:0,
            cantidad: 1,
        };
    },
    props:[
        'data',
        'all',
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
        asientos(){return this.info.asientos || []},
        selected(){return (a)=>this.value.fila_id == this.info.id && this.value.asiento_id ==  a.id },
        apartado(){return (n)=>this.all.some(s=> s.fila_id == this.info.id && s.asiento_id == n.id) },
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
                let ins = {id: i, asiento: null, fila: null};
                boletos.push(ins);
            }
            this.$store.commit('setStData',['boletos', boletos]);
            console.log("NAVEGANDO TO RUTA");
            this.router.navigate('/eventos_boletos');
            this.$store.dispatch('synchronizeData');
        },

        set3(){
            console.log("NAVEGANDO TO RUTA 33333");
            this.$store.commit('setStData',['boelto', this.boleto.id]);
            this.router.navigate('/eventos_seleccionar_boletos');
            this.$store.dispatch('synchronizeData');
        },

        setModel(a){
            this.$store.dispatch('trySync');
            if(a.ocupado){
                // swal("Asiento no disponible");
            }
            else{
                let v = {};
                v.id = this.value.id;
                v.fila_id = this.info.id;
                v.fila = this.info.nombre;
                v.asiento_id = a.id;
                v.asiento = a.numero;
                this.$emit('input', v);
            }
        }
    },
}
</script>