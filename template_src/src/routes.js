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
import editar_galeria from './assets/pages/editar_galeria.vue';
import enviar_mensaje from './assets/pages/enviar_mensaje.vue';

import concidencias from './assets/pages/concidencias.vue';
import terminos_privacidad from './assets/pages/terminos_privacidad.vue';
import tdeclaracion from './assets/pages/tdeclaracion.vue';
import tpolitica_envios from './assets/pages/tpolitica_envios.vue';
import terminos_market from './assets/pages/terminos_market.vue';
import tconvenios from './assets/pages/tconvenios.vue';

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
  {path: '/editar_galeria',component: editar_galeria},
  {path: '/enviar_mensaje',component: enviar_mensaje},
  {path: '/acercade',component: acercade},
  {path: '/aviso_privacidad',component: aviso_privacidad},
  {path: '/terminos_condiciones',component: terminos_condiciones},
  {path: '/concidencias',component: concidencias},
  {path: '/terminos_privacidad',component: terminos_privacidad},
  {path: '/tdeclaracion',component: tdeclaracion},
  {path: '/tpolitica_envios',component: tpolitica_envios},
  {path: '/terminos_market',component: terminos_market},
  {path: '/tconvenios',component: tconvenios},
];


//usuario
import inicio from './assets/pages/usuario/inicio.vue';
import eventos from './assets/pages/usuario/eventos.vue';
import eventos_zonas from './assets/pages/usuario/eventos_zonas.vue';
import eventos_boletos from './assets/pages/usuario/eventos_boletos.vue';
import eventos_seleccionar_boletos from './assets/pages/usuario/eventos_seleccionar_boletos.vue';
import eventos_pago from './assets/pages/usuario/eventos_pago.vue';

import favoritos from './assets/pages/usuario/favoritos.vue';
import consumos from './assets/pages/usuario/consumos.vue';
import producto from './assets/pages/usuario/producto.vue';
import carrito from './assets/pages/usuario/carrito.vue';
import confirmacion_carrito from './assets/pages/usuario/confirmacion_carrito.vue';

import compras from './assets/pages/usuario/compras.vue';
import mis_domicilios from './assets/pages/usuario/mis_domicilios.vue';
import nuevo_domicilio from './assets/pages/usuario/nuevo_domicilio.vue';


import comunicados from './assets/pages/usuario/comunicados.vue';
import comunicado_detalle from './assets/pages/usuario/comunicado_detalle.vue';
import mis_boletos from './assets/pages/usuario/mis_boletos.vue';
import mi_boleto_detalle from './assets/pages/usuario/mi_boleto_detalle.vue';
import boleto_detalle from './assets/pages/usuario/boleto_detalle.vue';

import mis_compras from './assets/pages/usuario/mis_compras.vue';
import posts from './assets/pages/usuario/posts.vue';

import mis_consumos from './assets/pages/usuario/mis_consumos.vue';
import mis_consumos_detalle from './assets/pages/usuario/mis_consumos_detalle.vue';
import consumo_detalle from './assets/pages/usuario/consumo_detalle.vue';

import crear_post from './assets/pages/usuario/crear_post.vue';
import crear_post_res from './assets/pages/usuario/crear_post_res.vue';
import tienda_productos from './assets/pages/usuario/tienda_productos.vue';

import subcategorias from './assets/pages/usuario/subcategorias.vue';
import subcategoria_productos from './assets/pages/usuario/subcategoria_productos.vue';

import post_comentarios from './assets/pages/usuario/post_comentarios.vue';
import iniciar_chat_amigo from './assets/pages/usuario/iniciar_chat_amigo.vue';
import seleccionar_amigo_request from './assets/pages/usuario/seleccionar_amigo_request.vue';
import post_favoritos from './assets/pages/usuario/post_favoritos.vue';
import crear_grupo_chat from './assets/pages/usuario/crear_grupo_chat.vue';
import solicitud_fotografo from './assets/pages/usuario/solicitud_fotografo.vue';
import crear_foto from './assets/pages/usuario/crear_foto.vue';
import fotos_para_mi from './assets/pages/usuario/fotos_para_mi.vue';
import fotos_tomadas from './assets/pages/usuario/fotos_tomadas.vue';
import fotos_de_paparatz from './assets/pages/usuario/fotos_de_paparatz.vue';
import fotos_de_cliente from './assets/pages/usuario/fotos_de_cliente.vue';
import seleccionar_usuario_post from './assets/pages/usuario/seleccionar_usuario_post.vue';


const usuario = [
  {path: '/inicio',component: inicio},
  {path: '/eventos',component: eventos},
  {path: '/eventos_zonas',component: eventos_zonas},
  {path: '/eventos_boletos',component: eventos_boletos},
  {path: '/eventos_seleccionar_boletos',component: eventos_seleccionar_boletos},
  {path: '/eventos_pago',component: eventos_pago},


  {path: '/favoritos',component: favoritos},
  {path: '/consumos',component: consumos},
  {path: '/producto',component: producto},

  {path: '/producto/:id',component: producto},
  
  {path: '/carrito',component: carrito},
  {path: '/confirmacion_carrito',component: confirmacion_carrito},
  
  {path: '/mis_domicilios',component: mis_domicilios},
  {path: '/nuevo_domicilio',component: nuevo_domicilio},

  {path: '/comunicados',component: comunicados},
  {path: '/comunicado_detalle',component: comunicado_detalle},

  
  {path: '/mis_boletos',component: mis_boletos },
  {path: '/mi_boleto_detalle',component: mi_boleto_detalle },
  {path: '/boleto_detalle',component: boleto_detalle },
  
  {path: '/mis_compras',component: mis_compras },

  {path: '/compras',component: compras },
  {path: '/posts',component: posts },
  
  {path: '/mis_consumos',component: mis_consumos },
  {path: '/mis_consumos_detalle',component: mis_consumos_detalle },
  {path: '/consumo_detalle',component: consumo_detalle },

  {path: '/crear_post',component: crear_post},
  {path: '/crear_post_res',component: crear_post_res},

  {path: '/tienda_productos',component: tienda_productos},
  
  {path: '/subcategorias',component: subcategorias},
  {path: '/subcategoria_productos',component: subcategoria_productos},
  
  {path: '/seleccionar_usuarios_post',component: seleccionar_usuario_post},

  {path: '/post_comentarios',component: post_comentarios},
  {path: '/iniciar_chat_amigo',component: iniciar_chat_amigo},
  {path: '/seleccionar_amigo_request',component: seleccionar_amigo_request},
  {path: '/post_favoritos',component: post_favoritos},
  {path: '/crear_grupo_chat',component: crear_grupo_chat},
  {path: '/solicitud_fotografo',component: solicitud_fotografo},
  {path: '/crear_foto',component: crear_foto},
  {path: '/fotos_para_mi',component: fotos_para_mi},
  {path: '/fotos_tomadas',component: fotos_tomadas},
  {path: '/fotos_de_paparatz',component: fotos_de_paparatz},
  {path: '/fotos_de_cliente',component: fotos_de_cliente},
];

const administrador = [
];


// Pages
export default [
  ...general,
  ...usuario,
  ...administrador
];