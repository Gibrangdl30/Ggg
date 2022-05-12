<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Editar perfil'" :fix="1" />
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0">

                    <div class="row w-100 m-0 mt-3 px-3 justify-content-center">
                        <div class="col-auto px-0 text-center my-auto position-relative">
                            <div class="w-40vw h-40vw mx-auto" >
                                <uploadImagen 
                                rad="10"
                                bcolor="azul1"
                                bsize="3"
                                :user="false" 
                                v-model="form.foto" 
                                :imagen="foto" />
                            </div>
                        </div>
                    </div>

                    <div class="row w-100 m-0 py-3" v-if="0">
                        <div class="row w-100 m-0 px-2">
                            <div class="w-22vw h-22vw" v-for="(i,y) of fotos" :key="y" >
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

                    <div class="col-12 mt-3">
                        <inputForm type="text" texto="Nombre:" placeholder="" v-model="form.nombre" />
                    </div>
                     <div class="col-12 mt-4">
                        <inputForm :textarea="1" :rows="4" type="text" texto="Sobre ti:" placeholder="" v-model="form.descripcion" />
                    </div>

                    <div class="col-12 mt-4">
                        <div class="row w-100 m-0 letra-gray4-18 fw-600">Genero</div>
                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 pt-3 pb-1">
                                <div class="row w-100 m-0 text-center justify-content-start ">
                                    <div class="col px-0 my-auto letra-gray4-18 text-left ">Masculino</div>
                                    <div class="col-auto px-0 pl-3 pr-2 my-auto my-auto" >
                                        <toggle :icon="1" :auto="0" v-model="form.genero" :v="'masculino'" :f="'femenino'"  />
                                    </div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 pt-1 pb-1">
                                <div class="row w-100 m-0 text-center justify-content-start ">
                                    <div class="col px-0 my-auto letra-gray4-18 text-left ">Femenino</div>
                                    <div class="col-auto px-0 pl-3 pr-2 my-auto my-auto" >
                                        <toggle  :icon="1" :auto="0" v-model="form.genero" :v="'femenino'" :f="'masculino'"  />
                                    </div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 pt-1 pb-3">
                                <div class="row w-100 m-0 text-center justify-content-start ">
                                    <div class="col px-0 my-auto letra-gray4-18 text-left ">Prefiero no decirlo.</div>
                                    <div class="col-auto px-0 pl-3 pr-2 my-auto my-auto" >
                                        <toggle  :icon="1" :auto="0" v-model="form.genero" :v="'indefenido'" :f="'masculino'"  />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 mt-4">
                        <div class="row w-100 m-0 letra-gray4-18 fw-600">Rango de edad (años)</div>
                        <div class="row w-100 m-0 letra-gray3-16">Edad:</div>
                        <div class="row w-100 m-0 ">
                            <input class="w-100 sliderx"  type="range" min="18" max="99" v-model="form.edad" >
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col-auto px-0 letra-gray4-18">18</div>
                            <div class="col-auto px-0 mx-auto letra-gray4-22 fw-600">{{form.edad}}</div>
                            <div class="col-auto px-0 letra-gray4-18">99</div>
                        </div>
                    </div>


                    <div class="col-12 mt-4">
                        <div class="row w-100 m-0 letra-gray4-18 fw-600">¿Quién puede tomarme fotos?</div>
                        <div class="row w-100 m-0 pt-3">
                            <div class="row w-100 m-0 text-center justify-content-start ">
                                <div class="col px-0 my-auto letra-gray4-18 text-left ">Hombres</div>
                                <div class="col-auto px-0 pl-3 pr-2 my-auto my-auto" >
                                    <toggle :icon="1"  :auto="0" v-model="form.fotos_hombres" :v="'1'" :f="'0'"  />
                                </div>
                            </div>
                        </div>
                        <div class="row w-100 m-0 pt-2">
                            <div class="row w-100 m-0 text-center justify-content-start ">
                                <div class="col px-0 my-auto letra-gray4-18 text-left ">Mujeres</div>
                                <div class="col-auto px-0 pl-3 pr-2 my-auto my-auto" >
                                    <toggle :icon="1" :auto="0" v-model="form.fotos_mujeres" :v="'1'" :f="'0'"  />
                                </div>
                            </div>
                        </div>
                        <div class="row w-100 m-0 pt-2">
                            <div class="row w-100 m-0 text-center justify-content-start ">
                                <div class="col px-0 my-auto letra-gray4-18 text-left ">Indiferente</div>
                                <div class="col-auto px-0 pl-3 pr-2 my-auto my-auto" >
                                    <toggle :icon="1" :auto="0" v-model="form.fotos_indiferente" :v="'1'" :f="'0'"  />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 mt-4">
                        <div class="row w-100 m-0 letra-gray4-18 fw-600">¿Durante que horario te gusta que te tomen fotos?</div>
                        <div class="row w-100 m-0 pt-3 pb-3">
                            <div class="row w-100 m-0 text-center justify-content-start ">
                                <div class="col px-0 my-auto letra-gray4-18 text-left ">En todo momento</div>
                                <div class="col-auto px-0 pl-3 pr-2 my-auto my-auto" >
                                    <toggle :auto="0" v-model="form.fotos_horario" :v="'todo'" :f="'notodo'"  />
                                </div>
                            </div>
                        </div>
                        <div class="row w-100 m-0" v-if="form.fotos_horario != 'todo'">
                            <selectForm texto="Horario preferido" :opciones="h" nombre="id" v-model="form.fotos_horario" />
                        </div>
                    </div>

                    <div class="col-12 mt-4">
                        <div class="row w-100 m-0 letra-gray4-18 fw-600">Rango de edad (años)</div>
                        <div class="row w-100 m-0 letra-gray3-16">Minimo:</div>
                        <div class="row w-100 m-0 ">
                            <input class="w-100 sliderx"  type="range" min="18" max="99" v-model="form.fotos_edad" >
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col-auto px-0 letra-gray4-18">18</div>
                            <div class="col-auto px-0 mx-auto letra-gray4-22 fw-600">{{form.fotos_edad}}</div>
                            <div class="col-auto px-0 letra-gray4-18">99</div>
                        </div>
                        <div class="row w-100 m-0 letra-gray3-16">Maximo:</div>
                        <div class="row w-100 m-0 ">
                            <input class="w-100 sliderx"  type="range" min="18" max="99" v-model="form.fotos_edad_maximo" >
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col-auto px-0 letra-gray4-18">18</div>
                            <div class="col-auto px-0 mx-auto letra-gray4-22 fw-600">{{form.fotos_edad_maximo}}</div>
                            <div class="col-auto px-0 letra-gray4-18">99</div>
                        </div>
                    </div>
                    
                    <div class="col-12 p-0 mt-5" @click="router.navigate('/cambiar_password')">
                        <div class="row m-0 w-100 px-3 py-2 justify-content-between border-b-gray1-1 border-t-gray1-1 ">
                            <div class="col my-auto letra-gray-dark2-5-1vw p-0">Cambiar contraseña</div>
                            <div class="col-auto p-0">
                                <icono icono="chevron_right" clase="letra-gray3-30" />
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
                    genero: this.$store.getters.getSession.genero || 'femenino',
                    edad: this.$store.getters.getSession.edad,
                    fotos_edad: this.$store.getters.getSession.fotos_edad || 20,
                    fotos_edad_maximo: this.$store.getters.getSession.fotos_edad_maximo || 35,
                    fotos_hombres: this.$store.getters.getSession.fotos_hombres,
                    fotos_mujeres: this.$store.getters.getSession.fotos_mujeres,
                    fotos_indiferente: this.$store.getters.getSession.fotos_indiferente,
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