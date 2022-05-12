//componentes genericos
import statusbar from './statusbar.vue';
import botonApp from './botonApp.vue';
import botonIcono from './botonIcono.vue';
import icono from './icono.vue';
import inputForm from './inputForm.vue';
import busquedaInput from './busquedaInput.vue';

import imagen from './imagen.vue';

import mapa from './mapa.vue';
import mapaPick from './mapaPick.vue';
import mapaPickLatLng from './mapaPickLatLng.vue';
import mapaRuta from './mapaRuta.vue';
import mapaTrazarRuta from './mapaTrazarRuta.vue';
import mapaUbicacion from './mapaUbicacion.vue';
import mapaLocalizador from './mapaLocalizador.vue';


import nav_bar from './nav-bar.vue';
import photoswipe from './photoswipe.vue';
import uploadImagen from './uploadImagen.vue';
import selectImagen from './selectImagen.vue';
import selectForm from './selectForm.vue';
import sliderHome from './sliderHome.vue';
import banners from './banners.vue';
import sliderFotos from './sliderFotos.vue';
import mensajeComponent from './mensajeComponent.vue';
import tabsIcon from './tabsIcon.vue';
import tabs from './tabs.vue';
import toggle from './toggle.vue';
import calendario from './calendario.vue';
import categorias from './categorias.vue';
import scollX from './scollX.vue';
import rating from './rating.vue';



function plugin(Vue) {
    Vue.component('statusbar', statusbar);
    Vue.component('botonApp', botonApp);
    Vue.component('botonIcono', botonIcono);
    Vue.component('icono', icono);
    Vue.component('inputForm', inputForm);
    Vue.component('busquedaInput', busquedaInput);
    Vue.component('imagen', imagen);
    Vue.component('mapa', mapa);
    Vue.component('mapaPick', mapaPick);
    Vue.component('mapaPickLatLng', mapaPickLatLng);
    Vue.component('mapaRuta', mapaRuta);
    Vue.component('mapaTrazarRuta', mapaTrazarRuta);
    Vue.component('mapaUbicacion', mapaUbicacion);
    Vue.component('mapaLocalizador', mapaLocalizador);
    Vue.component('nav-bar', nav_bar);
    Vue.component('tabs', tabs);
    Vue.component('tabsIcon', tabsIcon);
    Vue.component('toggle', toggle);
    Vue.component('banners', banners);
    Vue.component('selectImagen', selectImagen);
    Vue.component('uploadImagen', uploadImagen);
    Vue.component('selectForm', selectForm);
    Vue.component('sliderHome', sliderHome);
    Vue.component('photoswipe', photoswipe);
    Vue.component('sliderFotos', sliderFotos);
    Vue.component('mensajeComponent', mensajeComponent);
    Vue.component('calendario', calendario);
    Vue.component('categorias', categorias);
    Vue.component('scollX', scollX);
    Vue.component('rating', rating);
  
}

export default plugin
