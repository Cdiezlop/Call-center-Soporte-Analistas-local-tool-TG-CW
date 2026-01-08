/* ==========================================================================
   LÓGICA DE EXPORTACIÓN A TXT (Plantilla Estricta)
   ========================================================================== */

function generarTXT() {
    // ---------------------------------------------------------
    // 1. VALIDACIONES DE SEGURIDAD
    // ---------------------------------------------------------
    
    // Validación A: Contacto Actualizado
    const chkContacto = document.getElementById("chkContactoActualizado");
    if (!chkContacto.checked) {
        alert(" DEBE MARCAR LA CASILLA 'CONTACTO ACTUALIZADO' PARA EXPORTAR.");
        return; 
    }

    // Validación B: Campo #CASO Obligatorio (Nuevo Requerimiento)
    let numeroCasoRaw = document.getElementById("Caso").value.trim();
    // Validamos que no esté vacío y que no sea el placeholder por defecto si el usuario no lo cambió
    if (numeroCasoRaw === "" || numeroCasoRaw === "0000000" || numeroCasoRaw === "INC0000000") {
        alert(" EL CAMPO #CASO (INC/WO) ES OBLIGATORIO.\nPor favor ingrese el número del incidente antes de exportar.");
        document.getElementById("Caso").focus();
        return;
    }

    // ---------------------------------------------------------
    // 2. OBTENCIÓN Y LIMPIEZA DE DATOS
    // ---------------------------------------------------------

    // A. Datos del Caso (INC/WO)
    let prefix = "INC";
    if (document.getElementById("radWO") && document.getElementById("radWO").checked) {
        prefix = "WO";
    }
    
    let fullIncString = numeroCasoRaw.toUpperCase();
    // Si el usuario ya escribió el prefijo, no lo duplicamos
    if (!fullIncString.startsWith("INC") && !fullIncString.startsWith("WO")) {
        fullIncString = `${prefix}${numeroCasoRaw}`;
    }

    let tipoGestion = document.getElementById("tipoIncTxt").value; // AVANCE o CREAR

    // B. Limpieza del Resumen para el Título
    let resumenRaw = document.getElementById("ResumenGenerado").value.trim();
    let resumenClean = resumenRaw
                        .replace(/\*/g, '')       // Quitar asterisco
                        .replace(/–/g, ' ')       // Reemplazar guion largo por espacio
                        .replace(/-/g, ' ')       // Reemplazar guion corto por espacio
                        .trim();

    // C. Título del Archivo
    let tituloCompleto = `${fullIncString}-${tipoGestion}`;
    if (resumenClean) {
        tituloCompleto += `-${resumenClean}`;
    }

    // D. Datos de Contacto
    let tratamiento = document.getElementById("Tratamiento").value;
    let nombre = document.getElementById("Nombre").value.trim();
    let apellido = document.getElementById("Apellido").value.trim();
    let nombreCompleto = `${tratamiento} ${nombre} ${apellido}`.trim();

    let nit = document.getElementById("dian1").value.trim();
    let digitoVerificacion = document.getElementById("dian2").value.trim();
    let nitCompleto = nit;
    if (digitoVerificacion) {
        nitCompleto = `${nit}-${digitoVerificacion}`;
    }

    let empresa = document.getElementById("Empresa").value.trim();
    let direccion = document.getElementById("Direccion").value.trim();
    let ciudad = document.getElementById("Ciudad").value.trim();
    let correo = document.getElementById("Correo").value.trim();
    
    let celular = document.getElementById("Celular").value.trim();
    let fijo = document.getElementById("Fijo").value.trim();
    let telefonos = `${celular} / ${fijo}`.replace(" / ", "").trim();

    // E. Datos Técnicos
    let idLlamada = document.getElementById("IdLlamada").value.trim();
    let idServicio = document.getElementById("Legado").value.trim();
    let acp = document.getElementById("acp").value.trim();
    let identificadorLine = "";
    if (idServicio || acp) identificadorLine = `${idServicio} / ACP-${acp}`;
    
    let snMac = document.getElementById("Legado2").value.trim();

    // F. Secciones de Texto
    let notasAdicionales = document.getElementById("nota").value.trim();
    let descLlamada = document.getElementById("desc_auto").value.trim();
    let gestionTipificacion = document.getElementById("observacionesGiones").value.trim(); 
    let resolucion = document.getElementById("observaciones2").value.trim(); 
    let diagnostico = document.getElementById("observaciones").value.trim(); 

    // ---------------------------------------------------------
    // 3. CONSTRUCCIÓN DE LA PLANTILLA
    // ---------------------------------------------------------
    
    let contenido = `${tituloCompleto}\n`;
    contenido += `_________________________________________\n`;
    contenido += `ID LLAMADA: ${idLlamada}\n\n`;
    
    contenido += `NOMBRE: ${nombreCompleto}\n`;
    contenido += `NIT: ${nitCompleto}\n`;
    contenido += `EMPRESA: ${empresa}\n`;
    contenido += `DIRECCION: ${direccion}\n`;
    contenido += `TELEFONO: ${telefonos}\n`;
    contenido += `CORREO ELECTRONICO: ${correo}\n`;
    contenido += `CIUDAD: ${ciudad}\n`;
    contenido += `IDENTIFICADOR: ${identificadorLine}\n`;
    contenido += `SN/MAC/SW: ${snMac}\n\n`;

    // Secciones fijas
    
    contenido += `---------- Notas adicionales ----------\n`;
    contenido += `${notasAdicionales}\n\n\n`; 

    contenido += `---------- Descripción de Llamada ----------\n`;
    contenido += `${descLlamada}\n\n\n`;

    contenido += `---------- Gestion ----------\n`;
    contenido += `${gestionTipificacion}\n\n\n`;

    contenido += `---------- Resolucion / Cierre ---------\n`;
    contenido += `${resolucion}\n\n\n`;

    contenido += `---------- Diagnóstico y Soporte ----------\n`;
    contenido += `${diagnostico}\n`;

    // ---------------------------------------------------------
    // 4. DESCARGAR ARCHIVO
    // ---------------------------------------------------------
    
    let filename = `${tituloCompleto}.txt`;

    let blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    let enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = filename;
    enlace.style.display = "none";
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}