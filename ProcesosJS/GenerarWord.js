/* ARCHIVO: ProcesosJS/GenerarWord.js
   DESCRIPCIÓN: Lógica para leer plantilla .docx y generar reporte con FECHA y HORA.
*/

// --- 1. GUARDAR PLANTILLA ---
function guardarPlantilla() {
    const input = document.getElementById('inputPlantillaWord');
    const estado = document.getElementById('estadoPlantilla');
    
    if (!input || input.files.length === 0) {
        alert("⚠️ Selecciona un archivo .docx primero.");
        return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            localStorage.setItem('plantillaWordBase64', e.target.result);
            if(estado) {
                estado.innerText = "✅ Plantilla guardada localmente";
                estado.style.color = "green";
            }
            alert("✅ Plantilla actualizada correctamente.");
        } catch (error) {
            alert("❌ Error guardando: El archivo es muy pesado para el navegador.");
        }
    };
    reader.readAsDataURL(file);
}

// --- 2. GENERAR WORD ---
function generarWord() {
    console.log("Iniciando script de generación...");

    // A. VERIFICAR LIBRERÍAS
    if (typeof PizZip === 'undefined') {
        alert("❌ ERROR: No encuentro el archivo 'pizzip.js'. Verifica que esté en la carpeta ProcesosJS.");
        return;
    }
    const Templater = window.docxtemplater || window.Docxtemplater;
    if (typeof Templater === 'undefined') {
        alert("❌ ERROR: No encuentro el archivo 'docxtemplater.js'.");
        return;
    }
    if (typeof saveAs === 'undefined') {
        alert("❌ ERROR: No encuentro el archivo 'FileSaver.js'.");
        return;
    }

    // B. DATOS
    let numeroCaso = document.getElementById('Caso').value.trim();
    if (!numeroCaso) numeroCaso = "CASO_SIN_NUMERO";
    
    // Limpieza de nombre de archivo (quitar / para que no falle la descarga)
    const nombreArchivo = numeroCaso.replace(/[\/\\]/g, "_");

    let usuarioActual = document.getElementById('user').value.trim();
    if (!usuarioActual) usuarioActual = localStorage.getItem("user") || "Usuario";
    
    // --- CAMBIO AQUÍ: FECHA CON HORA ---
    const hoy = new Date();
    const fechaFormateada = hoy.toLocaleString('es-ES', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Formato 24h (Ej: 14:30)
    }).replace(',', ''); // Elimina la coma si el navegador la pone (dd/mm/yyyy, hh:mm -> dd/mm/yyyy hh:mm)

    // C. RECUPERAR PLANTILLA
    const plantillaBase64 = localStorage.getItem('plantillaWordBase64');
    if (!plantillaBase64) {
        alert("⚠️ No hay plantilla cargada. Ve al engranaje ⚙️ y sube el archivo .docx.");
        return;
    }

    // D. PROCESAR
    try {
        // 1. Decodificar
        const base64Content = plantillaBase64.split(',')[1];
        const binaryString = window.atob(base64Content);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // 2. Crear ZIP
        const zip = new PizZip(bytes);

        // 3. Crear Documento
        const doc = new Templater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // 4. Reemplazar variables (Render)
        doc.render({
            fecha: fechaFormateada, // Ahora incluye la hora
            login: usuarioActual,
            caso: numeroCaso
        });

        // 5. Generar Blob
        const out = doc.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        // 6. Descargar
        saveAs(out, `${nombreArchivo}.docx`);

    } catch (error) {
        console.error("Error:", error);
        if (error.properties && error.properties.errors) {
            const errores = error.properties.errors.map(e => e.properties.explanation).join("\n");
            alert("🛠️ ERROR DE FORMATO EN TU WORD:\n" + errores);
        } else {
            alert("🛠️ ERROR TÉCNICO:\n" + error.message);
        }
    }
}

// --- 3. INICIO ---
document.addEventListener('DOMContentLoaded', () => {
   const estado = document.getElementById('estadoPlantilla');
   if(estado && localStorage.getItem('plantillaWordBase64')) {
       estado.innerText = "✓ Plantilla lista en memoria";
       estado.style.color = "#0d6efd";
   }
});