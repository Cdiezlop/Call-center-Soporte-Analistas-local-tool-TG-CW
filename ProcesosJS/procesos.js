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

/* Copiar al portapapeles (Universal) */
function copyToClipBoard(id) {
    var elemento = document.getElementById(id);
    if (elemento) {
        elemento.select();
        document.execCommand("copy");
    }
}

/* Captura para botones del Header (CPE, Arris, Macros) */
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

// Copiar Nombre Completo (Nombre + Apellido)
function copiarNombreCompleto() {
    let nom = document.getElementById("Nombre").value.trim();
    let ape = document.getElementById("Apellido").value.trim();
    let completo = "";
    if(nom && ape) completo = `${nom} ${ape}`;
    else completo = nom + ape;
    navigator.clipboard.writeText(completo);
}

/* ==========================================
   DESCRIPCIÓN AUTOMÁTICA (Resumen Llamada)
   ========================================== */
function actualizarDescripcionAuto() {
    let tratamiento = document.getElementById("Tratamiento").value;
    let nombre = document.getElementById("Nombre").value.trim();
    let tiempo = document.getElementById("TiempoSinServicio").value.trim();
    
    // Obtener Servicio
    let servicio = "servicio";
    let radiosServicio = document.getElementsByName("res_servicio");
    for(let i = 0; i < radiosServicio.length; i++) {
        if(radiosServicio[i].checked) {
            servicio = radiosServicio[i].value;
            if(servicio === 'Television') servicio = 'televisión';
            if(servicio === 'Telefonia') servicio = 'telefonía';
            if(servicio === 'Movilidad') servicio = 'datos móviles';
            break;
        }
    }

    let sujeto = (tratamiento === 'Sr') ? 'el señor' : 'la señora';
    let nombrePila = (nombre === "") ? "_______" : nombre; 
    if (tiempo === "") tiempo = "_______";

    let texto = `Se comunica ${sujeto} ${nombrePila} indicando que se encuentra sin servicio de ${servicio.toLowerCase()} desde hace ${tiempo}, `;

    // Flags (CORRECCIÓN: Minúsculas en la negación)
    let cambios = document.getElementById("chk_cambios").checked ? "sin cambios recientes" : "con cambios recientes";
    let reinicio = document.getElementById("chk_reinicio").checked ? "reinició módem y equipos" : "no ha reiniciado módem y equipos";
    let conexiones = document.getElementById("chk_conexiones").checked ? "revisó conexiones físicas" : "no ha revisado conexiones físicas";
    let electricas = document.getElementById("chk_electricas").checked ? "sin fallas eléctricas" : "reporta fallas eléctricas";
    let disp = document.getElementById("chk_dispositivos").checked ? "afecta a todos los dispositivos" : "no afecta a todos los dispositivos";

    texto += `${cambios}, ${reinicio}, ${conexiones}, ${electricas}, ${disp}.`;

    let descBox = document.getElementById("desc_auto");
    if (descBox) descBox.value = texto;
}

/* ==========================================
   BOTONES CPE# / ONT# / ARRIS / MAC
   ========================================== */

function limpiarMac(texto) {
    return texto.replace(/[:\-\.\s]/g, "").toUpperCase();
}

function copiarMacLimpia() {
    let sn = document.getElementById("Legado2").value.trim();
    if (sn === "") {
        alert("El campo S/N está vacío.");
        return;
    }
    let macLimpia = limpiarMac(sn);
    navigator.clipboard.writeText(macLimpia);
}

function generarCpeOnt(prefijo) {
    let sn = document.getElementById("Legado2").value.trim();
    let snLimpio = limpiarMac(sn);
    
    if (snLimpio.length < 6) {
        alert("El campo S/N debe tener al menos 6 caracteres válidos.");
        return;
    }
    let ultimos6 = snLimpio.slice(-6);
    let resultado = `${prefijo}#${ultimos6}`;
    navigator.clipboard.writeText(resultado);
}

