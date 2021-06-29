


import recoleccion from './recoleccion.vue';
import sliderTransporte from './sliderTransporte.vue';
import cardProducto from './cardProducto.vue';
import mapaUsuario from './mapaUsuario.vue';
import rowViaje from './rowViaje.vue';
import mapaChofer from './mapaChofer.vue';
import rowUsuario from './rowUsuario.vue';
import modalCalificar from './modalCalificar.vue';
import modalConfirmar from './modalConfirmar.vue';
import modalAvisar from './modalAvisar.vue';
import modalCambioDestino from './modalCambioDestino.vue';
import modalNuevoDestino from './modalNuevoDestino.vue';
import modalUsuario from './modalUsuario.vue';
import mensajeGrupal from './mensajeGrupal.vue';
import modalParty from './modalParty.vue';
import modalLista from './modalLista.vue';
import eventosRow from './eventosRow.vue';
import eventosFull from './eventosFull.vue';
import modalQr from './modalQr.vue';
import modalRegalo from './modalRegalo.vue';
import rowPaciente from './rowPaciente.vue';
import rowInfoPaciente from './rowInfoPaciente.vue';

function plugin(Vue) {
    // PERSONALIZADOS
    Vue.component('rowPaciente', rowPaciente);
    Vue.component('rowInfoPaciente', rowInfoPaciente);
    Vue.component('recoleccion', recoleccion);
    Vue.component('sliderTransporte', sliderTransporte);
    Vue.component('cardProducto', cardProducto);
    Vue.component('mapaUsuario', mapaUsuario);
    Vue.component('rowViaje', rowViaje);
    Vue.component('mapaChofer', mapaChofer);
    Vue.component('rowUsuario', rowUsuario);
    Vue.component('modalCalificar', modalCalificar);
    Vue.component('modalConfirmar', modalConfirmar);
    Vue.component('modalAvisar', modalAvisar);
    Vue.component('modalQr', modalQr);
    Vue.component('modalRegalo', modalRegalo);
    Vue.component('modalCambioDestino', modalCambioDestino);
    Vue.component('modalNuevoDestino', modalNuevoDestino);
    Vue.component('modalUsuario', modalUsuario);
    Vue.component('mensajeGrupal', mensajeGrupal);
    Vue.component('modalParty', modalParty);
    Vue.component('modalLista', modalLista);
    Vue.component('eventosRow', eventosRow);
    Vue.component('eventosFull', eventosFull);

}
export default plugin
