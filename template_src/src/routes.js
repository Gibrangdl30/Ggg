import views from './assets/pages/views.vue';
import slider_home from './assets/pages/slider_home.vue';
import scanner from './assets/pages/scanner.vue';
import push from './assets/pages/push.vue';
import login from './assets/pages/login.vue';
import recuperar_password from './assets/pages/recuperar_password.vue';
import registro from './assets/pages/registro.vue';
import registro_nuevo from './assets/pages/registro_nuevo.vue';
import registro_paypal from './assets/pages/registro_paypal.vue';
import registro_metodo_pago from './assets/pages/registro_metodo_pago.vue';
import menu from './assets/pages/menu.vue';
import preguntas_frecuentes from './assets/pages/preguntas_frecuentes.vue';
import preguntas_frecuentes_afiliado from './assets/pages/preguntas_frecuentes_afiliado.vue';
import politica_cancelacion from './assets/pages/politica_cancelacion.vue';
import politica_cancelacion_afiliado from './assets/pages/politica_cancelacion_afiliado.vue';

//usuario
import notificaciones from './assets/pages/usuario/notificaciones.vue';
import inicio from './assets/pages/usuario/inicio.vue';
import mis_fechas from './assets/pages/usuario/mis_fechas.vue';
import nuevo_evento from './assets/pages/usuario/nuevo_evento.vue';
import mis_deseos from './assets/pages/usuario/mis_deseos.vue';
import nueva_lista from './assets/pages/usuario/nueva_lista.vue';
import nuevo_producto from './assets/pages/usuario/nuevo_producto.vue';
import regalos from './assets/pages/usuario/regalos.vue';
import detalle_producto from './assets/pages/usuario/detalle_producto.vue';
import carrito from './assets/pages/usuario/carrito.vue';
import confirmacion_carrito from './assets/pages/usuario/confirmacion_carrito.vue';
import mis_domicilios from './assets/pages/usuario/mis_domicilios.vue';
import nuevo_domicilio from './assets/pages/usuario/nuevo_domicilio.vue';
import nuevo_evento_calendario from './assets/pages/usuario/nuevo_evento_calendario.vue';
import agregar_usuarios_eventos from './assets/pages/usuario/agregar_usuarios_eventos.vue';
import regalos_eventos from './assets/pages/usuario/regalos_eventos.vue';
import detalle_producto_evento from './assets/pages/usuario/detalle_producto_evento.vue';
import agregar_alista from './assets/pages/usuario/agregar_alista.vue';
import editar_evento_fecha from './assets/pages/usuario/editar_evento_fecha.vue';
import regalos_listas from './assets/pages/usuario/regalos_listas.vue';
import detalle_producto_lista from './assets/pages/usuario/detalle_producto_lista.vue';
import historial_compras from './assets/pages/usuario/historial_compras.vue';
import historial_puntos from './assets/pages/usuario/historial_puntos.vue';
import niveles from './assets/pages/usuario/niveles.vue';
import servicios_canjear from './assets/pages/usuario/servicios_canjear.vue';
import amigos from './assets/pages/usuario/amigos.vue';
import mensajear_amigo from './assets/pages/usuario/mensajear_amigo.vue';
import amigos_favoritos from './assets/pages/usuario/amigos_favoritos.vue';
import solicitudes_amistad from './assets/pages/usuario/solicitudes_amistad.vue';
import nuevos_amigos from './assets/pages/usuario/nuevos_amigos.vue';
import enviar_invitacion from './assets/pages/usuario/enviar_invitacion.vue';
import misReuniones from './assets/pages/usuario/misReuniones.vue';
import misPartys from './assets/pages/usuario/misPartys.vue';
import deseos_amigos from './assets/pages/usuario/deseos_amigos.vue';
import deseos_fechas_amigos from './assets/pages/usuario/deseos_fechas_amigos.vue';
import deseos_amigo from './assets/pages/usuario/deseos_amigo.vue';
import lista_nuevo_evento from './assets/pages/usuario/lista_nuevo_evento.vue';
import lista_domicilios from './assets/pages/usuario/lista_domicilios.vue';
import detalle_servicio_qr from './assets/pages/usuario/detalle_servicio_qr.vue';
import agregar_concepto_gasto from './assets/pages/usuario/agregar_concepto_gasto.vue';
import seleccionar_usuario_eventos from './assets/pages/usuario/seleccionar_usuario_eventos.vue';
import selecionar_usuario_evento from './assets/pages/usuario/selecionar_usuario_evento.vue';
import deseos_usuario_evento from './assets/pages/usuario/deseos_usuario_evento.vue';
import mis_deseos_eventos from './assets/pages/usuario/mis_deseos_eventos.vue';
import detalle_lista from './assets/pages/usuario/detalle_lista.vue';

