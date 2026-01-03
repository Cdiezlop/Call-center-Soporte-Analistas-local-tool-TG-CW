function copiarFormatoWord() {
    const fechaActual = new Date().toLocaleDateString('es-CO');
    const login = localStorage.getItem("user") || "X"; // <-- obtiene el user del localStorage

    const htmlContent = `
        <b>Diagnóstico</b><br>
        <b>Fecha:</b> ${fechaActual}<br>
        <b>Login:</b> ${login}<br>
        Imagen estado y administrativamente: <br>
        Descripción: <br>
        <hr>

        <b>Repruebas</b><br>
        <b>Fecha:</b> ${fechaActual}<br>
        <b>Login:</b> ${login}<br>
        Imagen(es) operacionalmente: <br>
        Descripción de las imágenes: <br>
        <hr>

        <b>Comunicación al especialista:</b><br>
        <b>Fecha:</b> ${fechaActual}<br>
        <b>Login:</b> ${login}<br>
        Descripción:<br>
        <hr>

        <b>Solución</b><br>
        <b>Fecha:</b> ${fechaActual}<br>
        <b>Login:</b> ${login}<br>
        Imagen(es) solución:  <br>
        Descripción de las imágenes: <br>
        Conclusión de solución:  <br>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const clipboardItem = new ClipboardItem({ "text/html": blob });

    navigator.clipboard.write([clipboardItem])
        .catch(err => console.error("Error al copiar:", err));
}
