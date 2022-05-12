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

    <div :class="`${options?'pt-33px':''}`" class="row w-100 m-0 px-3  position-relative " :key="m.id" v-if="m.usuarios_id==session.id" @click="options = 0">
        <div class="w-28vw position-absolute top--3px right-10px back-color-negro border-tr-radius-9px border-bl-radius-9px" v-if="options" >
            <div class="row w-100 m-0 py-5px justify-content-center">
                <div class="col-auto px-2">
                    <div class="row w-100 m-0" @click="resend(m.mensaje)" >
                        <icono icono="reply" clase="letra-blanco-33" />
                    </div>
                </div>
                <div class="col-auto px-2" @click="copiar(m.mensaje)" v-if="0" >
                    <div class="row w-100 m-0">
                        <icono icono="content_copy" clase="letra-blanco-33" />
                    </div>
                </div>
                <div class="col-auto px-2" @click="borrar()">
                    <div class="row w-100 m-0">
                        <icono icono="delete" clase="letra-blanco-33" />
                    </div>
                </div>
            </div>
        </div>
        <div class="w-auto p-2 my-2 ml-auto mensaje-propio  ">
            <div class="row m-0 justify-content-rigth" v-if="m.tipo == '1'">
                <div class="row w-100 m-0">
                    <imagen clase="z-index-10000 border-radius-15px" :create="true" :src="m.mensaje" />
                </div>
            </div>
            <div class="row m-0 justify-content-rigth mb-1" v-else >
                <div class="p-0 pr-2 letra-blanco-4-4vw white-space-preline" ><p class="m-0 p-0 over-wrap" >{{m.mensaje}}</p></div>
            </div>
            <div class="row px-2 m-0 my-auto py-0 justify-content-end letra-gray00-13">{{ [m.fecha,'YYYY-MM-DD HH:mm:ss'] | moment('from') }}</div>

            <div class="w-30px position-absolute right--3px top-3px z-10000000 " @click.stop="options= !options">
                <div class="row w-100 m-0 justify-content-center">
                    <icono icono="more_vert" clase="letra-blanco-30" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            options: 0,
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
    
    mounted() {
        this.send();
    },

    methods:{
        send(){
            console.log("ENVIAR LECTURA", this.m, this.m.usuarios_id == this.session.id, !this.m.leido);
            if(this.m.usuarios_id != this.session.id){
                if(!this.m.leido){
                    this.$store.dispatch('postLeerMsn',[this.m]);
                }
            }
        },
        borrar(){
            this.$store.dispatch('postSaveMsn',[this.m, 3]);
        },
        copiar(text){
            console.log("COPING");
            navigator.clipboard.writeText(text).then(()=>{
                console.log('Async: Copying to clipboard was successful!');
            }, (err)=>{
                console.error('Async: Could not copy text: ', err);
            });
        },
        resend(text){
            this.$store.commit('setPostState',['msn',text]);
            // this.router.navigate('/enviar_mensaje', { reloadCurrent: true });
            this.router.navigate('/enviar_mensaje');
        },
    },
}
</script>