import nuevo_metodo_pago from './assets/pages/usuario/nuevo_metodo_pago.vue';
import historial_viajes from './assets/pages/usuario/historial_viajes.vue';

//usuario
import comunicados from './assets/pages/usuario/comunicados/comunicados.vue';
import detalle_comunicado from './assets/pages/usuario/comunicados/detalle_comunicado.vue';

import eventos from './assets/pages/usuario/eventos/eventos.vue';
import detalle_eventos from './assets/pages/usuario/eventos/detalle_eventos.vue';
import editar_evento_calendario from './assets/pages/usuario/eventos/editar_evento_calendario.vue';
import usuarios_confianza_eventos from './assets/pages/usuario/eventos/usuarios_confianza_eventos.vue';

import rutas from './assets/pages/usuario/rutas/rutas.vue';
import detalle_ruta from './assets/pages/usuario/rutas/detalle_ruta.vue';

//faltas
import agendar_faltas from './assets/pages/usuario/faltas/agendar_faltas.vue';
import historial_faltas from './assets/pages/usuario/faltas/historial_faltas.vue';
import quejas_usuario from './assets/pages/usuario/faltas/quejas_usuario.vue';

//personas
import personas_confianza from './assets/pages/usuario/personas/personas_confianza.vue';
import hijos_usuario from './assets/pages/usuario/personas/hijos_usuario.vue';
import agregar_persona_confianza from './assets/pages/usuario/personas/agregar_persona_confianza.vue';
import editar_persona_confianza from './assets/pages/usuario/personas/editar_persona_confianza.vue';

import reportes_hijos from './assets/pages/usuario/reportes/reportes_hijos.vue';
import detalle_reporte from './assets/pages/usuario/reportes/detalle_reporte.vue';

import rondas from './assets/pages/usuario/rondas/rondas.vue';
import crear_ronda from './assets/pages/usuario/rondas/crear_ronda.vue';
import seleccionar_padres_rondas from './assets/pages/usuario/rondas/seleccionar_padres_rondas.vue';

import servicio_usuario from './assets/pages/usuario/recolecciones/servicio_usuario.vue';


//COOR
import inicio_coor from './assets/pages/coor/inicio_coor.vue';
import grados_coor from './assets/pages/coor/grados_coor.vue';
import grupos_coor from './assets/pages/coor/grupos_coor.vue';
import alumnos_coor from './assets/pages/coor/alumnos_coor.vue';
import agregar_acceso_terceros from './assets/pages/coor/agregar_acceso_terceros.vue';
import salidas_coor from './assets/pages/coor/salidas_coor.vue';
import ingresos_coor from './assets/pages/coor/ingresos_coor.vue';


//maestros
import inicio_maestro from './assets/pages/maestros/inicio_maestro.vue';
import grupos_maestro from './assets/pages/maestros/grupos_maestro.vue';
import alumnos_maestro from './assets/pages/maestros/alumnos_maestro.vue';


import chats from './assets/pages/chats.vue';
import mensajes_chat from './assets/pages/mensajes_chat.vue';
import mensajes_chat_ios from './assets/pages/mensajes_chat_ios.vue';
import mensajes_grupo from './assets/pages/mensajes_grupo.vue';
import mensajes_invitaciones from './assets/pages/mensajes_invitaciones.vue';
import mensajes_eventos from './assets/pages/mensajes_eventos.vue';

