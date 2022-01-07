<template>
<div class="row w-100 m-0 ">

     <modalMensajeStatic
        texto="Do you want to report this comment as inappropriate?"
        boton="Acept"
        v-if="open"
        @close="open=false"
        @click="set"
    />

    <div class="row w-100 m-0 px-2 py-2" @click="click()">
        <div class="row w-100 m-0 justify-content-center position-relative">
            <div class="w-16vw h-16vw my-auto ">
                <imagen clase="border-radius-30px " :create="true" :user="true" :src="info.foto" />
            </div>
            <div class="col px-0 pl-3 my-auto">
                <div class="row w-100 m-0 ">
                    <div class="col my-auto px-0 letra-gray3-14">{{info.nombre }}</div>
                    <div class="col-auto my-auto px-0 letra-azul1-14 ">{{[info.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                </div>
                <div class="row w-100 m-0 ">
                    <div class="col-auto my-auto px-0 letra-azul1-14 " v-if="debug">{{info.creado}}</div>
                </div>
                <div class="row w-100 m-0 letra-gray4-18 overflow-hidden " >
                    <p class="m-0 over-wrap" >{{ info.comentario }}</p>
                </div> 
            </div>

            <div class="w-auto px-0 position-absolute bottom-5px right--3px z-index-10000000  " @click.stop="open=true">
                <icono icono="report" clase="letra-gray2-20" />
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            open:false,
        };
    },
    props:[
        'data',
        'like',
        'check',
        'full',
        'tipo',
        'regalo',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        debug(){return this.$store.getters.debug;},
        info(){return this.data || {}},
    },
    methods:{
        click(){
            console.log("THIS", this.tipo);
           
        },
        set(){
            this.$store.dispatch('postPostReportar',[this.info.comentario_id, 0, 'inappropriate' ]);
        },
    },
}
</script>