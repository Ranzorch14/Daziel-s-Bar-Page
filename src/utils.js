// Pequeña utilidad pura para testear: isInViewport
function isInViewportRect(rect, windowHeight) {
  // rect is an object with top and bottom numeric properties
  return rect.top <= (windowHeight - 100) && rect.bottom >= 100;
}

module.exports = { isInViewportRect };
