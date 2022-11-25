    <template>
        <div :class="size?`${size || ''} py-1` :'row w-100 m-0'">

        <modalMensajeStatic
            texto="¿Deseas cancelar tu reservación? Es posible que no se pueda efectuar el reembolso de tu cargo."
            boton="Aceptar"
            v-if="open"
            @close="open=false"
            @click="borrar()"
        />
    
    <template v-if="row">
        <div class="row w-100 m-0 border-gray0-1 border-radius-10px overflow-hidden"  @click="set1()">
            <div class="row w-100 m-0 ">
                <div class="w-25vw h-25vw mb-auto mr-auto">
                    <imagen clase="border-radius-10px" :create="true" :src="info.imagen" />
                    <div class="w-50vw">
                        <div class="row w-100 m-0  letra-blanco-15">A 10 MIN</div>
                    </div>
                </div>
                <div class="col my-auto px-0 pl-3">
                    <div class="row w-100 m-0 letra-gray4-18 fw-600">{{info.name}}</div>
                    <div class="row w-100 m-0 letra-gray3-16 text-capitalize "> {{info.cat}}</div>
                    <div class="row w-100 m-0 letra-rojo-19 text-capitalize fw-800 "> {{info.precio | currency}} MXN</div>
                    <div v-if="0" class="row w-100 m-0 pt-1 letra-gray3-17 ">
                        <div class="col px-0">A {{(info.tiempo || 25)}} min de ti</div>
                        <div class="col-auto ml-auto px-0 pr-3">{{(info.distancia || 15)}} Km</div>
                    </div>
                    <!-- <div class="row w-100 m-0 letra-gray3-16 ">{{[info.fecha, info.hora] | fechaE}}</div> -->
                </div>
            </div>
        </div>
    </template>

    <template v-if="campo">
        <div class="row w-100 m-0 border-gray0-1 border-radius-10px overflow-hidden"  @click="set2()">

            <div class="row w-100 m-0 ">
                <div class="w-25vw h-25vw mb-auto mr-auto">
                    <imagen clase="border-radius-10px" :create="true" :src="info.imagen" />
                </div>
                <div class="col px-0 pl-3 my-auto ">
                    <div class="row w-100 m-0 letra-gray4-19 fw-600">{{info.name}}</div>
                    <div class="row w-100 m-0 letra-verde1-17 fw-600 ">{{info.type}}</div>
                    <div class="row w-100 m-0 letra-gray3-16 ">{{info.description}}</div>
                    <div class="row w-100 m-0 pt-1 letra-gray4-17 justify-content-start ">
                        <div class="col-auto px-0">60 min</div>
                        <div class="col-auto px-1 px-0">-</div>
                        <div class="col-auto px-0">{{info.price | currency}}</div>
                    </div>
                    <div class="row w-100 m-0 pt-1 letra-gray4-17 justify-content-start " v-if="0" >
                        <div class="col-auto px-0 pr-2">
                            <div class="row w-100 m-0 px-3 py-1 letra-rojo1-18 border-rojo1-1 border-radius-30px">Reservar</div>
                        </div>
                        <div class="col-auto px-0 " v-if="0">
                            <div class="row w-100 m-0 px-3 py-1 letra-gray2-18 border-gray2-1 border-radius-30px">Ver detalles</div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    </template>
    
    <template v-if="reserva">
        <div class="row w-100 m-0 border-gray0-2 border-radius-10px overflow-hidden"  >

            <div class="row w-100 m-0 ">
                <div class="w-30vw h-55vw my-auto ">
                    <imagen clase="border-radius-10px" :create="true" :src="info.imagen" />
                </div>
                <div class="col my-auto px-0 pl-3">
                    <div class="row w-100 m-0 letra-rojo1-20 fw-600">ID: Padel0000{{info.id}}</div>
                    <div class="row w-100 m-0 letra-gray3-16 ">Reservación realizada a las {{info.created_at | timestamp }} </div>
                    <div class="row w-100 m-0 letra-gray4-20 fw-600">{{info.campo}}</div>
                    <div class="row w-100 m-0 letra-gray3-18 fw-600">{{info.lugar}}</div>
                    <div class="row w-100 m-0 letra-gray3-16 text-capitalize " v-if="info.address"> {{info.address}}</div>
                    <div class="row w-100 m-0 letra-gray3-16 text-capitalize " v-else-if="dire && dire.street"> {{dire.street}} {{ dire.num_ext }}, {{ dire.neighborhood }} </div>
                    <div class="row w-100 m-0 letra-rojo2-18 fw-600">Fecha: {{info.day_reservation | fechaD }}</div>
                    <div class="row w-100 m-0 pt-1 letra-rojo1-18 justify-content-start ">
                        <div class="col-auto px-0">Hora:</div>
                        <div class="col-auto px-0 pl-1">{{info.time_start | horaH}} </div>
                        <div class="col-auto px-1 px-0">-</div>
                        <div class="col-auto px-0">{{info.time_end | horaH}}</div>
                    </div>
                    <div class="row w-100 m-0 pt-1 letra-gray4-17 justify-content-start ">
                        <div class="col-auto px-0">{{60*Number(info.total_hours)}} min</div>
                        <div class="col-auto px-1 px-0">-</div>
                        <div class="col-auto px-0">{{info.total | currency}}</div>
                    </div>
                    <div class="row w-100 m-0 letra-gray3-16" v-if="info.status == 'cancelada'">Fecha Cancelacion: {{info.updated_at | fechaS }} </div>
                    <div class="row w-100 m-0 py-2" v-if="cancel">
                        <div class="col-11 px-0 mx-auto">
                            <botonApp texto="Cancelar" radius="30px" py="py-3px" tipo="gris" @click="open = 1"/>
                        </div>
                    </div>
                    
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

const moment = require('moment');

export default {
    data(){
        return {
            open:0,
            show:0,
            form: {
                fecha: moment().format('YYYY-MM-DD'),
                hora: null,
            },
            cantidad: 1,
        };
    },
    props:[
        'data',
        'value',
        'row',
        'campo',
        'reserva',
        'cancel',
        'zona',
        'boleto',
        'card',
        'size',
        'objCustom',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        info(){return this.data || {}},
        dire(){return this.info.dire || {}},
        campos(){return this.info.campos || [] },
        campoX(){return {}},
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
            this.$store.commit('setCarritosState',['prod', this.info]);
            this.router.navigate('/producto/'+this.info.id);
            this.$store.dispatch('synchronizeData');
        },

        set2(){
            this.$store.commit('setStData',['campo', this.info.id]);
            this.$store.dispatch('synchronizeData');
            this.$emit('input', this.info);
        },

        set3(){
            console.log("NAVEGANDO TO RUTA 33333", this.objCustom.id);
            this.$store.commit('setStData',['boleto', this.objCustom.id]);
            this.router.navigate('/eventos_seleccionar_boletos');
            this.$store.dispatch('synchronizeData');
        },

        borrar(){
            this.$store.dispatch('postBorrarRes', {reserva: this.info});
            
        }
    },
}
</script>