//var obj_json;
/* alert("a");*/
var contador = 1;
var incremento = 1;
var num = 0;
var obj_json = 0;
 //alert("b");

function procesar(){
 //alert("a");
 var txt_json = document.frm_datos_fichas.txtarea_datos_fichas.value;
 obj_json = JSON.parse(txt_json);
 //alert("b" + contador);
 //var pregunta = obj_json.fichas.tabla_palabras[1].es;
 //alert("c" + contador);
 document.getElementById('fichas').innerHTML = "<a href=\"#\" onclick=\"preguntar(); return false;\"><b>empezar</b></a>";
 num = obj_json.fichas.tabla_palabras.length;
 incremento = obj_json.fichas.salto;
}

function preguntar(){
 var pregunta = obj_json.fichas.tabla_palabras[contador].es;
 var relleno = "";
 for(var i=0; i<obj_json.fichas.respuestas.length; i++){
  relleno = relleno + "<div>&nbsp;</div>";
 }
 document.getElementById('fichas').innerHTML = "<a href=\"#\" onclick=\"responder(); return false;\"><b>Respuesta</b></a>" + "<div><div>" + pregunta + "</div>" + "<div><div>" + relleno + "</div>";
}

function responder(){
 var pregunta = obj_json.fichas.tabla_palabras[contador][obj_json.fichas.preguntas];
 //var respuestas = new Array();
 //alert("sss" + obj_json.fichas.respuestas[0]);
 txt_respuestas = "";
 for (var i=0; i<obj_json.fichas.respuestas.length ; i++){
  //respuestas.push(obj_json.fichas.tabla_palabras[contador][obj_json.fichas.respuestas[i]]);
  txt_respuestas = txt_respuestas + "<div>" + obj_json.fichas.tabla_palabras[contador][obj_json.fichas.respuestas[i]] + "</div>";
 }
 /*respuestas.push(obj_json.fichas.tabla_palabras[contador].en);
 respuestas.push(obj_json.fichas.tabla_palabras[contador].fr);
 respuestas.push(obj_json.fichas.tabla_palabras[contador].ge);*/

 document.getElementById('fichas').innerHTML = "<a href=\"#\" onclick=\"preguntar(); return false;\"><b>Siguiente</b></a>" + "<div><div>" + pregunta + "</div>" + txt_respuestas + "</div>";
 contador += incremento;
 if (contador >= num){
  contador -= num;
 }
 //alert("d" + contador);
}




function cargar_fichas(fichero){
 var xmlhttp;
 if (window.XMLHttpRequest){   // code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
 }else{// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
 }
 xmlhttp.onreadystatechange=function(){
  if (xmlhttp.readyState==4 && xmlhttp.status==200){
   document.frm_datos_fichas.txtarea_datos_fichas.value = xmlhttp.responseText; // document.getElementById("vel").innerHTML
   procesar();
  }
 }
 xmlhttp.open("GET", fichero, true);
 xmlhttp.send();
}