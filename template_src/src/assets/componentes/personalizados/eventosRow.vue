<template>
<div class="row w-100 m-0" >
    <template v-if="fila">
        <div class="row w-100 m-0 border-b-gray0-1" @click="click()">
            <div class="row w-100 m-0 px-3 py-3">
                <div class="col-auto px-0">
                    <div class="row w-100 m-0 letra-gray4-18">{{[a.hora, 'HH:mm:ss' ] | moment("HH:mm")}}</div>
                </div>
                <div class="col-auto px-0">
                    <div class="row w-100 m-0 px-3 letra-blanco-18 border-radius-15px" :class="(invitacion && invitacion.id)?(invitacion.estatus == 'aceptado')?'back-color-verde':'back-color-rojo':'back-color-gray3'" >{{a.name}}</div>
                </div>
            </div>
        </div>
    </template>
    <template v-else >
        <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">

            <div class="row w-100 m-0"  v-if="externo">
                <div class="w-18vw h-18vw my-auto" v-if="x.imagen">
                    <imagen :fit="true" clase="border-radius-15px" :create="true" :src="x.imagen" />
                </div>
                <div class="w-18vw h-18vw my-auto" v-else >
                    <imagen :fit="true" clase="border-radius-15px" src="https://socialflow.app/backend/apiv1/imagenes/e1.jpg" />
                </div>
                <div class="col my-auto px-0 pl-3">
                <div class="row w-100 m-0 letra-azul1-17 text-capitalize">Invitacion {{x.type}}</div>
                <div class="row w-100 m-0 letra-gray4-16">{{x.nombre}}</div>
                <div class="row w-100 m-0 letra-gray4-16">{{a.usuario.nombre}} te invito.</div>
                <div class="row w-100 m-0 letra-gray3-15 text-capitalize" v-if="x.fecha">{{x.fecha | moment('DD [de] MMMM [del] YYYY')}}</div>
                <div class="row w-100 m-0 letra-gray3-15 text-capitalize" v-if="x.hora">{{[x.hora, 'HH:mm:ss'] | moment('HH:mm [hrs]')}}</div>
                </div>
                <!-- <div class="col-auto px-0">
                    <div class="row w-100 m-0">
                        <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" editar(a) ">
                            <icono icono="edit" clase="letra-azul1-20 pt-4px" />
                        </div>
                    </div>
                    <div class="row w-100 m-0 pt-2" >
                        <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" eliminar(a) ">
                            <icono icono="delete" clase="letra-azul1-20 pt-4px" />
                        </div>
                    </div>
                </div> -->
            </div>

            <div class="row w-100 m-0" @click="click()" v-else >
                <div class="w-18vw h-18vw my-auto" v-if="a.imagen">
                    <imagen :fit="true" clase="border-radius-15px" :create="true" :src="a.imagen" />
                </div>
                <div class="w-18vw h-18vw my-auto" v-else >
                    <imagen :fit="true" clase="border-radius-15px" src="https://socialflow.app/backend/apiv1/imagenes/e1.jpg" />
                </div>
                <div class="col my-auto px-0 pl-3">
                <div class="row w-100 m-0 letra-azul1-17 text-capitalize">{{a.type}}</div>
                <div class="row w-100 m-0 letra-gray4-16">{{a.nombre}}</div>
                <div class="row w-100 m-0 letra-gray3-15 text-capitalize" v-if="a.fecha">{{a.fecha | moment('DD [de] MMMM [del] YYYY')}}</div>
                <div class="row w-100 m-0 letra-gray3-15 text-capitalize" v-if="a.hora">{{[a.hora, 'HH:mm:ss'] | moment('HH:mm [hrs]')}}</div>
                </div>
                <!-- <div class="col-auto px-0">
                    <div class="row w-100 m-0">
                        <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" editar(a) ">
                            <icono icono="edit" clase="letra-azul1-20 pt-4px" />
                        </div>
                    </div>
                    <div class="row w-100 m-0 pt-2" >
                        <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" eliminar(a) ">
                            <icono icono="delete" clase="letra-azul1-20 pt-4px" />
                        </div>
                    </div>
                </div> -->
            </div>

            <div class="row w-100 m-0">
                <div class="col-auto letra-rojo1-15 ml-auto" v-if="!detalles" @click="detalles = true">Ver detalles</div>
                <div class="col-auto letra-rojo1-15 ml-auto" v-else  @click="detalles = false" >Ver menos</div>
            </div>
            <div class="row w-100 m-0 pb-3" v-if="detalles" >

                <div class="row w-100 m-0" v-if="a.lugar">
                    <div class="row w-100 m-0 letra-gray3-15">Lugar</div>
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 px-3 py-2">
                            <!-- <div class="w-10vw h-10vw">
                                <imagen clase="border-radius-50" src="https://socialflow.app/backend/apiv1/imagenes/e1.jpg" :fit="true" />
                            </div> -->
                            <div class="col my-auto px-0 pl-2">
                                <div class="row w-100 m-0 letra-gray4-18">{{a.lugar}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row w-100 m-0" v-if=" a.productos && a.productos.length ">
                    <div class="row w-100 m-0 letra-gray3-15">Productos</div>
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 px-3 py-2" v-for="u of a.productos" :key="u.id">
                            <div class="w-10vw h-10vw">
                                <imagen clase="border-radius-50" :src="u.imagen" :fit="true" />
                            </div>
                            <div class="col my-auto px-0 pl-2">
                                <div class="row w-100 m-0 letra-gray4-18">{{u.nombre}}</div>
                                <div class="row w-100 m-0 letra-gray3-16">{{u.email}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row w-100 m-0" v-if=" a.usuarios && a.usuarios.length ">
                    <div class="row w-100 m-0 letra-gray3-15">Usuarios</div>
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 px-1 py-1" v-for="u of a.usuarios" :key="u.id">
                            <div class="w-8vw h-8vw my-auto">
                                <imagen clase="border-radius-50" :src="u.usuario.foto" :fit="true" :user="true" />
                            </div>
                            <div class="col my-auto px-0 pl-2">
                                <div class="row w-100 m-0 letra-gray4-15">{{u.usuario.nombre}}</div>
                                <div class="row w-100 m-0 letra-gray3-13">{{u.usuario.email}}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </template>

</div>
</template>
<script>
export default {
    data(){
        return {
            detalles: false,
        };
    },
    props:[
       'ruta',
       'fila',
       'externo',
       'data',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        a(){ return this.data || {} },
        invitacion(){ return this.data.invitacion || {} },
        x(){ return this.a.evento || {} },
    },
    methods:{
        click(){
            this.$emit('click');
            this.$store.commit('setUsuarioData',['evento', this.a.id]);
            this.router.navigate(this.ruta);
        },
    },
}
</script>