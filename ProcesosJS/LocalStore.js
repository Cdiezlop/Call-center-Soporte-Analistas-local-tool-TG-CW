/* ==========================================
   GESTIÓN DE CREDENCIALES (LocalStore Mejorado)
   ========================================== */

document.addEventListener("DOMContentLoaded", function() {
    // 1. Cargar valores al iniciar
    cargarValores();

    // 2. Asignar evento al botón Guardar
    var btsave = document.getElementById("btSavePass");
    if(btsave) {
        btsave.addEventListener("click", savePass);
    }

    // 3. Asignar evento al botón Descargar (Nuevo)
    var btDownload = document.getElementById("btDownloadPass");
    if(btDownload) {
        btDownload.addEventListener("click", descargarCredenciales);
    }

    // 4. Asignar eventos a los botones de copiado rápido (Header)
    asignarEventoCopiar("btRed", "red");
    asignarEventoCopiar("btEdatel", "eda");
    asignarEventoCopiar("btEtp", "etp");
    asignarEventoCopiar("btElite", "elite");
    asignarEventoCopiar("btFenix", "fenix");
    asignarEventoCopiar("btLogin", "user");
    asignarEventoCopiar("btAvaya", "avaya");
});

// Función auxiliar para asignar eventos de copiado de forma segura
function asignarEventoCopiar(idBoton, claveStorage) {
    var btn = document.getElementById(idBoton);
    if(btn) {
        btn.addEventListener("click", () => asignarCopiar(claveStorage));
    }
}

// Guardar datos en local storage con validación
function savePass() {
    let saveUser = document.getElementById("user").value.trim();
    
    // Validación básica: Usuario obligatorio
    if (saveUser === "") {
        alert(" El campo Usuario es obligatorio para guardar.");
        return;
    }

    let savered = document.getElementById("passRed").value;
    let saveEda = document.getElementById("passEda").value;
    let saveEtp = document.getElementById("passEtp").value;
    let saveElite = document.getElementById("passElite").value;
    let saveFenix = document.getElementById("passFenix").value;
    let saveAvaya = document.getElementById("avaya").value;

    localStorage.setItem("red", savered);
    localStorage.setItem("eda", saveEda);
    localStorage.setItem("etp", saveEtp);
    localStorage.setItem("elite", saveElite);
    localStorage.setItem("fenix", saveFenix);
    localStorage.setItem("user", saveUser);
    localStorage.setItem("avaya", saveAvaya);

    // Feedback al usuario
    console.log("Datos guardados/actualizados correctamente");
    alert(" Credenciales guardadas y actualizadas correctamente.");
}

// Cargar info en inputs al abrir
function cargarValores() {
    var savedRed = localStorage.getItem("red");
    var saveEda = localStorage.getItem("eda");
    var saveEtp = localStorage.getItem("etp");
    var saveElite = localStorage.getItem("elite");
    var saveFenix = localStorage.getItem("fenix");
    var saveUser = localStorage.getItem("user");
    var saveAvaya = localStorage.getItem("avaya");

    if (savedRed) document.getElementById("passRed").value = savedRed;
    if (saveEda) document.getElementById("passEda").value = saveEda;
    if (saveEtp) document.getElementById("passEtp").value = saveEtp;
    if (saveElite) document.getElementById("passElite").value = saveElite;
    if (saveFenix) document.getElementById("passFenix").value = saveFenix;
    if (saveUser) document.getElementById("user").value = saveUser;
    if (saveAvaya) document.getElementById("avaya").value = saveAvaya;
}

// Función para copiar al portapapeles desde el botón del Header
function asignarCopiar(valor) {
    var savedValue = localStorage.getItem(valor);
    if (savedValue) {
        navigator.clipboard.writeText(savedValue)
            .then(() => {
                // Opcional: Feedback visual temporal
                console.log("Copiado: " + valor); 
            })
            .catch(err => {
                console.error('Error al copiar: ', err);
                alert("No se pudo copiar. Verifica los permisos.");
            });
    } else {
        alert(" No hay contraseña guardada para este campo. Ve a Usuario > Configurar.");
    }
}

// Nueva función: Descargar contraseñas a archivo de texto
function descargarCredenciales() {
    var user = localStorage.getItem("user");
    
    if (!user) {
        alert(" No hay datos guardados para descargar.");
        return;
    }

    var contenido = "--- RESPALDO DE CREDENCIALES ---\n\n";
    contenido += "Usuario: " + (localStorage.getItem("user") || "") + "\n";
    contenido += "ID Avaya: " + (localStorage.getItem("avaya") || "") + "\n";
    contenido += "---------------------------\n";
    contenido += "Pass RED: " + (localStorage.getItem("red") || "") + "\n";
    contenido += "Pass EDATEL: " + (localStorage.getItem("eda") || "") + "\n";
    contenido += "Pass ETP: " + (localStorage.getItem("etp") || "") + "\n";
    contenido += "Pass ELITE: " + (localStorage.getItem("elite") || "") + "\n";
    contenido += "Pass FENIX: " + (localStorage.getItem("fenix") || "") + "\n";

    var blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    var enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = "Credenciales_Respaldo.txt";
    enlace.style.display = "none";
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}