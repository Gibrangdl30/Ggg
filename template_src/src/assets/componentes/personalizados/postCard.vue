<template>
    <div class="row w-100 m-0 " v-if="!reportado">

        <modalMensajeStatic
            v-if="show"
            boton="tworeports"
            :borrar="info.tipo == 'normal' && info.usuarios_id != session.id"
            @set1="repo()"
            @set2="bor()"
            @close="show = 0"
        />


        <template v-if="publicar" >
            <div class="row w-100 m-0 my-2 border-grayb-1 border-radius-5px overflow-hidden" @click="click()">
                <div class="row w-100 m-0 px-3 py-2">
                    <div class="row w-100 m-0 px-2 py-2 border-grayb-1 border-radius-5px ">
                        <div class="col-auto px-0">
                            <div class="w-13vw h-13vw">
                                <imagen clase="border-radius-50 " :src="session.foto" :create="true" :user="true" />
                            </div>
                        </div>
                        <div class="col px-0">
                            <div class="row w-100 m-0 position-relative">
                                <textarea type="type" :rows="5" class="w-100 pr-75px" placeholder="What's up?" v-model="form.post" :maxlength="300" ></textarea>
                                <div class="w-auto position-absolute bottom-0px right-0px">
                                    <div class="w-70px back-color-rojo border-radius-10px overflow-hidden ">
                                        <uploadImagen
                                            :custom="true" 
                                            v-model="form.foto"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 m-0 pt-2 " @click="postear()">
                        <botonApp texto="Post" tipo="naranja" radius="10px" py="py-7px" />
                    </div>
                </div>
            </div>
        </template>
    
        <template v-if="card">
            <div class="row w-100 m-0 px-3 my-2 border-radius-10px overflow-hidden" @click="click()">
                <div class="row w-100 m-0 justify-content-center">
                    
                    <div class="row w-100 m-0 py-5px px-2 " >
                        <div class="w-45px h-45px my-auto " @click.stop="verPerfil()">
                            <imagen clase="border-radius-50" :src="usuario.foto" :user="true" />
                        </div>
                        <div class="col my-auto px-0 pl-3"  @click.stop="verPerfil()">
                            <div class="row w-100 m-0 letra-gray4-17 fw-600">{{usuario.nombre}}</div>
                        </div>
                        <div class="col-auto px-0 my-auto">
                            <div class="row w-100 m-0 letra-rojo1-14">{{[info.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from') }}</div>
                        </div>
                    </div>
                    <div class="row w-100 m-0 px-2">
                        <div class="row w-100 m-0 py-2 letra-gray3-16">{{info.post}}</div>
                    </div>
                    <div class="row w-100 m-0 h-50vh position-relative" @click="comentar()">
    
                        <imagen clase="border-radius-5px" :create="true" :src="info.imagen" />
    
                        <div class="w-28 position-absolute bottom-0 left-0px back-color-blanco border-tr-radius-5px" v-if="0" >
                            <div class="row w-100 m-0 pl-2">
                                <div class="col my-auto px-0 ml-auto pr-2 text-center" @click="comentar()" >
                                    <div class="w-26px mx-auto ">
                                        <imagen :icono="true" src="ch1" />
                                    </div>
                                </div>
                                <div class="col my-auto px-1 pt-6px text-center position-relative"  @click.stop="fav()">
                                    <icono icono="favorite" clase="letra-rojo1-30" v-if="info.favorito" />
                                    <icono icono="favorite_border" clase="letra-gray2-30" v-else />
    
                                    <div class="w-30px h-30px back-color-azul border-radius-50 position-absolute right--7px top--5px" v-if="false && info.totalLikes">
                                        <div class="row w-100 m-0 letra-blanco-19 pt-1px justify-content-center text-center fw-600 ">{{info.totalLikes}}</div>
                                    </div>
                                </div>
                            </div>
    
                        </div>
    
                    </div>
                    <div class="row w-100 m-0">
                        <div class="w-28 back-color-blanco border-tr-radius-5px" >
                            <div class="row w-100 m-0 pl-2">
                                <div class="col my-auto px-0 ml-auto text-center" @click="comentar()" >
                                    <div class="w-26px mx-auto ">
                                        <imagen :icono="true" src="ch1" />
                                    </div>
                                </div>
                                <div class="col-auto px-0 letra-gray3-16 my-auto" v-if="info.comentarios.length" >{{info.comentarios.length}}</div>
    
                                <div class="col my-auto px-1 pl-2 pt-6px text-center position-relative"  @click.stop="fav()">
                                    <icono icono="favorite" clase="letra-rojo1-30" v-if="info.favorito" />
                                    <icono icono="favorite_border" clase="letra-gray2-30" v-else />
    
                                    <div class="w-30px h-30px back-color-azul border-radius-50 position-absolute right--7px top--5px" v-if="false && info.totalLikes">
                                        <div class="row w-100 m-0 letra-blanco-19 pt-1px justify-content-center text-center fw-600 ">{{info.totalLikes}}</div>
                                    </div>
                                </div>
                            </div>
    
                        </div>
                    </div>
    
                    <template v-if="last">
                        <div class="row w-100 m-0 pt-1 back-color-gray00" v-for="(c,x) of comentarios" :key="x" >
                            <comenatarioRow :data="c" />
                        </div>
                        <div class="row w-100 m-0 pb-4"></div>
                    </template>
                </div>
            </div>
        </template>

        <template v-if="row">

            <template v-if="info.tipo == 'resultado'">

            <div class="row w-100 m-0 px-3 my-2 border-radius-10px overflow-hidden" >

                <div class="row w-100 m-0 carta border-gray01-1 justify-content-center position-relative ">
                    
                    <div class="w-auto position-absolute top-10px right-10px">
                        <div class="row w-100 m-0" @click="show = 1" >
                            <icono icono="more_vert" clase="letra-gray4-30" />
                        </div>
                    </div>
                    
                    <div class="row w-100 m-0" >

                        <div class="row w-100 m-0 pt-2 letra-gray3-20 justify-content-center text-center ">Resultado</div>

                        <div class="row w-100 m-0 py-2 " >
                            <div class="col px-0" :class="`${info.ganador!='local'?'mt-auto':''}`">
                                <div v-if="info.ganador=='local'" class="row w-100 m-0 justify-content-center text-center letra-rojo-16 fw-600">Ganadores</div>
                                <div class="row w-100 m-0 justify-content-center ">
                                    <div class="col px-0">
                                        <div class="row w-100 m-0" >
                                            <div class="w-15vw h-15vw my-auto mx-auto" >
                                                <imagen :clase="`border-radius-50 ${info.ganador=='local'?'border-rojo-3':''}`" :src="usuario.foto" :user="true" />
                                            </div>
                                            <div class="row w-100 m-0"  >
                                                <div class="row w-100 m-0 pt-1 justify-content-center text-center letra-gray4-15 fw-600">{{usuario.nombre}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col px-0">
                                        <div class="row w-100 m-0" >
                                            <div class="w-15vw h-15vw my-auto mx-auto" >
                                                <imagen :clase="`border-radius-50 ${info.ganador=='local'?'border-rojo-3':''}`" :src="equipo.foto" :user="true" />
                                            </div>
                                            <div class="row w-100 m-0"  >
                                                <div class="row w-100 m-0 pt-1 justify-content-center text-center letra-gray4-15 fw-600">{{equipo.nombre}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-auto px-0 my-auto">
                                <div class="row w-100 m-0 letra-azul-20 fw-800 justify-content-center text-center ">VS</div>
                            </div>
                            
                            <div class="col px-0 " :class="`${info.ganador!='visitante'?'mt-auto mb-1':''}`">
                                <div v-if="info.ganador=='visitante'" class="row w-100 m-0 justify-content-center text-center letra-rojo-18 fw-600">Ganadores</div>
                                <div class="row w-100 m-0 justify-content-center ">
                                    <div class="col px-0">
                                        <div class="row w-100 m-0" >
                                            <div class="w-13vw h-13vw my-auto mx-auto" >
                                                <imagen :clase="`border-radius-50 ${info.ganador=='visitante'?'border-rojo-3':''}`" :src="usuario.foto" :user="true" />
                                            </div>
                                            <div class="row w-100 m-0 pt-1 justify-content-center text-center letra-gray4-15 fw-600">{{usuario.nombre}}</div>
                                        </div>
                                    </div>
                                    <div class="col px-0 mr-auto">
                                        <div class="row w-100 m-0" >
                                            <div class="w-13vw h-13vw my-auto mx-auto" >
                                                <imagen :clase="`border-radius-50 ${info.ganador=='visitante'?'border-rojo-3':''}`" :src="equipo.foto" :user="true" />
                                            </div>
                                            <div class="row w-100 m-0"  >
                                                <div class="row w-100 m-0 pt-1 justify-content-center text-center letra-gray4-15 fw-600">{{equipo.nombre}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="row w-100 m-0 px-3">
                            <div class="row w-100 m-0 justify-content-center">
                                <div v-for="(s, index) of sets" :key="s.id" class="col-auto px-0 letra-gray3-20">{{index!=0?',':''}} {{ s.local }}-{{s.visitante}}  </div>
                            </div>
                            <div class="row w-100 m-0 pt-1 pb-3 letra-gray3-17" v-if="info.post">{{info.post}}</div>
                        </div>

                      
                    </div>
    
                </div>

            </div>
        </template>

        <template v-else >
            <div class="row w-100 m-0 px-3 my-2 border-radius-10px overflow-hidden" >

                <div class="row w-100 m-0 carta border-gray01-1 justify-content-center position-relative ">

                    <div class="w-auto position-absolute top-10px right-10px z-10000000">
                        <div class="row w-100 m-0" @click="show = 1" >
                            <icono icono="more_vert" clase="letra-gray4-30" />
                        </div>
                    </div>

                    <div class="w-35vw h-35vw">
                        <imagen :show="1"  clase="border-radius-5px" :create="true" :src="info.imagen" />
                    </div>
                    <div class="col px-0 my-auto pl-3">

                        <div class="row w-100 m-0" >
                            <div class="w-39px h-39px my-auto " >
                                <imagen clase="border-radius-50" :src="usuario.foto" :user="true" />
                            </div>
                            <div class="col my-auto px-0 pl-2 "  >
                                <div class="row w-100 m-0 letra-gray4-17 fw-600">{{usuario.nombre}}</div>
                            </div>
                        </div>

                        <div class="row w-100 m-0 ">
                            <div class="row w-100 m-0 pt-1 letra-gray4-16">{{info.titulo}}</div>
                            <div class="row w-100 m-0 pt-1 letra-gray3-13 pr-2">{{info.post}}</div>
                            <div class="row w-100 m-0 pt-1 letra-rojo1-14">{{[info.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from') }}</div>
                        </div>

                        <template v-if="0" >
                            <div class="row w-100 m-0">
                                <div class="w-28 back-color-blanco border-tr-radius-5px" >
                                    <div class="row w-100 m-0 pl-2">
                                        <div class="col my-auto px-0 ml-auto text-center" @click="comentar()" >
                                            <div class="w-26px mx-auto ">
                                                <imagen :icono="true" src="ch1" />
                                            </div>
                                        </div>
                                        <div class="col-auto px-0 letra-gray3-16 my-auto" v-if="info.comentarios.length" >{{info.comentarios.length}}</div>
            
                                        <div class="col my-auto px-1 pl-2 pt-6px text-center position-relative"  @click.stop="fav()">
                                            <icono icono="favorite" clase="letra-rojo1-30" v-if="info.favorito" />
                                            <icono icono="favorite_border" clase="letra-gray2-30" v-else />
            
                                            <div class="w-30px h-30px back-color-azul border-radius-50 position-absolute right--7px top--5px" v-if="false && info.totalLikes">
                                                <div class="row w-100 m-0 letra-blanco-19 pt-1px justify-content-center text-center fw-600 ">{{info.totalLikes}}</div>
                                            </div>
                                        </div>
                                    </div>
            
                                </div>
                            </div>
                        </template>
                    </div>
    
                </div>

            </div>
        </template>
        </template>
    
    </div>
    </template>
    <script>
    export default {
        data(){
            return {
                show: 0,
                form:{
                    foto: null,
                    post: null,
                },
                reportado: 0,
                
            };
        },
        props:[
            'data',
            'card',
            'row',
            'publicar',
            'full',
            'last',
            'tipo',
            'regalo',
        ],
        computed:{
            session(){return this.$store.getters.getSession;},
            router(){return this.$store.getters.getRouter;},
            info(){return this.data || {}},
            usuario(){return this.info.usuario || {}},
            equipo(){return this.info.equipo || {}},
            rival1(){return this.info.rival1 || {}},
            rival2(){return this.info.rival2 || {}},
            sets(){return this.info.sets || []},

            comentarios(){return (this.info.comentarios || []).filter((s,x) => x == this.info.comentarios.length - 1)},
        },
        methods:{

            repo(){
                swal("","Post reportado","success");
                this.reportado = 1;
            },

            click(){
                console.log("THIS", this.tipo);
            },
    
            postear(){
                if(!this.form.foto || !this.form.post){
                    return;
                };
                let callback = ()=>{
                    this.form.foto = null;
                    this.form.post = null;
                };
                this.$store.dispatch('postPostCrearPost',[ this.form, callback ] );
            },
    
            comentar(){
                this.$store.commit('setPostState', ['post', this.info.id] );
                this.router.navigate('/post_comentarios');
            },
    
            fav(){
                this.$store.dispatch('postPostSaveFav',[this.info] );
            },
            bor(){
                this.$store.dispatch('postBorrarPost',[this.info] );
            },
    
            verPerfil(){
                console.log("USUARIO", this.usuario);
                if(this.usuario.id == this.session.id){
                    this.router.navigate('/mi_cuenta');
                }else{
                    this.$store.commit('setUsuarioData',['usuario', this.usuario.id]);
                    this.router.navigate('/usuario_detalle');
                }
            }
        },
    }
    </script>