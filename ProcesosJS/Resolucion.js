function selecion2(){

    let opcion = document.getElementById("guiones2").value;
    let nombre = document.getElementById("Nombre").value;
    let celular = document.getElementById("Celular").value;
    let idLlamada = document.getElementById("IdLlamada").value;
    let idDireccion = document.getElementById("Direccion").value;

   

  /*input.focus();*/
  /*copyToClipBoard("observaciones");*/
    switch(opcion){
      case "0":
        document.getElementById("observaciones2").value ="La causa fue: "+"No se detecta afectación dentro de la red de Tigo."+"\n"+"La solución fue: Se observa servicio operativo desde plataforma, no se evidencia falla por parte de Tigo, usuario debe validar de manera interna el equipo secundario ya que es administrado por ellos.";

        break;  
  
        case "1":
            document.getElementById("observaciones2").value ="Horario:: lunes a viernes de 8:00am a 5:00pm, sábado de 8:00am a 12:00pm "+"\n"+"Nombre Contacto en Sitio: "+ nombre + "\n"+"Teléfonos Contacto en Sitio: "+ celular +"\n"+"Contacto en sitio, tiene acceso a los CPE: Si "+"\n"+ "Dirección: "+idDireccion +"\n"+"Permisos de ingreso: No "+"\n"+"Parafiscales: Si/No "+"\n"+"Requiere Curso: No "+"\n"+"Requiere llevar equipo: No"+"\n"+"Tipo de equipo (Referencia) y cantidad:N/A "+"\n"+"Observaciones detalladas: ";


            
            break; 


            case "2":
            document.getElementById("observaciones2").value ="La causa fue: "+"\n"+"La solución fue: ";
            
            observaciones2.focus();

            observaciones2.selectionStart = observaciones2.selectionEnd = observaciones2.value.indexOf("La causa fue: ") + "La causa fue: ".length;
            
            break; 

            
            case "3":
            document.getElementById("observaciones2").value ="La causa fue:  No se evidencia falla en la red de Tigo"+"\n"+
            "La solución fue: Nos intentamos comunicar para darle gestión al requerimiento pero no hay respuesta las llamadas se van a buzón correo de voz, por temas de vigencia y el servicio se evidencia operativo queda en estado resuelto. los invitamos a que se comunique por las líneas de atención 01 8000 513 287 o #513 desde líneas Tigo. si tiene preguntas o inquietudes relacionadas con este asunto no dude en contactarnos estaremos más que dispuestos a abrir un nuevo caso y apoyar con su requerimiento.";
            
            
            break; 

            case "4":
            document.getElementById("observaciones2").value ="La causa fue:  Puerto bloqueado "+"\n"+
            "La solución fue: Se procede a quitar bloqueo, y se confirma operatividad con el usuario, el cual nos informa el correcto funcionamiento del servicio, se le indica adicionalmente que caso quedara monitoreado durante 24 horas en caso que presente alguna novedad nuevamente con el servicio.";
            
            
            break; 

            case "5":
            document.getElementById("observaciones2").value ="La causa fue:  Decodificador sin canales asociados."+"\n"+
            "La solución fue: Se registra paquete de canales en el decodificador, usuaria nos informa el correcto funcionamiento de equipo, igualmente se le indica que requerimiento quedara monitoreado durante 24 horas en caso que presente alguna novedad nuevamente con el servicio.";
          
            
            break; 
           

            case "6":
            document.getElementById("observaciones2").value ="La causa fue: Equipo sin registro."+"\n"+
            "La solución fue: Se procede a ingresar equipo en la red de Tigo, se configura parámetros de la red y se confirma con el usuario el correcto funcionamiento del servicio,  se le indica adicionalmente que caso quedara monitoreado durante 24 horas en caso que presente alguna novedad nuevamente con el servicio.";
          
            
            break; 

            case "7":
            document.getElementById("observaciones2").value ="La causa fue: Servicio con novedad comercial."+"\n"+
            "La solución fue: Se le informa a la usuaria que servicio presenta novedad comercial, se realiza trasferencia con el área comercial para su respectiva resolución.";
          
            
            break; 

            case "8":
            document.getElementById("observaciones2").value ="La causa fue: No se detecta afectación dentro de la red de Tigo."+"\n"+
            "La solución fue: Se observa servicio operativo desde plataforma, no se evidencia falla por parte de Tigo, Nos comunicamos con el usuario el cual nos confirma el correcto funcionamiento del servicio, se le indica adicionalmente que caso quedara monitoreado durante 24 horas en caso que presente alguna novedad nuevamente con el servicio.";
          
            
            break; 


            case "9":
            document.getElementById("observaciones2").value ="La causa fue: Cambio en el enrutamiento."+"\n"+
            "La solución fue: Con respecto a su solicitud de cambio en el modo de enrutamiento, lamentamos informarle que no podemos proceder con esta gestión, ya que, según nuestros registros, usted no figura como contacto autorizado para realizar modificaciones en la cuenta.";
          
            
            break; 

            case "10":/*agendamiento visita tecnica */
            document.getElementById("observaciones2").value ="La causa fue: Equipo fuera de linea."+"\n"+
            "La solución fue: Se programa una visita técnica para llevar a cabo la respectiva resolución en sitio.";
          
            
            break; 

            case "11":/*registroTOIP */
            document.getElementById("observaciones2").value ="La causa fue: Equipo sin registro de línea telefónica."+"\n"+
            "La solución fue: Se procede a ingresar registro de la telefonía, se confirma con el usuario el correcto funcionamiento del servicio,  se le indica adicionalmente que caso quedara monitoreado durante 24 horas en caso que presente alguna novedad nuevamente con el servicio.";
          
            
            break; 


  
      default: false;
    }}