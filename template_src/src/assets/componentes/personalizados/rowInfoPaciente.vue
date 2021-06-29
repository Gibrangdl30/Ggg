<template>
<div class="row w-100 m-0" @click="go(info.url)">

    <div class="row w-100 m-0" >
        <div class="row w-100 m-0"  >
            <div class="col px-0 my-auto letra-gray3-18">{{info.name}}</div>
            <div class="col-auto my-auto px-0 pr-2">
                <div class="row w-100 m-0 letra-gray3-11">Last Update</div>
                <div class="row w-100 m-0 letra-gray3-11" v-if="update">{{update | moment('HH:mm [hrs] DD/MM/YYYY')}}</div>
                <div class="row w-100 m-0 letra-gray3-11 justify-content-center" v-else>-</div>
            </div>
            <div class="col-auto px-0 my-auto">
                <icono clase="letra-verde-30" icono="check_circle" />
            </div>
            <div class="col-auto px-0 pl-2 my-auto">
                <icono clase="letra-gray3-30" icono="chevron_right" />
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
        'card',
        'select',
        'data',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        info(){return this.data || {}},
        pacientes(){return this.$store.getters.pacienteStateArray('pacientes');},
        paciente(){return this.$store.getters.pacienteStateFind('pacientes', 'paciente');},
        update(){
            switch(this.info.id){
                case '1':
                    return this.paciente.updated_at;
                case '2':
                    return ( this.paciente.payer || {} ).updated_at;
                case '3':
                    return ( this.paciente.other || {} ).updated_at;
                case '4':
                    return ( this.paciente.careProviders || {} ).updated_at;
                case '5':
                    return ( this.paciente.pharmacy || {} ).updated_at;
                case '6':
                    return ( this.paciente.facilities || {} ).updated_at;
                case '7':
                    return ( this.paciente.contacts[0] || {} ).updated_at;
                case '8':
                    return ( this.paciente.diagnosticos[0] || {} ).updated_at;
                case '9':
                    return ( this.paciente.directives || {} ).updated_at;
                case '10':
                    return ( this.paciente.misscellaneous || {} ).updated_at;
            }
        }
    },
    mounted() {
        console.log("PACIENTE --- ", this.usuario);
    },
    methods:{
        go(url){
            this.router.navigate(url);
        },
        click(){
            if(this.select){
                this.$store.commit('updatePacienteState',['paciente', this.usuario.id]);
                this.router.navigate('/paciente_detalle');
            }
        },
    },
}
</script>