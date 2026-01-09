/* ==========================================
   LÓGICA GENERAL Y UTILITARIOS
   ========================================== */

function mayus(e) { e.value = e.value.toUpperCase(); }
function minus(e) { e.value = e.value.toLowerCase(); }

function capitalizar(input) {
    let palabras = input.value.toLowerCase().split(" ");
    for (let i = 0; i < palabras.length; i++) {
        if (palabras[i].length > 0) {
            palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substring(1);
        }
    }
    input.value = palabras.join(" ");
}

/* Copiar al portapapeles */
function copyToClipBoard(id) {
    var elemento = document.getElementById(id);
    if (elemento) {
        elemento.select();
        document.execCommand("copy");
    }
}

/* Captura para botones del Header */
function captura(parametro) {
    if (parametro === 'Arris') {
        generarPassArris();
        return;
    }
    var elemento = document.getElementById(parametro);
    if (elemento) {
        navigator.clipboard.writeText(elemento.value);
    }
}

// FORMATO DE FECHA: DD/MM/AAAA HH:MM
function fecha() {
    var fecha = new Date();
    var year = fecha.getFullYear();
    var mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    var dia = fecha.getDate().toString().padStart(2, '0');
    var hora = fecha.getHours().toString().padStart(2, '0');
    var min = fecha.getMinutes().toString().padStart(2, '0');
    
    var fechaCompleta = `${dia}/${mes}/${year} ${hora}:${min}`;
    navigator.clipboard.writeText(fechaCompleta);
}

function copiarNombreCompleto() {
    let nom = document.getElementById("Nombre").value.trim();
    let ape = document.getElementById("Apellido").value.trim();
    let completo = "";
    if(nom && ape) completo = `${nom} ${ape}`;
    else completo = nom + ape;
    navigator.clipboard.writeText(completo);
}

/* ==========================================
   LÓGICA INC / WO (Auto-llenado)
   ========================================== */
function seleccionarTipoCaso(tipo) {
    let inputCaso = document.getElementById("Caso");
    if(tipo === 'INC') {
        // Solo sobrescribe si está vacío o tiene el valor por defecto
        if(inputCaso.value === "" || inputCaso.value.startsWith("WO")) inputCaso.value = "INC000000";
    } else if (tipo === 'WO') {
        if(inputCaso.value === "" || inputCaso.value.startsWith("INC")) inputCaso.value = "WO0000000";
    }
    // Actualizar monitor de color
    if(inputCaso.classList.contains('status-monitor')) {
        inputCaso.classList.remove('is-empty');
        inputCaso.classList.add('is-filled');
    }
}

/* ==========================================
   DESCRIPCIÓN AUTOMÁTICA (Lógica Avanzada)
   ========================================== */
