/* =========================================================
   LÓGICA DE TIPIFICACIÓN Y GUIÓN RÁPIDO
   ========================================================= */

function selecionGuiones() {
    var cod = document.getElementById("guionesGuion").value;
    var texto = "";

    // 1. Obtener Variables
    var idServ = document.getElementById("Legado").value.trim();
    var acp = document.getElementById("acp").value.trim();
    var sn = document.getElementById("Legado2").value.trim(); // S/N (Serial equipo)
    var ne = document.getElementById("NE").value.trim();
    var switchName = document.getElementById("switch1").value.trim();
    var anillo = document.getElementById("anillo").value.trim();

    // 2. ID Compuesto
    var identificadorServicio = idServ;
    if (idServ !== "" && acp !== "") {
        identificadorServicio = idServ + " / " + acp;
    } else if (idServ === "" && acp !== "") {
        identificadorServicio = acp;
    }
    
    // Validaciones visuales
    if (identificadorServicio === "") identificadorServicio = "__________";
    if (sn === "") sn = "__________";
    if (ne === "") ne = "__________";
    if (switchName === "") switchName = "__________";
    if (anillo === "") anillo = "__________";

    /* =========================================
       TEXTOS BASE
       ========================================= */
    switch (cod) {
        
        // --- TECNOLOGÍA GPON ---
        case "GPON_NO_NAVEGA_MASIVA":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con identificador ${sn} en estado offline. Perfil LDAP bien configurado. Cliente presenta pérdida total de navegación. Se evidencia falla masiva asociada a la TT ___. Se procede a ___.`;
            break;

        case "GPON_NO_NAVEGA_TERRENO":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con identificador ${sn} en estado offline. Perfil LDAP bien configurado. Cliente presenta pérdida total de navegación. Se evidencian varios clientes afectados en la infraestructura relacionada, se envia correo al area de fallas masivas para confirmar TT o escalar a terreno.`;
            break;
        
        case "GPON_LOS_ROJO":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con identificador ${sn} en estado offline. Perfil LDAP bien configurado. Cliente presenta pérdida total de navegación. No se evidencia falla masiva, se validaron las conexiones en el equipo, el cliente confirma que las conexiones internas están bien, se escala a terreno.`;
            break;

        case "GPON_CONECTA_NO_NAVEGA":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con identificador ${sn} en estado online. Perfil LDAP bien configurado. Parámetros ópticos ___. Conectividad física presente pero sin tráfico de navegación. Se procede a ___.`;
            break;

        case "GPON_INTERMITENCIA":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con identificador ${sn} en estado online. Perfil LDAP bien configurado. Parámetros ópticos alarmados, se verifica historial de alarmas y se identifican varias desconexiones en el equipo por ___. Se procede a ___.`;
            break;

        case "GPON_OPERATIVIDAD":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con identificador ${sn} en estado online. Perfil LDAP bien configurado. Se evidencia levantamiento en capa 3 en el NE ${ne}, se realiza prueba de ping sin pérdida de paquetes, parámetros dentro de los rangos óptimos de operatividad. Se confirma operatividad dentro de la red de Tigo. Se recomienda validar equipos y configuración interna.`;
            break;

        // --- TECNOLOGÍA HFC ---
        case "HFC_NO_NAVEGA_MASIVA":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con identificador ${sn} en estado offline. Perfil LDAP ___. Cliente presenta pérdida total de navegación desde hace ___. Se evidencia falla masiva asociada a la TT ___. Se procede a ___.`;
            break;

        case "HFC_PERFIL_LDAP":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con identificador ${sn} en estado online. Perfil LDAP incorrecto, se actualiza el perfil. Se confirfma de nuevo equipo online, Parámetros eléctricos optimos. Ip de navegacion valida, cliente confirma servicio operativo.`;
            break;

        case "HFC_INTERMITENCIA":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con identificador ${sn} online. Perfil LDAP ___. Parámetros eléctricos por fuera del rango optimo. Se procede a ___.`;
            break;

        case "HFC_OPERATIVIDAD":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con MAC ${sn} online. Perfil LDAP ___. Parámetros eléctricos ___. Se confirma operatividad dentro de la red de Tigo. Se recomienda validar equipos y configuración interna.`;
            break;

        // --- TECNOLOGÍA FIBRA ---
        case "FIBRA_APERTURA_DOBLE_1":
            texto = `Se evidencia que el servicio con ID ${identificadorServicio} está activo, se valida que el SW ${switchName} en el anillo ${anillo} presenta una apertura doble donde solo el usuario está afectado. Se confirma equipo energizado, leds de los cables de la fibra apagados, se confirma con los vecinos y las Gigas del usuario están Down.`;
            break;

        case "FIBRA_APERTURA_EXTREMO":
            texto = `Se evidencia que el servicio con ID ${identificadorServicio} está activo, se valida que el SW ${switchName} en el anillo ${anillo} presenta una apertura doble con cliente extremo. Se confirma equipo energizado, se confirma con los vecinos y las Gigas del usuario están Down. Se procede a crear TT para escalar con infraestructura.`;
            break;

        case "FIBRA_OPERATIVO_PING":
            // CORRECCIÓN SOLICITADA: "se tiene gestión del switch [S/N]"
            // Usamos la variable 'sn' en lugar de 'switchName' para el switch gestionado
            texto = `Se verificó que el servicio ${identificadorServicio} está activo, se tiene gestión del switch ${sn}, se ingresa al NE ${ne} en el cual se evidencia levantamiento en capa 3. Se realiza prueba de ping sin pérdida de paquetes, parámetros dentro de los rangos óptimos de operatividad. Se confirma operatividad dentro de la red de Tigo. Se recomienda validar equipos y configuración interna.`;
            break;

        // --- DIAGNÓSTICO TV ---
        case "TV_HFC_IMAGEN":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con NCID ${sn} activo en plataforma Verimatrix con paquetes asignados. Señal RF con niveles ___ (óptimos/fuera de rango). Se envían registros y se realiza reinicio/restablecimiento de fábrica. Cliente confirma mejora en la calidad de imagen. Se procede a ___.`;
            break;
        case "TV_HFC_SIN_SENAL":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con NCID ${sn} en estado ___ (activo/inactivo) en plataforma Verimatrix. Señal RF con niveles ___ (óptimos/fuera de rango). Se envían registros y se realiza reinicio/restablecimiento de fábrica. Cliente confirma restablecimiento de señal. Se procede a ___.`;
            break;
        case "TV_GPON_IMAGEN":
            texto = `Servicio con ID ${identificadorServicio} activo. Deco con serial ${sn} activo en plataforma Verimatrix con paquetes asignados. Conectividad IP ___ (óptima/con pérdida). Se envían registros y se realiza reinicio/restablecimiento de fábrica del deco. Cliente confirma mejora en la calidad de imagen. Se procede a ___.`;
            break;

        // --- OTROS ---
        case "2":
            texto = "Cliente no responde a los llamados realizados a los teléfonos de contacto.";
            break;
        case "9":
            texto = "Cliente reporta falla en el servicio de movilidad. Línea se encuentra en estado activo y con particiones. Se realiza prueba de master switch y location update.";
            break;
        case "15":
            texto = "Se escala caso al nivel 2 de voz, se adjunta plantilla en las notas.";
            break;

        default:
            texto = "";
    }

    // Insertar
    document.getElementById("observacionesGiones").value = texto;
}