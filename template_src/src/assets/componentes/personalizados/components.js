
import comunicadoRow from './comunicadoRow.vue';
import usuarioRow from './usuarioRow.vue';
import hijosRow from './hijosRow.vue';
import reportsRow from './reportsRow.vue';
import modalHijosRecoleccion from './modalHijosRecoleccion.vue';
import faltasRow from './faltasRow.vue';
import recoleccionRow from './recoleccionRow.vue';
import rutasRow from './rutasRow.vue';
import rondasRow from './rondasRow.vue';
import padreRow from './padreRow.vue';
import gradosRow from './gradosRow.vue';
import gruposRow from './gruposRow.vue';
import modalCoorRecoleccionHijos from './modalCoorRecoleccionHijos.vue';

import sliderTransporte from './sliderTransporte.vue';
import cardProducto from './cardProducto.vue';
import mapaUsuario from './mapaUsuario.vue';
import rowViaje from './rowViaje.vue';
import modalCalificar from './modalCalificar.vue';
import modalConfirmar from './modalConfirmar.vue';
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
    Vue.component('comunicadoRow', comunicadoRow);
    Vue.component('usuarioRow', usuarioRow);
    Vue.component('hijosRow', hijosRow);
    Vue.component('reportsRow', reportsRow);
    Vue.component('modalHijosRecoleccion', modalHijosRecoleccion);
    Vue.component('faltasRow', faltasRow);
    Vue.component('recoleccionRow', recoleccionRow);
    Vue.component('rutasRow', rutasRow);
    Vue.component('rondasRow', rondasRow);
    Vue.component('padreRow', padreRow);
    Vue.component('gradosRow', gradosRow);
    Vue.component('gruposRow', gruposRow);
    Vue.component('modalCoorRecoleccionHijos', modalCoorRecoleccionHijos);

    Vue.component('rowPaciente', rowPaciente);
    Vue.component('rowInfoPaciente', rowInfoPaciente);
    Vue.component('sliderTransporte', sliderTransporte);
    Vue.component('cardProducto', cardProducto);
    Vue.component('mapaUsuario', mapaUsuario);
    Vue.component('rowViaje', rowViaje);
    Vue.component('modalCalificar', modalCalificar);
    Vue.component('modalConfirmar', modalConfirmar);
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
