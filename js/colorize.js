'use strict';

(function () {

  window.colorize = function (element, colors, elementInput) {
    element.addEventListener('click', function () {
      elementInput.value = colors[window.util.getRandomIndex(colors)];
      if (element.tagName.toLowerCase() === 'div') {
        element.style.background = elementInput.value;
      } else {
        element.style.fill = elementInput.value;
      }
    });
  };
})();
