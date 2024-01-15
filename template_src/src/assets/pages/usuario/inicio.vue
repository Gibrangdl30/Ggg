<template>
    <f7-page class="" id="inicio">

        <div class="vista">
            <nav-bar tipo="logo" clase="back-color-negro" :no_border="1" title="" :backs="false" :logo="false"
                :profile="true" />

            <div class="row w-100 m-0 px-3 py-2 back-color-negro" v-if="1">
                <busquedaBlack :close="1" :loader="0" holder="Buscar... " />
            </div>

            <div class="contenedor-page-tabs pb-2">
                <template v-if="!search_query">
                    <div class="row w-100 m-0 pb-2" v-if="top && top.length">
                        <div class="row w-100 m-0">
                            <banners :fotos="top" />
                        </div>
                    </div>
                </template>

                <template v-if="!search_query">
                    <div class="row w-100 m-0 py-2" v-if="categorias && categorias.length">
                        <div class="row w-100 m-0">
                            <categoriasSubs @input="input" :value="cat" :fotos="categorias" />
                        </div>
                    </div>
                </template>

                <!-- MAIN CONTENT -->
                <div class="row w-100 m-0 pt-2">
                    <!-- HOME PAGE COMPONENTS -->
                    <template v-if="!cat && !sub && !search_query">
                        <div class="row w-100 m-0 pl-3">
                            <div class="row w-100 m-0 letra-negro-19 fw-600">Productos populares </div>
                            <scollX cantidad="auto">
                                <div class="swiper-slide w-auto px-1 text-center" v-for="e of populares" :key="e.id">
                                    <div class="row w-100 m-0 py-2">
                                        <instalcionesComponent :carta="1" :data="e" />
                                    </div>
                                </div>
                            </scollX>
                        </div>

                        <div class="row w-100 m-0" v-if="left && left.length">
                            <div class="col-12 px-0" v-for="(a, s) of left" @click="ver(a)">
                                <div class="row w-100 m-0 pb-3">
                                    <div class="row w-100 m-0">
                                        <imagen :id="a.id" :src="a.imagen" />
                                    </div>
                                </div>
                                <template v-if="s == 0">
                                    <div class="row w-100 m-0 py-3">
                                        <div class="row w-100 m-0 px-3 letra-negro-19 fw-600">Promociones</div>
                                        <scollX cantidad="auto">
                                            <div class="swiper-slide w-auto px-1 text-center" v-for="e of promociones"
                                                :key="e.id">
                                                <div class="row w-100 m-0 py-2">
                                                    <!-- {{ e.id }} -->
                                                    <instalcionesComponent :carta="1" :data="e" />
                                                </div>
                                            </div>
                                        </scollX>
                                    </div>
                                </template>
                            </div>
                        </div>

                        <div class="row w-100 m-0 pl-3 pt-4">
                            <div class="row w-100 m-0 letra-negro-19 fw-600">No te puedes perder </div>
                            <scollX cantidad="auto">
                                <div class="swiper-slide w-auto px-1 text-center" v-for="e of perder" :key="e.id">
                                    <div class="row w-100 m-0 py-2">
                                        <instalcionesComponent :carta="1" :data="e" />
                                    </div>
                                </div>
                            </scollX>
                        </div>

                        <template>
                            <div class="row w-100 m-0 py-2" v-if="bottom && bottom.length">
                                <div class="col-12 px-0" v-for="a of bottom" @click="ver(a)">
                                    <div class="row w-100 m-0 pb-3">
                                        <div class="row w-100 m-0">
                                            <imagen :src="a.imagen" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                    </template>
                    <!-- END: HOME PAGE COMPONENTS -->

                    <!-- SEARCH RESULTS -->
                    <template v-else>
                        <ais-infinite-hits>
                            <template v-slot="{
                                items,
                                refinePrevious,
                                refineNext,
                                isLastPage,
                                sendEvent,
                            }">
                                <!-- <div>
                                    <button @click="refinePrevious">
                                    Show previous results
                                    </button>
                                </div> -->
                                
                                <!-- PRODUCT THUMBNAIL -->
                                <div class="row w-100 m-0 px-3 mb-3 to-eventos_zonas" v-for="item in items"
                                    :key="item.objectID">
                                    <div class="row w-100 m-0">
                                        <instalcionesComponent 
                                            :row="1" 
                                            :data="{...item, imagen: `https://mexicolimited.com${item.image}`}" 
                                        />
                                    </div>
                                </div>
                                <!-- END: PRODUCT THUMBNAIL -->

                                <!-- VIEW MORE BUTTON -->
                                <div class="row w-100 m-0 pb-1 pt-3">
                                    <div v-if="!isLastPage" class="row w-100 m-0">
                                        <div class="col-8 px-0 mx-auto">
                                            <botonApp @click="refineNext" texto="Ver más" tipo="azul" radius="30px" />
                                        </div>
                                    </div>
                                </div>
                                <!-- END: VIEW MORE BUTTON -->
                            </template>
                        </ais-infinite-hits>

                        <!--
                        <div class="row w-100 m-0 px-3 pt-4 to-eventos_zonas" v-for=" (e,x) of paginado" :key="e.id">
                            <div class="row w-100 m-0 py-2" >
                                <instalcionesComponent :row="1"  :data="e"  />
                            </div>

                            <template v-if="x==4 && 0">
                                <div class="row w-100 m-0 py-2" v-if="bottom && bottom.length">
                                    <div class="col-12 px-0" v-for="a of bottom" >
                                        <div class="row w-100 m-0 pb-3"  >
                                            <div class="row w-100 m-0">
                                                <imagen :src="a.imagen" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>-->
                    </template>
                    <!-- END: SEARCH RESULTS -->  
                </div>
                <!-- END: MAIN CONTENT -->
            </div>

            <!-- FIXED BOTTOM NAVIGATION -->
            <tabs />
            <!-- END: FIXED BOTTOM NAVIGATION -->
        </div>

    </f7-page>
