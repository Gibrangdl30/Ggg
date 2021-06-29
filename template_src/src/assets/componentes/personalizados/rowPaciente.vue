<template>
<div class="row w-100 m-0" >

    <div class="row w-100 m-0 px-2 py-2" v-if="card" @click="click()">
        <div class="row w-100 m-0 py-3 px-2 border-radius-10px carta">
           
            <div class="row w-100 m-0 ">
                <div class="col-auto my-auto px-0">
                    <div class="w-20vw h-20vw border-radius-10px overflow-hidden">
                        <imagen :fit="true" :user="true" :src="usuario.imagen_id" :create="true" />
                    </div>
                </div>
                <div class="col my-auto pl-3 pr-0">
                    <div class="row w-100 m-0 letra-gray4-16 fw-800">{{usuario.name}}</div>
                    <div class="row w-100 m-0 letra-gray3-15">{{usuario.birthday | moment('DD/MM/YYYY')}}</div>
                    <div class="row w-100 m-0 letra-gray3-15">{{usuario.unidad}}</div>
                    <div class="row w-100 m-0 letra-gray3-15">{{usuario.residentid}}</div>
                    <div class="row w-100 m-0 letra-gray3-15" v-if="usuario.status == 'discharged'">Discharged at: {{usuario.updated_at | timestamp }}</div>
                </div>
                <div class="col-auto mb-auto px-0">
                    <div class="row w-100 m-0 letra-gray4-12 fw-800 justify-content-end text-rigth ">SSN #</div>
                    <div class="row w-100 m-0 letra-gray3-12 justify-content-end text-rigth ">{{usuario.snn.slice(0,8)}}</div>
                </div>
            </div>

        </div>
    </div>

    <div class="row w-100 m-0 px-2 py-2" v-else @click="click()">
        <div class="row w-100 m-0 py-3 px-2">
           
            <div class="row w-100 m-0 ">
                <div class="col-auto my-auto px-0">
                    <div class="w-20vw h-20vw border-radius-10px overflow-hidden">
                        <imagen :fit="true" :user="true" :src="usuario.imagen_id" :create="true" />
                    </div>
                </div>
                <div class="col my-auto pl-3 pr-0">
                    <div class="row w-100 m-0 letra-gray4-16 fw-800">{{usuario.name}}</div>
                    <div class="row w-100 m-0 letra-gray3-15">{{usuario.birthday | moment('DD/MM/YYYY')}}</div>
                    <div class="row w-100 m-0 letra-gray3-15">{{usuario.unidad}}</div>
                    <div class="row w-100 m-0 letra-gray3-15">{{usuario.residentid}}</div>
                    <div class="row w-100 m-0 letra-gray3-15" v-if="usuario.status == 'discharged'">Discharged at: {{usuario.updated_at | timestamp }}</div>
                </div>
                <div class="col-auto mb-auto px-0">
                    <div class="row w-100 m-0 letra-gray4-12 fw-800 justify-content-end text-rigth ">SSN #</div>
                    <div class="row w-100 m-0 letra-gray3-12 justify-content-end text-rigth ">{{usuario.snn.slice(0,8)}}</div>
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
        'card',
        'select',
        'data',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        usuario(){return this.data || {}},
    },
    mounted() {
        console.log("PACIENTE --- ", this.usuario);
    },
    methods:{
        click(){
            if(this.select){
                this.$store.commit('updatePacienteState',['paciente', this.usuario.id]);
                this.router.navigate('/paciente_detalle');
            }
        },
    },
}
</script>