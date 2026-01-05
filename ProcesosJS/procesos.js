
// Limpiar selectores de guiones
const btnDeleteGuiones = document.getElementById('btnDeleteGuiones');
if (btnDeleteGuiones) {
    btnDeleteGuiones.addEventListener('click', () => {
        let guiones = document.getElementById("guiones");
        let area = document.getElementById("AreaConware");
        if(guiones) guiones.selectedIndex = "";
        if(area) area.selectedIndex = "";
        document.getElementById("observaciones").value = "";
    });
}

// Limpiar caracteres no deseados en entradas
// Se agregan validaciones para evitar errores si el elemento no existe en el nuevo HTML
const inputsALimpiar = [
    "Caso", "dian1", "IdLlamada", "Celular", "Legado", 
    "Legado2", "switch1", "NE", "Correo"
];

inputsALimpiar.forEach(id => {
    let elemento = document.getElementById(id);
    if (elemento) {
        limpiarEntrada(elemento);
    }
});

function limpiarEntrada(input) {
    input.addEventListener("input", e => {
        let string = e.target.value;
        // Elimina espacios y dos puntos, útil para pegar datos crudos
        string = string.replace(/[ :	]/g, "");
        e.target.value = string;
    });
}

// Evitar guardar con Ctrl+S
document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
    }
});

// Convertir a mayúsculas
function mayus(e) {
    e.value = e.value.toUpperCase();
}

// Convertir a minúsculas
function minus(e) {
    e.value = e.value.toLowerCase();
}

// Fecha actual al portapapeles
function fecha() {
    var fecha = new Date();
    var year = fecha.getFullYear();
    var mes = fecha.getMonth() + 1;
    var dia = diaFecha(fecha.getDate());
    navigator.clipboard.writeText(dia + "/0" + mes + "/" + year);
}

function diaFecha(dia) {
    return dia < 10 ? "0" + dia : dia;
}

// Copiar al portapapeles (Función Base)
function copyToClipBoard(parametro) {
    var elemento = document.getElementById(parametro);
    if (elemento) {
        elemento.select();
        document.execCommand("copy");
    }
}

// Capturar valor (Similar a copyToClipBoard pero usa API moderna si es posible)
function captura(parametro) {
    var codigoACopiar = document.getElementById(parametro);
    if (codigoACopiar) {
        navigator.clipboard.writeText(codigoACopiar.value);
    }
}

// Borrar cajas de texto específicas
function deliteTextbox(param, param2) {
    if (document.getElementById(param)) document.getElementById(param).value = "";
    if (document.getElementById(param2)) document.getElementById(param2).value = "";
    let input = document.getElementById(param);
    if (input) input.focus();
}

function deliteTextbox2(param) {
    deliteTextbox(param);
}

// Generar documentación (Legacy)
function capturarTodo() {
    let observaciones = document.getElementById("observaciones").value;
    let plantilla = document.getElementById("plantilla");
    if (plantilla) {
        plantilla.value = observaciones;
        copyToClipBoard("plantilla");
    }
    
    let btnGenerar = document.getElementById("btGenerar");
    if (btnGenerar) {
        btnGenerar.innerHTML = "Generado!";
        setTimeout(resGenerar, 1000);
    }
}

function resGenerar() {
    let btn = document.getElementById("btGenerar");
    if (btn) btn.innerHTML = "Generar";
}

function resMSS() {
    let btn = document.getElementById("btMssP");
    if (btn) btn.innerHTML = "MSS";
}

function converMonth(mes) {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return meses[mes];
}

// Funciones de Login y Strings
function loginMayuscula() {
    var saveUser = localStorage.getItem("user");
    if (saveUser) {
        saveUser = mayus2(saveUser);
        copiarAlPortapapeles(saveUser);
    }
}

function mayus2(cadena) {
    return cadena.toUpperCase();
}

function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto).then(function() {
        console.log("Copiado exitosamente.");
    }, function(err) {
        console.error("Error al copiar: ", err);
    });
}