// Botón Arris
function generarPassArris() {
    if (typeof claves === 'undefined') {
        alert("Error: No se encontró la base de datos de claves Arris.");
        return;
    }
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var anio = fecha.getFullYear();
    var fechaBusqueda = dia + "/" + mes + "/" + anio;

    var claveEncontrada = claves.find(item => item.fecha === fechaBusqueda);

    if (claveEncontrada) {
        navigator.clipboard.writeText(claveEncontrada.clave);
    } else {
        alert("No se encontró clave Arris para la fecha: " + fechaBusqueda);
    }
}

// Listeners
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("btnMac")) {
        document.getElementById("btnMac").onclick = function() { generarCpeOnt("CPE"); };
    }
    if (document.getElementById("btnCpe")) {
        document.getElementById("btnCpe").onclick = function() { generarCpeOnt("ONT"); };
    }
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
}

function getRadioValue(name) {
    let radios = document.getElementsByName(name);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) return radios[i].value;
    }
    return null;
}

/* ==========================================
   LIMPIEZA DE FORMULARIO (Actualizada)
   ========================================== */
function deliteTextbox(id1, id2 = null) {
    if (document.getElementById(id1)) {
        let el = document.getElementById(id1);
        el.value = "";
        // Actualizar visualmente si es un campo monitoreado
        if(el.classList.contains('status-monitor')) {
            el.classList.remove('is-filled');
            el.classList.add('is-empty');
        }
    }
    if (id2 && document.getElementById(id2)) {
        let el2 = document.getElementById(id2);
        el2.value = "";
        if(el2.classList.contains('status-monitor')) {
            el2.classList.remove('is-filled');
            el2.classList.add('is-empty');
        }
    }
}

function borrarTodoConConfirmacion() {
    if (confirm("¿Limpiar todo el formulario?")) {
        // 1. Limpiar Inputs
        const ids = [
            "Caso", "Nombre", "Apellido", "dian1", "dian2", "IdLlamada", 
            "Celular", "Fijo", "Correo", "Direccion", "Empresa", "Ciudad", 
            "Legado", "Legado2", "acp", "anillo", "switch1", "NE", 
            "TiempoSinServicio", "desc_auto", "observaciones", "observacionesGiones", 
            "observaciones2", "nota", "ResumenGenerado"
        ];
        
        ids.forEach(id => {
            let el = document.getElementById(id);
            if (el) el.value = "";
        });

        // 2. Resetear Menús Desplegables (Derecha)
        if(document.getElementById("guionesGuion")) document.getElementById("guionesGuion").selectedIndex = 0;
        if(document.getElementById("guiones")) document.getElementById("guiones").selectedIndex = 0;
        if(document.getElementById("guiones2")) document.getElementById("guiones2").selectedIndex = 0;
        if(document.getElementById("AreaConware")) document.getElementById("AreaConware").selectedIndex = 0;
        if(document.getElementById("tipo_caso")) document.getElementById("tipo_caso").selectedIndex = 0;

        // 3. Resetear Estado Visual (Rojo/Verde)
        const monitors = document.querySelectorAll('.status-monitor');
        monitors.forEach(el => {
            el.classList.remove('is-filled');
            el.classList.add('is-empty'); // Volver a rojo
        });

        // 4. Reset Checks y Radios
        document.getElementById("chkContactoActualizado").checked = false;
        
        uncheckRadios("res_causa");
        uncheckRadios("res_servicio");
        uncheckRadios("res_tec");

        ["chk_cambios", "chk_reinicio", "chk_conexiones", "chk_electricas", "chk_dispositivos"].forEach(id => {
            if(document.getElementById(id)) document.getElementById(id).checked = true;
        });

        if (document.getElementById("radINC")) document.getElementById("radINC").checked = true;
        
        actualizarDescripcionAuto();
    }
}

function uncheckRadios(name) {
    let radios = document.getElementsByName(name);
    for(let i=0; i<radios.length; i++) radios[i].checked = false;
}