function actualizarDescripcionAuto() {
    // 1. Determinar Tipo de Plantilla (Select de la derecha)
    let tipoPlantilla = document.getElementById("sel_plantilla_desc") ? document.getElementById("sel_plantilla_desc").value : "REGISTRAR";
    
    if(!tipoPlantilla) tipoPlantilla = "REGISTRAR";

    // 2. Obtener Datos Básicos
    let tratamiento = document.getElementById("Tratamiento").value; 
    let nombre = document.getElementById("Nombre").value.trim();
    let apellido = document.getElementById("Apellido").value.trim();
    
    let sujeto = (tratamiento === 'Sr') ? 'el señor' : 'la señora';
    let nombrePila = (nombre === "") ? "_______" : nombre; // Solo nombre en el saludo, apellido opcional si se quiere agregar

    let texto = "";

    // 3. Lógica según Plantilla
    switch(tipoPlantilla) {
        
        case "REGISTRAR":
            // Obtener Causa y Servicio de la izquierda (Radio Buttons)
            let causa = getRadioValue("res_causa"); // Sin servicio, Lentitud, Intermitencia
            let servicio = getRadioValue("res_servicio"); // Internet, Television, Telefonia, Movilidad
            let tiempo = document.getElementById("TiempoSinServicio").value.trim();
            if (tiempo === "") tiempo = "_______";

            // Construcción gramatical compleja
            let estadoServicio = "";

            if (!causa || !servicio) {
                estadoServicio = "__ en el servicio de __";
            } else {
                // Lógica de reemplazo solicitada
                if (servicio === "Internet") {
                    if (causa === "Sin servicio") estadoServicio = "se encuentra sin servicio de internet";
                    if (causa === "Lentitud") estadoServicio = "se encuentra con lentitud en el servicio de Internet";
                    if (causa === "Intermitencia") estadoServicio = "presenta intermitencia en el servicio de Internet";
                }
                else if (servicio === "Television") { 
                    if (causa === "Sin servicio") estadoServicio = "se encuentra sin servicio de televisión";
                    if (causa === "Lentitud") estadoServicio = "se encuentra con lentitud en el servicio de televisión";
                    if (causa === "Intermitencia") estadoServicio = "presenta intermitencia en el servicio de televisión";
                }
                else if (servicio === "Telefonia") {
                    if (causa === "Sin servicio") estadoServicio = "se encuentra sin servicio de telefonía";
                    if (causa === "Lentitud") estadoServicio = "se encuentra con lentitud en el servicio de telefonía";
                    if (causa === "Intermitencia") estadoServicio = "presenta intermitencia en el servicio de telefonía";
                }
                else if (servicio === "Movilidad") {
                    if (causa === "Sin servicio") estadoServicio = "se encuentra sin servicio de Movilidad";
                    if (causa === "Lentitud") estadoServicio = "se encuentra con lentitud en el servicio de Movilidad";
                    if (causa === "Intermitencia") estadoServicio = "presenta intermitencia en el servicio de Movilidad";
                }
            }

            // Construir frase base
            texto = `Se comunica ${sujeto} ${nombrePila} indicando que ${estadoServicio} hace ${tiempo}. `;

            // Agregar Flags (Estado técnico - CORREGIDO A MINÚSCULAS)
            texto += `Confirma que `;
            
            let cambios = document.getElementById("chk_cambios").checked ? "no se han realizado cambios recientes" : "se han realizado cambios recientes";
            let reinicio = document.getElementById("chk_reinicio").checked ? "reinició módem y equipos" : "no ha reiniciado módem y equipos";
            let conexiones = document.getElementById("chk_conexiones").checked ? "revisó conexiones físicas" : "no ha revisado conexiones físicas";
            let electricas = document.getElementById("chk_electricas").checked ? "sin fallas eléctricas en empresa ni zona" : "reporta fallas eléctricas";
            let disp = document.getElementById("chk_dispositivos").checked ? "afecta a todos los dispositivos" : "no afecta a todos los dispositivos";

            texto += `${cambios}, ${reinicio}, ${conexiones}, ${electricas}, ${disp}.`;
            break;

        case "AVANCE_MASIVA":
            texto = `Se comunica ${sujeto} ${nombrePila} solicitando información sobre los avances de su caso. Se le informa que el reporte está asociado a una falla masiva, el equipo responsable trabaja en su solución y se confirman los datos de contacto para seguimiento en el menor tiempo posible.`;
            break;

        case "AVANCE_INFRA":
            texto = `Se comunica ${sujeto} ${nombrePila} solicitando información sobre los avances de su caso. Se le informa que el reporte fue escalado a infraestructura; se confirman los datos de contacto y se indica que está en proceso para dar solución en el menor tiempo posible.`;
            break;

        case "AVANCE_TERRENO_VISITA":
            texto = `Se comunica ${sujeto} ${nombrePila} solicitando información sobre los avances de su caso. Se le informa que el reporte fue asignado para atención en terreno mediante visita técnica; se brinda información de la agenda y se confirman los datos de contacto para el seguimiento en el menor tiempo posible.`;
            break;

        case "AVANCE_TERRENO_CONFIRMAR":
            texto = `Se comunica ${sujeto} ${nombrePila} solicitando información sobre los avances de su caso. Se le informa que el reporte fue asignado para atención en terreno y está a la espera de confirmar la visita técnica; se confirman los datos de contacto y se gestionará la confirmación en el menor tiempo posible.`;
            break;

        case "AVANCE_N2":
            texto = `Se comunica ${sujeto} ${nombrePila} solicitando información sobre los avances de su caso. Se le informa que el reporte fue escalado a soporte de segundo nivel para su gestión; se confirman los datos de contacto para el seguimiento en el menor tiempo posible.`;
            break;

        case "AVANCE_SEGUIMIENTO":
            texto = `Se comunica ${sujeto} ${nombrePila} solicitando información sobre los avances de su caso. El reporte continúa en seguimiento por el área responsable y se confirman los datos de contacto para seguimiento en el menor tiempo posible.`;
            break;

        case "SALIDA":
            texto = `Se realiza llamada al señor/la señora ${nombrePila}.`;
            break;
    }

    // Insertar en textarea
    let descBox = document.getElementById("desc_auto");
    if (descBox) descBox.value = texto;
}

