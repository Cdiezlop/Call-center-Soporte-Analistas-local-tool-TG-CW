/* =========================================
   LÓGICA PARA DIAGNÓSTICO Y REPRUEBA (N1)
   ========================================= */

function selecion() {
    var cod = document.getElementById("guiones").value; // Selector Diagnóstico
    var texto = "";

    // 1. Obtener Título de la Tipificación (Capitalizado)
    var comboTipificacion = document.getElementById("guionesGuion");
    var tituloTipificacion = "";
    
    if(comboTipificacion.selectedIndex > 0) {
        tituloTipificacion = comboTipificacion.options[comboTipificacion.selectedIndex].text;
        // Capitalizar solo la primera letra (Ej: "NO NAVEGA" -> "No navega")
        tituloTipificacion = capitalizeFirstOnly(tituloTipificacion);
    } else {
        tituloTipificacion = "Sin tipificación seleccionada";
    }

    // 2. Obtener Contenido Generado (Del paso 2)
    var contenidoDiagnostico = document.getElementById("observacionesGiones").value.trim();
    if (contenidoDiagnostico === "") {
        contenidoDiagnostico = "No se ha generado guión rápido.";
    }

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

        // 3. LLAMADA ENTRANTE (Public)
        case "3":
            texto = "Se recibe llamada del cliente, se valida titularidad. Se procede a realizar validaciones de seguridad y soporte técnico.";
            break;
            
        // 4. LLAMADA SALIENTE (Public)
        case "4":
            texto = "Se realiza llamada al cliente para validar estado del servicio y confirmar operatividad.";
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