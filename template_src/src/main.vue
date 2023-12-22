<template>
    <!-- App -->
    <ais-instant-search :search-client="searchClient" index-name="products">
        <f7-app :params="f7params">
            <f7-panel left cover>
                <f7-view class="left-view" url="/menu" :main="true" name="menu" id="menu" :iosSwipeBack="false" />
            </f7-panel>

            <f7-panel right cover>
                <f7-view class="back-color-rojo" url="/menu" tabActive :main="true" :iosSwipeBack="false" name="por_ordenar" id="por_ordenar"></f7-view>
            </f7-panel>

            
                <f7-view url="/views" :main="true" :iosSwipeBack="false" class="ios-edges"></f7-view>
            

            <!-- <modalCalificar /> -->
            <menuModal />
            <modalNotificacion />
            <globalMsn />
            <modalSession />
            <selectImagen />
            <photoswipe />
            <modal-loader />
        </f7-app>
    </ais-instant-search>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/algolia-min.css';
import { 
    f7App, 
    f7Panel, 
    f7View, 
    f7Statusbar 
} from 'framework7-vue';


// Import Routes
import routes from './routes.js';

//
let theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Algolia configuration
const searchClient = algoliasearch(
    "YQ73Q1UV03",
    "b0ebda9bda7d1ddf47211de6759dd800"
);

//
export default {
    components: {
      f7App,
      f7Panel,
      f7View,
      f7Statusbar,
    },
    data() {
        return {
            searchClient,
            f7params: {
                theme,
                routes,
                id: 'io.framework7.testapp',
            }
        }
    }
}
</script>