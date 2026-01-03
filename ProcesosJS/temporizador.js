let timer;
    let isRunning = false;
    let totalTime = 230; // Tiempo en segundos (3 minutos y 50 segundos)

    const timeDisplay = document.getElementById('time');
    const playButton = document.getElementById('play');
    const resetButton = document.getElementById('reset');
    const alarmSound = document.getElementById('alarm-sound');

    // Formatea el tiempo en mm:ss
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    // Actualiza el temporizador
    function updateTimer() {
      timeDisplay.textContent = formatTime(totalTime);
      if (totalTime <= 0) {
        clearInterval(timer);
        isRunning = false;
        playButton.textContent = 'Play';
        alarmSound.play(); // Reproducir el sonido
      }
    }

    // Maneja el botón Play
    function toggleTimer() {
      if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        playButton.textContent = 'Play';
      } else {
        timer = setInterval(() => {
          totalTime--;
          updateTimer();
        }, 1000);
        isRunning = true;
        playButton.textContent = 'Pausa';
      }
    }

    // Maneja el botón Reiniciar
    function resetTimer() {
      clearInterval(timer);
      isRunning = false;
      totalTime = 230;
      updateTimer();
      playButton.textContent = 'Play';
    }

    // Eventos de los botones
    playButton.addEventListener('click', toggleTimer);
    resetButton.addEventListener('click', resetTimer);

    // Inicializa el temporizador
    updateTimer();