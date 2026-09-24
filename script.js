// URLs de las imágenes por región (REEMPLAZA con tus imágenes reales)
const regionImages = {
    cabeza: "https://static.vecteezy.com/system/resources/previews/079/394/975/non_2x/human-skull-side-view-detailed-realistic-ancient-bone-free-png.png",
    tronco: "./tronco.png",
    superiores: "https://i.pinimg.com/originals/fb/10/a4/fb10a4bc4e40eda86ff1625db592f37d.png",
    inferiores: "./inferiores.png"
};

const defaultImage = "https://definicion.de/wp-content/uploads/2014/09/sistema-oseo.png";

const skeletonImg = document.getElementById('skeletonImage');

function changeImage(region) {
    skeletonImg.src = regionImages[region];
}
function resetImage() {
    skeletonImg.src = defaultImage;
}

// Función para mostrar una región
function showRegion(regionId) {
    // Ocultar pantalla de bienvenida
    document.getElementById('welcomeScreen').style.display = 'none';

    // Ocultar todas las vistas
    const views = document.querySelectorAll('.content-view');
    views.forEach(view => view.classList.remove('active'));

    // Mostrar la región seleccionada
    const regionView = document.getElementById(regionId);
    if (regionView) {
        regionView.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Función para mostrar una subregión
function showSubregion(subregionId) {
    // Ocultar todas las vistas
    const views = document.querySelectorAll('.content-view');
    views.forEach(view => view.classList.remove('active'));

    // Mostrar la subregión seleccionada
    const subregionView = document.getElementById(subregionId);
    if (subregionView) {
        subregionView.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Función para volver al inicio
function goHome() {
    // Ocultar todas las vistas
    const views = document.querySelectorAll('.content-view');
    views.forEach(view => view.classList.remove('active'));

    // Mostrar pantalla de bienvenida
    document.getElementById('welcomeScreen').style.display = 'flex';
    window.scrollTo(0, 0);
}

// Añadir interactividad a los acordeones si se implementan
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function () {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        content.classList.toggle('open');
    });
});

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.bone-image, .bone-names, .bone-description').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Efecto parallax suave en imágenes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.bone-image').forEach(img => {
        const speed = 0.05;
        img.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
// ===== Contador de huesos =====
const VALORES_HUESOS = {
    'Frontal': 1, 'Parietales': 2, 'Temporales': 2, 'Occipital': 1, 'Esfenoides': 1, 'Etmoides': 1,
    'Maxilares': 2, 'Cigomáticos': 2, 'Nasales': 2, 'Lagrimales': 2, 'Palatinos': 2,
    'Cornetes nasales inferiores': 2, 'Vómer': 1, 'Mandíbula': 1,
    'Martillo': 2, 'Yunque': 2, 'Estribo': 2,
    'Hioides': 1,
    'Vértebras cervicales': 7, 'Vértebras torácicas': 12, 'Vértebras lumbares': 5, 'Sacro': 1, 'Cóccix': 1,
    'Esternón': 1, 'Costillas verdaderas': 14, 'Costillas falsas': 6, 'Costillas flotantes': 4,
    'Clavícula': 2, 'Escápula u omóplato': 2,
    'Húmero': 2,
    'Radio': 2, 'Cúbito o ulna': 2,
    'Escafoides': 2, 'Semilunar': 2, 'Piramidal': 2, 'Pisiforme': 2,
    'Trapecio': 2, 'Trapezoide': 2, 'Grande': 2, 'Ganchoso': 2,
    'Metacarpianos': 10, 'Falanges': 28,
    'Huesos coxales': 2,
    'Fémur': 2, 'Rótula': 2,
    'Tibia': 2, 'Peroné o fíbula': 2,
    'Calcáneo': 2, 'Astrágalo': 2, 'Navicular': 2,
    'Cuneiforme medial': 2, 'Cuneiforme intermedio': 2, 'Cuneiforme lateral': 2,
    'Cuboide': 2, 'Metatarsianos': 10,
};

let totalHuesos = 0;

function actualizarContador(cantidad) {
    totalHuesos += cantidad;
    const spanTotal = document.getElementById('totalValue');
    spanTotal.textContent = totalHuesos;
    const contador = document.getElementById('contadorTotal');
    contador.classList.remove('pulso');
    void contador.offsetWidth;
    contador.classList.add('pulso');
}

document.querySelectorAll('.bone-name').forEach(hueso => {
    hueso.style.position = 'relative';

    // Efecto hover para cambiar la imagen de la subregión
    hueso.addEventListener('mouseenter', function () {
        const contentView = this.closest('.content-view');
        if (contentView) {
            const img = contentView.querySelector('.bone-image');
            if (img) {
                if (!img.dataset.original) {
                    img.dataset.original = img.src;
                }
                const hoverImg = hueso.getAttribute('data-img') || 'doomie.png';
                img.src = hoverImg;
            }
        }
    });

    hueso.addEventListener('mouseleave', function () {
        const contentView = this.closest('.content-view');
        if (contentView) {
            const img = contentView.querySelector('.bone-image');
            if (img && img.dataset.original) {
                img.src = img.dataset.original;
            }
        }
    });

    hueso.addEventListener('click', function () {
        if (this.classList.contains('contado')) return; // Ya contado, no sumar de nuevo
        const nombre = this.textContent.replace(/\s+/g, ' ').trim();
        const valor = VALORES_HUESOS[nombre] || 1;
        actualizarContador(valor);
        this.classList.add('contado');
        const aviso = document.createElement('span');
        aviso.className = 'aviso-suma';
        aviso.textContent = '+' + valor;
        this.appendChild(aviso);
        setTimeout(() => aviso.remove(), 900);
    });
});

