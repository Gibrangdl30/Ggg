<template>
    <img :class="` h-100 w-100 ${clase?clase:''} ${!nofit?'object-fit':''}`" :id="`img_${id} `" :onload="verload()"  :src="imagen" :alt="`alt_${id}`" @click="showImage()">
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
            'nofit',
            'create',
            'size',
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
        imagenUrl(){
            if(this.size){
                return `${this.baseUrl}img/directrender/${this.src}/${this.size}/${this.size}/foto.jpg`
            }
            return `${this.baseUrl}img/directrender/${this.src}/foto.jpg`
        },
        imagen(){
            if(this.logo) {
                if(this.logo == 2){
                    return `${this.baseImg}ll.png`;
                }
                return `${this.baseImg}ll.png`;
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
            return `${this.baseImg}l3.svg`;
        },

    },
    mounted() {
        this.getDatos();
    },
    methods:{

        verload($event){
            console.log("LODEANDO XXx");
            this.$emit('load');
        },

        getDatos(){
            this.load = document.createElement('img');
            if(this.show){
                this.load.src = `${this.baseUrl}img/directrender/${this.show}/foto.jpg`;
                if(this.load){
                    this.load.onload = ()=>{
                        this.height = this.load.height*5;
                        this.width = this.load.width*5;
                        // console.log("TOTAL LOAD, ", this.height,this.width );
                    };
                }
            }
        },
        
        showImage(){
            if(this.show){
                // console.log("TO SHOW HW", this.show, this.height, this.width);
                if(this.height && this.width){
                    // console.log("SHOWING APP", this.show, `${this.baseUrl}img/render/${this.show}/foto.jpg`);
                    this.$store.dispatch('showImage',[`${this.baseUrl}img/directrender/${this.show}/foto.jpg`, this.height, this.width]);
                }
            }
            else{
                this.$emit('click');
            }
        }
    },
}
</script>