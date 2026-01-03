document.getElementById("btDownload").addEventListener("click", descargarCredenciales);

function descargarCredenciales() {
  const credenciales = `
Usuario: ${localStorage.getItem("user") || ""}
Red: ${localStorage.getItem("red") || ""}
Edatel: ${localStorage.getItem("eda") || ""}
ETP: ${localStorage.getItem("etp") || ""}
Elite: ${localStorage.getItem("elite") || ""}
Fenix: ${localStorage.getItem("fenix") || ""}
Avaya: ${localStorage.getItem("avaya") || ""}
  `;

  const blob = new Blob([credenciales], { type: 'text/plain' });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = "credenciales.txt";
  enlace.click();
}