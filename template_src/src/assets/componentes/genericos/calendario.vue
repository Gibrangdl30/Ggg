<template>
    <div class="row w-100 m-0">
        <div class="row w-100 m-0">
            <div class="row w-100 m-0 mt-3 back-color-blanco pb-3 border-radius-15px">
                <div class="row w-100 m-0 px-3 pt-3 position-relative">
                    <div class="row w-100 m-0" >
                        <div class="row w-100 m-0 mb-2">
                            <div class="row w-100 m-0">
                                 <div class="col-auto my-auto pl-0 pr-2" @click="lastMonth(); set();">
                                    <icono icono="chevron_left" clase="letra-rojo1-45" />
                                </div>
                                <div class="col my-auto px-0 text-center letra-gray4-21 fw-800">{{mes.mes}} {{year}}</div>
                                <div class="col-auto my-auto pl-0 pr-2" @click="nextMonth(); set();">
                                    <icono icono="chevron_right" clase="letra-rojo1-45" />
                                </div>
                            </div>
                        </div>
                        <div class="row w-100 m-0 mb-2">
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 justify-content-start">
                                    <div class="w-14 my-auto" v-for="(x,iy) of semana" :key="iy">
                                        <div class="row w-100 m-0 justify-content-center border-radius-30px letra-azulapp-19 fw-800 py-9px">{{x}}</div>
                                    </div>
                                </div>
                                <div class="row w-100 m-0 justify-content-start">
                                    <div class="w-14 my-auto " v-for="d of predias" :key="d.id">
                                        <div class="row w-100 m-0 justify-content-center border-radius-30px letra-blanco-17 py-9px" >{{dia}}</div>
                                    </div>
                                    <div class="w-14 my-auto px-8px position-relative" 
                                        v-for="d of dias" :key="d.dia" @click="setX(d.dia) " 
                                        :class="(mes.numero == mesReal && diaReal > d.dia)?'back-color-gray0':''"
                                    >
                                        <div class="row w-100 m-0 justify-content-center border-radius-30px "
                                        :class="( dia == d.dia)?'back-color-rojo1 letra-blanco-17 fw-800 py-6px':'letra-gray3-17 py-9px'" >{{d.dia}}</div>

                                        <div class="w-12px h-12px back-color-rojo border-radius-50 position-absolute top-3px right-3px" v-if=" evento(d.dia) "></div>
                                        <div class="w-12px h-12px back-color-ama border-radius-50 position-absolute top-3px right-3px" v-else-if=" eventoE(d.dia) "></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0">
                                <horas v-model="value" :campo="data" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
const moment = require('moment');
export default {
    props: [
        'value',
        'fecha',
        'talento',
        'data',
    ],
    data(){
        return {
            name: 'modalFecha',
            year: moment(this.value.fecha,'YYYY-MM-DD').format('YYYY'),
            month: moment(this.value.fecha,'YYYY-MM-DD').format('MM'),
            dia: moment(this.value.fecha,'YYYY-MM-DD').format('DD'),
            mesReal: moment().format('MM'),
            diaReal: moment().format('DD'),
            semana: ['D','L','M','M','J','V','S'],
        };
    },
    computed: {

        eventos(){ return [] },
        evento(){
            return (dia) =>{
                return this.eventos.find(x=>{return !(x.invitacion && x.invitacion.id) && x.fecha == moment(`${this.year}-${this.month}-${dia}`, 'YYYY-MM-DD' ).format( 'YYYY-MM-DD' ) }) != undefined;
            }
        },
        eventoE(){
            return (dia) =>{
                return this.eventos.find(x=>{return  x.fecha == moment(`${this.year}-${this.month}-${dia}`, 'YYYY-MM-DD' ).format( 'YYYY-MM-DD' ) }) != undefined;
            }
        },

        meses(){return this.$store.getters.getCatalogo('meses') },
        mes(){return this.meses.find(m=>{return m.numero == this.month}) },
       
        predias(){
            let d = [];
            let m = moment(`${this.year}-${this.month}-${1}`,'YYYY-MM-D');
            for(let x = 0; x < m.day(); x++){
                d.push({dia: x, id: _.uniqueId('x_')});
            }
            // console.log("Preduas", m.day());
            return d;
        },
        dias(){
            let d = [];
            for(let i = 1; i <= this.mes.dias; i++){
                let m = moment(`${this.year}-${this.month}-${i}`,'YYYY-MM-D');
                d.push({m:m, dia: m.format('DD'), numero: m.day()});
            }
            if(this.mes.numero == '02'){
                if(moment(`${this.year}-${this.month}-${29}`,'YYYY-MM-DD').isValid()){
                    d.push({dia: '29', numero: moment(`${this.year}-${this.month}-${29}`,'YYYY-MM-DD').day()});
                }
            }
            return d;
        },
        diaSemana(){
            return moment(`${this.year}-${this.month}-${this.dia}`,'YYYY-MM-DD').day();
        },
    },
    mounted() {
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        setX(dia){
            if(!(this.mes.numero == this.mesReal && this.diaReal > dia)){
                this.dia = dia;
                this.set();
            }
        },
        
        lastYear(){
            if(Number(this.year) > 2020){
                this.year = Number(this.year) - 1;
            }
        },
        nextYear(){
            this.year = Number(this.year) + 1;
        },

        lastMonth(){
            let m = moment(`${this.month}-${this.year}`,'MM-YYYY').subtract(1,'months');
            this.month = m.format('MM');
            this.year = m.format('YYYY');
        },

        nextMonth(){
            let m = moment(`${this.month}-${this.year}`,'MM-YYYY').add(1,'months');
            this.month = m.format('MM');
            this.year = m.format('YYYY');
        },
        
        ocupado(dia){
             if(this.talento){
                if(this.talento.dias && this.talento.dias.length){
                     if(this.talento.dias.find(d=>{return Number(d.numero) == dia }) != undefined){
                        if(this.talento.dias.find(d=>{return Number(d.numero) == dia }).horarios.find(h=>{ return h.estatus == 'libre' })){
                            return false;
                        }
                        return true;
                    }
                    return false;
                }
                return false;
            }
            return false;
        },

        set(){
            let hh = `${this.year}-${this.month}-${this.dia}`;
            if(!moment(`${this.year}-${this.month}-${this.dia}`,'YYYY-MM-DD').isValid()){
                swal("","Selecciona una fecha válida","");
                return;
            }
            // console.log("SET FINAL", hh);
            this.value.fecha = hh;
            this.$emit('input',this.value);
            this.closeModal();
        }
    },
}
</script>