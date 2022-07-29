<template>
<div class="row w-100 m-0 px-2 ">
    <modalMensajeStatic
        texto="¿Deeseas eliminar este post?"
        boton="Acept"
        v-if="open"
        @close="open=false"
        @click="eliminar"
    />

    <modalMensajeStatic
        texto="Si consideras esta publicación ofensiva o inadecuada puedes reportarla. ¿Deseas reportar esta publicación?"
        boton="Reportar"
        v-if="modal2"
        @close="modal2=false"
        @click="set"
    />

    <modalSerFotografo 
        :state="modal"
        @close="modal=false"
        :data="info"
    />

    <div v-if="card" class="w-30vw my-2 border-gray0-1 border-radius-10px overflow-hidden " @click="comentar()">

        <div class="row w-100 m-0"  >
            <div class="row w-100 m-0 justify-content-center text-center "  >

                <div class="row w-100 m-0 justify-content-center text-center " >
                    <div class="w-27vw h-27vw mb-auto mt-2">
                        <imagen clase="border-radius-10px" :src="info.imagen"  />
                    </div>
                </div>
                <div class="row w-100 m-0 py-5px " >
                    <div class="row w-100 m-0 letra-negro-12 fw-600  justify-content-center text-center " >{{ info.nombre }}</div>
                    <!-- <div class="row w-100 m-0 letra-negro-12 fw-600  justify-content-center text-center " >{{info.direccion}} {{info.colonia}}</div> -->
                    <div class="row w-100 m-0 pt-1 letra-blanco-15 fw-600  justify-content-center text-center ">
                        <div class="col-auto back-color-verde border-radius-5px py-2px px-5px" v-if="info.tipo=='renta_venta'" >Venta/Renta</div>
                        <div class="col-auto back-color-verde border-radius-5px py-2px px-5px" v-else-if="info.tipo=='venta'" >Venta</div>
                        <div class="col-auto back-color-azul border-radius-5px py-2px px-5px" v-else >Renta</div>
                    </div>
                    
                    <div class="row w-100 m-0 pt-2">
                        <div class="col-auto px-0 mx-auto">
                            <div class="row w-100 m-0 px-2 py-1 letra-gray2-16 border-radius-5px border-negro-1 justify-content-center">Ver Mas</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="row w-100 m-0 my-2 border-gray0-1 border-radius-10px overflow-hidden "  @click="comentar()">
        <div class="row w-100 m-0 justify-content-center" :class="info.type == 's'?'app-degra ':''" >
            <div class="row w-100 m-0 py-5px px-2 " >
                <div class="w-30vw h-30vw mb-auto mt-2">
                    <imagen  clase="border-radius-10px" :src="info.imagen"  />
                </div>
                <div class="col px-0 pl-3" >
                    <div class="row w-100 m-0 letra-negro-17 fw-600 " >{{info.nombre}}</div>
                    <!-- <div class="row w-100 m-0 letra-negro-17 fw-600 " >{{info.direccion}} {{info.colonia}}</div> -->
                    <div class="row w-100 m-0 letra-blanco-15 fw-600 ">
                        <div class="col-auto back-color-verde border-radius-5px py-2px px-5px" v-if="info.tipo=='renta_venta'" >Venta/Renta</div>
                        <div class="col-auto back-color-verde border-radius-5px py-2px px-5px" v-else-if="info.tipo=='venta'" >Venta</div>
                        <div class="col-auto back-color-azul border-radius-5px py-2px px-5px" v-else >Renta</div>
                    </div>

                    <div class="row w-100 m-0  pb-1 justify-content-start " >
                        <div class="col-auto px-0">{{info.habitaciones}} habitaciones,</div>
                        <div class="col-auto px-0 pl-1">{{info.banios}} baños,</div>
                        <!-- <div class="col-auto px-0 pl-1">{{info.patio_servicio}} cuartos de servicio,</div> -->
                        <!-- <div class="col-auto px-0 pl-1">{{info.estacionamientos}} cajon de estacionamiento,</div> -->
                        <div class="col-auto px-0 pl-1" v-if="info.sala_comedor=='2'">Sala, Comedor,</div>
                        <div class="col-auto px-0 pl-1" v-if="info.sala_comedor=='1'">Sala-comedor, </div>
                    </div>
                    <div class="row w-100 m-0  ">
                        <div class="col-auto px-0 letra-gray2-16 ">{{[info.created_at, 'YYYY-MM-DD HH:mm:ss'] |  moment('DD/MM/YY') }}</div>
                        <div class="col-auto px-0 letra-negro-17 ml-auto">{{info.precio | currency }} {{info.moneda}}</div>
                    </div>
                </div>

            </div>
        </div>
        <template v-if="0" >
            <div class="row w-100 m-0 py-2 px-3" v-if="info.lat && info.lng">
                <div class="row w-100 m-0 justify-content-start ">
                    <div class="col-auto px-0 letra-gray3-18 pl-2">a</div>
                    <div class="col-auto px-0 letra-gray4-18 fw-600 pl-2">{{info.metros}} </div>
                    <div class="col-auto px-0 letra-gray3-18 pl-2">metros de ti</div>
                </div>
            </div>
        </template>
    </div>


</div>
</template>
<script>
export default {
    data(){
        return {
            open: false,
            modal: false,
            modal2: 0,
        };
    },
    props:[
        'data',
        'value',
        'card',
        'select',
        'check',
        'notComment',
        'full',
        'tipo',
        'regalo',
    ],
    computed:{
        session(){return this.$store.getters.getSession;},
        router(){return this.$store.getters.getRouter;},
        info(){return this.data ||  {}},
        usuario(){return this.info.usuario ||  {}},
        para(){return this.info.para ||  {}},
    },
    methods:{
        click(){
            console.log("THIS", this.tipo);
        },

        comentar(){
            this.$store.commit('setPostState', ['post', this.info.id] );
            this.router.navigate('/post_comentarios');
        },

        fav(){
            if(this.info.favorito){
                this.info.favorito = false;
            }else{
                this.info.favorito = true;
            }
            this.$store.dispatch('postPostSaveFav',[this.info] );
        },

        set(){
            swal("","Post reported","success");
            this.$store.dispatch('userReportPost',[ this.info ]);
            this.value.push(this.info.id);
        },
        
        eliminar(){
            this.info.eliminar = 1;
            this.$store.dispatch('userPostBorrarPost',[ this.info ]);
        },

        cal(){
            this.info.cal = 1;
            this.$store.dispatch('userPostCrearPost',[ this.info ]);
        },
        descargar(i){
            this.$store.dispatch('userGetImg', [i])
        }
    },
}
</script>