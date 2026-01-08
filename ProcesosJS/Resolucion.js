/* =========================================================
   LÓGICA DEL SELECTOR DE RESOLUCIÓN (Paso 4)
   ========================================================= */

function selecion2() {
    var cod = document.getElementById("guiones2").value;
    var texto = "";

    // Si el código corresponde a una plantilla compleja (TT), delegar al script CrearTT.js
    if (["AGENDAMIENTO", "APERTURA_DOBLE_1", "APERTURA_DOBLE_2", "RETIRO_EMPALME", "REINGRESO_EMPALME", "APERTURA_SIMPLE"].includes(cod)) {
        if (typeof aplicarPlantillaTT === 'function') {
            aplicarPlantillaTT(cod);
        } else {
            console.error("Error: Script CrearTT.js no cargado.");
        }
        return; // Salir, ya que CrearTT se encargó
    }

    // LÓGICA ESTÁNDAR (Resoluciones simples)
    switch (cod) {
        
        case "0": // RESOLUCIÓN CAPA 3 (Actualizada)
            texto = `La causa fue: No se evidencia falla en la red de Tigo.\n\n`;
            texto += `La solución fue: Se confirma servicio con parámetros óptimos, no se evidencia falla por parte de Tigo, se confirma servicio operativo. Se recomienda validar equipos y conexiones internas.`;
            break;

        case "2": // Resolución en Blanco
            texto = "La causa fue: \n\nLa solución fue: ";
            break;

        case "3": // Sin Respuesta
            texto = "La causa fue: Sin comunicacion con el cliente. \n\nLa solución fue: Se realizaron intentos de contacto sin éxito. Se cierra el caso por falta de comunicación.";
            break;

        // Agregar más casos simples aquí si es necesario
        
        default:
            texto = "";
    }

    // Insertar en textarea
    document.getElementById("observaciones2").value = texto;
}