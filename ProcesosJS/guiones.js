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
       TEXTOS BASE (ACTUALIZADO)
       ========================================= */
    switch (cod) {
        
        // --- TECNOLOGÍA GPON (Grupo actualizado) ---
        case "GPON_NO_NAVEGA_MASIVA":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con SN ${sn} en estado offline, se confirma alarma por LOS, se evidencia falla masiva en la zona, asociado a la Tx. Se le informa al cliente que la solución está en progreso.`;
            break;

        case "GPON_NO_NAVEGA_TERRENO":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con SN ${sn} en estado offline, cliente presenta pérdida total de navegación, no se evidencia falla masiva en la zona, se validaron las conexiones en el equipo, el cliente confirma que las conexiones internas están bien, se escala a terreno.`;
            break;

        case "GPON_CONECTA_NO_NAVEGA":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con SN ${sn} online. Parámetros ópticos estables. Conectividad física presente pero sin tráfico de navegación. Se procede a escalar a campo.`;
            break;

        case "GPON_INTERMITENCIA":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con SN ${sn} online. Parámetros ópticos alarmados con variaciones detectadas, se verifica historial de alarmas y se identifican varias desconexiones en el equipo. Se procede a escalar a campo.`;
            break;

        case "GPON_OPERATIVIDAD":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con SN ${sn} en estado online. Se validan VLAN configuradas, parámetros dentro de los rangos óptimos de operatividad, equipo en modo Bridge, se realiza levantamiento de capa 3 en el NE ${ne}, se realiza prueba de ping sin pérdida de paquetes. Se confirma operatividad dentro de la red de Tigo. Se recomienda validar equipos y configuración interna.`;
            break;

        case "GPON_POSIBLE_MASIVA":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con SN ${sn} en estado offline. Cliente presenta pérdida total de navegación, se valida alarma por LOS, se evidencia afectación general en la zona con varios clientes afectados en la infraestructura relacionada, se envía correo al área de fallas masivas para confirmar TT o escalar a terreno.`;
            break;


        // --- TECNOLOGÍA GPON AVANZADO (Nuevo Grupo) ---
        case "GPON_AV_NO_NAVEGA":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con SN ${sn} en estado offline. Presenta alarma con LOS. Se evidencia falla masiva asociada a la Tx . Se le informa que el caso esta en proceso para solucion en el menor tiempo posible.`;
            break;

        case "GPON_AV_FALLA_TERRENO":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con SN ${sn} en estado offline. Presenta alarma con LOS. No se visualiza falla en la zona, el cliente confirma que las conexiones internas están bien, se procede a escalar a terreno.`;
            break;

        case "GPON_AV_POSIBLE_MASIVA":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con SN ${sn} en estado offline. Cliente presenta pérdida total de navegación. Se evidencian varios clientes afectados en la infraestructura relacionada, se envia correo al area de fallas masivas para confirmar TT o escalar a terreno.`;
            break;

        case "GPON_AV_LENTITUD":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con SN ${sn} online. Se evidencia levantamiento en capa 3 en el ${ne}, Parámetros ópticos por fuera del rango optimo, se verifica historial de alarmas y se identifican varias desconexiones en el equipo. Se procede a estalar a terreno.`;
            break;

        case "GPON_AV_OPERATIVIDAD":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con SN ${sn} online. Se evidencia levantamiento en capa 3 en el NE ${ne}, se realiza prueba de ping sin pérdida de paquetes, parámetros dentro de los rangos óptimos de operatividad. Se confirma operatividad dentro de la red de Tigo. Se recomienda validar equipos y configuración interna.`;
            break;


        // --- TECNOLOGÍA HFC ---
        case "HFC_NO_NAVEGA_MASIVA":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con MAC ${sn} en estado offline. Perfil LDAP bien configurado. Cliente presenta pérdida total de navegación desde hace ___. Se evidencia falla masiva asociada a la TT ___. Se procede a ___.`;
            break;

        case "HFC_PERFIL_LDAP":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con MAC ${sn} en estado online. Perfil LDAP incorrecto, se actualiza el perfil. Se confirfma de nuevo equipo online, Parámetros eléctricos optimos. Ip de navegacion valida, cliente confirma servicio operativo.`;
            break;

        case "HFC_INTERMITENCIA":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con MAC ${sn} online. Perfil LDAP bien configurado. Parámetros eléctricos por fuera del rango optimo. Se procede a ___.`;
            break;

        case "HFC_OPERATIVIDAD":
            texto = `Servicio con ID ${identificadorServicio} activo. Equipo con MAC ${sn} online. Perfil LDAP bien configurado. Parámetros eléctricos óptimos. Se confirma operatividad dentro de la red de Tigo. Se recomienda validar equipos y configuración interna.`;
            break;


        // --- TECNOLOGÍA FIBRA ---
        case "FIBRA_APERTURA_DOBLE_1":
            texto = `Se evidencia que el servicio con ID ${identificadorServicio} está activo, se valida que el SW ${switchName} en el anillo ${anillo} presenta una apertura doble donde solo el usuario está afectado. Se confirma equipo energizado, leds de los cables de la fibra apagados, se confirma con los vecinos y las Gigas del usuario están Down.`;
            break;

        case "FIBRA_APERTURA_EXTREMO":
            texto = `Se evidencia que el servicio con ID ${identificadorServicio} está activo, se valida que el SW ${switchName} en el anillo ${anillo} presenta una apertura doble con cliente extremo. Se confirma equipo energizado, se confirma con los vecinos y las Gigas del usuario están Down. Se procede a crear TT para escalar con infraestructura.`;
            break;

        case "FIBRA_OPERATIVO_PING":
            texto = `Se verificó que el servicio ${identificadorServicio} está activo, se tiene gestión del switch ${sn}, se ingresa al NE ${ne} en el cual se evidencia levantamiento en capa 3. Se realiza prueba de ping sin pérdida de paquetes, parámetros dentro de los rangos óptimos de operatividad. Se confirma operatividad dentro de la red de Tigo. Se recomienda validar equipos y configuración interna.`;
            break;

        case "FIBRA_PUERTO_BLOQUEADO":
            texto = `Se verificó que el servicio ${identificadorServicio} está activo, se tiene gestión del switch ${sn}, se encuentra puerto bloqueado en relación a ___, se desbloquea el puerto. Se ingresa al NE ${ne} en el cual se evidencia levantamiento en capa 3. Se realiza prueba de ping sin pérdida de paquetes, parámetros dentro de los rangos óptimos de operatividad. Se confirma operatividad dentro de la red de Tigo. Se recomienda validar equipos y configuración interna.`;
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


        // --- OTROS (Actualizado) ---
        case "TipiNovComercial":
            texto = `Se confirma servicio ${identificadorServicio} suspendido, se le informa al cliente que presenta una novedad comercial en el servicio y se transfiere con la linea de atención al cliente para mas información.`;
            break;

        case "EscalarVoz":
            texto = `Se confirma servicio ${identificadorServicio} en estado activo, se transfiere con el area de Voz y colaboración N1 para su respectiva gestión.`;
            break;

        case "LlamadaColgada":
            texto = `Se confirma servicio ${identificadorServicio} activo. Durante la llamada, se presentaron problemas de comunicacion y se colgo la llamada, se procede a ejar caso resuelto por las proximas 24 horas.`;
            break;

        case "EscalarMovil":
            // Nota: Aquí se solicitó ID "Serv" solamente, usamos idServ
            texto = `Se confirma servicio ${idServ} en estado activo, se transfiere con el area de Voz y colaboración N1 para su respectiva gestión.`;
            break;

        default:
            texto = "";
    }

    // Insertar
    document.getElementById("observacionesGiones").value = texto;
}