// Avisa a Login/index.html (ventana contenedora) que hay actividad real
// dentro de este modulo, cargado en un <iframe>. Sin esto, el cierre de
// sesion por inactividad (SESSION_TIMEOUT_MS en Login/index.html) no se
// reinicia mientras el usuario trabaja solo dentro de un modulo, porque
// los eventos de mouse/clic/scroll de un iframe no llegan a la ventana
// padre por si solos.
//
// Para que un modulo o submodulo NUEVO participe de esto, agrega esta
// unica linea justo antes de </body> en su HTML:
//   <script src="../session-activity.js"></script>
// (ajusta la ruta "../" segun la profundidad de carpetas del archivo).
(function () {
  if (window.parent === window) return;
  var lastPing = 0;
  function pingActivity() {
    var now = Date.now();
    if (now - lastPing < 15000) return;
    lastPing = now;
    window.parent.postMessage({ type: 'opaustro-activity' }, '*');
  }
  ['click', 'keydown', 'touchstart', 'mousemove', 'scroll'].forEach(function (evt) {
    document.addEventListener(evt, pingActivity, { passive: true });
  });
})();
