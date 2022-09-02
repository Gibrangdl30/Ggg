<template>
<div class="nav-bar-component template w-100 back-color-negro " :class="clase?clase:'pt-10px'" @click="sync">

    <template v-if="tipo=='logo'">
    <div class="row m-0 justify-content-space-between px-3px nav-bar nav-inicio back-color-negro" :class="`${no_border?'':'border-b-blanco0-1'}`">

        <div class="w-13 my-auto mr-auto">
           <div class="row w-100 m-0">
               <imagen :logo="1" />
           </div>
        </div>

         <div class="col text-center title p-0">
            <p class="m-0 letra-blanco-4-8vw my-auto" >{{title}}</p>
        </div>

        <div class="w-11 my-auto position-relative" @click="openRightMenu()" v-if="0" >
            <div class="row w-100 m-0 pt-1px  px-2px"> 
                <icono icono="menu" clase="letra-blanco3-35" />
            </div>
        </div>

    </div>
    </template>

    <template v-if="tipo=='inicio'">
    <div class="row m-0 justify-content-space-between px-3px nav-bar nav-inicio back-color-negro " :class="`${no_border?'':'border-b-blanco0-1'}`">

        <div class="w-13 boton-menu p-0" v-if="backs || emitBack" >
            <template v-if="backs">
                <button type="button" class="button button-outline button-raised button-active-blanco h-100 p-2px" @click="back()" >
                    <i class="f7-icons color-white letra-blanco-5-5vw">chevron_left</i>
                </button>
            </template>
            <template v-else-if="emitBack">
                <button type="button" class="button button-outline button-raised button-active-blanco h-100 p-2px" @click="$emit('back_click')">
                    <i class="f7-icons color-white letra-blanco-5-5vw">chevron_left</i>
                </button>
            </template>
        </div>
        <div class="w-21 boton-menu p-0" v-else-if="customBack" >
            <template >
                <button type="button" class="button button-outline button-raised button-active-blanco h-100 p-2px" @click="back()">
                    <div class="row w-100 m-0 letra-blanco-4-8vw ">Cancelar</div>
                </button>
            </template>
        </div>

        <div class="w-12 boton-menu p-0" v-if="fix==-1"></div>
       

        <div class="col text-center title p-0">
            <div class="w-40px mx-auto pb-10px" v-if="logo">
                <imagen :logo="2" :fit="true" />
            </div>
            <p class="m-0 letra-blanco-4-8vw my-auto" v-else >{{title}}</p>
        </div>


        <div class="w-12 boton-carrito h-100 position-relative" v-if="chat">
            <button type="button" class="button button-outline button-raised button-active-blanco h-100 p-2px" @click="router.navigate('/chats')" >
                <i class="material-icons letra-blanco-7-5vw" >chat</i>
            </button>
            <div class="w-14px h-14px back-color-rojo position-absolute right-0px top-0px border-radius-50" v-if="mensajeNuevo" ></div>
        </div>

        <div class="col-auto px-1 boton-carrito h-100 position-relative" v-if="profile" @click="router.navigate('/mi_cuenta')">
            <div class="w-45px h-45px">
                <imagen clase="border-radius-50" :fit="true" :perfil="true" />
            </div>
        </div>

        <div class="w-12 boton-carrito h-100"  v-if="fix==1"></div>

        <div class="w-12 boton-carrito h-100"  v-if="right">
            <button type="button" class="button button-outline button-raised button-active-blanco h-100 p-2px" @click="$emit('right')" v-if="icon">
                <imagen :icono="true" src="scan_blanco" v-if="!icon"/>
                <imagen clase="pr-4px" :icono="true" src="newC" formato="png" v-else-if="icon=='newC'"/>
                <i class="material-icons letra-azul1-40" v-else>{{icon}}</i>
            </button>
        </div>
    </div>
    </template>

    <template v-if="tipo=='menuRigth'">
    <div class="row m-0 justify-content-space-between px-3px nav-bar nav-inicio" :class="`${no_border?'':'border-b-blanco0-1'}`">
        <div class="w-12 boton-menu p-0" >
            <template v-if="backs">
                <button type="button" class="button button-outline button-raised button-active-blanco h-100 p-2px" @click="back()">
                    <i class="f7-icons color-white letra-blanco-5-5vw">chevron_left</i>
                </button>
            </template>
            <template v-else-if="emitBack">
                <button type="button" class="button button-outline button-raised button-active-blanco h-100 p-2px" @click="$emit('back_click')">
                    <i class="f7-icons color-white letra-blanco-5-5vw">chevron_left</i>
                </button>
            </template>
        </div>
        <div class="w-12 boton-carrito h-100" >
          
        </div>
        <div class="col text-center title p-0px pl-30px">
            <div class="w-80px mx-auto">
                <imagen :logo="true" />
            </div>
            <!-- <p class="m-0 letra-blanco-4-8vw my-auto">{{title}}</p> -->
        </div>
        <div class="w-12 boton-carrito h-100" @click="$store.dispatch('postGetCuentasSucursal');">
            <button type="button" class="button button-outline button-raised button-active-blanco h-100 p-2px">
                <i class="material-icons letra-verde3-7-5vw" >cached</i>
            </button>
        </div>
        <div class="w-12 boton-carrito h-100" @click="goTo('/notificaciones')">
            <button type="button" class="button button-outline button-raised button-active-blanco h-100 p-2px" >
                <i class="material-icons letra-amar2-7-5vw" >notifications</i>
            </button>
        </div>
        <div class="w-12 boton-carrito h-100" @click="openRightMenu()">
            <button type="button" class="button button-outline button-raised button-active-blanco h-100 p-2px" >
                <i class="material-icons letra-blanco-7-5vw" >menu</i>
            </button>
        </div>
    </div>
    </template>

    <template v-if="tipo=='menu'">        
    <div class="row m-0 justify-content-space-between px-3px nav-bar nav-inicio" :class="`${no_border?'':'border-b-blanco0-1'}`">
        <div class="w-12 boton-menu p-0" >
            <button type="button" class="button button-outline button-raised button-active-blanco h-100 p-2px" @click="openMenu()">
                <i class="f7-icons color-white letra-blanco-5-5vw">menu</i>
            </button>
        </div>
        <div class="col my-auto p-0">
            <div class="w-25 mx-auto" >
                <!-- <imagen :logo="true" /> -->
            </div> 
        </div>
        <div class="w-12 boton-menu p-0" @click="$store.dispatch('synchronizeDataCallback')">
            <button type="button" class="button button-outline button-raised button-active-blanco h-100 p-2px">
                <i class="material-icons color-white letra-blanco-7-5vw">cached</i>
            </button>
        </div>
    </div>
    </template>

    <template v-if="tipo=='chat'">        
    <div class="row w-100 m-0 justify-content-space-between px-3px nav-bar nav-inicio border-b-blanco0-1">
        <div class="col-2 boton-menu p-0" v-if="backs">
            <button type="button" class="button button-outline button-raised button-active-blanco h-100 p-2px" @click="back()">
                <i class="f7-icons color-white letra-blanco-5-5vw">chevron_left</i>
            </button>
        </div>

        <div class="col text-center title p-0">
            <p class="m-0 letra-blanco-4-1vw my-auto">{{title}}</p>
        </div>

        <!-- <div class="w-10 h-100" @click="$emit('call')">
            <div class="row w-100 h-100 m-0 py-14px px-2px ">
                <img class="w-100 h-100 object-fit-contain overflow-hidden" src="../../iconos/phone.svg">
            </div>
        </div> -->

        <div class="col-auto px-1 " v-if="borrar && 0">
            <div class="row w-9vw h-9vw m-0 mx-auto my-auto p-5px text-center" @click="$emit('toBlock')">
                <icono icono="close" clase="letra-blanco2-30" />
            </div>
        </div>

        <div class="col-auto px-1 " v-if="borrar">
            <div class="row w-9vw h-9vw m-0 mx-auto my-auto p-5px" @click="$emit('borrar')">
                <icono icono="delete" clase="letra-blanco2-30" />
            </div>
        </div>

        <div class="col-auto boton-carrito h-100 pl-1" v-if="usuario && usuario.foto">
            <div class="row w-12vw h-12vw m-0 mx-auto my-auto p-5px" @click="$emit('perfil')">
                <imagen clase="w-100 h-100 border-radius-50 " :user="true" :src="usuario.foto"  />
            </div>
        </div>
    </div>
    </template>


