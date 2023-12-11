<template>
<transition name="custom"
            enter-active-class="animated fadeInLeft faster"
            leave-active-class="animated fadeOutLeft faster">
    <div class="menuModal w-100 h-100 m-0 p-0 justify-content-center" v-if="state" @click.self="closeModal()">
        <div class="row w-100 h-100 m-0px " @click.self="closeModal()">

            <div class="row w-100 h-100 m-0px pr-40px " @click.self="closeModal()">
                <div class="w-100 h-100 m-0 back-color-rojo1 pt-3 overflow-hidden">

                    <div class="contenedor-page-tabs back-color-rojo1 h-max-100vh ">
                        <div class="row w-100 m-0 pt-4 pb-4" v-if="0">
                            <div class="row w-100 m-0 pt-3">
                                <div class="h-29vw w-29vw mx-auto">
                                    <imagen clase="border-radius-50 overflow-hidden carta" :fit="true" :perfil="true" alt="" />
                                </div>
                            </div>
                            <div class="row w-100 m-0 pt-2 letra-gray4-20 justify-content-center text-center fw-800">{{session.nombre}}</div>
                        </div>

                        <div class="row m-0 w-100 pt-4 justify-content-center">
                        <template v-if="!session.token && 0">
                            <div class="row w-100 m-0 px-3 py-2" @click="tologin()" >
                                <div class="col-auto px-0 my-auto">
                                    <icono icono="person_outline" clase="letra-gray3-30" />
                                </div>
                                <div class="col px-0 mb-auto pl-3">
                                    <div class="row m-0 w-100 letra-gray3-20 fw-600">Iniciar sesión</div>
                                </div>
                            </div>
                        </template>
                        </div>

                        <template >
                        <div v-for="c of categorias" :key="c.id" class="row w-100 m-0  "  >
                            <div class="row w-100 m-0 px-1 pr-2 py-2 border-b-gray01-1">
                                <div v-if="0" class="w-11vw h-11vw carta border-radius-50 overflow-hidden position-relative  " >
                                        <imagen clase="" :fit="true" :src="c.imagen" />
                                    </div>
                                    <div class="col px-0 mb-auto pl-3" @click="set(c.id)">
                                        <div class="row m-0 w-100 letra-blanco-20 fw-600">{{c.name}}</div>
                                    </div>

                                    <div class="col-auto px-0 pt-3px" 
                                        v-if="c.subcat.filter(s=>s.prod && s.prod.id) && c.subcat.filter(s=>s.prod && s.prod.id).length" 
                                        @click="show==c.id?show = null:show = c.id" >
                                        <icono :icono="show == c.id?'expand_less':'expand_more'" clase="letra-blanco-30" />
                                    </div>
                                </div>
                                <div class="row w-100 m-0" v-if="show == c.id">
                                    <div v-for="s of c.subcat.filter(s=>s.prod && s.prod.id)" @click="set2(c.id, s.id)" class="row w-100 m-0 px-3 py-5px back-color-gray4 border-b-gray01-1 " >
                                        <div class="col px-0 mb-auto pl-3">
                                            <div class="row m-0 w-100 letra-blanco-20 fw-600">{{s.name}}</div>
                                        </div>
                                    </div>  
                                </div>
                            </div> 
                        </template>

                    </div>

                </div>
            </div>

        </div>
    </div>


</transition>
</template>
<script>
export default {
    data(){
        return {
            name: 'menuModal',
            razon: '',
            show: null,
        };
    },
    props: [
        'titulo',
    ],
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
        router(){return this.$store.getters.getRouter;},
        categorias(){return this.$store.getters.info('categorias') },

        vr(){return this.$store.getters.vr;},
        session(){return this.$store.getters.getSession;},
        saldo(){return this.$store.getters.enviosObject('saldo');},
    },
    methods:{
        closeModal(e = false){
            this.$store.commit('closeModal', [this.name]);
            if(e){
                this.$emit('close');
            }
        },
        close(){
            console.log("CLOSING");
            this.closeModal();
            // this.$store.commit('openMenuRight');
        },
        set(id){
            this.$store.commit('updateCatalogosState',['cat', id]);
            this.close();
            this.router.navigate('/subcategorias');
        },
        set2(x,id){
            this.$store.commit('updateCatalogosState',['cat', x]);
            this.$store.commit('updateCatalogosState',['sub', id]);
            this.close();
            this.router.navigate('/subcategoria_productos');

        },
        tologin(){
            this.close();
            this.$store.commit('changeView','login');
        },
        main(ruta){
            this.router.back(ruta,{force:true});
            this.close();
        },
        goTo(ruta){
            this.router.navigate(ruta);
            this.close();
        },
        logout(){
            this.close();
            this.$store.commit('logout');
        }
    }
}
</script>