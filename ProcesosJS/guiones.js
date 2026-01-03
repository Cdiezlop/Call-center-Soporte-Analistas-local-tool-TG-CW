function selecionGuiones(){

    let opcion = document.getElementById("guionesGuion").value;
    let nombre = document.getElementById("Nombre").value;
    let celular = document.getElementById("Celular").value;
    let idLlamada = document.getElementById("IdLlamada").value;
    let idServicio = document.getElementById("Legado").value;
    let idSerial = document.getElementById("Legado2").value;
    let idNE = document.getElementById("NE").value;
    let switch1 = document.getElementById("switch1").value;
    let acp = document.getElementById("acp").value;
    let Caso = document.getElementById("Caso").value;



  /*input.focus();*/
  /*copyToClipBoard("observaciones");*/
    switch(opcion){
    case "0":/*GPON - Capa3*/
        document.getElementById("observacionesGiones").value =" Se verifica que el servicio está activo con el identificador "+ idServicio +"/"+acp+", con el número de serie del equipo "+ idSerial +". Se comprobó que el enlace está operativo con parámetros óptimos y que las Vlan está correctamente configurada en modo bridge. Se accedió al equipo NE con IP "+ idNE +" y se confirmó el levantamiento de capa 3, con el equipo MAC X.  Se realiza prueba de ping sin pérdida de paquetes, se confirma operatividad dentro de la red de Tigo." ;
        
        break;  
  
    case "1":/*GPON - lost*/
        document.getElementById("observacionesGiones").value =" Se ha validado que el servicio está activo con el ID "+ idServicio +". Tras revisar el serial "+ idSerial +", se ha identificado equipo offline con ruptura de fibra. Se genera incidente para realizar visita técnica con el fin de revisar el problema en el lugar. ";
        
        break; 

    case "2":/*no responde*/
        document.getElementById("observacionesGiones").value ="Buenos días nos intentamos comunicar para darle gestión al requerimiento " + Caso +" pero no hay respuesta las llamadas se van  buzón correo de voz, los invitamos a que se comunique por las líneas de atención 01 8000 513 287 o #513 desde líneas Tigo.";
        
        break; 

    case "3":/*HFC - Online*/
      document.getElementById("observacionesGiones").value =" Se verificó que el servicio está activo con el identificador "+ idServicio +", se confirma MAC del equipo "+ idSerial +" en estado online, con parámetros óptimos y portadoras dentro del rango óptimo de operatividad, se confirma perfil ldap correctamente configurada, Se realiza prueba de ping sin pérdida de paquetes, se confirma operatividad dentro de la red de Tigo.";
      
      break;

      case "4":/*HFC - Offline*/
      document.getElementById("observacionesGiones").value =" Se verificó que el servicio está activo con el identificador "+ idServicio +", se confirma MAC del equipo "+ idSerial +" en estado Offline, se realiza descartes de primer nivel con el usuario, el cual nos informa que no recibe navegación por parte del equipo, online queda apagado, no se tiene gestión ,se verifica que equipo tenga perfil Lda correctamente configurado, por lo que se genera visita técnica, para revisión del equipo en terreno.";
      
      break;
       
      case "5":/*FIBRA - Capa3*/
      document.getElementById("observacionesGiones").value =" Se verificó que el servicio está activo con el identificador "+ idServicio +", se tiene gestión del switch "+ switch1 +" se ingresa al NE "+idNE+" el cual se evidencia levantamiento en capa 3 con la MAC x, se realiza prueba de ping sin pérdida de paquetes, parámetros dentro de los rangos óptimos de operatividad, se confirma operatividad dentro de la red de Tigo.";
      
      break;

      case "6":/*GPON - Online*/
        document.getElementById("observacionesGiones").value =" Se verificó que el servicio está activo con el identificador "+ idServicio +", con el número de serie del equipo "+ idSerial +". Se comprobó que el enlace está operativo con parámetros óptimos y que las VLANs están correctamente configuradas en modo Router. Se confirma operatividad dentro de la red de Tigo,";
      
      break;

      case "7":/*television ok*/
        document.getElementById("observacionesGiones").value =" Se verificó que el servicio está activo con el identificador "+ idServicio +" , se valida NSCID/SN "+ idSerial +" asociado correctamente en verimatrix con paquetes de canales, se refresca decodificador, se reinicia de fábrica, se valida con usuario las conexiones, el cual confirma que correcto funcionamiento del servicio.";
      
      break;

      case "8":/*television sin señal*/
        document.getElementById("observacionesGiones").value =" Se verificó que el servicio está activo con el identificador "+ idServicio +" , se valida NSCID/SN "+ idSerial +" asociado correctamente en verimatrix con paquetes de canales, se refresca decodificador, se reinicia de fábrica, se valida con usuario las conexiones, usuario indica que la falla todavía persiste, por lo que se genera visita técnica, para revisión del equipo en terreno.";
      
      break;

      case "9":/*movilidad*/
      document.getElementById("observacionesGiones").value ="Usuario "+ nombre +" se contacta indicando que la linea "+ idServicio +" presenta fallas,usuario indica que ya ha realizado los respectivos descartes de primer nivel, se evidencia linea con particiones activas, se escala con el área de movilidad para su respectiva revisión.";
    
    break;

    case "10":/*seguimiento*/
      document.getElementById("observacionesGiones").value = "El caso que nos mencionas sigue en proceso, nuestro equipo está trabajando en ello. En cuanto tengamos novedades, se las haremos saber.";
    
    break;


    case "11":/*Direccionamiento*/
      document.getElementById("observacionesGiones").value = "Usuario se contacta solicitando validar el direccionamiento del servicio y colocar el internet en modo bridge, se le indica direccionamiento. Se verificó que el servicio está activo con el identificador "+ idServicio +", con el número de serie del equipo "+ idSerial +". Se comprobó que el enlace está operativo con parámetros óptimos y que las VLANs ya se encuentran correctamente configuradas en modo bridge.  se confirmó direccionamiento del servicio";
    
    break;

    case "12":/*ONT sin registro*/
      document.getElementById("observacionesGiones").value = "Se verifica que el servicio está activo con el identificador "+ idServicio +", con el número de serie del equipo "+ idSerial +". Equipo sin registro en NCE, Se confirma equipo en la OLT XXX, se procede con el registro, Se configuran vlans, Equipo se encuentra dentro de los rangos óptimos de operatividad, Se realiza levantamiento de equipo en capa 3  con el equipo MAC XX, Se realiza prueba de ping sin pérdida de paquetes, se confirma operatividad dentro de la red de Tigo.";
    
    break;

    case "13":/*novedad comercial*/
      document.getElementById("observacionesGiones").value = "Se identifica que el servicio se encuentra suspendido por falta de pago. Se informa a la usuaria sobre la novedad comercial y se realiza la transferencia al área correspondiente para su resolución.";
    
    break;

    case "14": /*Fibra offline*/
  document.getElementById("observacionesGiones").value = 
    "Se verificó que el servicio se encuentra activo bajo el identificador "+idServicio+"/"+acp+".\n" +
    "No se tiene gestión sobre el switch "+switch1+".\n" +
    "Se realiza reinicio del equipo en conjunto con el usuario.\n\n" +
    "Adicionalmente, se confirma que no se han presentado afectaciones eléctricas en la sede.\n\n" +
    "Se evidencia una apertura entre los switches XXXXX y XXXXX.\n" +
    "Los hilos de fibra se encuentran conectados en las interfaces GigabitEthernet X y GigabitEthernet X, las cuales se encuentran apagadas.\n\n" +
    "Se procede a generar un ticket de trabajo (TT) con el fin de dar solución a la falla presentada.";
  break;

  case "15":/*novedad comercial*/
      document.getElementById("observacionesGiones").value = "se valida servicio activo, "+idServicio+"/"+acp+". cliente  reporta que desde el día de hoy tiene problemas con la salida de llamadas a  algunos números del operador xxx en especifico al xxxx le sale mensaje servicio no disponible , no se completa las llamadas, desde otros operadores si sale normal, se valida capa 3 NE "+idNE+", que llega equipo del cliente, se escala nivel 2 para hacer trazas.";
    
    break;

    case "16":/*Servicio ok troncal IMS*/
      document.getElementById("observacionesGiones").value = "Se valida que el servicio se encuentra activo con el identificador "+ idServicio +". Las pruebas de trazado se completan sin errores y los parámetros de operación se mantienen dentro de los rangos óptimos. Se confirma la correcta operatividad del servicio dentro de la red de Tigo.";
    
    break;
  
    case "17":/*Servicio ok webex*/
      document.getElementById("observacionesGiones").value = "Se valida que el servicio se encuentra activo. La línea está registrada correctamente en Webex Calling, con los equipos asociados en línea. Las pruebas de trazado se completan sin errores, y todos los parámetros se mantienen dentro de rangos normales de operación. Se confirma la correcta operatividad del servicio dentro de la red de Tigo.";
    
    break;

    case "18":/*Servicio ok troncal IMS (ONT)*/
      document.getElementById("observacionesGiones").value = "Se verifica que el servicio se encuentra activo con el identificador "+ idServicio +". Se valida el equipo Huawei con número de serie "+ idSerial +" , el cual se encuentra en estado online. Se comprueba que el enlace está operativo, con parámetros dentro de los rangos óptimos, y que la VLAN está correctamente configurada en modo bridge. Se accede al equipo NE con IP "+ idNE + ", y se confirma el levantamiento de capa 3 con el equipo identificado por la MAC xxx. Se realiza prueba de ping sin pérdida de paquetes y las pruebas de trazado de ruta se completan sin errores. Los parámetros de operación se mantienen dentro de los valores esperados. Se confirma la operatividad del servicio dentro de la red de Tigo." ;
    
    break;

    case "19":/*registro HFC-GPON*/
      document.getElementById("observacionesGiones").value = "Se verifica que el servicio se encuentra activo con el identificador "+ idServicio + ". Se valida el equipo Huawei con número de serie "+ idSerial +", el cual se encuentra en estado online. Se comprueba que el enlace está operativo, con parámetros dentro de los rangos óptimos, se procede a configurar vlan 410 en modo bridge para la Toip, se repisa credenciales,Los parámetros de operación se mantienen dentro de los valores esperados. Se confirma la operatividad del servicio dentro de la red de Tigo." ;
    
    break;

    case "20":/*registro HFC*/
      document.getElementById("observacionesGiones").value = "Se verifica que el servicio se encuentra activo con el identificador "+ idServicio + ". Se valida el equipo MAC "+ idSerial +", el cual se encuentra en estado online. Se comprueba que el enlace está operativo, con parámetros dentro de los rangos óptimos, Se detecta que la línea no presenta registro en la plataforma IMS, por lo que se realiza el aprovisionamiento correspondiente, posteriormente, se reinicia el cable módem, logrando que la línea registre correctamente en la plataforma, Se confirma la operatividad del servicio dentro de la red de Tigo." ;
    
    break;

      default: false;
    }}