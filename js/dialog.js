'use strict';

(function () {
  var setup = document.querySelector('.setup');
  setup.querySelector('.setup-similar').classList.remove('hidden');

  var wizardSetup = document.querySelector('.setup-open');
  var userName = setup.querySelector('.setup-user-name');
  var setupDefaultY = setup.style.top;
  var setupDefaultX = setup.style.left;

  var onDocumentKeydown = function (evt) {
    if (document.activeElement !== userName) {
      window.util.isEscEvent(evt, closeSetup);
    }
  };

  var openSetup = function () {
    setup.classList.remove('hidden');

    document.addEventListener('keydown', onDocumentKeydown);
  };

  var closeSetup = function () {
    setup.classList.add('hidden');
    setup.style.left = setupDefaultX;
    setup.style.top = setupDefaultY;
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  wizardSetup.addEventListener('click', function () {
    openSetup();
  });

  var setupCloseBtn = setup.querySelector('.setup-close');

  setupCloseBtn.addEventListener('click', function () {
    closeSetup();
  });

  setupCloseBtn.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeSetup);
  }, true);

  var setupIcon = wizardSetup.querySelector('.setup-open-icon');

  setupIcon.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openSetup);
  });

  var dialogHandler = setup.querySelector('.upload');
  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCords.x - moveEvt.clientX,
        y: startCords.y - moveEvt.clientY
      };

      startCords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evtClick) {
          evtClick.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  var artifactsElement = document.querySelector('.setup-artifacts');
  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
  });


  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
