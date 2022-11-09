<template>
    <f7-page>
    <div class="vista">
        
        <nav-bar tipo="inicio" :backs="true" :fix="1" :title="'Aviso de privacidad'" />
        <div class="contenedor-page-tabs  ">

                <div class="row w-100 m-0 py-2 justify-content-center">

                    <div class="col-12 text-justify mt-2" >
                        <div class="row w-100 m-0 letra-gray3-16 white-space-preline justify-content-center">
                            AVISO DE PRIVACIDAD
                            En cumplimiento con lo establecido en la Ley Federal de Protección de Datos Personales en Posesión de Particulares y con la finalidad de asegurar la protección y privacidad de los datos personales, así como regular el acceso, rectificación, oposición y cancelación de estos MEXICO LIMITED , establece lo siguiente:

                            Este aviso es relacionado al uso del sitio web de: https://mexicolimited.com/ la App para dispositivos móviles con sistema operativo IOS y la APP para dispositivos móviles con sistema operativo Android.
                            
                            DATOS PERSONALES.
                            La información solicitada y recabada o recibida por MEXICO LIMITED ya sea en forma física, electrónica o cualquier otro medio, consistirá principalmente en los datos personales necesarios e indispensables para que los emprendedores, particulares u organizaciones puedan afiliarse a la plataforma.
                            
                            COOKIES.
                            Nuestro sitio web almacena información acerca de los usuarios que lo visitan y sus diferentes secciones a través de cookies e IPS o archivos temporales, los cuales se emplean únicamente con el propósito de mejorar la experiencia y velocidad de navegación del usuario.
                            
                            DERECHOS ARCO. (ACCESO, RECTIFICACIÓN, CANCELACIÓN Y OPOSICIÓN).
                            En particular, la ley otorga a los titulares de los datos personales el derecho a acceder, rectificar, y cancelar su información personal en posesión de terceros, así como oponerse a su uso. A estos se les conoce como derechos ARCO.
                            
                            Recuerda que para que puedas ejercer tus derechos ante el responsable, deberás demostrar que tú eres el titular de los datos o, en caso de que lo hagas a través de representante, deberás acreditar ésta situación. Esto está pensado para que NADIE más que tú o tu representante, puedan decidir el uso que se le dará a tus datos personales; es por tu protección y la de tu información.
                            
                            En caso de que ejerzas tus derechos a través de un representante, podrás acreditarlo de las siguientes maneras:
                            
                            Presentando un instrumento público en el que conste tal situación.
                            Mediante carta poder firmada ante dos testigos.
                            A través de la declaración en comparecencia del titular.
                            Podrás solicitar el ejercicio de sus derechos enviándonos un correo electrónico a la dirección siguiente: LEGAL@MEXICOLIMTED.COM
                            
                            AUTORIZACIÓN.
                            Si tu como usuario, proveedor, cliente o prestador de servicios nos proporcionas tus datos personales se entiende que has leído, entendido y aceptado el presente aviso de privacidad, así como la transferencia de tus datos para los fines señalados y no haz manifestado oposición con el mismo.
                            
                            FECHA DE ACTUALIZACION.
                            Este aviso fue actualizado por ultima vez el día 15 de MARZO de 2022 mas puede cambiar en cualquier momento y sin previo aviso mas que el publicado en nuestra pagina web https://mexicolimited.com/
                        </div>
                    </div>

                </div>

                <div class="row w-100 m-0 py-5"></div>
        </div>
        
    </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
import Swiper from 'swiper';
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                promos_slider: null,
                categorias_slider: null
            } 
        },
        computed: {
            session(){return this.$store.getters.getSession;},
            user(){return this.$store.getters.user;},
            chofer(){return this.$store.getters.chofer;},
        },
        methods:{
            goTo(ruta){
                this.$f7.views.principal.router.navigate(ruta);
            },
        }
    }
</script>