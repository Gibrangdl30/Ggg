<template>
<div class="row w-100 m-0">
     <div class="row w-100 m-0 px-3" :key="m.id" v-if="m.usuarios_id!=session.id">
        <div class="p-2 my-2 mr-auto mensaje-usuario">
            <div class="row w-100 m-0 letra-gray-15 pl-8px" v-if="grupo">{{m.nombre}}</div>
            <div class="row m-0 justify-content-rigth" v-if="m.tipo == '1'">
                <div class="row w-100 m-0">
                    <imagen clase="z-index-10000 border-radius-15px" :create="true" :src="m.mensaje" />
                </div>
            </div>
            <div class="row m-0 justify-content-rigth" v-else >
                <div class="col p-0 letra-gray-dark2-4-4vw white-space-preline"><p class="m-0 p-0 over-wrap" >{{m.mensaje}}</p></div>
            </div>
            <div class="row w-100 px-2 m-0 my-auto pb-1 justify-content-end letra-gray-2-8vw">{{ [m.fecha,'YYYY-MM-DD HH:mm:ss'] | moment('from') }}</div>
        </div>
    </div>
    <div class="row w-100 m-0 px-3" :key="m.id" v-if="m.usuarios_id==session.id">
        <div class="w-auto p-2 my-2 ml-auto mensaje-propio">
            <div class="row m-0 justify-content-rigth" v-if="m.tipo == '1'">
                <div class="row w-100 m-0">
                    <imagen clase="z-index-10000 border-radius-15px" :create="true" :src="m.mensaje" />
                </div>
            </div>
            <div class="row m-0 justify-content-rigth mb-1" v-else >
                <div class="p-0 pr-2 letra-blanco-4-4vw white-space-preline" ><p class="m-0 p-0 over-wrap" >{{m.mensaje}}</p></div>
            </div>
            <div class="row px-2 m-0 my-auto py-0 justify-content-end letra-gray00-13">{{ [m.fecha,'YYYY-MM-DD HH:mm:ss'] | moment('from') }}</div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
        };
    },
    props:[
       'data',
       'info',
       'e',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},
        m(){return this.data || {} },
        chat(){return this.info || {} },
        grupo(){return this.info.tipo == 'grupo'},
    },
    methods:{
        click(){
        },
    },
}
</script>