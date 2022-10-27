import amigosRow from './amigosRow.vue';
import postCard from './postCard.vue';
import comenatarioRow from './comenatarioRow.vue';
import postPrivadosSlider from './postPrivadosSlider.vue';
import postRequestSlider from './postRequestSlider.vue';
import contactosRow from './contactosRow.vue';
import eventosComponent from './eventosComponent.vue';
import asientosComponent from './asientosComponent.vue';
import productoComponent from './productoComponent.vue';
import instalcionesComponent from './instalcionesComponent.vue';


function plugin(Vue) {
    Vue.component('amigosRow', amigosRow);
    Vue.component('postCard', postCard);
    Vue.component('comenatarioRow', comenatarioRow);
    Vue.component('postPrivadosSlider', postPrivadosSlider);
    Vue.component('postRequestSlider', postRequestSlider);
    Vue.component('contactosRow', contactosRow);
    Vue.component('eventosComponent', eventosComponent);
    Vue.component('asientosComponent', asientosComponent);
    Vue.component('productoComponent', productoComponent);
    Vue.component('instalcionesComponent', instalcionesComponent);
}
export default plugin
