
// limpiar el el btn guion y lo que esta en observaciones
const btnDeleteGuiones = document.getElementById('btnDeleteGuiones');
btnDeleteGuiones.addEventListener('click',()=>{
  document.getElementById("guiones").selectedIndex = "";
  document.getElementById("AreaConware").selectedIndex = "";
  document.getElementById("observaciones").value ="";
})


// eliminar espacios y :
limpiarEntrada(Caso);
limpiarEntrada(dian1);
limpiarEntrada(IdLlamada);
limpiarEntrada(Celular);
limpiarEntrada(Legado);
limpiarEntrada(Legado2);
limpiarEntrada(switch1);
limpiarEntrada(NE);
limpiarEntrada(Correo);

function limpiarEntrada(input) {
  input.addEventListener("input", e => {
    let string = e.target.value;
    string = string.replace(/[ :	]/g, "");
    e.target.value = string;
  });
}

// funcion para evitar ctrl+s
document.addEventListener("keydown", function(event) {
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault(); // evita el comportamiento predeterminado del navegador
    // código para guardar la información o enviarla al servidor
  }
});

// convertir a mayusculas
function mayus(e) {
  e.value = e.value.toUpperCase(); 
}

// convertir a mayusculas
function minus(e) {
  e.value = e.value.toLowerCase(); 
}

//fecha 
function fecha(){
  var fecha = new Date();
  var year = fecha.getFullYear();
  var mes=fecha.getMonth()+1;
  var dia=diaFecha(fecha.getDate());
  navigator.clipboard.writeText(dia+"/0"+mes+"/"+year);
}

// con esta funcion el texto queda selecionado
function copyToClipBoard(parametro) {
  var texto = document.getElementById(parametro);
  texto.select();
  document.execCommand("copy");
}

// capturar sintexto Entra btnDeleteGuiones
function captura(parametro) {
  var codigoACopiar = document.getElementById(parametro);
  navigator.clipboard.writeText(codigoACopiar.value);
}


//borra un solo texto deliteTextbox
function deliteTextbox(param,param2){
  document.getElementById(param).value = "";
  var input = document.getElementById(param);
  input.focus();
  document.getElementById(param2).value = "";
}


//borra un texto y volver a colocar guiones conware y texto en blanco
function deliteTextbox2(param){
  deliteTextbox(param)
  
}

//borra todo
function borrarTodo(){
  var elementos= ["Caso","Nombre","IdLlamada","switch1","NE","Celular","Legado","dian1","Legado2","observaciones","observaciones2","nota","Correo","Direccion","acp","anillo","observacionesGiones"];

  for(let i=0;i<elementos.length;i++){
    var item=elementos[i];
    document.getElementById(item).value = "";
  }
  document.getElementById("guiones").selectedIndex = "";
  document.getElementById("guiones2").selectedIndex = "";
  document.getElementById("guionesGuion").selectedIndex = "";
  document.getElementById("nota").value = "Usuario se contacta indicando que no le funciona el servicio de internet, afirma haber realizado descartes de primer nivel, adicional se detecta led lost encendido."+"\n"+"\n"+"Usuario se contacta indicando que esta presentando intermitencia en el servicio de internet, afirma haber realizado descartes de primer nivel.";
  document.getElementById("dian2").value = "";
  document.getElementById("AreaConware").selectedIndex = "";

}

//generar documentacion
function capturarTodo() {
  let observaciones = document.getElementById("observaciones").value;
  //enviar toda la informacion capturada  a la plantilla
  document.getElementById("plantilla").value = observaciones;
  copyToClipBoard("plantilla");
  document.getElementById("btGenerar").innerHTML ="Generado!";
  setTimeout(resGenerar,1000);
 
}

//funcion notificacion de copiado temporal
function resGenerar(){
  document.getElementById("btGenerar").innerHTML ="Generar"
}

function resMSS(){
  document.getElementById("btMssP").innerHTML ="MSS"
}

//convertir numero del mes en mes texto

function converMonth(mes){
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return meses[mes];
}

function diaFecha (dia){
if(dia<10){
  return "0"+dia
}else{
  return dia
}
}



// convertir mayus login btnDeleteGuiones
function loginMayuscula() {
  var saveUser = localStorage.getItem("user"); // Obtener el valor almacenado en localStorage
  if (saveUser) { // Verificar si hay un valor guardado
    saveUser = mayus2(saveUser); // Convertir a mayúsculas
    copiarAlPortapapeles(saveUser); // Copiar al portapapeles
    console.log("Usuario copiado al portapapeles: " + saveUser); // Opcional: para ver el resultado
  } else {
    console.log("No hay un usuario guardado.");
  }
}

function mayus2(cadena) {
  return cadena.toUpperCase(); // Convertir la cadena a mayúsculas
}

function copiarAlPortapapeles(texto) {
  navigator.clipboard.writeText(texto).then(function() {
    console.log("Texto copiado al portapapeles exitosamente.");
  }, function(err) {
    console.error("Error al copiar el texto: ", err);
  });
}

//agregar @une
function loginAgregarUne() {
  var saveUser = localStorage.getItem("user"); // Obtener el valor almacenado en localStorage
  if (saveUser) { // Verificar si hay un valor guardado
    saveUser = agregarUne(saveUser); // Agregar @une al final
    copiarAlPortapapeles2(saveUser); // Copiar al portapapeles
    console.log("Usuario modificado y copiado al portapapeles: " + saveUser); // Ver el resultado
  } else {
    console.log("No hay un usuario guardado.");
  }
}

function agregarUne(cadena) {
  return cadena + "@une"; // Agregar @une al final de la cadena
}

//copiar al portapapeles botones
function copiarAlPortapapeles2(texto) {
  navigator.clipboard.writeText(texto).then(function() {
    console.log("Texto copiado al portapapeles exitosamente.");
  }, function(err) {
    console.error("Error al copiar el texto: ", err);
  });
}


//funcion para copiar reporte en seabel
function reporteSeabel(){
  // Obtiene los valores de los dos campos
  const numeroIncidente = document.getElementById('Caso').value;
  const observaciones = document.getElementById('observaciones').value;

  // Combina los valores en un solo texto
  const textoCombinado = `Número de Incidente: ${numeroIncidente}\n ${observaciones}`;

  copiarAlPortapapeles2(textoCombinado)
}



// actualizar titulo
function actualizarTitulo() {
            const input = document.getElementById("Caso").value;
            const inputIdLlamada = document.getElementById("IdLlamada").value;
            
            if (input.trim() !== "") {
                document.title = input + " ** " + inputIdLlamada;

            } else {
                document.title = inputIdLlamada;
            }
        }



function capitalizar(input) {
    let palabras = input.value.toLowerCase().split(" ");
    for (let i = 0; i < palabras.length; i++) {
        if (palabras[i].length > 0) {
            palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substring(1);
        }
    }
    input.value = palabras.join(" ");
}