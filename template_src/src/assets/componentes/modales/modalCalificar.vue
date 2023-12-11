<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" >
        <div class="row w-100 m-0px px-3">
            <div class="row w-100 m-0 mt-5 back-color-blanco py-3 border-radius-15px">
                <template v-if="reportar">
                    <div class="row w-100 m-0 px-3">
                        <div class="row w-100 m-0 justify-content-center py-2">
                            <div class="col-12 px-1 mt-2 mb-1 text-center">
                                <div class="row w-100 m-0 letra-gray4-5-1vw fw-800 justify-content-center">Reporta un problema:</div>
                                <div class="row w-100 m-0 py-2 px-2 letra-gray3-16 justify-content-center text-center ">En México Limited nos preocupamos por la calidad de los productos y servicios que comercializamos, y por la mejor experiencia de nuestros clientes, por favor describe el problema que tuviste. (puedes agregar fotos).</div>
                            </div>
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0">
                                    <inputForm
                                        :textarea="1"
                                        :rows="5"
                                        texto="" 
                                        type="text" 
                                        placeholder="Escribe aquí..." 
                                        v-model="form2.texto"
                                    />
                                </div>
                                <div class="row w-100 m-0">
                                    <div class="row w-100 m-0 pt-3 ">
                                        <div v-for="(i,x) of form2.imagenes" :key="x" class="w-18vw h-18vw mx-auto">
                                            <uploadImagen 
                                                rad="10"
                                                bcolor="azul1"
                                                bsize="1"
                                                padding="p-2"
                                                v-model="i.url" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      
                        
                        <div class="row w-100 m-0 pt-3">
                            <div class="col-6 px-1">
                                <botonApp texto="Cancelar" tipo="gris" @click="cancelar()" />
                            </div>
                            <div class="col-6 px-1">
                                <botonApp texto="Enviar" tipo="app" @click="enviar()" />
                            </div>

                        </div>
                    </div>
                </template>  
                
                <template v-else >
                    <div class="row w-100 m-0 px-3">
                        <div class="row w-100 m-0 justify-content-center py-2">
                            <div class="col-12 px-1 mt-2 mb-1 text-center">
                                <div class="row w-100 m-0 letra-gray4-5-1vw fw-800 justify-content-center">Califica al creador:</div>
                            </div>
                            <div v-if="prod && prod.id" class="row w-100 m-0">
                                <div class="row w-100 m-0 px-3">
                                    <div class="h-15vw w-15vw my-auto overflow-hidden border-radius-10px">
                                        <imagen :src="prod.user.imagen" />
                                    </div>
                                    <div class="col my-auto px-0 pl-3">
                                        <div class="row w-100 m-0 letra-gray4-20 fw-600">{{prod.user.brand}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row w-100 m-0 mb-2">
                            <div class="col-12 mt-1">
                                <div class="row w-100 m-0 justify-content-center">
                                    <div class="col-auto px-2" @click="calificaion = 1; $emit('input',calificaion)">
                                        <i class="material-icons " :class="(calificaion>=1)?'letra-rojo-8-5vw':'letra-gray3-8-5vw'">star</i>
                                    </div>
                                    <div class="col-auto px-2" @click="calificaion = 2; $emit('input',calificaion)">
                                        <i class="material-icons " :class="(calificaion>=2)?'letra-rojo-8-5vw':'letra-gray3-8-5vw'">star</i>
                                    </div>
                                    <div class="col-auto px-2" @click="calificaion = 3; $emit('input',calificaion)">
                                        <i class="material-icons " :class="(calificaion>=3)?'letra-rojo-8-5vw':'letra-gray3-8-5vw'">star</i>
                                    </div>
                                    <div class="col-auto px-2" @click="calificaion = 4; $emit('input',calificaion)">
                                        <i class="material-icons " :class="(calificaion>=4)?'letra-rojo-8-5vw':'letra-gray3-8-5vw'">star</i>
                                    </div>
                                    <div class="col-auto px-2" @click="calificaion = 5; $emit('input',calificaion)">
                                        <i class="material-icons " :class="(calificaion>=5)?'letra-rojo-8-5vw':'letra-gray3-8-5vw'">star</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row w-100 m-0 pt-2" v-if="false">
                            <div class="row w-100 m-0 px-1 py-2 text-center letra-gray3-4-1vw">Deseas agregar propina al servicio:</div>
                            <div class="row w-100 m-0">
                                <scollX cantidad="auto" >
                                    <div class="swiper-slide w-auto px-1 text-center" v-for="c of cantidades" :key="c" @click="propina = c" >
                                        <div class="w-auto px-1 py-1 border-radius-50px">
                                            <div class="w-auto" >
                                                <div class="row w-100 m-0 py-5px px-2 border-radius-8px text-capitalize justify-content-center fw-800" :class="(propina == c)?'letra-verde3-15 border-verde3-1':'letra-gray3-15 border-gray3-1'">{{c | currency}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </scollX>
                            </div>
                        </div>
                        <div class="row w-100 m-0 pt-3">
                            <div class="col-6 px-1">
                                <botonApp texto="No,gracias" tipo="gris" @click="cancelar()" />
                            </div>
                            <div class="col-6 px-1">
                                <botonApp texto="Calificar " tipo="app" @click="calificar()" />
                            </div>

                        </div>
                    </div>
                </template>

            </div>
        </div>
    </div>


</transition>
</template>
<script>
export default {
    data(){
        return {
            name: 'modalCalificar',
            razon: '',
            calificaion:0,
            propina:0,
            cantidades:[0,10,20,30,40,50,60],
            prod: {},

            form2:{
                texto: null,
                imagenes:[
                    {url: null},
                    {url: null},
                    {url: null},
                    {url: null},
                ],
            }
        };
    },
    props: [
        'data',
        'pedido',
        'reportar',
    ],
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
        router(){return this.$store.getters.getRouter;},
        info(){return this.data || {}},
        talento(){return this.$store.getters.userStateFind(['talentos','talento']);},
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            this.$store.dispatch('postDetalleProd',[this.info.product_id, (p)=>{
                this.prod = p;
                console.log("GET DETALLE", this.info, p, this.prod );
            }, 1]);
        },
        closeModal(){
            this.$emit('close');
            this.$store.commit('closeModal', [this.name]);
        },
        cancelar(){
            // this.$store.dispatch('postNoCalificarServicio');
            this.closeModal();
        },
        calificar(){
            let x = {
                info:           this.info,
                prod:           this.prod,
                cal:            this.calificaion,
            }
            this.$store.dispatch('actionCalificarProd',[ x, ()=>{
                this.closeModal();
            }]);
        },
        enviar(){
            let x = {
                info:           this.info,
                pedido:         this.pedido,
                prod:           this.prod,
                form:           this.form2,
            }
            this.$store.dispatch('actionReportarProblema',[ x, ()=>{
                this.closeModal();
            }]);
        },
    },
}
</script>