// Helper para obtener radio values
function getRadioValue(name) {
    let radios = document.getElementsByName(name);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) return radios[i].value;
    }
    return null;
}

/* ==========================================
   UTILIDADES VARIAS (Mover Notas, Refrescar Dataframe)
   ========================================== */

function refrescarDataframe() {
    // Limpia la variable global y resetea el input file
    if (typeof globalDataframe !== 'undefined') {
        globalDataframe = [];
    }
    let fileInput = document.getElementById("fileDataframe");
    if (fileInput) fileInput.value = "";
    alert("Memoria de Dataframe liberada. Por favor cargue el archivo nuevamente.");
}

/* ==========================================
   BOTONES CPE# / ONT# / ARRIS / MAC / ID CRM, TT
   ========================================== */
function limpiarMac(texto) {
    // Elimina dos puntos, guiones, puntos y espacios
    return texto.replace(/[:\-\.\s]/g, "").toUpperCase();
}

function copiarMacLimpia() {
    let sn = document.getElementById("Legado2").value.trim();
    if (sn === "") { alert("El campo S/N está vacío."); return; }
    let macLimpia = limpiarMac(sn);
    navigator.clipboard.writeText(macLimpia);
}

function generarCpeOnt(prefijo) {
    let sn = document.getElementById("Legado2").value.trim();
    let snLimpio = limpiarMac(sn);
    if (snLimpio.length < 6) { alert("El campo S/N debe tener al menos 6 caracteres válidos."); return; }
    let ultimos6 = snLimpio.slice(-6);
    let resultado = `${prefijo}#${ultimos6}`;
    navigator.clipboard.writeText(resultado);
}

// Función para el botón "Tx" (Copia "TT [valor]")
function copiarTTconPrefijo() {
    let tt = document.getElementById("Tt").value.trim();
    if (tt === "") {
        // Opcional: alert("Campo TT vacío");
        return;
    }
    navigator.clipboard.writeText("TT " + tt);
}

function generarPassArris() {
    if (typeof claves === 'undefined') { alert("Error: arris.js no cargado."); return; }
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var anio = fecha.getFullYear();
    var fechaBusqueda = dia + "/" + mes + "/" + anio;
    var claveEncontrada = claves.find(item => item.fecha === fechaBusqueda);
    if (claveEncontrada) navigator.clipboard.writeText(claveEncontrada.clave);
    else alert("Clave Arris no encontrada para: " + fechaBusqueda);
}

// Listeners
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("btnMac")) document.getElementById("btnMac").onclick = function() { generarCpeOnt("CPE"); };
    if (document.getElementById("btnCpe")) document.getElementById("btnCpe").onclick = function() { generarCpeOnt("ONT"); };
});

/* ==========================================
   GENERADOR DE RESUMEN
   ========================================== */
function actualizarResumen() {
    let causa = getRadioValue("res_causa") || "Falla";
    let servicio = getRadioValue("res_servicio") || "Servicio";
    let tec = getRadioValue("res_tec") || "Tec";
    let resumen = `${causa}–${servicio}–${tec}*`;
    document.getElementById("ResumenGenerado").value = resumen;
    
    // Actualizar también la descripción automática si está en modo REGISTRAR
    actualizarDescripcionAuto();
}

/* ==========================================
   LIMPIEZA DE FORMULARIO
   ========================================== */
function deliteTextbox(id1, id2 = null) {
    if (document.getElementById(id1)) {
        let el = document.getElementById(id1);
        el.value = "";
        if(el.classList.contains('status-monitor')) {
            el.classList.remove('is-filled'); el.classList.add('is-empty');
        }
    }
    if (id2 && document.getElementById(id2)) {
        let el2 = document.getElementById(id2);
        el2.value = "";
        if(el2.classList.contains('status-monitor')) {
            el2.classList.remove('is-filled'); el2.classList.add('is-empty');
        }
    }
}

