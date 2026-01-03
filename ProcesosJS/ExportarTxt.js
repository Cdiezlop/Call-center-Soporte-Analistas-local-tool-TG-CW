
/* titulo*/


function generarTXT() {
  let INC = document.getElementById("Caso").value.trim() || "archivo";
  let nombre = document.getElementById("Nombre").value.trim();
  let nit = document.getElementById("dian1").value.trim();
  let IdLlamada = document.getElementById("IdLlamada").value.trim();
  let Celular = document.getElementById("Celular").value.trim();
  let Correo = document.getElementById("Correo").value.trim();
  let Direccion = document.getElementById("Direccion").value.trim();
  let Legado = document.getElementById("Legado").value.trim();
  let Legado2 = document.getElementById("Legado").value.trim();
  let acp = document.getElementById("acp").value.trim();
  let NE = document.getElementById("NE").value.trim();
  let nota = document.getElementById("nota").value.trim();
  let observaciones = document.getElementById("observaciones").value.trim();
  let observaciones2 = document.getElementById("observaciones2").value.trim();


  // Reemplazar caracteres no válidos en nombres de archivo
  INC = INC.replace(/[^a-zA-Z0-9-_]/g, "_");

  let texto = `Numero de incidente: ${INC}\nNombre: ${nombre}\nNit: ${nit}\ID llamada: \n${IdLlamada}\nCelular:\n${Celular}\nCorreo: ${Correo}\nDireccion: ${Direccion}\nID servicio: ${Legado}\nEquipo: ${Legado2}\nACP: ${acp}\Switch: \nNE: ${NE}\n\nNotas: ${nota}\n\nDiagnostico: ${observaciones}\n\nResolucion: ${observaciones2}`;

  let blob = new Blob([texto], { type: "text/plain" });
  let enlace = document.createElement("a");

  enlace.href = URL.createObjectURL(blob);
  enlace.download = INC + ".txt";
  enlace.style.display = "none";
  document.body.appendChild(enlace);

  enlace.click();
  document.body.removeChild(enlace);
}