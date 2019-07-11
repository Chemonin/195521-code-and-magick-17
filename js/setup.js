'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Марья', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['Да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var AMOUNT = 4;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var getRandomIndex = function (array) {
  var rand = -0.5 + Math.random() * array.length;
  rand = Math.round(rand);
  return rand;
};

var setup = document.querySelector('.setup');
// userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getWizards = function (names, surnames, coatColor, eyesColor, amount) {
  var wizards = [];
  for (var i = 0; i < amount; i++) {
    wizards[i] = {
      name: names[getRandomIndex(names)] + ' ' + surnames[getRandomIndex(surnames)],
      coatColor: coatColor[getRandomIndex(coatColor)],
      eyesColor: eyesColor[getRandomIndex(eyesColor)]
    };
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardItem = similarWizardTemplate.cloneNode(true);
  wizardItem.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardItem.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardItem.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardItem;
};

var fillList = function (list) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < list.length; i++) {
    fragment.appendChild(renderWizard(list[i]));
  }
  similarListElement.appendChild(fragment);
};

var wizards = getWizards(WIZARD_NAMES, WIZARD_SURNAMES, COATS_COLOR, EYES_COLOR, AMOUNT);

fillList(wizards);

setup.querySelector('.setup-similar').classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var userName = setup.querySelector('.setup-user-name');
userName.minLength = '2';
userName.maxLength = '25';

var onDocumentKeydown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !(document.activeElement === userName)) {
    setup.classList.add('hidden');
  }
};

var onSetupOpenClick = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
};

var onSetupCloseClick = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

setupOpen.addEventListener('click', onSetupOpenClick);

var setupClose = setup.querySelector('.setup-close');
setupClose.tabIndex = '0';

setupClose.addEventListener('click', function () {
  onSetupCloseClick();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onSetupCloseClick();
  }
}, true);

var setupIcon = setupOpen.querySelector('.setup-open-icon');
setupIcon.tabIndex = '0';

setupIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onSetupOpenClick();
  }
});

var setupWizardCoat = setup.querySelector('.wizard-coat');
setupWizardCoat.addEventListener('click', function () {
  setupWizardCoat.style.fill = COATS_COLOR[getRandomIndex(COATS_COLOR)];
});

var setupWizardEyes = setup.querySelector('.wizard-eyes');
var inputEyesColor = setup.querySelector('input[name = eyes-color]');
setupWizardEyes.addEventListener('click', function () {
  setupWizardEyes.style.fill = EYES_COLOR[getRandomIndex(EYES_COLOR)];
  inputEyesColor.value = setupWizardEyes.style.fill;
});

var setupFireball = setup.querySelector('.setup-fireball-wrap');
var inputFireballColor = setupFireball.querySelector('input[name = fireball-color]');
setupFireball.addEventListener('click', function () {
  inputFireballColor.value = FIREBALL_COLOR[getRandomIndex(FIREBALL_COLOR)];
  setupFireball.style.backgroundColor = inputFireballColor.value;
});


var wizardSetup = setup.querySelector('.setup-wizard-form');
wizardSetup.action = 'https://js.dump.academy/code-and-magick';
