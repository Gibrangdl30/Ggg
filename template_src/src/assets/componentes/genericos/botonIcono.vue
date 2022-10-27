<template>
<div class="w-100">
    <template v-if="outline">
    <button class="button boton p-0 mx-auto w-auto border-radius-10px border-gray3-1 p-1" @click="$emit('click')">
        <div class="row w-100 m-0 justify-content-center">
            <i class="material-icons letra-gray4-8-8vw">{{icono || 'add'}}</i>
        </div>
    </button>
    </template>
    <template v-else-if="noborder">
    <button class="button button-noborder p-0 mx-auto w-100" @click="$emit('click')">
        <slot v-if="custom"></slot>
        <div class="row w-100 m-0 justify-content-center letra-gray4-4-8vw" v-else>
            <i class="material-icons color-white letra-gray4-7-5vw">{{icono || 'add'}}</i>
        </div>
    </button>
    </template>
    <template v-else>
    <button class="button boton-verdesecap" @click="$emit('click')">
        <div class="row justify-content-center " :class="{'letra-gray4-3-8vw py-5px':small, 'letra-gray4-4-8vw py-13px': (!small)}">
            <span>{{texto}}</span>
        </div>
    </button>
    </template>
</div>
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
                'outline',
                'noborder',
                'custom'
            ],
    computed:{
    },
    created() {
    },
    methods:{
    },
}
</script>