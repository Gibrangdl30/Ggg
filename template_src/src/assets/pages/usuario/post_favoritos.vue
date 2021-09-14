<template>
    <f7-page class="" id="inicio">

        <div class="vista">
            <nav-bar tipo="inicio" title="Favorite posts" :fix="1" :backs="true"   />

            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0" v-for=" f of favoritos " :key="f.id">
                        <postCard :data="f" />
                    </div>
                </div>

            </div>

        </div>

    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment-timezone');

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                zona: moment.tz.guess(),
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            favoritos(){return this.$store.getters.postStateArray('favoritos')},
        },

        mounted(){
            this.$store.dispatch('synchronizeData');
        },

        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
        }
    }
</script>