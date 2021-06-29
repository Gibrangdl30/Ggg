<template>
    <img :class="`h-100 w-100 ${clase?clase:''} ${fit?'object-fit':''}`" :id="`img_${id}`"  :src="imagen" :alt="`alt_${id}`" @click="showImage()">
</template>
<script>
export default {
    data(){
        return {
            id: _.uniqueId('img_'),
            img: null,
            load: null,
            height: null,
            width: null,
            galeria: [],
            baseUrl: this.$store.getters.baseUrl,
            baseImg: this.$store.getters.baseImg,
            baseIconos: this.$store.getters.baseIconos,
        };
    },
    props:[    
            'src',
            'fit',
            'create',
            'user',
            'perfil',
            'logo',
            'general',
            'icono',
            'formato',
            'clase',
            'show',
        ],
    computed:{
        session(){return this.$store.getters.getSession;},
        imagenUrl(){return `${this.baseUrl}img/render/${this.src}/500/500/foto.jpg`},
        imagen(){
            if(this.logo) {
                if(this.logo == 2){
                    return `${this.baseImg}lo2.svg`;
                }
                if(this.logo == 3){
                    return `${this.baseImg}lo4.svg`;
                }
                return `${this.baseImg}lo1.svg`;
            }
            if(this.icono) {
                if(this.formato){
                    // return require(`../../iconos/${this.src}.${this.formato}`);
                    return `${this.baseIconos}${this.src}.${this.formato}`;
                }
                return `${this.baseIconos}${this.src}.svg`;
                // return require(`../../iconos/${this.src}.svg`);
            }
            if(this.perfil) {
                if(this.session.foto && this.session.foto != '0'){
                    return this.session.foto;
                }
                return `${this.baseImg}perfil.png`;
            }
            if(this.src && this.src != '0'){
                if(this.create){
                    return this.imagenUrl;
                }
                return this.src;
            }
            if(this.user){
                return `${this.baseImg}perfil.png`;
            }
            return require('../../images/l3.svg');
        },

    },
    created() {
        // this.getDatos();
    },
    methods:{
        getDatos(){
            this.load = document.createElement('img');
            this.load.src = this.src;
            if(this.load){
                this.load.onload = ()=>{
                    this.height = this.load.height*5;
                    this.width = this.load.width*5;
                };
            }
        },
        showImage(){
            if(this.show){
                if(this.height && this.width){
                    if(this.src){
                        this.$store.dispatch('showImage',[this.imagen,this.height, this.width]);
                    }
                }
            }
            else{
                this.$emit('click');
            }
        }
    },
}
</script>