function borrarTodoConConfirmacion() {
    if (confirm("¿Limpiar todo el formulario?")) {
        const ids = [
            "Caso", "Nombre", "Apellido", "dian1", "dian2", "IdLlamada", 
            "Celular", "Fijo", "Correo", "Direccion", "Empresa", "Ciudad", 
            "Legado", "Legado2", "acp", "anillo", "switch1", "NE","IdCrm", "Tt", 
            "TiempoSinServicio", "desc_auto", "observaciones", "observacionesGiones", 
            "observaciones2", "nota", "ResumenGenerado"
        ];
        
        ids.forEach(id => {
            let el = document.getElementById(id);
            if (el) el.value = "";
        });

        // Reset Menús
        let selects = ["guionesGuion", "guiones", "guiones2", "AreaConware", "tipoIncTxt", "sel_plantilla_desc"];
        selects.forEach(id => { if(document.getElementById(id)) document.getElementById(id).selectedIndex = 0; });

        // Reset Radios INC/WO
        let radiosTipo = document.getElementsByName("radioTipoCaso");
        for(let r of radiosTipo) r.checked = false;
        // Opcional: Dejar marcado INC por defecto
        if (document.getElementById("radINC")) document.getElementById("radINC").checked = true;

        // Reset Colores
        const monitors = document.querySelectorAll('.status-monitor');
        monitors.forEach(el => { el.classList.remove('is-filled'); el.classList.add('is-empty'); });

        document.getElementById("chkContactoActualizado").checked = false;
        
        // Reset Resumen Radios
        let radiosNames = ["res_causa", "res_servicio", "res_tec"];
        radiosNames.forEach(name => {
            let radios = document.getElementsByName(name);
            for(let r of radios) r.checked = false;
        });

        // Reset Checks Descripción (True por defecto)
        ["chk_cambios", "chk_reinicio", "chk_conexiones", "chk_electricas", "chk_dispositivos"].forEach(id => {
            if(document.getElementById(id)) document.getElementById(id).checked = true;
        });

        // Actualizar vista
        actualizarDescripcionAuto();
    }
}

function uncheckRadios(name) {
    let radios = document.getElementsByName(name);
    for(let i=0; i<radios.length; i++) radios[i].checked = false;
}

/* ==========================================
   INICIALIZACIÓN Y UTILIDADES UI (Movidas de Index)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    if(typeof actualizarDescripcionAuto === 'function') actualizarDescripcionAuto();
    if(typeof actualizarResumen === 'function') actualizarResumen();
    if(typeof monitorFields === 'function') monitorFields();
    
    const estado = document.getElementById('estadoPlantilla');
    if(estado && localStorage.getItem('plantillaWordBase64')) {
        estado.innerText = "✓ Plantilla cargada en memoria";
        estado.style.color = "#0d6efd";
    }
});

// Script Monitor Visual
function monitorFields() {
    const fields = document.querySelectorAll('.status-monitor');
    const updateClass = (el) => {
        if(el.value.trim() !== "") {
            el.classList.add('is-filled'); el.classList.remove('is-empty');
        } else {
            el.classList.add('is-empty'); el.classList.remove('is-filled');
        }
    };
    fields.forEach(el => {
        updateClass(el); 
        el.addEventListener('input', () => updateClass(el));
    });
}

// Script para ampliar notas
function ampliarNota(idCampo) {
    let notaElement = document.getElementById(idCampo);
    let textoInicial = notaElement.value;
    let ventana = window.open("", "Nota Ampliada", "width=600,height=500");
    let htmlContent = `
        <html><head><title>Edición de Notas</title><style>
            body { font-family: sans-serif; padding: 15px; display: flex; flex-direction: column; height: 100vh; box-sizing: border-box; margin: 0; background-color: #f4f4f4; }
            textarea { flex: 1; padding: 10px; font-size: 14px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px; resize: none; font-family: monospace; }
            .btn-save { padding: 10px 20px; background-color: #00377B; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 14px; width: 100%; }
            .btn-save:hover { background-color: #002a5e; }
        </style></head><body>
            <h3 style="margin-top:0; color:#333;">Edición de Nota</h3>
            <textarea id="textoAmpliado">${textoInicial}</textarea>
            <button class="btn-save" onclick="guardarYcerrar()">Guardar Cambios y Cerrar</button>
            <script>
                function guardarYcerrar() {
                    let nuevoTexto = document.getElementById('textoAmpliado').value;
                    if (window.opener && !window.opener.closed) { 
                        window.opener.document.getElementById("${idCampo}").value = nuevoTexto;
                        // Disparar evento para actualizar colores
                        let event = new Event('input');
                        window.opener.document.getElementById("${idCampo}").dispatchEvent(event);
                    }
                    window.close();
                }
            <\/script>
        </body></html>`;
    ventana.document.write(htmlContent);
    ventana.document.close();
}

function moverContenidoANotas(sourceId) {
    let origen = document.getElementById(sourceId);
    let notas = document.getElementById("nota");
    if (origen && notas && origen.value.trim() !== "") {
        if (notas.value.trim() !== "") { notas.value += "\n\n"; }
        notas.value += origen.value;
    }
}