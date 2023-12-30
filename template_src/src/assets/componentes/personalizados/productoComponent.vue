<template>
<div class="row w-100 m-0 platillo-card "> 

    <modalStaticMensaje 
        v-if="modal"
        @close="modal=0"
        texto="¿Estas seguro de borrar este favorito?"
        boton="Aceptar"
        @click="$store.dispatch('postRmFavorito',info)"
    />

    <div class="row w-100 m-0">

        <div class="row w-100 m-0" v-if="full">
            
            <div class="row w-100 m-0" >
                <div class="row w-100 m-0 position-relative">
                    <template >
                        <div v-if="0" class="w-auto position-absolute left-10px top-33px z-1000000" @click="router.back()">
                            <div class="row w-100 m-0">
                                <i class="f7-icons color-white letra-rojo2-30" >chevron_left</i>
                            </div>
                        </div>

                        <div class="w-auto position-absolute right-15px top-15px z-1000000" @click="$store.dispatch('postAddFavorito',info)" v-if="1" >
                            <div class="row w-100 m-0" >
                                <icono icono="favorite" clase="letra-rojo2-35" v-if="$store.getters.stateDataFindFieldId('favoritos','producto_id', info.id)" />
                                <icono icono="favorite_border" clase="letra-rojo2-35" v-else />
                            </div>
                        </div>
                    </template>


                    <sliderPlatillo :info="info" />
                    <!-- <imagen clase="h-max-50vh" :fit="true" :src="info.imagen" /> -->
                </div>
            </div>

            <div class="row w-100 m-0 px-3 py-3 ">
                <div class="col px-0">
                    <div class="row w-100 m-0 pt-1 pb-1">
                        <div class="col px-0 letra-gray2-21 fw-600" >{{info.name}}</div>
                    </div>

                    <div class="row w-100 m-0 pt-1 pb-1">
                        <div class="col px-0 letra-gray3-18 fw-400" >Clave Articulo {{info.sku}}</div>
                    </div> 

                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 px-0 my-auto letra-gray2-18 text-capitalize fw-800 " v-if="info.precioSin" ><p class="m-0" ><s>{{info.precioSin | currency}} MXN</s></p></div>
                        <div class="row w-100 m-0 px-0 my-auto letra-rojo-22 text-capitalize fw-800 ">{{info.precio | currency}} MXN</div>
                    </div>
                    
                    <div class="row w-100 m-0 pt-1 pb-3" >
                        <div class="col-auto px-0" @click="goTienda()" >
                            <div class="row w-100 m-0 px-3 pb-1 pt-7px border-rojo-1 border-radius-10px">
                                <div class="col-auto px-0">
                                    <icono icono="storefront" clase="letra-rojo-30" />
                                </div>
                                <div class="col-auto px-0 letra-rojo-18 fw-600" > {{info.brand}}</div>
                            </div>
                        </div>
                    </div> 

                    <div v-if="0" class="row w-100 m-0 pt-1 pb-1 pb-4">
                        <div class="col-12 px-0 letra-gray4-18 fw-600" >Tiempo de entrega</div>
                        <div class="col-12 px-0 letra-rojo1-24 fw-600 text-capitalize " >{{entrega}}</div>

                    </div> 
                    
                    <div class="row w-100 m-0 pt-1 pb-1">
                        <div class="row w-100 m-0 px-0 letra-gray4-18 text-justify " v-if="info.short_description" v-html="info.short_description" ></div>
                    </div>
                    
                    <div class="row w-100 m-0 pt-4 pb-1">
                        <div class="row w-100 m-0 px-0 letra-gray3-18 text-justify html-elements " v-if="info.description" v-html="info.description" ></div>
                    </div>
               
                </div>
            </div>

            <div class="row w-100 m-0" >
                <template v-if="info.modelos && info.modelos.length" >
                    <div class="row w-100 m-0 px-3">
                        <div class="row w-100 m-0 letra-gray3-20" v-if="info.stocktype=='sizes'" >Tallas</div>
                        <div class="row w-100 m-0 letra-gray3-20" v-else >Modelos</div>
                        <div class="row w-100 m-0 pt-3">
                            <div v-for="m of info.modelos" :key="m.id" class="row w-100 m-0 py-2">

                                <div class="col-auto px-1 pr-2 my-auto" >
                                    <div class="row w-100 m-0" >
                                        <div class="w-auto" @click="form.modelo = m.id; set();" >
                                          <icono clase="letra-rojo-30" icono="radio_button_checked" v-if="form.modelo == m.id" />
                                          <icono clase="letra-gray3-30" icono="radio_button_unchecked" v-else  />
                                        </div>
                                    </div>
                                </div>
                                <div class="w-60px h-60px border-radius-10px overflow-hidden">
                                    <imagen  :src="m.imagen" />
                                </div>
                                <div class="col-3 px-0 letra-gray3-18 text-center">{{m.size}}</div>
                                <div class="col-5 px-0 letra-gray3-18 text-center ">{{m.description}}</div>

                            </div>
                        </div>
                    </div>
                </template>
                
            </div>

            <div class="row w-100 m-0 px-3 py-2 pb-3  " v-if="info.sku && Number(info.width) && Number(info.weight) && Number(info.high)" >                    
                <div class="row w-100 m-0 pt-1 pb-1">
                    <div class="col px-0 letra-gray3-18 fw-600" >Stock Disponible: {{info.stock}}</div>
                </div> 

                <div class="col my-auto px-0">
                    <div class="row w-100 m-0">
                        <div class="col my-auto px-0 letra-gray4-22 text-capitalize">Cantidad: </div>
                    </div>
                </div>
                <div class="col-auto my-auto px-1 pl-2">
                    <div class="row w-100 m-0 px-1 justify-content-left back-color-rojo border-radius-30px " >
                        <div class="col-auto px-0 py-1 my-auto" @click="remove()">
                            <icono  icono="remove" clase="letra-blanco-40 pt-6px"/>
                        </div>

                        <div class="w-15 px-2 my-auto letra-blanco-25 w-70px text-center justify-content-center">{{form.cantidad}}</div>

                        <div class="col-auto px-0 py-1 my-auto" @click="add()">
                            <icono  icono="add" clase="letra-blanco-40 pt-6px" />
                        </div>

                    </div>
                </div>
            </div>

            <template v-if="platillos && platillos.length" >
                <div class="row w-100 m-0  " >
                    <div class="row w-100 m-0 px-3 pb-2 letra-gray4-18 fw-600">Productos relacionados: </div>
                    <div class="row w-100 m-0" v-if="0" >
                        <scollX cantidad="auto" >
                            <div class="swiper-slide w-auto px-2 text-center" v-for="xp of platillos" :key="xp.id" >
                                <div class="w-auto" >
                                    <instalcionesComponent :row="1"  :data="xp"  />
                                </div>
                            </div>
                        </scollX>
                    </div>

                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 py-2 px-3" v-for="xp of platillos" :key="xp.id" >
                            <div class="row w-100 m-0" >
                                <instalcionesComponent :row="1"  :data="xp"  />
                            </div>
                        </div>
                    </div>
                </div>
            </template>


            <div class="row w-100 m-0 pY-3"></div>
           
        </div>

        <!-- ROW DEL PLATILLO -->
        <div class="w-30vw py-2 carta border-radius-20px" v-else-if="card" @click="clickX()">
            <div class="row w-100 m-0 ">
                <div class="row w-100 m-0">
                    <div class="h-16vw w-16vw mx-auto border-radius-10px overflow-hidden">
                        <imagen :fit="true" :create="createImagen" :src="info.foto_platillo_id" />
                    </div>
                </div>
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 justify-content-center text-center h-48px align-content-center letra-gray4-15 text-capitalize">{{info.platillo | truncate(25) }}</div>
                        <!-- <div class="row w-100 m-0 justify-content-center text-center h-48px align-content-center letra-gray4-15 text-capitalize">Contenido {{info.contenido  }}</div> -->
                        <div class="row w-100 m-0 justify-content-center text-center px-0 letra-rojo2-18">{{info.precio | currency}}</div>
                    </div>
                    <!-- <div class="row w-100 m-0">
                        <div class="col px-0 letra-gray3-15">{{info.descripcion}}</div>
                    </div> -->
                </div>
            </div>
        </div>

        <div class="row w-100 m-0 py-2 carta border-gray01-1  border-radius-15px" v-else @click="click()">
            <div class="row w-100 m-0 px-3 ">
                <template>
                    <div class="col-auto my-auto px-0">
                        <div class="h-20vw w-20vw border-radius-10px overflow-hidden">
                            <imagen :fit="true" :create="1" :src="info.imagen" />
                        </div>
                    </div>
                </template>
                <div class="col my-auto px-0 pl-2">
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 letra-gray4-16 text-capitalize">{{info.nombre}}</div>
                        <div class="row w-100 m-0 letra-gray3-14 text-capitalize" v-if="info.descripcion">{{info.descripcion}}</div>
                        <div class="row w-100 m-0 letra-rojo1-18 ">{{info.precio | currency}}</div>
                    </div>
                    <template v-if="res">
                        <div class="row w-100 m-0" v-if="info.restaurante && info.restaurante.restaurant_nombre" >
                            <!-- <div class="row w-100 m-0 letra-blanco-16">Tienda</div> -->
                            <div class="row w-100 m-0 letra-blanco-17">{{info.restaurante.restaurant_nombre}}</div>
                        </div>
                    </template>
                </div>
               
            </div>
        </div>

    </div>
