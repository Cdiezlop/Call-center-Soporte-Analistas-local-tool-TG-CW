const btnMac = document.getElementById('btnMac');
const btnCpe = document.getElementById('btnCpe');

btnMac.addEventListener('click', obtenerUltimosSeisCaracteresMac);

function obtenerUltimosSeisCaracteresMac() {
    let legado = document.getElementById("Legado2").value;
    const ultimosSeisCaracteres = legado.replace(/:/g, '').slice(-6);
    const result = 'CPE#'+ ultimosSeisCaracteres;
    captura2(result);
  }
  

  btnCpe.addEventListener('click', obtenerUltimosSeisCaracteresCpe);

function obtenerUltimosSeisCaracteresCpe() {
    let legado = document.getElementById("Legado2").value;
    const ultimosSeisCaracteres = legado.replace(/:/g, '').slice(-6);
    const result = 'ONT#'+ ultimosSeisCaracteres;
    captura2(result);
  }


// capturar sintexto
function captura2(parametro) {
    // Copiar al portapapeles la clave Arris
    navigator.clipboard.writeText(parametro)
}