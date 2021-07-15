<template>
<div class="row w-100 m-0" >
    <div class="row w-100 m-0 px-3 py-2">

        <div class="row w-100 m-0 py-2 pl-2 border-gray0-1 border-radius-10px">
            <div class="row w-100 m-0">
                <div class="col-auto my-auto px-0 pr-2 " v-if="check" @click="click()" >
                    <icono icono="check" clase="letra-verde-30" v-if="select"  />
                    <icono icono="radio" clase="letra-gray3-30" v-else  />
                </div>
                <div class="w-16vw h-16vw border-radius-50 overflow-hidden">
                    <imagen :src="usuario.foto" />
                </div>
                <div class="col px-0 pl-3">
                    <div class="row w-100 m-0 letra-verde-18">{{usuario.name}}</div>
                    <div class="row w-100 m-0 letra-gray4-17">{{usuario.tipo || 'Familiar'}}</div>
                    <div class="row w-100 m-0 letra-gray3-17">{{usuario.email}}</div>
                    <div class="row w-100 m-0 letra-verde-17 justify-content-end text-right pr-3" v-if="del" @click="quitar()">Quitar</div>
                </div>
            </div>
            <div class="row w-100 m-0">
                <div class="col-10 px-0 ml-auto">
                    <slot />
                </div>
            </div>
        </div>
        
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            detalles: false,
        };
    },
    props:[
       'data',
       'check',
       'del',
       'select',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        usuario(){return this.data || {}},
    },
    methods:{
        click(){
            this.$emit('click');
            if(this.check){
                this.$store.commit('addUser', this.usuario);
            }
        },
        quitar(){
            if(this.check){
                this.$store.commit('removeUser', this.usuario.idthe );
            }
        },
        editar(){
            this.$store.commit('setUsD',['usuario', this.usuario.id]);
            this.router.navigate('/editar_persona_confianza');
        }
    },
}
</script>