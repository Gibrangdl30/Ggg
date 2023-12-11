<template>
    <div :class="size?`${size || ''} py-1` :'row w-100 m-0'">
        
        <div class="row w-100 m-0"  >
            <div class="row w-100 m-0 back-color-rojo1 border-radius-10px" @click="init()" >
                <div class="row w-100 m-0 py-1 letra-blanco-18 justify-content-center text-center">Volver a comprar</div>
            </div> 
        </div>

    </div>
</template>
<script>

import swal from 'sweetalert';
const moment = require('moment');


export default {
    data(){
        return {
            show:0,
            cantidad: 1,
            total: 1,
            prod: {},

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
        };
    },
    props:[
        'data',
        'size',
        'objCustom',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},
        info(){return this.data || {}},
    },
    mounted(){
        
    },
    methods:{

        init(){
            this.$store.dispatch('postDetalleProd',[this.info.product_id, (p)=>{
                this.prod = p;
                console.log("GET DETALLE", this.info, p, this.prod );
                this.set();
            }, 1]);
        },
        
        set(){
            this.form.platillos_id      = this.prod.id;
            this.form.tipo              = this.prod.tipo;
            this.form.restaurantes_id   = this.prod.restaurantes_id;
            this.form.tipo              = this.prod.tipo;
            this.form.nombre            = this.prod.name;
            this.form.description       = this.prod.description;
            this.form.cat               = this.prod.cat;
            this.form.platillo          = this.prod;
            this.form.info              = this.prod;
            this.form.precio            = Number(this.prod.precio);
            this.form.total             = this.form.cantidad * Number(this.form.precio);
            this.$emit('set',this.form);
            this.set2(this.form);
        },

        set2(platillo){
            this.total = platillo.total;
            this.form = platillo;
            this.add();
        },

        add(){
                if(!this.session.token){
                    this.$store.commit('openModal',['modalSession']);
                    return;
                }

                console.log("GET DETALLE",this.prod );
                if(this.prod.modelos && this.prod.modelos.length){
                    if(1){
                        this.form.modelo = this.info.modelo_id;
                    }
                }
               
                if(this.total){
                    this.form.distancia = 0;
                    this.$store.commit('addProductoCarrito',{prod: this.form, callback: ()=>{
                        // this.$store.commit('openMsn',['¡Gracias! Los Producto(s) han sido agregados a tu carrito','Pagar y recibir',false,false]);
                        this.router.navigate('/carrito');
                    }});
                }
            }
    },
}
</script>