function loginAgregarUne() {
    var saveUser = localStorage.getItem("user");
    if (saveUser) {
        saveUser = agregarUne(saveUser);
        copiarAlPortapapeles2(saveUser);
    }
}

function agregarUne(cadena) {
    return cadena + "@une";
}

function copiarAlPortapapeles2(texto) {
    navigator.clipboard.writeText(texto);
}

function reporteSeabel() {
    const numeroIncidente = document.getElementById('Caso').value;
    const observaciones = document.getElementById('observaciones').value;
    const textoCombinado = `Número de Incidente: ${numeroIncidente}\n ${observaciones}`;
    copiarAlPortapapeles2(textoCombinado);
}

// Actualizar título de la pestaña
function actualizarTitulo() {
    const input = document.getElementById("Caso");
    const inputIdLlamada = document.getElementById("IdLlamada");
    
    let valCaso = input ? input.value : "";
    let valLlamada = inputIdLlamada ? inputIdLlamada.value : "";

    if (valCaso.trim() !== "") {
        document.title = valCaso + " ** " + valLlamada;
    } else {
        document.title = valLlamada || "Gestión de Casos";
    }
}

/* ==========================================
   NUEVAS FUNCIONES (FASE 1 - MEJORAS)
   ========================================== */

// Capitalizar Nombre y Apellido (Primera letra mayúscula)
function capitalizar(input) {
    let palabras = input.value.toLowerCase().split(" ");
    for (let i = 0; i < palabras.length; i++) {
        if (palabras[i].length > 0) {
            palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substring(1);
        }
    }
    input.value = palabras.join(" ");
}

// Copiar Nombre Completo (Nombre + Apellido)
function copiarNombreCompleto() {
    let nom = document.getElementById("Nombre").value || "";
    let ape = document.getElementById("Apellido").value || "";
    let completo = nom + " " + ape;
    navigator.clipboard.writeText(completo.trim());
}

// Generar y Copiar ID de Contacto (NIT-CELULAR)
function generarIdContacto() {
    let nit = document.getElementById("dian1").value.trim();
    let cel = document.getElementById("Celular").value.trim();
    
    if (!nit && !cel) return; // No copiar si está vacío

    let idContacto = `ID-CONTACTO: ${nit}-${cel}`;
    navigator.clipboard.writeText(idContacto);
    // Feedback visual opcional en consola
    console.log("ID Copiado: " + idContacto);
}

// Automatización de la Descripción de Llamada
function actualizarDescripcionAuto() {
    // Elementos requeridos
    let elTratamiento = document.getElementById("sel_tratamiento");
    let elNombre = document.getElementById("Nombre");
    let elApellido = document.getElementById("Apellido");
    let elTiempo = document.getElementById("TiempoSinServicio");
    let elDesc = document.getElementById("desc_auto");

    if (!elDesc) return; // Salir si no existe el campo de descripción

    let tratamiento = elTratamiento ? elTratamiento.value : "";
    let nombre = elNombre ? elNombre.value.trim() : "";
    let apellido = elApellido ? elApellido.value.trim() : "";
    let tiempo = elTiempo ? elTiempo.value.trim() : "";
    
    // Lógica del sujeto
    let sujeto = (tratamiento === 'Sr') ? 'el señor' : 'la señora';
    let nombreCompleto = (nombre === "" && apellido === "") ? "_______" : `${nombre} ${apellido}`;
    if (tiempo === "") tiempo = "_______";

    // Construcción del texto base
    let texto = `Se comunica ${sujeto} ${nombreCompleto} indicando que se encuentra sin servicio de internet desde hace ${tiempo}, `;

    // Obtener estado de los flags (checkboxes)
    let chkCambios = document.getElementById("chk_cambios");
    let chkReinicio = document.getElementById("chk_reinicio");
    let chkConexiones = document.getElementById("chk_conexiones");
    let chkElectricas = document.getElementById("chk_electricas");
    let chkDispositivos = document.getElementById("chk_dispositivos");

    // Lógica condicional de flags
    let txtCambios = (chkCambios && chkCambios.checked) ? "sin cambios recientes" : "con cambios recientes";
    let txtReinicio = (chkReinicio && chkReinicio.checked) ? "reinició módem y equipos" : "NO ha reiniciado módem y equipos";
    let txtConexiones = (chkConexiones && chkConexiones.checked) ? "revisó conexiones físicas" : "NO ha revisado conexiones físicas";
    let txtElectricas = (chkElectricas && chkElectricas.checked) ? "sin fallas eléctricas en empresa ni zona" : "reporta fallas eléctricas";
    let txtDisp = (chkDispositivos && chkDispositivos.checked) ? "afecta a todos los dispositivos" : "no afecta a todos los dispositivos";

    // Concatenar final
    texto += `${txtCambios}, ${txtReinicio}, ${txtConexiones}, ${txtElectricas}, ${txtDisp}.`;

    elDesc.value = texto;
}

