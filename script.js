// Función para mostrar páginas específicas
function mostrarPagina(id) {
    // Ocultar todas las páginas
    document.querySelectorAll('.pagina').forEach(pagina => {
        pagina.classList.remove('activa');
    });
    
    // Mostrar la página solicitada
    document.getElementById(id).classList.add('activa');
    
    // Scroll hacia arriba
    window.scrollTo(0, 0);
}

// Inicializar partículas
function inicializarParticulas() {
    const contenedor = document.getElementById('particulas');
    const cantidad = 50;
    
    for (let i = 0; i < cantidad; i++) {
        const particula = document.createElement('div');
        particula.classList.add('particula');
        
        // Posición aleatoria
        particula.style.left = `${Math.random() * 100}%`;
        particula.style.top = `${Math.random() * 100}%`;
        
        // Tamaño aleatorio
        const tamaño = Math.random() * 3 + 1;
        particula.style.width = `${tamaño}px`;
        particula.style.height = `${tamaño}px`;
        
        // Opacidad aleatoria
        particula.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Duración de animación aleatoria
        particula.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particula.style.animationDelay = `${Math.random() * 5}s`;
        
        contenedor.appendChild(particula);
    }
}

// Inicializar gráfico de encuestas
function inicializarGrafico() {
    const ctx = document.getElementById('encuesta-chart').getContext('2d');
    
    // Datos de ejemplo para el gráfico
    const data = {
        labels: ['Muy Satisfecho', 'Satisfecho', 'Neutral', 'Insatisfecho', 'Muy Insatisfecho'],
        datasets: [{
            label: 'Satisfacción Docente',
            data: [45, 35, 15, 3, 2],
            backgroundColor: [
                '#00A859',
                '#4CAF50',
                '#FFC107',
                '#FF9800',
                '#F44336'
            ],
            borderWidth: 1
        }]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Resultados de Encuesta de Satisfacción Docente',
                    color: '#fff'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Porcentaje (%)',
                        color: '#fff'
                    },
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    };
    
    new Chart(ctx, config);
}

// Funcionalidad para tarjetas flip
function inicializarFlipCards() {
    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
}

const ESTADOS_CRONOGRAMA = {
    planificado: 'Planificado',
    proceso: 'En proceso',
    completado: 'Completado'
};

function crearImagenGaleria(src, nombre) {
    const titulo = nombre || 'Evidencia';
    const imagenContainer = document.createElement('div');
    imagenContainer.className = 'imagen-galeria';

    const img = document.createElement('img');
    img.src = src;
    img.alt = titulo;

    const overlay = document.createElement('div');
    overlay.className = 'imagen-overlay';
    overlay.innerHTML = `<p>${titulo}</p>`;

    imagenContainer.appendChild(img);
    imagenContainer.appendChild(overlay);

    imagenContainer.addEventListener('click', function() {
        abrirModal(src, titulo);
    });

    return imagenContainer;
}

function procesarArchivosGaleria(input, galeria, opciones = {}) {
    const archivos = Array.from(input.files || []);
    if (!galeria || archivos.length === 0) {
        return;
    }

    archivos.forEach((file, index) => {
        if (!file.type.startsWith('image/')) {
            return;
        }

        const reader = new FileReader();

        reader.onload = function(loadEvent) {
            const imagenElemento = crearImagenGaleria(loadEvent.target.result, file.name);

            if (opciones.reemplazar && index === 0) {
                opciones.reemplazar(imagenElemento);
            } else {
                galeria.appendChild(imagenElemento);
            }
        };

        reader.readAsDataURL(file);
    });

    input.value = '';
}

// Funcionalidad para galería de imágenes
function inicializarGaleria() {
    const inputsPorId = document.querySelectorAll('input[type="file"][id^="agregar-imagen-"]');
    inputsPorId.forEach(input => {
        const section = input.id.replace('agregar-imagen-', '');
        const galeria = document.getElementById(`galeria-${section}`);

        if (!galeria) {
            return;
        }

        input.addEventListener('change', function() {
            procesarArchivosGaleria(input, galeria);
        });
    });

    const inputsGaleriaFija = document.querySelectorAll('#galeria-presentacion .input-imagen');
    inputsGaleriaFija.forEach(input => {
        const contenedor = input.closest('.espacio-imagen');
        const galeria = input.closest('#galeria-presentacion');

        if (!galeria) {
            return;
        }

        input.addEventListener('change', function() {
            procesarArchivosGaleria(input, galeria, {
                reemplazar: function(imagenElemento) {
                    if (contenedor) {
                        const existente = contenedor.querySelector('.imagen-galeria');
                        if (existente) {
                            existente.remove();
                        }

                        const placeholder = contenedor.querySelector('.placeholder-imagen');
                        if (placeholder) {
                            placeholder.remove();
                        }

                        contenedor.insertBefore(imagenElemento, input);
                    } else {
                        galeria.appendChild(imagenElemento);
                    }
                }
            });
        });
    });
}

// Funcionalidad para modal de galería
function inicializarModal() {
    const modal = document.getElementById('modal-galeria');
    const cerrarBtn = document.querySelector('.cerrar-modal');
    
    // Cerrar modal al hacer clic en la X
    cerrarBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera de la imagen
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
}

// Función para abrir modal con imagen
function abrirModal(src, nombre) {
    const modal = document.getElementById('modal-galeria');
    const imagenAmpliada = document.getElementById('imagen-ampliada');
    const tituloImagen = document.getElementById('titulo-imagen');
    const descripcionImagen = document.getElementById('descripcion-imagen');

    imagenAmpliada.src = src;
    tituloImagen.textContent = 'Evidencia: ' + nombre;
    descripcionImagen.textContent = 'Imagen agregada como evidencia del trabajo realizado.';

    modal.style.display = 'block';
}

