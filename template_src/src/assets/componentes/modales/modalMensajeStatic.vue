<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center px-1 z-100000000000"  @click.self="closeModal()">

        <div class="row w-100 m-0px mt-60px px-3" @click.self="closeModal()">
        <div class="row w-100 m-0px " @click.self="closeModal()">

            <div class="row w-100 m-0 mt-5 back-color-blanco pt-3 border-radius-15px overflow-hidden">

            <div class="row w-100 m-0 pb-3" v-if="texto=='puntos'">
                <div class="row w-100 m-0 px-0">
                    <div class="row w-100 m-0 pt-3 ">
                        <div class="col-4 px-0 mx-auto">
                            <imagen :logo="1" />
                        </div>
                    </div>
                    <div class="row w-100 m-0 px-3 py-2 letra-negro-18 fw-600 justify-content-center text-center ">Como ganar puntos</div>
                    <div class="row w-100 m-0 px-4 py-2 letra-gray3-16 justify-content-center text-center ">Tu registro te otorga 50 puntos</div>
                    <div class="row w-100 m-0 px-4 py-2 letra-gray3-16 justify-content-center text-center ">Al recomendar con tu código de referido, tu y tu amigo ganan 50 puntos cada uno.</div>
                    <div class="row w-100 m-0 px-4 py-2 letra-gray3-16 justify-content-center text-center ">Con cada foto tomes obtendras puntos</div>
                </div>
            </div>

            <div class="row w-100 m-0 pb-3" v-else-if="texto=='mensajeCreador'" >
                <div class="row w-100 m-0 px-0 pb-4">
                    <div class="row w-100 m-0 px-3 py-2 letra-negro-18 fw-600 justify-content-center text-center ">Contacta al creador</div>
                     <div class="row w-100 m-0" >
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Nombre:" placeholder="" v-model="form.name" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="email" texto="Correo:" placeholder="" v-model="form.email" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="tel" texto="Telefono:" placeholder="" v-model="form.phone" :maxlength="10" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm :textarea="1" type="text" texto="Mensaje:" rows="5"  placeholder=""  v-model="form.msg" />
                        </div>
                    </div>
                </div>
            </div> 
            <div class="row w-100 m-0 pb-3" v-else-if="texto=='calificar'" >
                <div class="row w-100 m-0 px-0">
                    <div class="row w-100 m-0 px-3 py-2 letra-negro-18 fw-600 justify-content-center text-center ">Calificar</div>
                     <div class="row w-100 m-0" >
                        <div class="col-12 mt-3">
                            <textarea type="text" rows="5" class="regular-textarea w-100 m-0" placeholder="Escribir calificación" @input="$emit('input',razon)" v-model="razon"></textarea>
                        </div>
                    </div>
                    <div class="row w-100 m-0 pt-3 ">
                        <div class="row w-100 m-0 justify-content-center ">
                            <rating v-model="cal"  />
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row w-100 m-0 pb-3" v-else-if="texto=='cliente'" >
                <div class="row w-100 m-0 px-0">
                    <div class="row w-100 m-0 px-3 py-2 letra-negro-18 fw-600 justify-content-center text-center ">Tu cuenta es de creador</div>
                    <div class="row w-100 m-0 px-3 py-2 letra-gray3-16        justify-content-center text-center ">Si deseas acceder a tu sesión de creador para administrar tus productos y pedidos entra aquí</div>
                </div>
            </div> 

            <div class="row w-100 m-0 pb-3" v-else-if="texto=='clienteUsuario'" >
                <div class="row w-100 m-0 px-0">
                    <!-- <div class="row w-100 m-0 px-3 py-2 letra-negro-18 fw-600 justify-content-center text-center ">Tu cuenta es de creador</div> -->
                    <div class="row w-100 m-0 px-3 py-2 letra-gray3-16        justify-content-center text-center ">En la app podras unicamente acceder a funciones de usuarios tipo cliente</div>
                </div>
            </div>

            <div class="row w-100 m-0 pb-3" v-else >
                <div class="row w-100 m-0 px-0">
                    <div class="row w-100 m-0" v-if="titulo">
                        <div class="row w-100 m-0 pb-4 letra-azul1-23 fw-600 justify-content-center">{{titulo}}</div>
                    </div>

                    <div class="row w-100 m-0 px-25px letra-gray3-18" v-if="texto">
                        <div class="col-11 px-0 mx-auto justify-content-center text-center  white-space-preline" v-if="texto">{{texto}}</div>
                    </div>

                    <div class="row w-100 m-0" v-if="info">
                        <div class="col-12 mt-3">
                            <p class="letra-gray-light-4-4vw m-0 mb-2">{{descripcion}}</p>
                            <textarea type="text" rows="5" class="regular-textarea w-100 m-0" placeholder="Descripción" @input="$emit('input',razon)" v-model="razon"></textarea>
                        </div>
                    </div>

                    <div class="row w-100 m-0" v-if="custom">
                        <slot></slot>
                    </div>

                </div>
            </div>

            <div class="row w-100 m-0 back-color-blanco pb-3 px-2">
                <div class="row w-100 m-0" v-if="oneButton">
                    <div class="col-12 px-2" @click="closeModal(); $emit('click', {cal, razon})">
                        <botonApp tipo="app" radius="35px" :texto="boton" />
                    </div>
                </div>
                <div class="row w-100 m-0" v-else-if="boton=='continuar'">
                    <div class="col-12 px-2 " @click="closeModal(); $emit('click2', {cal, razon})" >
                        <botonApp tipo="verde" texto="Continuar en la app" radius="30px" />
                    </div>

                    <div class="col-12 px-2 pt-3" @click="closeModal(); $emit('click', {cal, razon})" >
                        <botonApp tipo="app" radius="35px" texto="Ir al sistema de creadores" />
                    </div>
                </div>
                
                <div class="row w-100 m-0" v-else-if="cuenta">
                    <div class="col-6 pl-0 pr-2" @click="registro()">
                        <boton-app clase="back-color-blanco" :outline="true" texto="Crea una cuenta" radius="30px"></boton-app>
                    </div>
                    <div class="col-6 pl-2 pr-0" @click="logout()">
                        <boton-app texto="Inicia sesión" radius="30px"></boton-app>
                    </div>
                </div>

                <div class="row w-100 m-0" v-else-if="boton=='twooptions'" >
                    <div class="col-12 px-3" @click="$emit('set1'); closeModal();" >
                        <botonApp tipo="app" texto="Comunidad" radius="30px" />
                    </div>
                    <div class="col-12 px-3 pt-4 pb-3" @click="$emit('set2'); closeModal();">
                        <botonApp tipo="app" texto="Compartir resultado" radius="30px" />
                    </div>
                </div> 
                
                <div class="row w-100 m-0" v-else-if="boton=='tworeports'" >
                    <div v-if="!borrar" class="col-12 px-3 pb-3" @click="$emit('set2'); closeModal();">
                        <botonApp tipo="app" texto="Borrar post" radius="30px" />
                    </div>

                    <div class="col-12 px-3 pb-3" v-else  @click="$emit('set1'); closeModal();" >
                        <botonApp tipo="app" texto="Reportar post" radius="30px" />
                    </div>
                </div>

                <div class="row w-100 m-0" v-else-if="boton=='changestatus'" >
                    <div class="col-12 px-3" @click="$emit('set')">
                        <botonApp tipo="verde" texto="Discharge" radius="30px" />
                    </div>
                    <div class="col-12 px-3 pt-4 pb-3" @click="closeModal()">
                        <botonApp tipo="gris" texto="Cancel" radius="30px" />
                    </div>
                </div>
                <div class="row w-100 m-0" v-else-if="boton=='yes'">
                    <div class="col-6 px-1" @click="closeModal()">
                        <botonApp tipo="rojo" texto="NO" radius="30px" />
                    </div>
                    <div class="col-6 px-1" @click="click()">
                        <botonApp texto="Si" tipo="verde" radius="30px" />
                    </div>
                </div>
                <div class="row w-100 m-0" v-else>
                    <div class="col-4 px-1" @click="closeModal()">
                        <botonApp tipo="gris" texto="Cancelar" radius="30px" />
                    </div>
                    <div class="col-8 px-1" @click="click()">
                        <botonApp :texto="boton" tipo="app" radius="30px" />
                    </div>
                </div>
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
            name: 'modalMensaje',
            razon: '',
            cal: null,
            form:{
                name:     null,
                email:      null,
                phone:    null,
                msg:    null,
            }
        };
    },
    props: [
        'titulo',
        'texto',
        'texto2',
        'info',
        'descripcion',
        'boton',
        'borrar',
        'cuenta',
        'oneButton',
        'custom',
        'value',
    ],
    computed: {
    },
    methods:{
        closeModal(){
            this.$emit('close');
        },
        logout(){
            this.$store.commit('logout');
            this.closeModal();
        },
        registro(){
            this.$store.commit('logout');
            this.$store.getters.getRouterView('login').navigate('/registro');
            this.closeModal();
        },

        click(){
            this.$emit('click', this.form);
            this.closeModal();
        }
    },
}
</script>