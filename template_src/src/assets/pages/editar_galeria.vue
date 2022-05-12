<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Mi galeria'" :fix="1" />
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0">

                    <div class="row w-100 m-0 py-3">
                        <div class="row w-100 m-0">
                            <div class="w-49vw h-49vw px-2 py-2" v-for="(i,y) of fotos" :key="y" >
                                <uploadImagen 
                                    rad="10"
                                    bcolor="azul1"
                                    bsize="1"
                                    :user="false" 
                                    v-model="i.imagen"
                                    :create="1"
                                    :imagen="i.imagen" />
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row w-100 m-0 py-4 justify-content-center">
                    <div class="col-12 px-4 pt-4 pb-4">
                        <botonApp tipo="azul" texto="Guardar" @click="save" radius="30px" />
                    </div>
                </div>
            </div>
        </div>
    </f7-page>
</template>
<style>
.sliderx {
  -webkit-appearance: none;
  width: 100%;
  height: 25px;
  background: black;
  outline: none;
  opacity: 0.7;
  border-radius: 10px;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.sliderx:hover {
  opacity: 1;
}

.sliderx::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}

.sliderx::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}

</style>
<script>
import { f7Page } from 'framework7-vue';
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                fotoUpdate: false,
                form:{
                    id: this.$store.getters.getSession.id,
                    foto: this.$store.getters.getSession.fotos_id,
                    nombre: this.$store.getters.getSession.nombre,
                    email: this.$store.getters.getSession.email,
                    telefono: this.$store.getters.getSession.telefono,
                    descripcion: this.$store.getters.getSession.descripcion,
                    fecha_nacimiento: this.$store.getters.getSession.fecha_nacimiento,
                    estado: this.$store.getters.getSession.estado,
                    fotos_edad: this.$store.getters.getSession.fotos_edad || 20,
                    fotos_edad_maximo: this.$store.getters.getSession.fotos_edad_maximo || 35,
                    fotos_hombres: this.$store.getters.getSession.fotos_hombres,
                    fotos_mujeres: this.$store.getters.getSession.fotos_mujeres,
                    fotos_horario: this.$store.getters.getSession.fotos_horario,
                },
                foto: this.$store.getters.getSession.foto,
                fotos: this.$store.getters.getSession.fotos,
                h:[
                    {id: 'matutino'},
                    {id: 'vespertino'},
                    {id: 'nocturno'},
                ],
            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            estados(){return this.$store.getters.getCatalogo('estados');},
        },
        methods:{
            setImg(img){
                this.fotoUpdate = true;
                this.form.foto = img;
            },
            save(){
                if(!this.form.nombre){
                    swal("No puedes dejar campos vacios", "","info");
                    return;
                }
                this.form.fotos = this.fotos;
                this.$store.dispatch('postEditCuenta', [this.form, this.fotoUpdate]);
            },
        }
    }
</script>