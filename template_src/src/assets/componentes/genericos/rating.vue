<template>
<div class="w-auto">
    <div class="row w-100 m-0 px-2 pt-5px back-color-blanco border-tr-radius-5px border-br-radius-5px ">
        <div class="row w-100 m-0 justify-content-center">
            <div class="col-auto px-0" @click.stop="set(1)">
                <i class="material-icons" :class="(value>=1)?'letra-negro-30':'letra-gray2-30'">photo_camera</i>
            </div>
            <div class="col-auto px-0" @click.stop="set(2)">
                <i class="material-icons" :class="(value>=2)?'letra-negro-30':'letra-gray2-30'">photo_camera</i>
            </div>
            <div class="col-auto px-0" @click.stop="set(3)">
                <i class="material-icons" :class="(value>=3)?'letra-negro-30':'letra-gray2-30'">photo_camera</i>
            </div>
            <div class="col-auto px-0" @click.stop="set(4)">
                <i class="material-icons" :class="(value>=4)?'letra-negro-30':'letra-gray2-30'">photo_camera</i>
            </div>
            <div class="col-auto px-0" @click.stop="set(5)">
                <i class="material-icons" :class="(value>=5)?'letra-negro-30':'letra-gray2-30'">photo_camera</i>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
        };
    },
    props:  [    
              'value',
              'notEmit',
              'checked',
            ],
    computed:{
    },
    methods:{
        change(e){
            this.$emit('change',e.target.checked)
        },
        set(a){
            if(!this.notEmit){
                this.$emit('input', a);
            }
        },
    },
}
</script>