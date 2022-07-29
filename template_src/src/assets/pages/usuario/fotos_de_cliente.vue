<template>
    <f7-page class="" id="inicio">
    
        <div class="vista">
            <nav-bar tipo="inicio" title="Fotos tomadas" :backs="true" :fix="1" />

            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0" v-for=" f of posts" :key="f.id">
                        <div class="row w-100 m-0 px-3 py-2 border-b-gray1-1" @click="set(f)">
                            <amigosRow :data="f.usuario" :desc="1" :numero="f.fotos.length"  />
                        </div>
                        <!-- <postCard :data="f" v-model="notShow" /> -->
                    </div>
                </div>

            </div>

        </div>

    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment');

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                b: null,
                modal: null,
                c: 15,
                add: 5,
                notShow:[],
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            init(){return this.$store.getters.userStateObject('init');},

            posts(){return this.$store.getters.postStateArray('misclientes')},
            fil(){return this.posts.filter(s => s.para_id == this.session.id)},
        },

        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
            console.log("POST POST", this.posts, );
        },

        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },

            set(x){
                console.log("SETTING id ", x);
                this.$store.commit('setPostState',['paparatz', x.para_id]);
                this.router.navigate('/fotos_tomadas');
            },

        }
    }
</script>