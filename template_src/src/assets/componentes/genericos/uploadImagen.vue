<template>
<div class="w-100 h-100 position-relative">

    <div class="row w-100 m-0 py-1 " v-if="row" >
        <div class="row w-100 m-0 " @click="openCamera()" >

            <div class="row w-100 m-0 app-degra position-relative  " >

                <div class="w-30px h-30px back-color-blanco border-radius-50 position-absolute top-25 right-2 z-10000" @click.stop="$emit('borrar')">
                    <div class="row w-100 m-0">
                        <icono clase="letra-verde1-30" icono="close" />
                    </div>

                </div>
                
                <div class="w-16vw h-16vw position-absolute top-70 right-42 z-10000 "  >
                    <div class="h-100 w-100 border-radius-50 app-degra " >
                        <div class="row w-100 m-0 px-17px pt-16px ">
                            <imagen :icono="true" src="camx" />
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 position-relative z-10000000000 " >
                    <div class="row w-100 m-0 letra-blanco-18 justify-content-center text-center py-3">{{texto}}</div>
                </div>
            </div>
            
        </div>
    </div>

    <div class="h-100 w-100 border-radius-50 back-color-negro" v-else-if="custom" @click="takePicture()" >
        <div class="row w-100 m-0 px-17px pt-16px ">
            <imagen :icono="true" src="camx" />
        </div>
    </div>
    <div 
        v-else
        class="w-100 h-100 overflow-hidden position-relative" 
        :class="`${clase?clase:''} border-radius-${rad?rad:''} border-${bcolor?bcolor:''}-${bsize || '1'}`"
    >

        <imagen clase="object-fit url" :create="!url.includes('http')" :src="url" v-if="url" @click="takePicture()" />
        
        <imagen clase="object-fit url" :create="create" :src="imagenUrl" v-else-if="create && value" @click="takePicture()" />

        <imagen :class="(padding)?padding:'p-4'" :icono="true" src="user" v-else-if="user" @click="takePicture()" />

        <imagen :class="(padding)?padding:'p-4'" :icono="true" src="camb" v-else @click="takePicture()" />

    </div>

    <template v-if="!custom && !row">
        <button class="button boton-remove z-index-10000 bottom-10px" v-if="url"  @click="eliminar()">
            <div class="row w-100 m-0 justify-content-center">
                <icono icono="clear" clase="letra-azul1-30" />
            </div>
        </button>
    </template>

    <div class="w-45px h-45px position-absolute top--10px right--10px back-color-blanco border-radius-50 border-amar2-2 " v-if="crop && value"  @click="crops()">
        <div class="row w-100 m-0 pt-2px justify-content-center">
            <icono icono="crop" clase="letra-amar2-30" />
        </div>
    </div>

    <label class="row w-100 m-0 position-absolute top-15px left-0px opacity-0" v-if="emulador">
        <div class="row w-100 m-0">Input file</div>
        <div class="row w-100 m-0">
            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" @change="selectPictureWeb" />
        </div>
    </label>

</div>
</template>
<script>
export default {
    data(){
        return {
            id: _.uniqueId('updloadImg_'),
            url: null,
            imagen_id: null,
            modal: 'selectImagen',
            web: null,
        };
    },
    props:[    
        'value',
        'row',
        'texto',
        'custom',
        'onlyCam',
        'post',
        'clase',
        'rad',
        'bcolor',
        'bsize',
        'create',
        'crop',
        'user',
        'imagen',
        'padding',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},

        takePhoto(){return this.$store.getters.userStateObject('takePhoto');},
        emulador(){
            if(this.$store.getters.deviceready){
                return typeof device == 'undefined' || (device.platform == 'browser' || device.platform == null);
            }
            return true;
        },
        baseUrl(){ return this.$store.getters.baseUrl; },
        imagenUrl(){return `${this.baseUrl}img/render/${this.value}/500/500/foto.jpg`},
    },
    created() {
        if(this.imagen){
            this.url = this.imagen;
        }
    },
    mounted() {
        if(this.takePhoto){
            this.$store.commit('setUsD',[ 'takePhoto', false ]);
            this.$store.commit('commitFuncion',this.unploadFoto);
            this.$store.dispatch('getFotoFunction', [this.unploadFoto]);
        }
        console.log("UPLOAD IMG", this.value, this.imagen);
    },
    methods:{
        crops(){
            this.$emit('crop');
        },
        openCamera(){
            this.$store.commit('commitFuncion',this.unploadFoto);
            this.$store.dispatch('getFotoFunction', [ this.unploadFoto ]);
        },
        takePicture(i){
            if(this.onlyCam){
                this.$store.commit('setOnlyCam', 1);
            }
            else{
                this.$store.commit('setOnlyCam', 0);
            }
            this.$store.commit('commitFuncion',this.unploadFoto);
            this.$store.commit('openModal',[this.modal]);
        },
        selectPictureWeb(event){
            console.log("event", event.target.files[0], URL.createObjectURL(event.target.files[0]));
            this.web =  event.target.files[0];
            setTimeout(()=>{this.uploadFromWeb(this.web)},1000);
        },
        uploadFromWeb(foto){
            let payload = {}

            this.$store.dispatch('unploadWebImage',[ payload, foto, 'sync/saveimg']).then(
                res=>{
                    if(res.data){
                        this.url = res.data.url;
                        this.imagen_id = res.data.id;
                        this.$emit('input', this.imagen_id);
                        this.$emit('change', res.data.base);
                        this.$emit('end', this.imagen_id);
                        this.$emit('save', this.imagen_id);

                        this.$store.dispatch('synchronizeData');
                        if(this.row){
                            this.$store.commit('setUsuarioDataForm',['formPost', 'imagen', this.imagen_id]);
                            this.$store.commit('setUsuarioDataForm',['formPost', 'url', this.url]);
                            this.router.navigate('/crear_foto');
                        }
                        if(this.custom){
                            if(this.post){
                                this.$store.commit('setUsuarioDataForm',['formPost', 'imagen', this.imagen_id]);
                                this.$store.commit('setUsuarioDataForm',['formPost', 'url', this.url]);
                                this.router.navigate('/crear_post');
                            }
                        }
                    }
                },error=>{});
        },

        unploadFoto(img){
            let payload = {}

            this.$store.dispatch('saveImagen',[ img, payload ]).then(
                res=>{
                    this.url = res.data.url;
                    this.imagen_id = res.data.id;
                    this.$emit('input', this.imagen_id);
                    this.$emit('change', res.data.base);
                    this.$emit('save', this.imagen_id);
                    this.$emit('end', this.imagen_id);
                    this.$store.dispatch('synchronizeData');
                    if(this.row){
                        this.$store.commit('setUsuarioDataForm',['formPost', 'imagen', this.imagen_id]);
                        this.$store.commit('setUsuarioDataForm',['formPost', 'url', this.url]);
                        this.router.navigate('/crear_foto');
                    }
                    if(this.custom){
                        if(this.post){
                            this.$store.commit('setUsuarioDataForm',['formPost', 'imagen', this.imagen_id]);
                            this.$store.commit('setUsuarioDataForm',['formPost', 'url', this.url]);
                            this.router.navigate('/crear_post');
                        }
                    }
                },error=>{})
        },

        eliminar(){
            this.url = null;
            this.imagen_id = null;
            this.$emit('input', this.imagen_id);
        },
    },
}
</script>