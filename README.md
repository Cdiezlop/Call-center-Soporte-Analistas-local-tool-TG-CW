# Herramienta de Gestión para Analistas de Conectividad Tg B2B

Esta es una aplicación web local diseñada para optimizar los tiempos de respuesta y la precisión en la documentación de casos en entornos de soporte técnico y conectividad. Funciona de manera 100% local, sin necesidad de servidores externos.

##  Funcionalidades Principales

### 1. Gestión de Casos y Exportación
- **Soporte INC/WO:** Selector dinámico para definir el tipo de caso.
- **Exportación Estricta a TXT:** Genera un archivo plano con el formato oficial, organizando automáticamente:
  - Datos de contacto y técnicos.
  - Notas adicionales.
  - Descripción de llamada automática.
  - Gestión y diagnóstico técnico.
- **Validación de Seguridad:** Bloqueo de exportación si no se ha marcado la casilla de "Contacto Actualizado".

### 2. Automatización de Textos (Smart Scripts)
- **Descripción Automática:** Construye el saludo y el estado inicial de la llamada basándose en el nombre del cliente, tiempo sin servicio y acciones realizadas (reinicio, cables, energía).
- **Generador de Resumen:** Sistema de radio-buttons para crear etiquetas rápidas de falla (Ej: `Sin servicio–Internet–GPON*`).
- **Guiones Técnicos:** Plantillas pre-cargadas para tecnologías **GPON, HFC y FIBRA** que se autocompletan con el ID del servicio, ACP y Serial del equipo.

### 3. Herramientas Técnicas Rápidas
- **Buscador Unificado de NE:** Consulta instantánea de IPs en las bases de datos de Edatel y Metro.
- **Base de Conocimiento (Ayuda):** Buscador de procedimientos integrado que permite filtrar notas técnicas desde un archivo de referencia.
- **Utilidades de Hardware:**
  - **Botón MAC:** Copia la MAC del equipo eliminando automáticamente dos puntos o guiones.
  - **CPE# / ONT#:** Extrae y copia los últimos 6 dígitos de cualquier serial pegado.
  - **Claves Arris:** Generación de contraseña técnica basada en la fecha actual.

### 4. Interfaz de Usuario (UI) Profesional
- **Diseño Ergonómico:** Columnas distribuidas para minimizar el scroll.
- **Modo Edición:** Todos los campos autocompletados permiten edición manual para ajustes finos.
- **Paneles Laterales (Offcanvas):** Acceso rápido a credenciales de usuario y ayuda sin abandonar el formulario principal.

##  Tecnologías utilizadas
- **HTML5 / CSS3 (Bootstrap 5)**
- **Vanilla JavaScript** (Lógica local pura)

##  Instrucciones de Uso
1. Clonar o descargar el repositorio.
2. Abrir el archivo `index.html` en cualquier navegador moderno.
3. Configurar tus credenciales en el panel de **Usuario** (se guardan localmente en el navegador).

---
**Desarrollado por CD10**