</template>

<script>
import { f7Page } from 'framework7-vue';
const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
const moment = require('moment');

//
export default {
    components: {
        f7Page,
    },
    data() {
        return {
            ins: 0,
            b: null,
            modal: null,
            modal2: null,
            c: 25,
            add: 15,
            // populares:      this.$store.getters.info('popu'),
            // promociones:    this.$store.getters.info('promociones'),
            // perder:        this.$store.getters.info('perder'),

        }
    },
    computed: {
        router() { return this.$store.getters.getRouter; },
        session() { return this.$store.getters.getSession; },

        cat() { return this.$store.getters.catalogoGetObject('cat') || null; },
        cat() { return null; },
        sub() { return this.$store.getters.catalogoGetObject('sub') || null; },
        sub() { return null; },

        categorias() { return this.$store.getters.info('categorias') },

        banners() { return this.$store.getters.info('banners') },
        // top(){return this.banners.filter(s=>  s.device == '0' && s.section == '0')},
        top() { return this.banners.filter(s => s.top) },

        left() { return this.banners.filter(s => s.section == '1') },
        bottom() { return this.banners.filter(s => s.device == '0' && s.section == '2') },

        populares() { return this.$store.getters.info('popu') || this.$store.getters.info('productos').filter(w => w.populares == '1') },
        promociones() { return this.$store.getters.info('promociones') || this.$store.getters.info('productos').filter(w => w.promociones == '1') },
        perder() { return this.$store.getters.info('perder') || this.$store.getters.info('productos').filter(w => w.perder == '1') },

        // prods(){return this.$store.getters.info('productos').filter(w=>w.outstanding == '0' && w.outstandingtwo == '0')},
        prods() { return this.$store.getters.info('productos') },

        byCats() {
            if (this.b) {
                // return this.prods.filter(w =>  this.buscar(w) );
                return this.prods.sort((a, b) => { return this.buscar(b) - this.buscar(a) });
            }
            return this.prods.filter((s, x) => x < 11);

            if (this.sub) {
                return this.prods.filter(s => s.subcat.some(c => c.id == this.sub));
            }
            if (this.cat) {
                return this.prods.filter(s => s.categorias.some(c => c.id == this.cat));
            }
            return this.prods;
        },

        instalciones() {
            if (this.b) {
                // return this.byCats.sort( (a, b) => { return this.buscar(b) - this.buscar(a) });
                return this.byCats.filter((x, y) => y <= this.c);
            }
            return this.byCats.filter((x, y) => y <= this.c);
        },

        paginado() {
            // return this.instalciones.filter((x,y) => {return y <= this.c});
            return this.instalciones;
        },

        search_query() {
            let query = this.$store.getters.getSearchQuery;
            query = !query || query.length < 1 || '' ? null : query;
            return query
        }
    },

    mounted() {
        this.$store.dispatch('initData', [this.$f7]);
        setTimeout(() => {
            this.$store.commit('closeModal', ['loader', 1]);
        }, 1000 * 3);
        // console.log("Promos", this.promociones);
    },

    methods: {
        go(ruta) {
            this.router.navigate(ruta);
        },

        input([id, x]) {
            this.$store.commit('updateCatalogosState', ['cat', id]);
            this.$store.commit('updateCatalogosState', ['sub', x]);
        },

        buscar(w) {
            // console.log("WORD", this.b, ( w.name.toLowerCase().split('').map( letra => acentos[letra] || letra).join('').toString() ),  ( w.name.toLowerCase().split('').map( letra => acentos[letra] || letra).join('').toString() ).includes( " "+this.b.toLowerCase()+" " ) );
            if ((w.name.toLowerCase().split('').map(letra => acentos[letra] || letra).join('').toString()).includes(" " + this.b.toLowerCase() + " ")) {
                return 4;
            }
            if ((w.name.toLowerCase().split('').map(letra => acentos[letra] || letra).join('').toString()).includes(this.b.toLowerCase())) {
                return 3;
            }
            if (((w.brand || '').split('').map(letra => acentos[letra] || letra).join('').toString()).toLowerCase().includes(this.b.toLowerCase())) {
                return 2;
            }
            if (((w.sku || '').split('').map(letra => acentos[letra] || letra).join('').toString()).toLowerCase().includes(this.b.toLowerCase())) {
                return 1;
            }
            return 0;
        },

        back(ruta) {
            this.router.back(ruta);
        },

        ver(a) {
            if (a.url) {
                let x = a.url.split('-');
                // console.log("x",x);
                x = x[x.length - 1];
                // console.log("x2",x);
                if (x) {
                    if (a.url.includes('categoria')) {
                        this.$store.commit('updateCatalogosState', ['cat', x]);
                        this.$store.commit('updateCatalogosState', ['sub', null]);
                        this.router.navigate('/subcategoria_productos');
                    }
                    if (a.url.includes('producto')) {
                        this.$store.commit('setCarritosState', ['prod', { id: x }]);
                        this.router.navigate('/producto');
                    }
                }
            }
        },

        cancelar() {
            let form = this.asignado;
            form.cancelar = 1;
            this.$store.dispatch('userPostCrearPost', [form]);
            form.cancelar = 0;
        },

        reco(tipo = 1) {
            this.$store.commit('setUsD', ['tipo', tipo]);
            this.$store.commit('openModal', ['modalHijosRecoleccion']);
        },
    }
}
</script>