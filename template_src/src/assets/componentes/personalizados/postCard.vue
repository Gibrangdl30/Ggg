<template>
<div class="row w-100 m-0 px-3">
    <modalMensajeStatic
        texto="¿Deeseas eliminar este post?"
        boton="Acept"
        v-if="open"
        @close="open=false"
        @click="eliminar"
    />

    <modalMensajeStatic
        texto="Si consideras esta publicación ofensiva o inadecuada puedes reportarla. ¿Deseas reportar esta publicación?"
        boton="Reportar"
        v-if="modal2"
        @close="modal2=false"
        @click="set"
    />

    <modalSerFotografo 
        :state="modal"
        @close="modal=false"
        :data="info"
    />

    <div class="row w-100 m-0 my-2 border-gray0-1 border-radius-10px overflow-hidden " :class="info.type == 's'?(info.papara.some(s=>s.usuarios_id == session.id))?'':'animate__animated animate__pulse animate__infinite':''"  @click="click()">
        <div class="row w-100 m-0 justify-content-center" :class="info.type == 's'?'app-degra ':''" >

            <div class="row w-100 m-0 h-50vh position-relative" v-if="info.imagen" >
                <imagen clase="" :create="true" :show="info.imagen" :src="info.imagen" />
                <div class="w-auto px-0 position-absolute top-5px right-5px z-index-10000000  " v-if="1" @click="modal2 = 1" >
                    <icono icono="info" clase="letra-gray3-30" />
                </div>
                <div class="w-auto px-0 position-absolute bottom-10px left-0px z-index-10000000  " v-if="session.id == info.para_id" >
                    <div class="row w-100 m-0">
                        <rating v-model="info.calificacion_foto" :notEmit="info.calificacion_foto" @input="cal" />
                    </div>
                </div>
            </div>
            
            <div class="row w-100 m-0 py-5px px-2 " >
                <div class="w-45px h-45px my-auto ">
                    <imagen clase="border-radius-50" :src="usuario.foto" :user="true" />
                </div>
                <div class="col px-0 pl-3" v-if="info.type == 's'" @click="modal=true">
                    <div class="row w-100 m-0 letra-blanco-17 fw-600" >! {{usuario.nombre}}, Necesita un pararatz ¡</div> 
                    <!-- <div class="row w-100 m-0 letra-blanco-17 fw-600" >{{usuario.nombre}}</div> -->
                    <div class="row w-100 m-0 letra-blanco-16">{{[info.creado, 'YYYY-MM-DD HH:mm:ss'] |  moment('from') }}</div>
                    <div class="row w-100 m-0 letra-blanco-16 pb-1" >{{info.descripcion}}</div>
                </div>
                <div class="col px-0 pl-3" v-if="info.type == 'f'">
                    <div class="row w-100 m-0 letra-gray4-17 fw-600" v-if="info.para_id == session.id">{{usuario.nombre}} te tomo una foto</div>
                    <div class="row w-100 m-0 letra-gray4-17 fw-600" v-else-if="info.para_id">{{usuario.nombre}} tomo una foto para {{para.nombre}}</div>
                    <div class="row w-100 m-0 letra-gray4-17 fw-600" v-else>{{usuario.nombre}} tomo una foto</div>
                    <div class="row w-100 m-0 letra-gray3-14">{{[info.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from') }}</div>
                </div>
                <div class="col-auto px-0 my-auto">
                    <div class="row w-100 m-0" >
                        <!-- <div class="col-auto my-auto px-0 pr-2 pt-5px " v-if="info.usuarios_id == session.id || info.para_id == session.id " @click="descargar(info.imagen)"> -->
                        <div class="col-auto my-auto px-0 pr-2 pt-5px " v-if=" info.para_id == session.id " @click="descargar(info.imagen)">
                            <icono icono="file_download" clase="letra-gray2-28" />
                        </div>
                        <!-- <div class="col-auto my-auto px-0 pr-2 pt-5px " v-else-if=" info.para_id == null " @click="descargar(info.imagen)">
                            <icono icono="file_download" clase="letra-gray2-28" />
                        </div> -->
                         <div class="col-auto my-auto px-0 pt-5px " v-if=" info.usuarios_id == session.id || info.para_id == session.id " @click="open=1" >
                            <icono icono="delete" clase="letra-gray2-22" />
                        </div>
                         <div class="col-auto my-auto pl-2 px-0 pt-5px " v-if="select" @click="$emit('check', info)" >
                            <icono icono="radio_button_checked" v-if="check" clase="letra-negro-28" />
                            <icono icono="radio_button_unchecked" v-else clase="letra-gray2-28" />
                        </div>

                        <!-- <div class="col-auto my-auto px-0 ml-auto pr-2 " v-if="!notComment" @click.stop="comentar()" >
                            <div class="w-26px">
                                <imagen :icono="true" src="ch1" />
                            </div>
                        </div> -->
                        <div class="col-auto my-auto px-1 pt-6px position-relative" v-if="0"  @click.stop="fav()">
                            <div class="w-26px pb-4px">
                                <imagen :icono="true" src="favrr" v-if="info.favorito" />
                                <imagen :icono="true" src="fav" v-else />
                            </div>
                            <!-- <icono icono="favorite" clase="letra-azul1-30" v-if="info.favorito" />
                            <icono icono="favorite_border" clase="letra-gray2-30" v-else /> -->

                            <div class="w-30px h-30px back-color-azul border-radius-50 position-absolute right--7px top--5px" v-if="0 && info.totalLikes">
                                <div class="row w-100 m-0 letra-blanco-19 pt-1px justify-content-center text-center fw-600 ">{{info.totalLikes}}</div>
                            </div>
                        </div>
                        <div class="col-auto my-auto px-0 pt-5px " v-if="0" >
                            <icono icono="more_vert" clase="letra-gray2-28" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="row w-100 m-0 py-2 px-3" v-if="info.lat && info.lng">
            <div class="row w-100 m-0 justify-content-start ">
                <div class="col-auto px-0 letra-gray3-18 pl-2">a</div>
                <div class="col-auto px-0 letra-gray4-18 fw-600 pl-2">{{info.metros}} </div>
                <div class="col-auto px-0 letra-gray3-18 pl-2">metros de ti</div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            open: false,
            modal: false,
            modal2: 0,
        };
    },
    props:[
        'data',
        'value',
        'select',
        'check',
        'notComment',
        'full',
        'tipo',
        'regalo',
    ],
    computed:{
        session(){return this.$store.getters.getSession;},
        router(){return this.$store.getters.getRouter;},
        info(){return this.data ||  {}},
        usuario(){return this.info.usuario ||  {}},
        para(){return this.info.para ||  {}},
    },
    methods:{
        click(){
            console.log("THIS", this.tipo);
        },

        comentar(){
            this.$store.commit('setPostState', ['post', this.info.id] );
            this.router.navigate('/post_comentarios');
        },

        fav(){
            if(this.info.favorito){
                this.info.favorito = false;
            }else{
                this.info.favorito = true;
            }
            this.$store.dispatch('postPostSaveFav',[this.info] );
        },

        set(){
            swal("","Post reported","success");
            this.$store.dispatch('userReportPost',[ this.info ]);
            this.value.push(this.info.id);
        },
        
        eliminar(){
            this.info.eliminar = 1;
            this.$store.dispatch('userPostBorrarPost',[ this.info ]);
        },

        cal(){
            this.info.cal = 1;
            this.$store.dispatch('userPostCrearPost',[ this.info ]);
        },
        descargar(i){
            this.$store.dispatch('userGetImg', [i])
        }
    },
}
</script>