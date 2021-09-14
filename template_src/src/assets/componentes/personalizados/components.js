import amigosRow from './amigosRow.vue';
import postCard from './postCard.vue';
import comenatarioRow from './comenatarioRow.vue';
import postPrivadosSlider from './postPrivadosSlider.vue';
import postRequestSlider from './postRequestSlider.vue';
import contactosRow from './contactosRow.vue';


function plugin(Vue) {
    Vue.component('amigosRow', amigosRow);
    Vue.component('postCard', postCard);
    Vue.component('comenatarioRow', comenatarioRow);
    Vue.component('postPrivadosSlider', postPrivadosSlider);
    Vue.component('postRequestSlider', postRequestSlider);
    Vue.component('contactosRow', contactosRow);
}
export default plugin
