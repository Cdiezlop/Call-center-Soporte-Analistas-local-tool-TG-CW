//guiones select
function selecion(){
    let opcion = document.getElementById("guiones").value;
    let nombre = document.getElementById("Nombre").value;
    let celular = document.getElementById("Celular").value;
    let idLlamada = document.getElementById("IdLlamada").value;
    let idGuiones = document.getElementById("observacionesGiones").value;
  
  
  /*input.focus();*/
  /*copyToClipBoard("observaciones");*/
    switch(opcion){
       
      case "1":
        document.getElementById("observaciones").value = 
        "ID prueba: " + "N/A" + "\n" +
        "Conclusión al ejecutar lista de chequeo: " +"N/A"+ "\n" +
        "Diagnóstico realizado: " +idGuiones + "\n"+"\n"+
        "Falla eléctrica: No"+ "\n" +"\n" 
        
        +asignarAreaConware()+"d1agnostico";
  
        // Colocar el foco después de "Diagnóstico realizado: deliteTextbox"
        observaciones.focus();
        observaciones.selectionStart = observaciones.selectionEnd = observaciones.value.indexOf("Diagnóstico realizado: ") + "Diagnóstico realizado: ".length;
        
        break;
  
      case "2": 
        document.getElementById("observaciones").value = "S. Avanzado:"+"\n"+
        "\t" + "Conclusión al ejecutar lista de chequeo: " + "\n" +
        "\t" + "Numeral donde se evidencia falla en la lista de chequeo: "+ "\n" +
        "\t" + "Diagnóstico realizado: "+  idGuiones + "\n" +
        "\t" + "Falla eléctrica S/N: NO" + "\n" +"\n" +
  
        asignarAreaConware()+"d1agnostico";
        // Colocar el foco después de "Diagnóstico realizado: "
        observaciones.focus();
        observaciones.selectionStart = observaciones.selectionEnd = observaciones.value.indexOf("Diagnóstico realizado: ") + "Diagnóstico realizado: ".length;
        
        break;
  
      case "3":
        
        document.getElementById("observaciones").value = "De acuerdo a la comunicación establecida, hemos registrado su llamada."+"\n"+"Nombre: "+nombre+"\n"+"Teléfono: "+celular+"\n"+"avance: "+  idGuiones+"\n" +"\n" +
        "Seguiremos gestionando su caso en pro de una solución oportuna."+ "\n" +"\n" +
        "ID llamada: " +idLlamada+ "\n" +"\n" +
  
        asignarAreaConware()+"llamadadelcliente";
  
        break;
  
      case "4":
        document.getElementById("observaciones").value = "De acuerdo a la comunicación establecida, se ha registrado la llamada"+"\n"+"Nombre: "+nombre+"\n"+"Teléfono: "+celular+"\n"+"avance: "+  idGuiones+"\n" +"\n" +
        "Seguiremos gestionando su caso en pro de una solución oportuna."+ "\n" +"\n" +
        "ID llamada: " +idLlamada+ "\n" +"\n" +
  
        asignarAreaConware()+"llamadaalcliente";
        
        break;
  
      case "5":
        document.getElementById("observaciones").value ="Prueba realizada:"+"\n"+
        "Herramienta utilizada: " + "\n" + 
        "Resultado obtenido: " + idGuiones + "\n" +"\n" +
  
        asignarAreaConware()+"p3s3rv1c10";
        // Colocar el foco después de "La causa fue: "
        observaciones.focus();
        observaciones.selectionStart = observaciones.selectionEnd = observaciones.value.indexOf("Resultado obtenido: ") + "Resultado obtenido: ".length;
        
        break;  
  
  
      case "6":
        document.getElementById("observaciones").value = "Se brinda respuesta a la solicitud del cliente en el correo adjunto." + "\n" +"\n"+"\n" +
  
        asignarAreaConware()+"correodelcliente";
  
        break;


      case "7":
        document.getElementById("observaciones").value = "Se envía respuesta a los interesados en el correo adjunto." + "\n" +"\n"+"\n" +

        asignarAreaConware()+"correoalcliente";

        break;

        case "8":
        document.getElementById("observaciones").value = "Especialista que escribe: " +"\n"+
        "Canal de comunicación: "+"\n" +
        "Rol del especialista: "+"\n" +
        "Avance o gestión solicitada por  el especialista: "+"\n" +
        "Apoyo ofrecido: "+"\n" +"\n" +"\n" +

        asignarAreaConware()+"c0mun1c4c10ndelespecialista";

        break;

        case "9":
        document.getElementById("observaciones").value = "Especialista a quien escribe: " +"\n"+
        "Canal de comunicación: "+"\n" +
        "Rol del especialista: "+"\n" +
        "Avance solicitado del especialista: "+"\n" +
        "Apoyo dado: "+"\n" +"\n" +"\n" +

        asignarAreaConware()+"c0mun1c4c10nalespecialista";

        break;
  
  
      default: false;
    }
}
  


function asignarAreaConware() {
    const selectElement = document.getElementById('AreaConware');
    const selectedValue = selectElement.value;

    let S3GU1M13NT0;
    
    switch (selectedValue) {
      case "1":
        S3GU1M13NT0 = "S3GU1M13NT0_N1:";
        break;
      case "2":
        S3GU1M13NT0 = "S3GU1M13NT0_N2CW:";
        break;
      case "3":
        S3GU1M13NT0 = "S3GU1M13NT0_N2TG:";
        break;
      case "4":
        S3GU1M13NT0 = "S3GU1M13NT0_LC:";
        break;
      case "5":
        S3GU1M13NT0 = "S3GU1M13NT0_MESATT:";
        break;
      case "6":
        S3GU1M13NT0 = "S3GU1M13NT0_3V3NT0S:";
        break;
      default:
        S3GU1M13NT0 = "Valor no definido";
    }

    return S3GU1M13NT0;

  }


  function resetCon(){
    document.getElementById("guiones").selectedIndex = "";
    document.getElementById("observaciones").value ="";
  }
  