<template>
<div class="w-100 h-100 position-relative">
    <div class="h-100 w-100 border-radius-50 app-degra" v-if="custom" @click="takePicture()" >
        <div class="row w-100 m-0 px-3 pt-14px ">
            <imagen :icono="true" src="camx" />
        </div>
    </div>
    <div 
        v-else
        class="w-100 h-100 overflow-hidden position-relative" 
        :class="`${clase?clase:''} border-radius-${rad?rad:''} border-${bcolor?bcolor:''}-${bsize || '1'}`"
    >

        <imagen clase="object-fit url" :src="url" v-if="url" @click="takePicture()" />
        
        <imagen clase="object-fit url" :src="imagenUrl" v-else-if="create && value" @click="takePicture()" />

        <imagen :class="(padding)?padding:'p-4'" :icono="true" src="user" v-else-if="user" @click="takePicture()" />

        <imagen :class="(padding)?padding:'p-4'" :icono="true" src="camx" v-else @click="takePicture()" />

    </div>

    <template v-if="!custom">
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
            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" @change="selectPictureWeb">
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
        'custom',
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
        takePhoto(){return this.$store.getters.userStateObject('takePhoto');},
        emulador(){
            if(this.$store.getters.deviceready){
                return device.platform == 'browser' || device.platform == null;
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
        takePicture(i){
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
                        this.$emit('save', this.imagen_id);
                        this.$store.dispatch('synchronizeData');
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
                    this.$store.dispatch('synchronizeData');
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