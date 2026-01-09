/* ==========================================================================
   LÓGICA PARA PLANTILLAS DE INFRAESTRUCTURA Y AGENDAMIENTO
   ========================================================================== */

function aplicarPlantillaTT(tipo) {
    // 1. OBTENER DATOS DEL FORMULARIO
    let caso = document.getElementById("Caso").value.trim();
    if(caso === "" || caso === "0000000") caso = "#CASO"; // Placeholder si está vacío
    
    let nombre = document.getElementById("Nombre").value.trim();
    let apellido = document.getElementById("Apellido").value.trim();
    let tratamiento = document.getElementById("Tratamiento").value; // Sr/Sra
    let nombreCompleto = ` ${nombre} ${apellido}`.trim();

    let empresa = document.getElementById("Empresa").value.trim();
    let celular = document.getElementById("Celular").value.trim();
    let direccion = document.getElementById("Direccion").value.trim();
    let correo = document.getElementById("Correo").value.trim();
    let ciudad = document.getElementById("Ciudad").value.trim();
    
    let anillo = document.getElementById("anillo").value.trim();
    let sn = document.getElementById("Legado2").value.trim(); // IP Switch / SN
    
    let idServ = document.getElementById("Legado").value.trim();
    let acp = document.getElementById("acp").value.trim();
    let identificador = idServ;
    if(acp) identificador += ` / ${acp}`;

    // Obtener Tipificación (Descartes realizados)
    let descarte = document.getElementById("observacionesGiones").value.trim();
    if(!descarte) descarte = "Se realizan validaciones de nivel 1.";

    let texto = "";

    // 2. CONSTRUIR PLANTILLA SEGÚN TIPO
    switch(tipo) {
        
        case "AGENDAMIENTO":
            texto = `${caso}\n`;
            texto += `DISPONIBILIDAD\n`;
            texto += `Horario: LUNES-VIERNES 8am-5pm SABADOS 8am-2pm\n`;
            texto += `Nombre Contacto en Sitio: ${nombreCompleto}\n`;
            texto += `Teléfonos Contacto en Sitio: ${celular}\n`;
            texto += `Contacto en sitio, tiene acceso a los CPE: SI\n`;
            texto += `Dirección: ${direccion}\n`;
            texto += `Permisos de ingreso: NO\n`;
            texto += `Parafiscales: NO\n`;
            texto += `Requiere Curso: NO\n`;
            texto += `Requiere llevar equipo: \n`;
            texto += `Tipo de equipo (Referencia) y cantidad: \n`;
            texto += `Motivo de escalamiento: ${descarte}`;
            break;

        case "APERTURA_DOBLE_1":
            texto = `Se presenta apertura doble en el anillo:  ${anillo} Afectando las comunicaciones del cliente.\n\n`;
            texto += `Ciudad: ${ciudad}\n`;
            texto += `IP del Swich: ${sn}\n\n`;
            texto += `Datos del Cliente\n\n`;
            texto += `Nombre cliente: ${empresa}\n`;
            texto += `Contacto cliente: ${nombreCompleto}\n`;
            texto += `Dirección cliente: ${direccion}\n`;
            texto += `Teléfono cliente: ${celular}\n`;
            texto += `Correo cliente: ${correo}\n`;
            texto += `Disponibilidad horaria: LUNES-VIERNES 8am-5pm SABADOS 8am-2pm\n`;
            texto += `Pedido de retiro (si/no): NO\n`;
            texto += `Descartes realizados: ${descarte}`;
            break;

        case "APERTURA_DOBLE_2":
            texto = `Se presenta apertura doble en el anillo: ${anillo} ciudad: ${ciudad} entre los clientes y Interfaz contra central: ___\n\n\n`;
            
            texto += `Datos del cliente caído extremo A\n\n`;
            texto += `Anillo: ${anillo}\n`;
            texto += `Ciudad: ${ciudad}\n`;
            texto += `Nombre cliente caído extremo A: ${empresa}\n`;
            texto += `IP switch cliente extremo A: ${sn}\n`;
            texto += `Contacto cliente caído extremo A: ${nombreCompleto}\n`;
            texto += `Correo cliente caído extremo A: ${correo}\n`;
            texto += `Dirección cliente caído extremo A: ${direccion}\n`;
            texto += `Teléfono cliente caído extremo A: ${celular}\n`;
            texto += `Disponibilidad horaria cliente extremo A: LUNES-VIERNES 8am-5pm SABADOS 8am-2pm\n`;
            texto += `Pedido de retiro (Sí/No): \n`;
            texto += `Descartes realizados: ${descarte}\n\n\n`;
            
            texto += `Datos del cliente caído extremo B\n\n`;
            texto += `Nombre cliente extremo B: \n`;
            texto += `IP switch cliente extremo B: \n`;
            texto += `Contacto cliente caído extremo B: \n`;
            texto += `Correo cliente caído extremo B: \n`;
            texto += `Dirección cliente caído extremo B: \n`;
            texto += `Teléfono cliente caído extremo B: \n`;
            texto += `Disponibilidad horaria cliente extremo B: Sin contacto con el cliente.\n`;
            texto += `Pedido de retiro (Sí/No): \n`;
            texto += `Descartes realizados: Sin contacto con el cliente.`;
            break;

        case "RETIRO_EMPALME":
            texto = `Se requiere realizar retiro desde el empalme del cliente "${empresa}"("${sn}") ubicado en el anillo "${anillo}", el cual se encuentra apagado por más de 48 horas *MONITOREO PROACTIVO*\n\n`;
            texto += `Anillo: ${anillo}\n`;
            texto += `Ip switch: ${sn}\n`;
            texto += `Ciudad: ${ciudad}\n`;
            texto += `Identificador: ${identificador}\n`;
            texto += `Nombre cliente: ${empresa}\n`;
            texto += `Contacto cliente: ${nombreCompleto}\n`;
            texto += `Teléfono cliente: ${celular}\n`;
            texto += `Dirección cliente: ${direccion}\n`;
            texto += `Disponibilidad cliente: LUNES-VIERNES 8am-5pm SABADOS 8am-2pm`;
            break;

        case "REINGRESO_EMPALME":
            texto = `Se requiere realizar el reingreso al anillo: ${anillo} desde el empalme de derivación al cliente.\n\n\n`;
            texto += `Anillo: ${anillo}\n`;
            texto += `Ip switch: ${sn}\n`;
            texto += `Ciudad: ${ciudad}\n`;
            texto += `Identificador: ${identificador}\n`;
            texto += `Nombre cliente: ${empresa}\n`;
            texto += `Contacto cliente: ${nombreCompleto}\n`;
            texto += `Teléfono cliente: ${celular}\n`;
            texto += `Dirección cliente: ${direccion}\n`;
            texto += `Disponibilidad cliente: LUNES-VIERNES 8am-5pm SABADOS 8am-2pm\n`;
            texto += `Descartes realizados: ${descarte}`;
            break;

        case "APERTURA_SIMPLE":
            texto = `Se presenta apertura simple en el anillo: ${anillo}\n\n`;
            texto += `Ciudad: ${ciudad}\n`;
            texto += `Entre los clientes: puerto giga: __  y puerto giga: ___\n\n\n`;
            
            texto += `Datos del cliente extremo A\n`;
            texto += `Nombre cliente caído extremo A: ${empresa}\n`;
            texto += `IP switch cliente extremo A: ${sn}\n`;
            texto += `Puerto giga caído en extremo A: \n`;
            texto += `Contacto cliente caído extremo A: ${nombreCompleto}\n`;
            texto += `Correo cliente caído extremo A: ${correo}\n`;
            texto += `Dirección cliente caído extremo A: ${direccion}\n`;
            texto += `Teléfono cliente caído extremo A: ${celular}\n`;
            texto += `Disponibilidad horaria cliente extremo A: LUNES-VIERNES 8am-5pm Sabados 8am-2pm\n`;
            texto += `Descartes realizados: ${descarte}\n\n\n`;

            texto += `Datos del cliente extremo B\n\n`;
            texto += `Nombre cliente extremo B: \n`;
            texto += `Ip switch extremo B: \n`;
            texto += `Puerto giga caído en extremo B: \n`;
            texto += `Contacto cliente extremo B: \n`;
            texto += `Dirección cliente extremo B: \n`;
            texto += `Teléfono cliente extremo B: \n`;
            texto += `Correo cliente extremo B: \n`;
            texto += `Disponibilidad horaria cliente extremo B: \n`;
            texto += `Pedido de retiro (Sí/No): \n\n`;
            texto += `Descartes realizados cliente extremo B: \n\n\n`;
            texto += `S3GU1M13NT0_3V3NT0S:d1agnostico`;
            break;
    }

    // Insertar en campo Resolución (observaciones2)
    document.getElementById("observaciones2").value = texto;
}