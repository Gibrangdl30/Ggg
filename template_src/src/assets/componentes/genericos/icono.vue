<template>
    <i :class="`material-icons ${clase}`">{{i}}</i>
</template>
<script>
export default {
    data()
    {
        return {
        };
    },
    props:  [    
                'icono',
                'l',
                'r',
                'd',
                'u',
                'clase'
            ],
    computed:{
        i(){
            if(this.l) return 'keyboard_arrow_left';
            if(this.r) return 'keyboard_arrow_right';
            if(this.d) return 'keyboard_arrow_down';
            if(this.u) return 'keyboard_arrow_up';
            if(this.icono == 'radio'){
                return 'radio_button_unchecked'
            }
            if(this.icono == 'check'){
                return 'radio_button_checked'
            }
            if(this.icono == 'done'){
                return 'check_circle_outline'
            }
            if(!this.icono) return 'add';
            return this.icono;
        }
    },
    created() {
    },
    methods:{
    },
}
</script>