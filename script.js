// Animaciones de entrada progresiva
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight - 100) && rect.bottom >= 100
  );
}

const secciones = document.querySelectorAll('.seccion');

function mostrarSeccionesFallback() {
  if (!secciones || secciones.length === 0) return;
  secciones.forEach(seccion => {
    if (isInViewport(seccion)) {
      seccion.classList.add('visible');
    }
  });
}

// Usar IntersectionObserver si está disponible (mejor rendimiento)
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // opcional: desconectar si no necesitamos observar más
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  secciones.forEach(s => observer.observe(s));
} else {
  // Fallback: scroll + load
  window.addEventListener('scroll', mostrarSeccionesFallback, { passive: true });
  window.addEventListener('load', mostrarSeccionesFallback);
  // animación inicial
  window.addEventListener('load', () => {
    const inicio = document.querySelector('.seccion');
    if (inicio) inicio.classList.add('visible');
  });
}