// Hace el header clickeable para mostrar la hoja de información
document.addEventListener('DOMContentLoaded', function() {
    var header = document.querySelector('.header');
    if(header) {
        header.style.cursor = 'pointer';
        header.onclick = function() { mostrarHoja(1); };
    }
});
function showZoomModal(img) {
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'zoom-modal-overlay';
    overlay.onclick = () => document.body.removeChild(overlay);
    // Crear imagen grande
    const bigImg = document.createElement('img');
    bigImg.src = img.src;
    bigImg.alt = img.alt;
    bigImg.className = 'zoom-modal-img';
    overlay.appendChild(bigImg);
    document.body.appendChild(overlay);
}

// --- Menú navegación y swipe ---
const hojasWrapper = document.getElementById('hojasWrapper');
const tabButtons = document.querySelectorAll('.tab-btn');
const hojas = document.querySelectorAll('.hoja');
let hojaActual = 1;

const tabsContainer = document.getElementById('tabsContainer');

function mostrarHoja(numero) {
    const offset = (numero - 1) * hojasWrapper.offsetWidth;
    hojasWrapper.scrollTo({ left: offset, behavior: 'smooth' });
    hojaActual = numero;
    actualizarBotonesActivos(numero);
    // Ocultar los botones si estamos en la hoja de Info
    if (numero === 1) {
        tabsContainer.style.display = 'none';
        const divider = document.getElementById('divider-header-info');
        if (divider) divider.style.display = '';
    } else {
        tabsContainer.style.display = '';
        const divider = document.getElementById('divider-header-info');
        if (divider) divider.style.display = 'none';
    }
}
window.mostrarHoja = mostrarHoja; // Hacer global

function actualizarBotonesActivos(hojaActiva) {
    // Como ya no existe el botón Info, el primer botón corresponde a hoja 2
    tabButtons.forEach((btn, index) => {
        if (index === hojaActiva - 2) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    // Ocultar los botones si estamos en la hoja de Info
    if (hojaActiva === 1) {
        tabsContainer.style.display = 'none';
        const divider = document.getElementById('divider-header-info');
        if (divider) divider.style.display = '';
    } else {
        tabsContainer.style.display = '';
        const divider = document.getElementById('divider-header-info');
        if (divider) divider.style.display = 'none';
    }
}

hojasWrapper.addEventListener('scroll', () => {
    const index = Math.round(hojasWrapper.scrollLeft / hojasWrapper.offsetWidth);
    hojaActual = index + 1;
    actualizarBotonesActivos(hojaActual);
    // Ocultar los botones si estamos en la hoja de Info
    if (hojaActual === 1) {
        tabsContainer.style.display = 'none';
        const divider = document.getElementById('divider-header-info');
        if (divider) divider.style.display = '';
    } else {
        tabsContainer.style.display = '';
        const divider = document.getElementById('divider-header-info');
        if (divider) divider.style.display = 'none';
    }
});

let startX = 0;

// Al cargar la página, ocultar los botones si estamos en la hoja de Info
window.addEventListener('DOMContentLoaded', () => {
    if (hojaActual === 1) {
        tabsContainer.style.display = 'none';
        const divider = document.getElementById('divider-header-info');
        if (divider) divider.style.display = '';
    } else {
        tabsContainer.style.display = '';
        const divider = document.getElementById('divider-header-info');
        if (divider) divider.style.display = 'none';
    }
});
hojasWrapper.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
    }
});
hojasWrapper.addEventListener('touchend', (e) => {
    if (e.changedTouches.length === 1) {
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;
        if (Math.abs(diff) > 50) {
            if (diff < 0 && hojaActual < hojas.length) {
                mostrarHoja(hojaActual + 1);
            } else if (diff > 0 && hojaActual > 1) {
                mostrarHoja(hojaActual - 1);
            }
        }
    }
});

window.addEventListener('resize', () => {
    mostrarHoja(hojaActual);
});

window.addEventListener('load', () => {
    mostrarHoja(1);
});