</div>
</template>
<script>
const moment = require('moment');

export default {
    data(){
        return {
            
            modal:  0,

            form: {
                id: _.uniqueId('pla'),
                platillos_id: null,
                tipo: null,
                restaurantes_id: null,
                platillo: null,
                descripcion: null,
                nombre: null,
                fecha: moment().add(1, 'days').format('YYYY-MM-DD'),
                comentarios: null,
                cantidad: 1,
                precio: 0,
                total: 0,
                modelo: null,
            },
            show: false,
            detalle: null,
        };
    },
    props:[
        'full',
        'card',
        'data',
        'createImagen',
        'fav',
        'res',
        'emitir',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        prod(){return this.detalle || null},
        info(){return this.prod || this.data || {} },
        entrega(){return moment().add(this.info.tiempo || 5, 'days').format('dddd DD [de] MMMM')},
        totalProductos(){ return this.$store.getters.carritoObject('totalProductos') || 15;},

        aprox(){ return moment().add(55,'minutes').format('HH:mm [hrs]')},
        restaurante(){return this.$store.getters.restaurantesFind('restaurantes','restaurante') || {};},
        platillos(){ return (this.info.platillos || [] ).filter(f=>f.id != this.info.id) },

    },
    
    mounted(){
        this.$store.dispatch('postDetalleProd',[this.info.id, (p)=>{
            console.log("GET DETALLE", this.info, p);
            this.detalle = p;
            this.set();
        }])
    },

    methods:{
        click(){
            if(this.emitir){
                this.$emit('click');
                return;
            }
            this.$emit('click');
            this.$store.commit('setRestauranteState',['restaurante',this.info.restaurantes_id]);
            this.$store.commit('setRestauranteState',['platillo',this.info.id]);
            this.router.navigate('/producto');
        },

        goTienda(){
            console.log("GO TIENDA", this.info.user);
            this.$store.commit('setRestauranteState',['tienda', this.info.user]);
            this.router.navigate('/tienda_productos');
        },

        clickX(){
            if(this.emitir){
                this.$emit('click');
                return;
            }
            this.$emit('click');
            this.$store.commit('setRestauranteState',['platillo',this.info.id]);
            this.router.navigate('/producto', {reloadCurrent: true});
        },

        remove(){
            if(this.form.cantidad){
                this.form.cantidad = this.form.cantidad -1;
            }
            this.set();
        },
        add(){
            if( this.form.cantidad < this.totalProductos ){
                this.form.cantidad = this.form.cantidad + 1;
                this.set();
            }
        },
        
        set(){
            this.form.platillos_id      = this.info.id;
            // this.form.tipo              = this.info.tipo;
            // this.form.restaurantes_id   = this.info.restaurantes_id;

            this.form.nombre            = this.info.name;
            this.form.description       = this.info.description;
            this.form.cat               = this.info.cat;
            this.form.platillo          = this.info;
            this.form.info              = this.info;
            this.form.precio            = Number(this.info.precio);
            this.form.total             = this.form.cantidad * Number(this.form.precio);
            this.$emit('set',this.form);
        }
    },
}
</script>