function normalizarTextoBasico(valor) {
    return (valor || '')
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[^a-z\s]/g, '')
        .trim();
}

function obtenerClaveEstado(valor) {
    const texto = normalizarTextoBasico(valor);

    if (texto.includes('proceso')) {
        return 'proceso';
    }

    if (texto.includes('complet')) {
        return 'completado';
    }

    return 'planificado';
}

function actualizarEstadoSpan(span, estado) {
    const clave = ESTADOS_CRONOGRAMA[estado] ? estado : 'planificado';
    span.classList.remove('planificado', 'proceso', 'completado');
    span.classList.add('estado', clave);
    span.dataset.estado = clave;
    span.textContent = ESTADOS_CRONOGRAMA[clave];
}

function crearFilaCronograma({ actividad, fecha, participantes, responsable, estado }) {
    const fila = document.createElement('tr');

    const celdaActividad = document.createElement('td');
    celdaActividad.textContent = actividad;

    const celdaFecha = document.createElement('td');
    celdaFecha.textContent = fecha;

    const celdaParticipantes = document.createElement('td');
    celdaParticipantes.textContent = participantes;

    const celdaResponsable = document.createElement('td');
    celdaResponsable.textContent = responsable;

    const celdaEstado = document.createElement('td');
    const estadoSpan = document.createElement('span');
    estadoSpan.classList.add('estado');
    actualizarEstadoSpan(estadoSpan, estado);
    celdaEstado.appendChild(estadoSpan);

    const celdaAcciones = document.createElement('td');
    celdaAcciones.innerHTML = `
        <button class="btn-small edit-btn"><i class="fas fa-edit"></i></button>
        <button class="btn-small delete-btn"><i class="fas fa-trash"></i></button>
    `;

    fila.appendChild(celdaActividad);
    fila.appendChild(celdaFecha);
    fila.appendChild(celdaParticipantes);
    fila.appendChild(celdaResponsable);
    fila.appendChild(celdaEstado);
    fila.appendChild(celdaAcciones);

    return fila;
}

function editarFilaCronograma(fila) {
    const celdas = fila.querySelectorAll('td');
    if (celdas.length < 6) {
        return;
    }

    const estadoSpan = fila.querySelector('.estado');
    const actividadActual = celdas[0].textContent.trim();
    const fechaActual = celdas[1].textContent.trim();
    const participantesActual = celdas[2].textContent.trim();
    const responsableActual = celdas[3].textContent.trim();
    const estadoActual = obtenerClaveEstado(estadoSpan ? (estadoSpan.dataset.estado || estadoSpan.textContent) : '');

    const nuevaActividad = prompt('Editar actividad:', actividadActual);
    if (nuevaActividad === null) {
        return;
    }

    const nuevaFecha = prompt('Editar fecha:', fechaActual);
    if (nuevaFecha === null) {
        return;
    }

    const nuevosParticipantes = prompt('Editar participantes:', participantesActual);
    if (nuevosParticipantes === null) {
        return;
    }

    const nuevoResponsable = prompt('Editar responsable:', responsableActual);
    if (nuevoResponsable === null) {
        return;
    }

    const nuevoEstado = prompt('Editar estado (planificado/proceso/completado):', estadoActual);
    if (nuevoEstado === null) {
        return;
    }

    celdas[0].textContent = nuevaActividad.trim() || actividadActual;
    celdas[1].textContent = nuevaFecha.trim() || fechaActual;
    celdas[2].textContent = nuevosParticipantes.trim() || participantesActual;
    celdas[3].textContent = nuevoResponsable.trim() || responsableActual;
    actualizarEstadoSpan(estadoSpan, obtenerClaveEstado(nuevoEstado));
}

function inicializarCronograma() {
    const cuerpoTabla = document.getElementById('cronograma-body');
    const botonAgregar = document.getElementById('agregar-actividad');

    if (!cuerpoTabla || !botonAgregar) {
        return;
    }

    const inputActividad = document.getElementById('nueva-actividad');
    const inputFecha = document.getElementById('nueva-fecha');
    const inputParticipantes = document.getElementById('nueva-participantes');
    const selectEstado = document.getElementById('nueva-estado');

    cuerpoTabla.querySelectorAll('.estado').forEach(span => {
        actualizarEstadoSpan(span, span.dataset.estado || span.textContent);
    });

    botonAgregar.addEventListener('click', function(evento) {
        evento.preventDefault();

        const actividad = (inputActividad.value || '').trim();
        const fecha = (inputFecha.value || '').trim();
        const participantes = (inputParticipantes.value || '').trim();
        const estado = obtenerClaveEstado(selectEstado.value);

        if (!actividad || !fecha || !participantes) {
            return;
        }

        const fila = crearFilaCronograma({
            actividad,
            fecha,
            participantes,
            responsable: 'Alexander Jáquez',
            estado
        });

        cuerpoTabla.appendChild(fila);

        inputActividad.value = '';
        inputFecha.value = '';
        inputParticipantes.value = '';
        selectEstado.value = 'planificado';
        inputActividad.focus();
    });

    cuerpoTabla.addEventListener('click', function(evento) {
        const boton = evento.target.closest('button');
        if (!boton) {
            return;
        }

        const fila = boton.closest('tr');
        if (!fila) {
            return;
        }

        if (boton.classList.contains('delete-btn')) {
            evento.preventDefault();
            fila.remove();
            return;
        }

        if (boton.classList.contains('edit-btn')) {
            evento.preventDefault();
            editarFilaCronograma(fila);
        }
    });
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    inicializarParticulas();
    inicializarGrafico();
    inicializarFlipCards();
    inicializarGaleria();
    inicializarModal();
    inicializarCronograma();
});
