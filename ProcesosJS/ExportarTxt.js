/* Función para Exportar a TXT con formato estricto y validaciones */
function generarTXT() {
    // 1. Validar Flag de Contacto Actualizado
    const chkContacto = document.getElementById("chkContactoActualizado");
    if (!chkContacto.checked) {
        alert("⚠️ DEBE MARCAR LA CASILLA 'CONTACTO ACTUALIZADO' PARA EXPORTAR.");
        return; // Detiene la ejecución
    }

    // 2. Obtener Tipo de Caso (Avance / Crear)
    const tipoCaso = document.getElementById("tipoIncTxt").value; // "AVANCE" o "CREAR"
    const inc = document.getElementById("Caso").value.trim() || "INC0000000";

    // 3. Obtener Datos
    let idLlamada = document.getElementById("IdLlamada").value.trim();
    let descAuto = document.getElementById("desc_auto").value.trim();

    // Nombre completo
    let tratamiento = document.getElementById("Tratamiento").value;
    let nombre = document.getElementById("Nombre").value.trim();
    let apellido = document.getElementById("Apellido").value.trim();
    let nombreCompleto = `${tratamiento} ${nombre} ${apellido}`.trim();

    let nit = document.getElementById("dian1").value.trim();
    let empresa = document.getElementById("Empresa").value.trim();
    let direccion = document.getElementById("Direccion").value.trim();
    let celular = document.getElementById("Celular").value.trim();
    let fijo = document.getElementById("Fijo").value.trim();
    let telefonos = `${celular} / ${fijo}`.replace(" / ", "").trim(); // Formato limpio
    
    let correo = document.getElementById("Correo").value.trim();
    let ciudad = document.getElementById("Ciudad").value.trim();

    // Identificador unificado
    let idServicio = document.getElementById("Legado").value.trim();
    let acp = document.getElementById("acp").value.trim();
    let identificadorLine = "";
    if (idServicio || acp) {
        identificadorLine = `${idServicio} / ACP-${acp}`;
    }

    let snMac = document.getElementById("Legado2").value.trim();
    let observaciones = document.getElementById("observaciones").value.trim();

    // 4. Construir Contenido del TXT (Plantilla Solicitada)
    let contenido = `${tipoCaso} - ${inc}\n`; // "AVANCE - INC..." o "CREAR - INC..."
    contenido += `_________________________________________\n`;
    contenido += `ID LLAMADA: ${idLlamada}\n`;
    contenido += `DESCRIPCIÓN LLAMADA: ${descAuto}\n\n`;

    contenido += `NOMBRE: ${nombreCompleto}\n`;
    contenido += `NIT: ${nit}\n`;
    contenido += `EMPRESA: ${empresa}\n`;
    contenido += `DIRECCION: ${direccion}\n`;
    contenido += `TELEFONO: ${telefonos}\n`;
    contenido += `CORREO ELECTRONICO: ${correo}\n`;
    contenido += `CIUDAD: ${ciudad}\n`;
    contenido += `IDENTIFICADOR: ${identificadorLine}\n`;
    contenido += `SN/MAC/SW: ${snMac}\n\n`;

    contenido += `----------OBSERVACIONES----------\n`;
    if (observaciones) {
        contenido += `${observaciones}\n`;
    }

    // 5. Descargar Archivo
    let blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    let enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `${inc}.txt`;
    enlace.style.display = "none";
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}