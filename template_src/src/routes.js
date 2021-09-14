import views from './assets/pages/views.vue';
import slider_home from './assets/pages/slider_home.vue';
import scanner from './assets/pages/scanner.vue';
import push from './assets/pages/push.vue';
import login from './assets/pages/login.vue';
import recuperar_password from './assets/pages/recuperar_password.vue';
import registro_corto from './assets/pages/registro_corto.vue';
import registro_code from './assets/pages/registro_code.vue';
import registro from './assets/pages/registro.vue';
import registro_metodo_pago from './assets/pages/registro_metodo_pago.vue';
import menu from './assets/pages/menu.vue';
import acercade from './assets/pages/acercade.vue';
import aviso_privacidad from './assets/pages/aviso_privacidad.vue';
import terminos_condiciones from './assets/pages/terminos_condiciones.vue';
import mi_cuenta from './assets/pages/mi_cuenta.vue';
import editar_perfil from './assets/pages/editar_perfil.vue';
import editar_datos_bancarios from './assets/pages/editar_datos_bancarios.vue';
import metodos_pago from './assets/pages/metodos_pago.vue';
import agregar_metodo_pago from './assets/pages/agregar_metodo_pago.vue';
import cambiar_password from './assets/pages/cambiar_password.vue';
import chats from './assets/pages/chats.vue';
import mensajes_chat from './assets/pages/mensajes_chat.vue';

const general = [
  {path: '/views',component: views,},
  {path: '/slider_home',component: slider_home},
  {path: '/scanner',component: scanner},
  {path: '/push',component: push,},
  {path: '/login',component: login,},
  {path: '/recuperar_password',component: recuperar_password,},
  {path: '/registro_corto',component: registro_corto,},
  {path: '/registro_code',component: registro_code,},
  {path: '/registro',component: registro,},
  {path: '/registro_metodo_pago',component: registro_metodo_pago,},
  {path: '/menu',component: menu,},
  {path: '/mi_cuenta',component: mi_cuenta,},
  {path: '/metodos_pago',component: metodos_pago,},
  {path: '/agregar_metodo_pago',component: agregar_metodo_pago,},
  {path: '/editar_perfil',component: editar_perfil,},
  {path: '/editar_datos_bancarios',component: editar_datos_bancarios,},
  {path: '/cambiar_password',component: cambiar_password,},
  {path: '/chats',component: chats,},
  {path: '/mensajes_chat',component: mensajes_chat},
  {path: '/acercade',component: acercade},
  {path: '/aviso_privacidad',component: aviso_privacidad},
  {path: '/terminos_condiciones',component: terminos_condiciones},
];


//usuario
import inicio from './assets/pages/usuario/inicio.vue';
import crear_post from './assets/pages/usuario/crear_post.vue';
import post_comentarios from './assets/pages/usuario/post_comentarios.vue';
import iniciar_chat_amigo from './assets/pages/usuario/iniciar_chat_amigo.vue';
import seleccionar_amigo_request from './assets/pages/usuario/seleccionar_amigo_request.vue';
import post_favoritos from './assets/pages/usuario/post_favoritos.vue';
import crear_grupo_chat from './assets/pages/usuario/crear_grupo_chat.vue';

const usuario = [
  {path: '/inicio',component: inicio},
  {path: '/crear_post',component: crear_post},
  {path: '/post_comentarios',component: post_comentarios},
  {path: '/iniciar_chat_amigo',component: iniciar_chat_amigo},
  {path: '/seleccionar_amigo_request',component: seleccionar_amigo_request},
  {path: '/post_favoritos',component: post_favoritos},
  {path: '/crear_grupo_chat',component: crear_grupo_chat},
];

const administrador = [
];


// Pages
export default [
  ...general,
  ...usuario,
  ...administrador
];