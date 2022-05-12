<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center px-4" v-if="state" @click.self="closeModal()">
        <div class="row w-100 m-0px mt-90px px-5 pt-90px" @click.self="closeModal()">
            <div class="row w-100 m-0 mt-5 back-color-azulapp py-3 border-radius-15px" @click.self="closeModal()">
                <div class="row w-100 m-0" @click.self="closeModal()">
                     <div class="row w-100 m-0 justify-content-around">
                        <div class="col-6 m-0 w-100 p-0 my-auto " :class="`${!onlyCam?'border-r-blanco-1':''}`" >
                            <button class="button h-100 boton-transparente" @click="takePhoto()">
                                <div class="row m-0 h-100 justify-content-center">
                                    <div class="col-12 px-2">
                                        <imagen :icono="true" src="camera2" />
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div class="col-6 m-0 w-100 p-0 my-auto" v-if="!onlyCam">
                             <button class="button h-100 boton-transparente" @click="takePicture()">
                                <div class="row m-0 h-100 justify-content-center">
                                    <div class="col-12 px-2">
                                        <imagen :icono="true" src="gallery" />
                                        <!-- <img class="w-100 h-100" src="../../iconos/gallery.svg" alt=""> -->
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 py-5"></div>

                <div class="row w-100 m-0" v-if="asignado && asignado.id">
                    <div class="col-12 px-0 mx-auto" @click="cancelar()">
                        <botonApp tipo="gris" texto="Ya no quiero ser paparatz" radius="30px" />
                    </div>
                </div>
            </div>
        </div>
    </div>


</transition>
</template>
<script>
export default {
    props: [],
    data(){
        return {
            name: 'selectImagen',
        };
    },
    computed:{
        state(){return this.$store.getters.getModal(this.name)},
        funcion(){return this.$store.getters.getFuncion},

        session(){return this.$store.getters.getSession;},
        onlyCam(){return this.$store.getters.onlyCam;},
        
        posts(){return this.$store.getters.postStateArray('posts')},

        asignado(){return this.posts.find(x=>{return  x.type == 's' && x.papara.some(w=> w.usuarios_id == this.session.id ) }) ||  {}},
        user(){return this.asignado.usuario ||  {}},
    },
    methods:{
        takePhoto(){
            if(this.funcion){
                this.$store.dispatch('getFotoFunction', [this.funcion]);
            }else{
                swal("","No function selected","info");
            }
            this.closeModal();
        },
        takePicture(){
            if(this.funcion){
                this.$store.dispatch('selectFotoFunction', [this.funcion]);
            }else{
                swal("","No function selected","info");
            }
            this.closeModal();
        },
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },

        cancelar(){
            let form = this.asignado;
            form.cancelar = 1;
            this.$store.dispatch('userPostCrearPost',[ form ]);
            this.closeModal();
        },
    },
}
</script>