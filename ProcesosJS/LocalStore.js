/*LocalStorage*/

// guardar datos en local storage
var btsave = document.getElementById("btSavePass");
btsave.addEventListener("click", savePass);

function savePass() {
  let savered = document.getElementById("passRed").value;
  let saveEda = document.getElementById("passEda").value;
  let saveEtp = document.getElementById("passEtp").value;
  let saveElite = document.getElementById("passElite").value;
  let saveFenix = document.getElementById("passFenix").value;
  let saveUser = document.getElementById("user").value;
  let saveAvaya = document.getElementById("avaya").value;


  localStorage.setItem("red", savered);
  localStorage.setItem("eda", saveEda);
  localStorage.setItem("etp", saveEtp);
  localStorage.setItem("elite", saveElite);
  localStorage.setItem("fenix", saveFenix);
  localStorage.setItem("user", saveUser);
  localStorage.setItem("avaya", saveAvaya);

  console.log(localStorage.getItem("red","eda","etp","elite","fenix","user","avaya"));
}

//cargar info en input de opciones
document.addEventListener("DOMContentLoaded", cargarValores);

function cargarValores() {
  var savedRed = localStorage.getItem("red");
  var saveEda = localStorage.getItem("eda");
  var saveEtp = localStorage.getItem("etp");
  var saveElite = localStorage.getItem("elite");
  var saveFenix = localStorage.getItem("fenix");
  var saveUser = localStorage.getItem("user");
  var saveAvaya = localStorage.getItem("avaya");


  if (savedRed) {
    document.getElementById("passRed").value = savedRed;
    
  }
  if (saveEda) {
    document.getElementById("passEda").value = saveEda;
    
  }
  if (saveEtp) {
    document.getElementById("passEtp").value = saveEtp;
    
  }
  if (saveElite) {
    document.getElementById("passElite").value = saveElite;
    
  }
  if (saveFenix) {
    document.getElementById("passFenix").value = saveFenix;
    
  }
  if (saveUser) {
    document.getElementById("user").value = saveUser;
    
  }
  if (saveAvaya) {
    document.getElementById("avaya").value = saveAvaya;
    
  }
}


/*funcion asignar contrasenas a los botones*/

document.getElementById("btRed").addEventListener("click", () => asignarCopiar("red"));
document.getElementById("btEdatel").addEventListener("click", () => asignarCopiar("eda"));
document.getElementById("btEtp").addEventListener("click", () => asignarCopiar("etp"));
document.getElementById("btElite").addEventListener("click", () => asignarCopiar("elite"));
document.getElementById("btFenix").addEventListener("click", () => asignarCopiar("fenix"));
document.getElementById("btLogin").addEventListener("click", () => asignarCopiar("user"));
document.getElementById("btAvaya").addEventListener("click", () => asignarCopiar("avaya"));



function asignarCopiar(valor) {
  var savedValue = localStorage.getItem(valor);
  if (savedValue) {
    navigator.clipboard.writeText(savedValue)
  }
}

