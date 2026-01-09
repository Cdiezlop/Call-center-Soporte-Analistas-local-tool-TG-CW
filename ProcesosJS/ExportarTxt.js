/* ==========================================================================
   LÓGICA DE EXPORTACIÓN A TXT (Plantilla Estricta Actualizada)
   ========================================================================== */

function generarTXT() {
    // ---------------------------------------------------------
    // 1. VALIDACIONES DE SEGURIDAD
    // ---------------------------------------------------------
    
    // Validación A: Contacto Actualizado
    const chkContacto = document.getElementById("chkContactoActualizado");
    if (!chkContacto.checked) {
        alert("⚠️ DEBE MARCAR LA CASILLA 'CONTACTO ACTUALIZADO' PARA EXPORTAR.");
        return; 
    }

    // Validación B: Campo #CASO Obligatorio
    let numeroCasoRaw = document.getElementById("Caso").value.trim();
    if (numeroCasoRaw === "" || numeroCasoRaw === "0000000" || numeroCasoRaw === "INC0000000") {
        alert("⚠️ EL CAMPO #CASO (INC/WO) ES OBLIGATORIO.\nPor favor ingrese el número del incidente antes de exportar.");
        document.getElementById("Caso").focus();
        return;
    }

    // ---------------------------------------------------------
    // 2. OBTENCIÓN DE DATOS
    // ---------------------------------------------------------

    // A. Encabezado y Nombre de Archivo
    let prefix = "INC";
    if (document.getElementById("radWO") && document.getElementById("radWO").checked) {
        prefix = "WO";
    }
    
    let fullIncString = numeroCasoRaw.toUpperCase();
    if (!fullIncString.startsWith("INC") && !fullIncString.startsWith("WO")) {
        fullIncString = `${prefix}${numeroCasoRaw}`;
    }

    let tipoGestion = document.getElementById("tipoIncTxt").value; // AVANCE o CREAR

    // Limpieza del Resumen
    let resumenRaw = document.getElementById("ResumenGenerado").value.trim();
    let resumenClean = resumenRaw
                        .replace(/\*/g, '')
                        .replace(/–/g, ' ')
                        .replace(/-/g, ' ')
                        .trim();

    let tituloCompleto = `${fullIncString}-${tipoGestion}`;
    if (resumenClean) {
        tituloCompleto += `-${resumenClean}`;
    }

    // B. Datos Principales
    let idLlamada = document.getElementById("IdLlamada").value.trim();
    
    let tratamiento = document.getElementById("Tratamiento").value;
    let nombre = document.getElementById("Nombre").value.trim();
    let apellido = document.getElementById("Apellido").value.trim();
    let nombreCompleto = `${tratamiento} ${nombre} ${apellido}`.trim();

    let nit = document.getElementById("dian1").value.trim();
    let dv = document.getElementById("dian2").value.trim();
    let nitCompleto = dv ? `${nit}-${dv}` : nit;

    let empresa = document.getElementById("Empresa").value.trim();
    let direccion = document.getElementById("Direccion").value.trim();
    let telefono = `${document.getElementById("Celular").value.trim()} / ${document.getElementById("Fijo").value.trim()}`.replace(" / ", "").trim();
    let correo = document.getElementById("Correo").value.trim();
    let ciudad = document.getElementById("Ciudad").value.trim();

    let idServ = document.getElementById("Legado").value.trim();
    let acp = document.getElementById("acp").value.trim();
    let identificador = (idServ && acp) ? `${idServ} / ACP-${acp}` : (idServ || (acp ? `ACP-${acp}` : ""));
    
    let snMac = document.getElementById("Legado2").value.trim();

    // C. Datos Condicionales (Nuevos campos)
    let anillo = document.getElementById("anillo").value.trim();
    let ne = document.getElementById("NE").value.trim();
    let idCrm = document.getElementById("IdCrm").value.trim();
    let tt = document.getElementById("Tt").value.trim();

    // D. Secciones de Texto
    let notas = document.getElementById("nota").value.trim();
    let descripcion = document.getElementById("desc_auto").value.trim();
    let gestion = document.getElementById("observacionesGiones").value.trim();
    let resolucion = document.getElementById("observaciones2").value.trim();
    let diagnostico = document.getElementById("observaciones").value.trim();

    // ---------------------------------------------------------
    // 3. CONSTRUCCIÓN DEL CONTENIDO (Plantilla Estricta)
    // ---------------------------------------------------------

    let txt = `${tituloCompleto}\n`;
    txt += `_________________________________________\n`;
    txt += `ID LLAMADA: ${idLlamada}\n\n`;

    txt += `NOMBRE: ${nombreCompleto}\n`;
    txt += `NIT: ${nitCompleto}\n`;
    txt += `EMPRESA: ${empresa}\n`;
    txt += `DIRECCION: ${direccion}\n`;
    txt += `TELEFONO: ${telefono}\n`;
    txt += `CORREO ELECTRONICO: ${correo}\n`;
    txt += `CIUDAD: ${ciudad}\n`;
    txt += `IDENTIFICADOR: ${identificador}\n`;
    txt += `SN/MAC/SW: ${snMac}\n`; // HASTA AQUI SIEMPRE

    // Campos Condicionales (Solo si tienen valor)
    if (anillo) txt += `ANILLO: ${anillo}\n`;
    if (ne) txt += `NE: ${ne}\n`;
    
    // Espacio si hay campos CRM/TT
    if (idCrm || tt) txt += `\n`; 
    if (idCrm) txt += `ID CRM: ${idCrm}\n`;
    if (tt) txt += `TT: ${tt}\n`;

    txt += `\n\n`; // Doble salto antes de las secciones

    // --- SECCIONES ---

    txt += `==========================================\n`;
    txt += `--------------> NOTAS ADICIONALES <------------\n`;
    txt += `==========================================\n\n`;
    txt += `${notas}\n\n\n`;

    txt += `==========================================\n`;
    txt += `--------------> DESCRIPCIÓN DE LLAMADA <------------\n`;
    txt += `==========================================\n\n`;
    txt += `${descripcion}\n\n\n`;

    txt += `==========================================\n`;
    txt += `--------------> GESTION <------------\n`;
    txt += `==========================================\n\n`;
    txt += `${gestion}\n\n\n`;

    txt += `==========================================\n`;
    txt += `--------------> RESOLUCION / CIERRE <------------\n`;
    txt += `==========================================\n\n`;
    txt += `${resolucion}\n\n\n`;

    txt += `==========================================\n`;
    txt += `--------------> DIAGNÓSTICO Y SOPORTE <------------\n`;
    txt += `==========================================\n\n`;
    txt += `${diagnostico}\n`;

    // ---------------------------------------------------------
    // 4. DESCARGAR
    // ---------------------------------------------------------
    
    let blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    let enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `${tituloCompleto}.txt`;
    enlace.style.display = "none";
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}