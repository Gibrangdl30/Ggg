<template>
<div class="row w-100 m-0" @click="click()">
    <template>
        <div class="row w-100 m-0 px-3" :class="noborder?'':simple?'border-b-gray01-1':''">
            <div class="row w-100 m-0  pl-2  " :class="`${py?py:'py-2'} ${simple?'':'border-gray0-1 border-radius-10px'}`">
                <div class="col-auto my-auto px-0" v-if="check">
                    <icono icono="check" clase="letra-verde-30" v-if="select"  />
                    <icono icono="radio" clase="letra-gray3-30" v-else  />
                </div>
                <div class="w-13vw h-13vw border-radius-50 overflow-hidden" v-if="small">
                    <imagen :src="usuario.imagen" />
                </div>
                <div class="w-16vw h-16vw border-radius-50 overflow-hidden" v-else>
                    <imagen :src="usuario.imagen" />
                </div>
                <div class="col px-0 pl-3">
                    <div class="row w-100 m-0 letra-gray4-18">{{usuario.name}}</div>
                    <div class="row w-100 m-0" v-if="grupo && grupo.id">
                        <div class="row w-100 m-0 justify-content-start " >
                            <div class="col-auto my-auto px-0 letra-gray3-16">Grupo:</div>
                            <div class="col-auto my-auto px-0 pl-2 letra-verde-16 fw-800">{{grupo.grade}}</div>
                            <div class="col-auto my-auto px-0 pl-0 letra-verde-16 fw-800">-{{grupo.group}}</div>
                            <template v-if="coor">
                                <div class="col-auto my-auto px-0 pr-2 ml-auto letra-gray3-13" >Asistencia</div>
                                <div class="col-auto my-auto px-0 pr-2">
                                    <icono icono="remove_circle" clase="letra-gray3-30 pt-5px" />
                                </div>
                            </template>
                        </div>
                    </div>

                    <div class="row w-100 m-0" v-if="coor" @click.stop="openChat" >
                        <div class="col-auto px-0 ml-auto pr-2 ">
                            <icono icono="chat_bubble_outline" clase="letra-gray3-30 pt-5px" />
                        </div>
                    </div>

                    <template v-if="!small">
                        <template v-if="simple">
                            <div class="row w-100 m-0 letra-gray3-16" v-if="usuario.date_birth">{{edad}} Años</div>
                        </template>
                        <template v-if="coor">
                            <div class="row w-100 m-0 letra-gray3-16" v-if="usuario.date_birth">{{edad}} Años</div>
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </template>

</div>
</template>
<script>
const moment = require('moment');

export default {
    props:[
       'data',
       'py',
       'simple',
       'noborder',
       'small',
       'coor',
       'check',
       'select',
    ],
    data(){
        return {
            detalles: false,
        };
    },
    computed:{
        router(){return this.$store.getters.getRouter;},
        usuario(){return this.data || {}},
        grupo(){return this.usuario.grupo || {}},
        edad(){return moment().diff(this.usuario.date_birth, 'years')},
    },
    methods:{
        click(){
            this.$emit('click');
        },
        openChat(){
            console.log("CLICLCICICIC");
            this.$store.commit('goToChatPadre', [ this.usuario.usuarios_id ]);
        }
    }
}
</script>