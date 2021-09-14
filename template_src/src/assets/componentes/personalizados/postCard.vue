<template>
<div class="row w-100 m-0 px-3">
    <div class="row w-100 m-0 my-2 border-gray0-1 border-radius-10px overflow-hidden" @click="click()">
        <div class="row w-100 m-0 justify-content-center">
            <div class="row w-100 m-0 h-50vh" @click="comentar()">
                <imagen clase="" :create="true" :src="info.imagen" />
            </div>
            <div class="row w-100 m-0 py-5px px-2 " @click="comentar()">
                <div class="w-45px h-45px my-auto ">
                    <imagen clase="border-radius-50" :src="usuario.foto" :user="true" />
                </div>
                <div class="col px-0 pl-3" @click="comentar()">
                    <div class="row w-100 m-0 letra-gray4-17 fw-600">{{usuario.nombre}}</div>
                    <div class="row w-100 m-0 letra-gray3-14">{{[info.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from') }}</div>
                </div>
                <div class="col-auto px-0 my-auto">
                    <div class="row w-100 m-0">
                        <div class="col-auto my-auto px-0 ml-auto pr-2 " @click="comentar()" >
                            <div class="w-26px">
                                <imagen :icono="true" src="ch1" />
                            </div>
                        </div>
                        <div class="col-auto my-auto px-1 pt-6px position-relative"  @click="fav()">
                            <icono icono="favorite" clase="letra-azul1-30" v-if="info.favorito" />
                            <icono icono="favorite_border" clase="letra-gray2-30" v-else />

                            <div class="w-30px h-30px back-color-azul border-radius-50 position-absolute right--7px top--5px" v-if="false && info.totalLikes">
                                <div class="row w-100 m-0 letra-blanco-19 pt-1px justify-content-center text-center fw-600 ">{{info.totalLikes}}</div>
                            </div>
                        </div>
                        <div class="col-auto my-auto px-0 pt-5px " v-if="false" >
                            <icono icono="more_vert" clase="letra-gray2-28" />
                        </div>
                    </div>
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
        };
    },
    props:[
        'data',
        'value',
        'check',
        'full',
        'tipo',
        'regalo',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        info(){return this.data || {}},
        usuario(){return this.info.usuario || {}},
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
            this.$store.dispatch('postPostSaveFav',[this.info] );
        },
    },
}
</script>