</div>
</template>
<script>
// import velocity from 'velocity-animate'
    export default {
        props: [
            'ios', 
            'tipo', 
            'clase', 
            'routerView',
            'title', 
            'fix', 
            'logo', 
            'texto', 
            'chat',
            'profile',
            'orientacion', 
            'backs', 
            'bloqueado',
            'emitBack', 
            'customBack', 
            'no_border', 
            'add',
            'right', 
            'icon',
            'show',
            'borrar',
            'imagen',
            'usuario',
            'mesa',
            'contactos',
        ],
        data()
        {
            return {
            }
        },
        computed:{
            router(){
                if(!this.routerView) return this.$store.getters.getRouter;
                else return this.routerView;
            },
            isUsuario(){return this.$store.getters.esUsuario;},
            cuenta(){return this.$store.getters.getCuenta;},
            mensajeNuevo(){return this.$store.getters.mensajeNuevo;},
        },
        methods:{
            back(){
                this.router.back();
            },
            goTo(ruta){
                this.router.navigate(ruta);
            },
            refresh(){
                this.$store.dispatch('synchronizeData');
                swal("","Información actulizada","success");
            },
            sync(){
                this.$store.dispatch('synchronizeData');
            },
            openMenu(){
                this.$store.dispatch('synchronizeData');
                this.$store.commit('openMenu');
            },
            openRightMenu(){
                this.$store.dispatch('synchronizeData');
                this.$store.commit('openMenuRight');
            }
        },
    }
</script>