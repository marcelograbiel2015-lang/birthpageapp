/**
 * Función principal para calcular el tiempo restante
 */
function calcularCumple() {
    // 1. Obtener datos
    const nombreElement = document.getElementById('nombre');
    const fechaElement = document.getElementById('fechaNacimiento');
    const resultadoDiv = document.getElementById('resultado');

    const nombre = nombreElement.value.trim();
    const fechaInput = fechaElement.value;

    // 2. Validación
    if (!nombre || !fechaInput) {
        resultadoDiv.innerHTML = "<p style='color:yellow;'>⚠️ ERROR: INGRESA TU NOMBRE Y FECHA.</p>";
        return;
    }

    const hoy = new Date();
    const nacimiento = new Date(fechaInput);
    
    // 3. Calcular próximo cumpleaños
    let proximo = new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate());
    
    // Si ya pasó este año, apuntamos al siguiente
    if (hoy > proximo) {
        proximo.setFullYear(hoy.getFullYear() + 1);
    }

    // 4. Calcular edad a cumplir
    const edadSiguiente = proximo.getFullYear() - nacimiento.getFullYear();

    // 5. Cálculos de tiempo restante
    let diffMs = proximo - hoy;
    let totalHoras = Math.floor(diffMs / (1000 * 60 * 60));
    let diasTotales = Math.floor(totalHoras / 24);
    let horasFinales = totalHoras % 24;

    // Cálculo preciso de meses y días
    let meses = 0;
    let tempDate = new Date(hoy);
    
    while (true) {
        tempDate.setMonth(tempDate.getMonth() + 1);
        if (tempDate > proximo) {
            tempDate.setMonth(tempDate.getMonth() - 1);
            break;
        }
        meses++;
    }

    const unDiaMs = 24 * 60 * 60 * 1000;
    let diasFinales = Math.floor((proximo - tempDate) / unDiaMs);

    // 6. Construir el mensaje (HTML Dinámico)
    let html = "";

    // Lógica para < 10 días
    if (diasTotales < 10) {
        html += `<span class="congrats-title">FELICIDADES, ${nombre.toUpperCase()}</span>`;
    } else {
        html += `<p>ESCUCHA, <span style="color:#ff0000;">${nombre.toUpperCase()}</span>... EL TIEMPO SE AGOTA.</p>`;
    }

    // El contador llamativo
    html += `
        <p>PARA TUS <span style="color:#ff0000;">${edadSiguiente} AÑOS</span> SOLO QUEDAN:</p>
        <div class="time-blocks">
            <div class="time-block">
                <span class="time-value">${meses}</span>
                <span class="time-label">Meses</span>
            </div>
            <div class="time-block">
                <span class="time-value">${diasFinales}</span>
                <span class="time-label">Días</span>
            </div>
            <div class="time-block">
                <span class="time-value">${horasFinales}</span>
                <span class="time-label">Horas</span>
            </div>
        </div>
    `;

    // Lógica 18 años
    if (edadSiguiente === 18) {
        html += `<div class="adult-message">¡Ya casi serás adulto y será hora de celebrar!</div>`;
    }

    // Imagen final
    html += `<img src="imagen.webp" alt="EL TIEMPO VUELA" class="birthday-image">`;

    // 7. Inyectar en el HTML
    resultadoDiv.innerHTML = html;
}