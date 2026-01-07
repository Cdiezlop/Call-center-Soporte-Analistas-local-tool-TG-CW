/* ==========================================================================
   LÓGICA DE PROCESAMIENTO DE DATAFRAME (CSV)
   ========================================================================== */

let globalDataframe = []; // Variable para almacenar los datos del CSV cargado

/**
 * Función que se ejecuta cuando el usuario selecciona el archivo CSV.
 * Parsea el archivo y lo guarda en la variable global.
 */
function manejarCargaDataframe(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        globalDataframe = csvToJson(text);
        alert(`Dataframe cargado correctamente: ${globalDataframe.length} registros procesados.`);
        console.log("Dataframe cargado:", globalDataframe); // Para depuración
    };
    reader.readAsText(file, "ISO-8859-1"); // Codificación para tildes si es necesario
}

/**
 * Convierte el texto CSV (delimitado por ;) a un Array de Objetos
 */
function csvToJson(csv) {
    const lines = csv.split("\n");
    const result = [];
    // Obtener cabeceras y limpiar retornos de carro (\r)
    const headers = lines[0].split(";").map(h => h.trim().replace(/\r/g, ""));

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i]) continue;
        const obj = {};
        const currentline = lines[i].split(";");

        for (let j = 0; j < headers.length; j++) {
            // Asignar valor a la cabecera correspondiente, limpiando espacios y comillas
            let val = currentline[j] ? currentline[j].trim().replace(/\r/g, "") : "";
            // Quitar comillas dobles extras si las trae el CSV
            val = val.replace(/^"|"$/g, ''); 
            obj[headers[j]] = val;
        }
        result.push(obj);
    }
    return result;
}

/**
 * Función Principal: Ejecutada por el botón "Actualizar/Cargar" en el campo NE.
 * Busca según las 4 reglas de prioridad.
 */
function cargarDataframe() {
    if (globalDataframe.length === 0) {
        alert("⚠️ No se ha cargado el archivo Dataframe. Por favor, cárguelo desde el menú de Configuración.");
        return;
    }

    // 1. Obtener valores de búsqueda
    // "acp" es el ID del campo ACP
    // "Legado" es el ID del campo ID Servicio
    const valAcp = document.getElementById("acp").value.trim();
    const valIdServ = document.getElementById("Legado").value.trim();

    if (!valAcp && !valIdServ) {
        alert("Ingrese un ACP o ID Servicio para buscar.");
        return;
    }

    let encontrado = null;
    let metodoEncontrado = "";
    let otrasIPs = [];

    // --- REGLA 1: ACP en columna IDENTIFICADOR (Exacto) ---
    if (valAcp) {
        // Buscamos TODOS los que coincidan para sacar "Otras IPs"
        const coincidenciasAcp = globalDataframe.filter(row => row["IDENTIFICADOR"] === valAcp);
        
        if (coincidenciasAcp.length > 0) {
            encontrado = coincidenciasAcp[0]; // Tomamos el primero
            metodoEncontrado = "ACP en IDENTIFICADOR";
            
            // Si hay más de uno, guardamos las IPs de los demás
            if (coincidenciasAcp.length > 1) {
                otrasIPs = coincidenciasAcp.slice(1).map(row => row["IP Gestion NE"]).filter(ip => ip);
            }
        }
    }

    // --- REGLA 2: ID Serv en columna IDENTIFICADOR (Exacto) ---
    // Solo si no se encontró en Regla 1
    if (!encontrado && valIdServ) {
        const match = globalDataframe.find(row => row["IDENTIFICADOR"] === valIdServ);
        if (match) {
            encontrado = match;
            metodoEncontrado = "ID Serv en IDENTIFICADOR";
        }
    }

    // --- REGLA 3: ACP en columna Interface Description (Contiene) ---
    // Solo si no se encontró en 1 o 2
    if (!encontrado && valAcp) {
        const match = globalDataframe.find(row => 
            row["Interface Description"] && row["Interface Description"].includes(valAcp)
        );
        if (match) {
            encontrado = match;
            metodoEncontrado = "ACP en Interface Description";
        }
    }

    // --- REGLA 4: ID Serv en columna Interface Description (Contiene) ---
    // Solo si no se encontró en 1, 2 o 3
    if (!encontrado && valIdServ) {
        const match = globalDataframe.find(row => 
            row["Interface Description"] && row["Interface Description"].includes(valIdServ)
        );
        if (match) {
            encontrado = match;
            metodoEncontrado = "ID Serv en Interface Description";
        }
    }

    // --- RESULTADOS ---
    const inputNE = document.getElementById("NE");
    const inputAnillo = document.getElementById("anillo");
    const areaNotas = document.getElementById("nota");

    if (encontrado) {
        console.log(`Encontrado por: ${metodoEncontrado}`, encontrado);

        // 1. Llenar NE (IP Gestion NE)
        const ipNe = encontrado["IP Gestion NE"] || "";
        inputNE.value = ipNe !== "" ? ipNe : "Campo vacío en CSV";

        // 2. Llenar Anillo
        const anillo = encontrado["ANILLO"] || "";
        if (inputAnillo) inputAnillo.value = anillo;

        // 3. Llenar Notas Adicionales
        let infoExtra = "\n--- DATOS DATAFRAME ---\n";
        
        // Otras IPs (Solo si aplica Regla 1 y hay múltiples)
        if (otrasIPs.length > 0) {
            infoExtra += `OTRAS IP DE NE: ${otrasIPs.join(", ")}\n`;
        } else {
            // Si la logica dice "deja vacio" no agregamos la línea o la dejamos vacía
            // infoExtra += `OTRAS IP DE NE: \n`; 
        }

        infoExtra += `INTERFACE NAME: ${encontrado["Interface Name"] || ""}\n`;
        infoExtra += `NE NAME: ${encontrado["Ne Name"] || ""}\n`;
        infoExtra += `INTERFACE DESCRIPTION: ${encontrado["Interface Description"] || ""}\n`;

        // Agregar al final del textarea de notas existente
        areaNotas.value += infoExtra;

    } else {
        // No se encontró
        inputNE.value = "No se encontro informacion";
        // Limpiar anillo si se desea o dejarlo quieto
        // inputAnillo.value = ""; 
        console.log("No se encontró información en Dataframe.");
    }
}