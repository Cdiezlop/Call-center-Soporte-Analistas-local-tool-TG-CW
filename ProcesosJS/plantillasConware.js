/* =========================================
   LÓGICA PARA DIAGNÓSTICO Y REPRUEBA (N1)
   ========================================= */

function selecion() {
    var cod = document.getElementById("guiones").value; // Selector Diagnóstico
    var texto = "";

    // 1. OBTENER INFORMACIÓN GENERAL
    
    // Título de la Tipificación (Para Diagnóstico/Reprueba)
    var comboTipificacion = document.getElementById("guionesGuion");
    var tituloTipificacion = "";
    if(comboTipificacion.selectedIndex > 0) {
        tituloTipificacion = comboTipificacion.options[comboTipificacion.selectedIndex].text;
        tituloTipificacion = capitalizeFirstOnly(tituloTipificacion);
    } else {
        tituloTipificacion = "Sin tipificación seleccionada";
    }

    // Contenido Generado en Tipificación (Para Diagnóstico/Reprueba)
    var contenidoDiagnostico = document.getElementById("observacionesGiones").value.trim();
    if (contenidoDiagnostico === "") {
        contenidoDiagnostico = "No se ha generado guión rápido.";
    }

    // VARIABLES ESPECÍFICAS PARA LLAMADAS (Entrante/Saliente)
    // Nombre Completo
    var trat = document.getElementById("Tratamiento").value;
    var nom = document.getElementById("Nombre").value.trim();
    var ape = document.getElementById("Apellido").value.trim();
    var nombreCompleto = `${trat} ${nom} ${ape}`.trim();

    // Teléfono (ANI/TEL - Campo Fijo)
    var telefono = document.getElementById("Fijo").value.trim();
    if (telefono === "") telefono = "__________";

    // Avance (Descripción Automática)
    var avance = document.getElementById("desc_auto").value.trim();
    if (avance === "") avance = "Se valida estado del servicio...";

    // ID Llamada
    var idCall = document.getElementById("IdLlamada").value.trim();

    /* =========================================
       CONSTRUCCIÓN DE PLANTILLAS
       ========================================= */
    switch (cod) {
        
        // 1. DIAGNÓSTICO N1 (Standard)
        case "1": 
            texto = `ID prueba: N/A\n`;
            texto += `Conclusión al ejecutar lista de chequeo: ${tituloTipificacion}\n`;
            texto += `Diagnóstico realizado: ${contenidoDiagnostico}\n\n`;
            texto += `Falla eléctrica: No\n\n`;
            texto += `S3GU1M13NT0_N1:d1agnostico`;
            break;

        // 3. LLAMADA ENTRANTE (Public) - ACTUALIZADO
        case "3":
            texto = `De acuerdo a la comunicación establecida, se ha registrado la llamada.\n`;
            texto += `Nombre: ${nombreCompleto}\n`;
            texto += `Teléfono: ${telefono}\n`;
            texto += `Avance: ${avance}\n\n`;
            texto += `Seguiremos gestionando su caso en pro de una solución oportuna.\n\n`;
            texto += `ID llamada: ${idCall}\n\n`;
            texto += `S3GU1M13NT0_N1:llamadadelcliente`;
            break;
            
        // 4. LLAMADA SALIENTE (Public) - ACTUALIZADO
        case "4":
            texto = `De acuerdo a la comunicación establecida, hemos registrado su llamada.\n`;
            texto += `Nombre: ${nombreCompleto}\n`;
            texto += `Teléfono: ${telefono}\n`;
            texto += `Avance: ${avance}\n\n`;
            texto += `Seguiremos gestionando su caso en pro de una solución oportuna.\n\n`;
            texto += `ID llamada: ${idCall}\n\n`;
            texto += `S3GU1M13NT0_N1:llamadaallcliente`;
            break;

        // 5. REPRUEBA (Interno)
        case "5":
            texto = `Prueba realizada: ${tituloTipificacion}\n`;
            texto += `Herramienta utilizada: N/A\n`;
            texto += `Resultado obtenido: ${contenidoDiagnostico}\n\n`;
            texto += `S3GU1M13NT0_N1:p3s3rv1c10`;
            break;
            
        // 6. CORREO ENTRANTE
        case "6":
            texto = "Se recibe correo electrónico del cliente reportando novedad. Se procede a analizar la solicitud.";
            break;

        // --- Legado ---
        case "7": texto = "Se envía correo electrónico al cliente."; break;
        case "8": texto = "Comunicación con especialista entrante."; break;
        case "9": texto = "Comunicación con especialista saliente."; break;

        default:
            texto = "";
    }

    // Insertar resultado
    document.getElementById("observaciones").value = texto;
}

// Auxiliar: Capitalizar solo la primera letra de todo el string
function capitalizeFirstOnly(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function resetCon() {
    // Función placeholder para compatibilidad con HTML "AreaConware"
}