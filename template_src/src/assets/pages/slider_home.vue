<template>
	<f7-page  class="back-color-negro">
		<div class="vista">
			<div class="contenedor-page-tabs back-color-negro">
				<sliderHome />
				<div class="row w-100 m-0 py-3"></div>
			</div>
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
