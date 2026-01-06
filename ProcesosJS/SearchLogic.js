/* ==========================================
   LÓGICA DE BÚSQUEDA (NE y Notas)
   ========================================== */

// 1. Búsqueda de NEs (Combina Edatel y Metro)
function searchData() {
    const input = document.getElementById('search-NE').value.toLowerCase();
    const resultContainer = document.getElementById('result-container');
    const resultList = document.getElementById('result-list');
    
    resultList.innerHTML = ''; // Limpiar resultados anteriores

    if (input.length < 2) { 
        resultContainer.classList.remove('active');
        return;
    }

    // Unificar arrays de datos
    let allData = [];

    // Validar si existen las variables
    if (typeof edatelData !== 'undefined') {
        allData = allData.concat(edatelData);
    } 
    // Por si acaso aún existen variables con el nombre antiguo 'data'
    if (typeof data !== 'undefined') {
        allData = allData.concat(data);
    }

    if (typeof metroData !== 'undefined') {
        allData = allData.concat(metroData);
    }

    if (allData.length > 0) {
        // Filtrar por nombre o por IP (NE)
        const filteredData = allData.filter(item => 
            (item.name && item.name.toLowerCase().includes(input)) || 
            (item.NE && item.NE.includes(input))
        );
        
        if (filteredData.length > 0) {
            resultContainer.classList.add('active');
            filteredData.forEach(item => {
                const li = document.createElement('li');
                li.className = 'search-item';
                li.textContent = `${item.name} - ${item.NE}`;
                
                li.onclick = () => {
                    navigator.clipboard.writeText(item.NE);
                    // Feedback visual al copiar
                    li.style.backgroundColor = "#d1e7dd";
                    setTimeout(() => li.style.backgroundColor = "", 200);
                };
                resultList.appendChild(li);
            });
        } else {
            resultContainer.classList.remove('active');
        }
    }
}

// 2. Búsqueda en Base de Conocimiento (Notas TXT integradas)
// Muestra todo si está vacío. Busca y resalta si hay texto.
function searchInformation() {
    const input = document.getElementById('search-INFO').value.toLowerCase();
    const resultDiv = document.getElementById('result-info');
    
    resultDiv.classList.add('active');

    if (typeof INFO_TXT_CONTENT === 'undefined') {
        resultDiv.innerHTML = "<div class='p-2 text-danger small'>Error: Base de conocimientos no cargada.</div>";
        return;
    }

    // CASO 1: Campo vacío -> Mostrar TODO
    if (input.length === 0) {
        resultDiv.innerHTML = `<pre style="white-space: pre-wrap; margin: 0; font-family: monospace;">${INFO_TXT_CONTENT}</pre>`;
        return;
    }

    // CASO 2: Hay texto -> Buscar
    const index = INFO_TXT_CONTENT.toLowerCase().indexOf(input);

    if (index !== -1) {
        // Cortar desde la coincidencia hacia abajo
        const contentFromMatch = INFO_TXT_CONTENT.substring(index);
        
        // Resaltar la coincidencia
        const safeInput = input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const highlighted = contentFromMatch.replace(new RegExp(`(${safeInput})`, 'i'), '<mark style="background-color: #ffeb3b; font-weight: bold;">$1</mark>');

        resultDiv.innerHTML = `<pre style="white-space: pre-wrap; margin: 0; font-family: monospace;">${highlighted}</pre>`;
    } else {
        resultDiv.innerHTML = "<div class='p-2 text-muted small'>No se encontraron resultados.</div>";
    }
}

// Inicializar mostrando todo el contenido de notas al cargar
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('search-INFO')) {
        searchInformation(); 
    }
});