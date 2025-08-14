// Registrar tus componentes
import './components/login.js';
import './components/product-comment.js';
import './components/espe-envio-gratis.js';
import './components/espe-boton-carrito.js';

// Registro del Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(() => console.log('✅ Service Worker registrado'))
      .catch(err => console.error('❌ Error al registrar SW:', err));
  });
}
