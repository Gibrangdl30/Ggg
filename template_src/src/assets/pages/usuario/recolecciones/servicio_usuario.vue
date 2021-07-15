<template>
    <f7-page class="">

        <modal-mensaje 
          	:texto="'¿Deseas cancelar la recolección de tus hijos?'"
         	:boton="'Aceptar'"
			@click="$store.dispatch('postCancelarUsuario')"
		/>
        <div class="vista">
            <nav-bar tipo="inicio" :backs="false" :title="`${tipo=='r'?'Recolección':'Ingreso'} en proceso`" :fix="1" />
            <div class="contenedor-page pb-0" v-if="servicio.estatus == 'creado'">

				<div class="row w-100 m-0 pt-4 justify-content-center" @click="$store.dispatch('synchronizeData')">
					<div class="col-6 px-2">
						<imagen :logo="true" />
					</div>
				</div>

				<div class="row w-100 m-0 pt-2 justify-content-center">
					<div class="lds-css ng-scope text-center"><div style="width:100%;height:100%" class="lds-ellipsis mx-auto"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div></div>
				</div>

				<div class="row w-100 m-0 pt-2 justify-content-center text-center">
					<div class="col-auto px-0 letra-gray4-22" v-if="tipo=='r'">Recolección</div>
					<div class="col-auto px-0 letra-gray4-22" v-if="tipo=='i'">Ingreso</div>
					<div class="col-auto px-0 pl-2 letra-verde-22">en proceso</div>
				</div>

				<div class="row w-100 m-0 pt-2 justify-content-center text-center" v-if="Number(servicio.tiempo_extra)">
					<div class="col-auto px-0 letra-gray4-18">Retraso reportado de </div>
					<div class="col-auto px-0 pl-2 letra-verde-18 fw-600">{{servicio.tiempo_extra}} minutos</div>
				</div>

					<div class="row w-100 m-0 pt-3 px-3">
					<div class="row w-100 m-0 letra-gray4-20">Hijos:</div>
						<div class="row w-100 m-0" v-for="h of usuarios" :key="h.id" @click="set(h)">
							<hijosRow 
								:data="h" 
							/>
						</div>
					</div>

          <div class="row w-100 m-0 justify-content-center pt-4 ">
              <div class="col-9 px-0" @click="$store.dispatch('servicioPostTreminarUsuario')" >
                <botonApp texto="Ya recolecte a mis hijos" tipo="verde" radius="30px" v-if="tipo=='r'" />
                <botonApp texto="Ya ingrese a mis hijos" tipo="verde" radius="30px" v-if="tipo=='i'" />
              </div>
          </div>
          <div class="row w-100 m-0 justify-content-center pt-4 ">
              <div class="col-9 px-0" @click="$store.commit('openModal',['modalMensaje'])" >
                <botonApp tipo="rojo" texto="Cancelar recoleccion" radius="30px" v-if="tipo=='r'" />
                <botonApp tipo="rojo" texto="Cancelar ingreso" radius="30px" v-if="tipo=='i'" />
              </div>
          </div>

				<div class="row w-100 m-0 py-5"></div>
            </div>
           
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment')
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            servicio(){return this.$store.getters.servicioObject('servicio');},
            tipo(){return this.servicio.tipo;},
            usuarios(){return this.servicio.usuarios;},
        },
        mounted(){
			console.log('tipos', this.servicio);
        },
        methods:{
            
        }
    }
</script>




<style>

 .lds-ellipsis {
    position: relative;
  }
  .lds-ellipsis > div {
    position: absolute;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
  }
  .lds-ellipsis div > div {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f00;
    position: absolute;
    top: 100px;
    left: 32px;
    -webkit-animation: lds-ellipsis 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    animation: lds-ellipsis 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
  }
  .lds-ellipsis div:nth-child(1) div {
    -webkit-animation: lds-ellipsis2 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    animation: lds-ellipsis2 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    background: #00c8a3;
  }
  .lds-ellipsis div:nth-child(2) div {
    -webkit-animation-delay: -0.65s;
    animation-delay: -0.65s;
    background: #00c8a3;
  }
  .lds-ellipsis div:nth-child(3) div {
    -webkit-animation-delay: -0.325s;
    animation-delay: -0.325s;
    background: #00c8a3;
  }
  .lds-ellipsis div:nth-child(4) div {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
    background: #00c8a3;
  }
  .lds-ellipsis div:nth-child(5) div {
    -webkit-animation: lds-ellipsis3 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    animation: lds-ellipsis3 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    background: #00c8a3;
  }
  .lds-ellipsis {
    width: 65px !important;
    height: 65px !important;
    -webkit-transform: translate(-32.5px, -32.5px) scale(0.325) translate(32.5px, 32.5px);
    transform: translate(-32.5px, -32.5px) scale(0.325) translate(32.5px, 32.5px);
  }

</style>