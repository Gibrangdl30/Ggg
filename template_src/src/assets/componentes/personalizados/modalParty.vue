<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state" @click.self="closeModal()">
        <div class="row w-100 m-0px px-3 h-max-88vh scroll-y " @click.self="closeModal()">
            <div class="row w-100 m-0 mt-3 back-color-blanco py-3 border-radius-15px position-relative" >

                <div class="w-auto position-absolute right-5px top-5px z-100" @click="closeModal()">
                    <icono icono="clear" clase="letra-rojo2-40 fw-600" />
                </div>

                <div class="row w-100 m-0 px-3">
                    <div class="row w-100 m-0 border-radius-20px overflow-hidden back-color-fondo">
                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 h-15vh" v-if="f.evento.imagen">
                                <imagen clase="" :create="true" :src="f.evento.imagen" :fit="true" />
                            </div>
                            <div class="row w-100 m-0 h-15vh" v-else>
                                <imagen clase="" src="https://socialflow.app/backend/apiv1/imagenes/e1.jpg" :fit="true" />
                            </div>
                        </div>
                        <div class="row w-100 m-0 px-3 py-2">
                            <div class="w-20vw h-20vw my-auto">
                                <imagen clase="border-radius-50" :user="true" :src="f.usuario.foto" :fit="true" />
                            </div>
                            <div class="col pl-3 pr-0 my-auto">
                                <div class="row w-100 m-0 letra-azul1-22 text-capitalize">{{f.evento.nombre}}</div>
                                <div class="row w-100 m-0 letra-azul1-22 text-capitalize">{{f.id}}</div>
                                <div class="row w-100 m-0 letra-gray4-17 text-capitalize">{{f.usuario.nombre}}</div>
                                <div class="row w-100 m-0 letra-gray3-15">{{f.usuario.nombre}} te invito a su {{f.evento.tipo}}</div>
                                <div class="row w-100 m-0 letra-gray3-13">{{f.evento.nombre}} el {{[f.evento.fecha, 'YYYY-MM-DD'] | moment('DD [de] MMMM [de] YYYY')}}</div>
                                <div class="row w-100 m-0 letra-azul1-13">{{[f.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                            </div>
                        </div>
                    </div>

                    <div class="row w-100 m-0 pb-1" >

                        <div class="row w-100 m-0" v-if="a.lugar" >
                            <div class="row w-100 m-0 letra-gray3-15">Lugar</div>
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 px-3">
                                    <div class="w-10vw h-10vw">
                                        <!-- <imagen clase="border-radius-50" src="https://socialflow.app/backend/apiv1/imagenes/e1.jpg" :fit="true" /> -->
                                    </div>
                                    <div class="col my-auto px-0 pl-2">
                                        <div class="row w-100 m-0 letra-gray4-18">{{a.lugar}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row w-100 m-0" v-if=" f.productos && f.productos.length ">
                            <div class="row w-100 m-0 letra-gray3-15">Whislist</div>
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 px-3 py-2" v-for="u of f.productos" :key="u.id" @click="goBuy(u)">
                                    <div class="w-10vw h-10vw">
                                        <imagen clase="border-radius-50" :src="u.imagen" :fit="true" />
                                    </div>
                                    <div class="col my-auto px-0 pl-2">
                                        <div class="row w-100 m-0 letra-gray4-18">{{u.nombre}}</div>
                                    </div>
                                    <div class="col-auto my-auto px-0 letra-azul1-17 ">{{u.precio | currency}} {{(u.producto || {}).currency}} </div>
                                </div>
                            </div>
                        </div>

                        <div class="row w-100 m-0 pt-2" v-if=" f.usuarios && f.usuarios.length ">
                            <div class="row w-100 m-0 letra-gray3-15">Usuarios</div>
                            <div class="row w-100 m-0 h-max-20vh scroll-y ">
                                <div class="row w-100 m-0 px-1 py-1" v-for="u of f.usuarios" :key="u.id">
                                    <div class="w-8vw h-8vw my-auto">
                                        <imagen clase="border-radius-50" :src="u.usuario.foto" :fit="true" :user="true" />
                                    </div>
                                    <div class="col my-auto px-0 pl-2">
                                        <div class="row w-100 m-0 letra-gray4-15">{{u.usuario.nombre}}</div>
                                        <div class="row w-100 m-0 letra-gray3-13">{{u.usuario.email | truncate(30) }}</div>
                                    </div>
                                    <div class="col-auto my-auto px-0">
                                        <div class="row w-100 m-0 letra-azul1-16 text-capitalize justify-content-center ">{{u.estatus}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row w-100 m-0 pt-3" v-if=" f.gastos && f.gastos.length ">
                            <div class="row w-100 m-0 letra-gray3-15" v-if="a.cooperacion == 'si'" >Amenidades para cooperación: </div>
                            <div class="row w-100 m-0 letra-gray3-15" v-else >Amenidades ofrecidas por el host: </div>
                            <div class="row w-100 m-0 px-3">
                                <div class="row w-100 m-0 py-3px" v-for="u of f.gastos" :key="u.id">
                                    <div class="col my-auto px-0 pl-2">
                                        <div class="row w-100 m-0 letra-gray4-15">{{u.nombre}}</div>
                                    </div>
                                    <div class="col-auto my-auto px-0 letra-azul1-17 ">{{u.precio | currency}}</div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 px-3">
                                <div class="row w-100 m-0 border-t-gray0-1">
                                    <div class="col px-0 letra-gray4-17">Total:</div>
                                    <div class="col-auto px-0 letra-azul1-19">{{f.evento.total_gastos | currency}}</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="row w-100 m-0">

                        <div class="row w-100 m-0" v-if=" f.cobro.estatus == 'pendiente' && Number(f.cobro.total) ">
                            <div class="row w-100 m-0 letra-gray3-18 px-2 pt-2">Coopera para la party:</div>
                            <div class="row w-100 m-0 px-2" v-if="a.tipo == 'party'" >
                                <div class="col px-0 letra-gray3-18">Total regalos:</div>
                                <div class="col-auto px-0 letra-azul1-20">{{ t | currency }} MXN</div>
                            </div>
                            <div class="row w-100 m-0 px-2">
                                <div class="col px-0 letra-gray3-18">Total por usuario:</div>
                                <div class="col-auto px-0 letra-azul1-20">{{f.cobro.total | currency}} MXN</div>
                            </div>
                            <div class="row w-100 m-0 pt-2">
                                <div class="col-6 px-1">
                                    <botonApp texto="Rechazar" radius="15px" tipo="gris" @click="actualizar('rechazado')" />
                                </div>
                                <div class="col-6 px-1">
                                    <botonApp texto="Pagar" radius="15px" tipo="rojo" @click="pagar('aceptado')" />
                                </div>
                            </div>
                        </div>

                        <div class="row w-100 m-0 pt-4" v-if=" f.estatus == 'enviado' ">
                            <div class="row w-100 m-0 letra-gray3-18 px-2 py-2">Responde a la invitacion a la {{f.evento.tipo}}:</div>
                            <div class="row w-100 m-0">
                                <div class="col-6 px-1">
                                    <botonApp texto="Rechazar" radius="15px" tipo="gris" @click="next('rechazado')" />
                                </div>
                                <div class="col-6 px-1">
                                    <botonApp texto="Aceptar" radius="15px" tipo="rojo" @click="next('aceptado')" />
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    </div>


</transition>
</template>
<script>
const moment = require('moment');

export default {
    data(){
        return {
            name: 'modalParty',
            razon: '',
            calificaion:0,
            form: {
                nombre: null,
                telefono: null,
            },
        };
    },
    props: [
        'data',
    ],
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
        router(){return this.$store.getters.getRouter;},
        f(){return this.data || {} },
        a(){return this.data.evento || {} },
        t(){
            let to = 0;
            this.f.productos.map(x=>{ to = to + ( Number(x.precio) * Number(x.cantidad) )});
            return to;
        },
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        cancelar(){
            this.closeModal();
        },
        next(e){
            this.$store.dispatch('postActulizarSolicitud',[this.f, e]);
            this.closeModal();
        },

        goBuy(u){
            this.$store.commit('updateCatalogosState',['producto', u.productos_id ]);
            this.$store.commit('setCarritosState',['producto', u.productos_id ]);
            this.router.navigate('/detalle_producto');
        },

        pagar(e){
            let p = {
                id: this.f.evento.id,
                imagen: 'https://socialflow.app/backend/apiv1/imagenes/rr.jpeg',
                nombre: `Coopera para el ${this.f.evento.type}: ${this.f.evento.nombre}`,
                precio: this.f.cobro.total,
                total: this.f.cobro.total,
                eventos_id: this.f.evento.id,
                currency: 'MXN',
                type: 'coopera',
            };

            if(this.f.evento.imagen){
                p.imagen = this.$store.getters.urlImagen(this.f.evento.imagen);
            }
            
            this.$store.commit('cleanCarrito');
            this.$store.commit('addProductoCarrito', p );
            this.$store.commit('setCarritosState',['eventos_id', this.f.evento.id]);
            this.router.navigate('/carrito');
        },

        actualizar(e){
            this.$store.dispatch('postActulizarCobro',[this.f.cobro, e]);
            this.closeModal();
        },
        
    },
}
</script>







