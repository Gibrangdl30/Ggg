<template>

    <!-- App -->
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

</template>
<script>

// Import Routes...
import { 
    f7App, 
    f7Panel, 
    f7View, 
    f7Statusbar 
} from 'framework7-vue';

import routes from './routes.js';

let theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

export default {
    components: {
      f7App,
      f7Panel,
      f7View,
      f7Statusbar,
    },
    data() {
        return {
            f7params: {
                theme,
                routes,
                id: 'io.framework7.testapp',
            }
        }
    }
}
</script>