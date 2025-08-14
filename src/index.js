import './src/components/login.js';
import './src/components/product-comment.js';
import './src/components/espe-envio-gratis.js';
import './src/components/espe-boton-carrito.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('✅ Service Worker registrado'))
    .catch(err => console.error('❌ Error al registrar SW:', err));
}
