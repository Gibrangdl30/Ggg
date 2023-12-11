import menuModal from './menuModal.vue';
import modalSearchDireccion from './modalSearchDireccion.vue';
import modalPickRangoFecha from './modalPickRangoFecha.vue';
import modalPickFecha from './modalPickFecha.vue';
import modalNotificacion from './modalNotificacion.vue';
import modal_loader from './modal_loader.vue';
import modalProcesando from './modalProcesando.vue';
import modalMensaje from './modalMensaje.vue';
import globalMsn from './globalMsn.vue';
import modalSession from './modalSession.vue';
import modalCalificar from './modalCalificar.vue';
import modalMensajeStatic from './modalMensajeStatic.vue';
import modalQr from './modalQr.vue';
import modalUsuario from './modalUsuario.vue';
import modalSerFotografo from './modalSerFotografo.vue';
import modalSeleccionarEnvios from './modalSeleccionarEnvios.vue';


function plugin(Vue) {
    Vue.component('menuModal', menuModal);
    Vue.component('globalMsn', globalMsn);
    Vue.component('modal-loader', modal_loader);
    Vue.component('modalProcesando', modalProcesando);
    Vue.component('modalCalificar', modalCalificar);
    Vue.component('modalMensajeStatic', modalMensajeStatic);
    Vue.component('modalMensaje', modalMensaje);
    Vue.component('modalSession', modalSession);
    Vue.component('modalNotificacion', modalNotificacion);
    Vue.component('modalSearchDireccion', modalSearchDireccion);
    Vue.component('modalPickFecha', modalPickFecha);
    Vue.component('modalPickRangoFecha', modalPickRangoFecha);
    Vue.component('modalQr', modalQr);
    Vue.component('modalUsuario', modalUsuario);
    Vue.component('modalSerFotografo', modalSerFotografo);
    Vue.component('modalSeleccionarEnvios', modalSeleccionarEnvios);
}
export default plugin