// Validar Botón de Descarga TXT
function validarDescargaTxt() {
    let check = document.getElementById("chk_contacto_actualizado");
    let btn = document.getElementById("btnDescargarTxt");
    
    if (check && btn) {
        if (check.checked) {
            btn.disabled = false;
            btn.classList.remove("btn-disabled");
            btn.classList.add("btn-primary-action"); // Clase CSS definida en estilos nuevos
        } else {
            btn.disabled = true;
            btn.classList.add("btn-disabled");
            btn.classList.remove("btn-primary-action");
        }
    }
}

// Wrapper para confirmar antes de borrar
function confirmarBorrado() {
    if (confirm("¿Estás seguro de que deseas borrar TODOS los campos?")) {
        borrarTodo();
    }
}

// Función Borrar Todo (Actualizada con nuevos campos)
function borrarTodo() {
    // Lista de IDs a limpiar
    var elementos = [
        "Caso", "Nombre", "Apellido", "IdLlamada", "switch1", "NE", 
        "Celular", "Legado", "dian1", "Legado2", "observaciones", 
        "observaciones2", "nota", "Correo", "Direccion", "Ciudad", 
        "acp", "anillo", "observacionesGiones", "Empresa", "TiempoSinServicio", 
        "desc_auto"
    ];

    // Limpiar inputs de texto
    for (let i = 0; i < elementos.length; i++) {
        let item = document.getElementById(elementos[i]);
        if (item) item.value = "";
    }

    // Resetear Selects
    let guiones = document.getElementById("guiones");
    let guiones2 = document.getElementById("guiones2");
    let guionesGuion = document.getElementById("guionesGuion");
    let areaConware = document.getElementById("AreaConware");
    let tipoCaso = document.getElementById("tipo_caso");
    let tratamiento = document.getElementById("sel_tratamiento");

    if (guiones) guiones.selectedIndex = 0;
    if (guiones2) guiones2.selectedIndex = 0;
    if (guionesGuion) guionesGuion.selectedIndex = 0;
    if (areaConware) areaConware.selectedIndex = 0;
    if (tipoCaso) tipoCaso.selectedIndex = 0;
    if (tratamiento) tratamiento.selectedIndex = 0;

    // Resetear Checkboxes a su estado por defecto (marcados TRUE según requerimiento)
    let checksDefaultTrue = ["chk_cambios", "chk_reinicio", "chk_conexiones", "chk_electricas", "chk_dispositivos"];
    checksDefaultTrue.forEach(id => {
        let chk = document.getElementById(id);
        if (chk) chk.checked = true;
    });

    // Checkbox de contacto actualizado (False por defecto)
    let chkContacto = document.getElementById("chk_contacto_actualizado");
    if (chkContacto) chkContacto.checked = false;

    // Resetear campo oculto dian2 y otros
    if(document.getElementById("dian2")) document.getElementById("dian2").value = "";

    // Actualizar estados visuales
    validarDescargaTxt();
    actualizarDescripcionAuto();
}