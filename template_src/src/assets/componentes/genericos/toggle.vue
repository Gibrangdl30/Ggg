
<style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color:  black;
}

input:focus + .slider {
  box-shadow: 0 0 1px  black;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>

<template>
<div class="row w-100 m-0">

  <div class="row w-100 m-0" v-if="icon==2">
      <div class="w-auto mx-auto" @click="$emit('change', 1)" >
        <icono clase="letra-rojo-30" icono="radio_button_checked" v-if="checked" />
        <icono clase="letra-gray3-30" icono="radio_button_unchecked" v-else  />
      </div>
  </div>
  
  <div class="row w-100 m-0" v-else-if="icon">
      <div class="w-auto mx-auto" @click="$emit('input', value == v?f:v )" >
        <icono clase="letra-rojo-30" icono="radio_button_checked" v-if="value == v" />
        <icono clase="letra-gray3-30" icono="radio_button_unchecked" v-else  />
      </div>
  </div>

  <div class="row w-100 m-0" v-else>
      <label class="switch m-0">
          <input type="checkbox" v-if="auto" :checked="checked"  @change="change">
          <input type="checkbox" v-else :checked="value == v"  @change="change">
          <span class="slider round"></span>
      </label>
  </div>
</div>
</template>

<script>

export default {
    data(){
        return {
        };
    },

    props:[    
		'auto',
		'value',
		'icon',
		'check',
		'checked',
		'v',
		'f',
    ],

    computed:{
    },
    methods:{
      change(e){
        console.log("CHANGE", e, e.target.checked);
        if(e.target.checked){
          if(this.v){
            this.$emit('input',this.v);
            this.$emit('change',this.v);
          }
          else{
            this.$emit('input',true);
            this.$emit('change',true);
          }
        }
        else{
          if(this.f){
            this.$emit('input',this.f);
            this.$emit('change',this.f);
          }
          else{
            this.$emit('input',false);
            this.$emit('change',false);
          }
        }
      },
    },
}
</script>