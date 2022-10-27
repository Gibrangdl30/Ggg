<template>
<div class="row m-0 w-100 pt-8px pb-10px justify-content-space-between border-t-blanco-1 back-color-blanco " >
    <div class="row w-100 m-0 pb-11px">

        <div class="row w-100 m-0" v-if="user">

            <div class="col p-0 h-100" @click="goTo('/inicio')">
                <div class="row w-100 m-0 position-absolute left-0px top--6px z-10 justify-content-center" v-if="circle">
                    <div class="w-60px h-60px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible==1"></div>
                </div>
                <div class="row w-100 m-0 position-relative z-200">
                    <div class="row w-100 m-0 justify-content-center">
                        <icono icono="home" :clase="(tabVisible==1)?'letra-rojo3-30' :'letra-gray3-30'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible==1)?'letra-rojo3-2-6vw' :'letra-gray3-2-6vw'" class="row w-100 m-0  m-0 text-center justify-content-center w-100"  >Inicio</div>
                    </div>
                </div>
            </div>

            <div v-if="1" class="col p-0 h-100" @click="goTo('/compras')">
                <div class="row w-100 m-0 position-absolute left-0px top--6px z-10 justify-content-center" v-if="circle">
                    <div class="w-60px h-60px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible==2"></div>
                </div>
                <div class="row w-100 m-0 position-relative z-200">
                    <div class="row w-100 m-0 justify-content-center">
                        <icono icono="store" :clase="(tabVisible==2)?'letra-rojo3-30' :'letra-gray3-30'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible==2)?'letra-rojo3-2-6vw' :'letra-gray3-2-6vw'" class="row w-100 m-0  m-0 text-center justify-content-center w-100"  >Tienda</div>
                    </div>
                </div>
            </div>
            
            <div v-if="1" class="col p-0 h-100" @click="goTo('/posts')">
                <div class="row w-100 m-0 position-absolute left-0px top--6px z-10 justify-content-center" v-if="circle">
                    <div class="w-60px h-60px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible==3"></div>
                </div>
                <div class="row w-100 m-0 position-relative z-200">
                    <div class="row w-100 m-0 justify-content-center">
                        <icono icono="people" :clase="(tabVisible==3)?'letra-rojo3-30' :'letra-gray3-30'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible==3)?'letra-rojo3-2-6vw' :'letra-gray3-2-6vw'" class="row w-100 m-0  m-0 text-center justify-content-center w-100"  >Comunidad</div>
                    </div>
                </div>
            </div>

            <div class="col p-0 h-100" @click="goTo('/mi_cuenta')">
                <div class="row w-100 m-0 position-absolute left-0px top--6px z-10 justify-content-center" v-if="circle">
                    <div class="w-60px h-60px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible==5"></div>
                </div>
                
                <div class="row w-100 m-0 position-relative z-200">
                    <div class="row w-100 m-0 justify-content-center">
                        <icono icono="person_outline" :clase="(tabVisible==5)?'letra-rojo3-30' :'letra-gray3-30'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible==5)?'letra-rojo3-2-6vw' :'letra-gray3-2-6vw'" class="row w-100 m-0 text-capitalize text-center justify-content-center w-100" >Perfil</div>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="row w-100 m-0" v-if="coor">
            <div class="col p-0 h-100" @click="goTo('/inicio_coor')">
                <div class="row w-100 m-0 position-absolute left-0px top--6px z-10 justify-content-center" v-if="circle">
                    <div class="w-60px h-60px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible==1"></div>
                </div>

                <div class="row w-100 m-0 position-relative z-200">
                    <div class="row w-100 m-0 justify-content-center">
                        <icono icono="sync_alt" :clase="(tabVisible==1)?'letra-rojo3-30' :'letra-gray3-30'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible==1)?'letra-rojo3-2-6vw' :'letra-gray3-2-6vw'" class="row w-100 m-0 text-capitalize text-center justify-content-center w-100" >Entradas y salidas</div>
                    </div>
                </div>
            </div>

            <div class="col p-0 h-100" @click="goTo('/grados_coor')">
                <div class="row w-100 m-0 position-absolute left-0px top--6px z-10 justify-content-center" v-if="circle">
                    <div class="w-60px h-60px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible==2"></div>
                </div>

                <div class="row w-100 m-0 position-relative z-200">
                    <div class="row w-100 m-0 justify-content-center">
                        <icono icono="edit" :clase="(tabVisible==2)?'letra-rojo3-30' :'letra-gray3-30'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible==2)?'letra-rojo3-2-6vw' :'letra-gray3-2-6vw'" class="row w-100 m-0 text-capitalize text-center justify-content-center w-100" >Alumnos</div>
                    </div>
                </div>
            </div>

            <div class="col p-0 h-100" @click="goTo('/mi_cuenta')">
                <div class="row w-100 m-0 position-absolute left-0px top--6px z-10 justify-content-center" v-if="circle">
                    <div class="w-60px h-60px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible==5"></div>
                </div>
                
                <div class="row w-100 m-0 position-relative z-200">
                    <div class="row w-100 m-0 justify-content-center">
                        <icono icono="person_outline" :clase="(tabVisible==5)?'letra-rojo3-30' :'letra-gray3-30'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible==5)?'letra-rojo3-2-6vw' :'letra-gray3-2-6vw'" class="row w-100 m-0 text-capitalize text-center justify-content-center w-100" >Mi Cuenta</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row w-100 m-0" v-if="maestro">
            <div class="col p-0 h-100" @click="goTo('/inicio_maestro')">
                <div class="row w-100 m-0 position-absolute left-0px top--6px z-10 justify-content-center" v-if="circle">
                    <div class="w-60px h-60px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible==1"></div>
                </div>
                <div class="row w-100 m-0 position-relative z-200">
                    <div class="row w-100 m-0 justify-content-center">
                        <icono icono="home" :clase="(tabVisible==1)?'letra-rojo3-30' :'letra-gray3-30'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible==1)?'letra-rojo3-2-6vw' :'letra-gray3-2-6vw'" class="row w-100 m-0  m-0 text-center justify-content-center w-100"  >Inicio</div>
                    </div>
                </div>
            </div>


            <div class="col p-0 h-100" @click="goTo('/grupos_maestro')">
                <div class="row w-100 m-0 position-absolute left-0px top--6px z-10 justify-content-center" v-if="circle">
                    <div class="w-60px h-60px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible==2"></div>
                </div>

                <div class="row w-100 m-0 position-relative z-200">
                    <div class="row w-100 m-0 justify-content-center">
                        <icono icono="edit" :clase="(tabVisible==2)?'letra-rojo3-30' :'letra-gray3-30'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible==2)?'letra-rojo3-2-6vw' :'letra-gray3-2-6vw'" class="row w-100 m-0 text-capitalize text-center justify-content-center w-100" >Alumnos</div>
                    </div>
                </div>
            </div>

            <div class="col p-0 h-100" @click="goTo('/chats')">
                <div class="row w-100 m-0 position-absolute left-0px top--6px z-10 justify-content-center" v-if="circle">
                    <div class="w-60px h-60px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible==3"></div>
                </div>

                <div class="row w-100 m-0 position-relative z-200">
                    <div class="row w-100 m-0 justify-content-center">
                        <icono icono="chat_bubble_outline" :clase="(tabVisible==3)?'letra-rojo3-30' :'letra-gray3-30'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible==3)?'letra-rojo3-2-6vw' :'letra-gray3-2-6vw'" class="row w-100 m-0 text-capitalize text-center justify-content-center w-100"  >Inbox</div>
                    </div>
                </div>
            </div>

            <div class="col p-0 h-100" @click="goTo('/mi_cuenta')">
                <div class="row w-100 m-0 position-absolute left-0px top--6px z-10 justify-content-center" v-if="circle">
                    <div class="w-60px h-60px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible==5"></div>
                </div>
                
                <div class="row w-100 m-0 position-relative z-200">
                    <div class="row w-100 m-0 justify-content-center">
                        <icono icono="person_outline" :clase="(tabVisible==5)?'letra-rojo3-30' :'letra-gray3-30'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible==5)?'letra-rojo3-2-6vw' :'letra-gray3-2-6vw'" class="row w-100 m-0 text-capitalize text-center justify-content-center w-100" >Mi Cuenta</div>
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
            active: 1,
            circle: false,
            onlyIcon: false,
        }
    },
    props: [
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},
        user(){return this.$store.getters.user || !this.session.token;},
        coor(){return this.$store.getters.coor;},
        maestro(){return this.$store.getters.maestro;},

        rutaVisible(){
            switch(this.$store.getters.getRuta.url){
                case '/mensajes_chat': return false;
                default: return true;
            }
        },
        tabVisible(){
            switch(this.$store.getters.getRuta.url){
                case '/inicio': 
                case '/inicio_coor': 
                case '/pedidos_repa': 
                    this.active = 1;
                    break;
                case '/eventos': 
                case '/compras': 
                    this.active = 2;
                    break;
                case '/chats': 
                case '/comunicados': 
                case '/posts': 
                    this.active = 3;
                    break;
                case '/rutas': 
                case '/consumos': 
                    this.active = 4;
                    break;
                case '/mi_cuenta': 
                    this.active = 5;
                    break;
            }
            return this.active;
        }

    },
    created(){
        // console.log("UISER", this.user);
    },
    methods:{
        goTo(ruta){
            if(ruta == '/chats' || ruta == '/mi_cuenta'){
                if(!this.session.token){
                    this.$store.commit('openModal',['modalSession']);
                    return;
                }
            }
            this.router.navigate(ruta, {reloadCurrent: true});
            this.$store.dispatch('synchronizeData');
        },
    },
    }
</script>