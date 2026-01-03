let wakeLock = null;

// Función para activar el Wake Lock
async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Wake Lock activado');

    // Escuchar cuando el Wake Lock se pierde (por ejemplo, al bloquear la pantalla)
    wakeLock.addEventListener('release', () => {
      console.log('Wake Lock liberado');
    });
  } catch (err) {
    console.error('No se pudo activar el Wake Lock:', err);
  }
}

// Función para liberar el Wake Lock
function releaseWakeLock() {
  if (wakeLock) {
    wakeLock.release();
    wakeLock = null;
    console.log('Wake Lock liberado manualmente');
  }
}

// Activa el Wake Lock al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  requestWakeLock();
});

// Liberar el Wake Lock al cerrar la página
window.addEventListener('beforeunload', () => {
  releaseWakeLock();
});
