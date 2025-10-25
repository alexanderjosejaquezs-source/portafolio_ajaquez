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

// Funcionalidad para galería de imágenes
function inicializarGaleria() {
    // Configurar inputs de archivo para galerías
    document.querySelectorAll('input[type="file"][id^="agregar-imagen-"]').forEach(input => {
        input.addEventListener('change', function(e) {
            const section = this.id.replace('agregar-imagen-', '');
            const galeria = document.getElementById(`galeria-${section}`);
            
            Array.from(e.target.files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(event) {
                        const imagenContainer = document.createElement('div');
                        imagenContainer.className = 'imagen-galeria';
                        
                        const img = document.createElement('img');
                        img.src = event.target.result;
                        img.alt = 'Evidencia';
                        
                        const overlay = document.createElement('div');
                        overlay.className = 'imagen-overlay';
                        overlay.innerHTML = `<p>${file.name}</p>`;
                        
                        imagenContainer.appendChild(img);
                        imagenContainer.appendChild(overlay);
                        
                        // Agregar evento para abrir modal
                        imagenContainer.addEventListener('click', function() {
                            abrirModal(event.target.result, file.name);
                        });
                        
                        galeria.appendChild(imagenContainer);
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            // Limpiar input
            this.value = '';
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

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    inicializarParticulas();
    inicializarGrafico();
    inicializarFlipCards();
    inicializarGaleria();
    inicializarModal();
});