import mi_cuenta from './assets/pages/mi_cuenta.vue';
import editar_perfil_profesional from './assets/pages/editar_perfil_profesional.vue';
import editar_perfil from './assets/pages/editar_perfil.vue';
import editar_datos_bancarios from './assets/pages/editar_datos_bancarios.vue';
import metodos_pago from './assets/pages/metodos_pago.vue';
import agregar_metodo_pago from './assets/pages/agregar_metodo_pago.vue';
import mi_historial from './assets/pages/mi_historial.vue';
import restaurantes_favoritos from './assets/pages/restaurantes_favoritos.vue';
import cambiar_password from './assets/pages/cambiar_password.vue';

import acercade from './assets/pages/acercade.vue';
import ayuda from './assets/pages/ayuda.vue';
import aviso_privacidad from './assets/pages/aviso_privacidad.vue';
import terminos_condiciones from './assets/pages/terminos_condiciones.vue';




// Pages
export default [
  
  {path: '/views',component: views,},
  {path: '/slider_home',component: slider_home},
  {path: '/scanner',component: scanner},
  {path: '/push',component: push,},
  {path: '/login',component: login,},
  {path: '/recuperar_password',component: recuperar_password,},
  {path: '/registro',component: registro,},
  {path: '/registro_nuevo',component: registro_nuevo,},
  {path: '/registro_paypal',component: registro_paypal,},
  {path: '/registro_metodo_pago',component: registro_metodo_pago,},
  {path: '/menu',component: menu,},
  {path: '/preguntas_frecuentes',component: preguntas_frecuentes,},
  {path: '/preguntas_frecuentes_afiliado',component: preguntas_frecuentes_afiliado,},
  {path: '/politica_cancelacion',component: politica_cancelacion,},
  {path: '/politica_cancelacion_afiliado',component: politica_cancelacion_afiliado,},

  //User
  {path: '/inicio',component: inicio},
  {path: '/notificaciones',component: notificaciones},
  {path: '/mis_fechas',component: mis_fechas},
  {path: '/nuevo_evento',component: nuevo_evento},
  {path: '/mis_deseos',component: mis_deseos},
  {path: '/nueva_lista',component: nueva_lista},
  {path: '/nuevo_producto',component: nuevo_producto},
  {path: '/regalos',component: regalos},
  {path: '/detalle_producto',component: detalle_producto},
  {path: '/carrito',component: carrito},
  {path: '/confirmacion_carrito',component: confirmacion_carrito},
  {path: '/mis_domicilios',component: mis_domicilios},
  {path: '/nuevo_domicilio',component: nuevo_domicilio},
  {path: '/eventos',component: eventos},
  {path: '/nuevo_evento_calendario',component: nuevo_evento_calendario},
  {path: '/agregar_usuarios_eventos',component: agregar_usuarios_eventos},
  {path: '/regalos_eventos',component: regalos_eventos},
  {path: '/detalle_producto_evento',component: detalle_producto_evento},
  {path: '/agregar_alista',component: agregar_alista},
  {path: '/editar_evento_fecha',component: editar_evento_fecha},
  {path: '/regalos_listas',component: regalos_listas},
  {path: '/detalle_producto_lista',component: detalle_producto_lista},
  {path: '/historial_compras',component: historial_compras},
  {path: '/historial_puntos',component: historial_puntos},
  {path: '/niveles',component: niveles},
  {path: '/servicios_canjear',component: servicios_canjear},
  {path: '/amigos',component: amigos},
  {path: '/mensajear_amigo',component: mensajear_amigo},
  {path: '/amigos_favoritos',component: amigos_favoritos},
  {path: '/solicitudes_amistad',component: solicitudes_amistad},
  {path: '/nuevos_amigos',component: nuevos_amigos},
  {path: '/enviar_invitacion',component: enviar_invitacion},
  {path: '/misReuniones',component: misReuniones},
  {path: '/misPartys',component: misPartys},
  {path: '/detalle_eventos',component: detalle_eventos},
  {path: '/editar_evento_calendario',component: editar_evento_calendario},
  {path: '/usuarios_confianza_eventos',component: usuarios_confianza_eventos},

  
  {path: '/deseos_fechas_amigos',component: deseos_fechas_amigos},
  {path: '/deseos_amigos',component: deseos_amigos},
  {path: '/deseos_amigo',component: deseos_amigo},
  {path: '/lista_nuevo_evento',component: lista_nuevo_evento},
  {path: '/lista_domicilios',component: lista_domicilios},
  {path: '/detalle_servicio_qr',component: detalle_servicio_qr},
  {path: '/agregar_concepto_gasto',component: agregar_concepto_gasto},
  {path: '/seleccionar_usuario_eventos',component: seleccionar_usuario_eventos},
  {path: '/selecionar_usuario_evento',component: selecionar_usuario_evento},
  {path: '/deseos_usuario_evento',component: deseos_usuario_evento},
  {path: '/mis_deseos_eventos',component: mis_deseos_eventos},
  {path: '/detalle_lista',component: detalle_lista},

  {path: '/nuevo_metodo_pago',component: nuevo_metodo_pago},
  {path: '/historial_viajes',component: historial_viajes},

  //CHOFER
  {path: '/comunicados',component: comunicados},
  {path: '/detalle_comunicado',component: detalle_comunicado},

  {path: '/rutas',component: rutas},
  {path: '/detalle_ruta',component: detalle_ruta},

  {path: '/agendar_faltas',component: agendar_faltas},
  {path: '/historial_faltas',component: historial_faltas},
  {path: '/quejas_usuario',component: quejas_usuario},

  {path: '/personas_confianza',component: personas_confianza},
  {path: '/hijos_usuario',component: hijos_usuario},
  {path: '/agregar_persona_confianza',component: agregar_persona_confianza},
  {path: '/editar_persona_confianza',component: editar_persona_confianza},

  {path: '/reportes_hijos',component: reportes_hijos},
  {path: '/detalle_reporte',component: detalle_reporte},

  {path: '/rondas',component: rondas},
  {path: '/crear_ronda',component: crear_ronda},
  {path: '/seleccionar_padres_rondas',component: seleccionar_padres_rondas},

  {path: '/servicio_usuario',component: servicio_usuario},


  {path: '/inicio_coor',component: inicio_coor},
  {path: '/grados_coor',component: grados_coor},
  {path: '/grupos_coor',component: grupos_coor},
  {path: '/alumnos_coor',component: alumnos_coor},
  {path: '/agregar_acceso_terceros',component: agregar_acceso_terceros},
  {path: '/salidas_coor',component: salidas_coor},
  {path: '/ingresos_coor',component: ingresos_coor},


  {path: '/inicio_maestro',component: inicio_maestro},
  {path: '/grupos_maestro',component: grupos_maestro},
  {path: '/alumnos_maestro',component: alumnos_maestro},

  {path: '/mi_cuenta',component: mi_cuenta,},
  {path: '/editar_perfil_profesional',component: editar_perfil_profesional,},
  {path: '/metodos_pago',component: metodos_pago,},
  {path: '/agregar_metodo_pago',component: agregar_metodo_pago,},
  {path: '/editar_perfil',component: editar_perfil,},
  {path: '/editar_datos_bancarios',component: editar_datos_bancarios,},
  {path: '/cambiar_password',component: cambiar_password,},
  {path: '/mi_historial',component: mi_historial,},
  {path: '/restaurantes_favoritos',component: restaurantes_favoritos,},
  
  {path: '/acercade',component: acercade},
  {path: '/ayuda',component: ayuda},
  {path: '/aviso_privacidad',component: aviso_privacidad},
  {path: '/terminos_condiciones',component: terminos_condiciones},

  {path: '/chats',component: chats,},
  {path: '/mensajes_chat',component: mensajes_chat},
  {path: '/mensajes_grupo',component: mensajes_grupo},
  {path: '/mensajes_invitaciones',component: mensajes_invitaciones},
  {path: '/mensajes_eventos',component: mensajes_eventos},
  {path: '/mensajes_chat_ios',component: mensajes_chat_ios},
];