<template>
  <f7-page  class="back-color-blanco">
    <div class="vista h-99vh ios-h-95vh">
        <sliderHome />
    </div>
</f7-page>
</template>
<script>
  import { f7Page } from 'framework7-vue';
  export default {
    components:{
      f7Page,    
    },
    data(){
      return {
        open: true,
      };
    },
    computed:{
        session(){return this.$store.getters.getSession;},
        router(){return this.$store.getters.getRouter;},
    },
    beforeMount(){
        console.log("LOGENADO SLIDER",this.session.token);
        if(this.session.token){
            this.$store.commit('changeViewByTipe');
        }
    },
    mounted(){
      this.$store.dispatch('initData', [this.$f7]);
    },
    methods:{
    },
  };
</script>
