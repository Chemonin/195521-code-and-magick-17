'use strict';

var getRandomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Марья', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['Да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];

for (var i = 0; i < 4; i++) {
  wizards[i] = {
    name: WIZARD_NAMES[getRandomInteger(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomInteger(0, WIZARD_NAMES.length - 1)],
    coatColor: COATS_COLOR[getRandomInteger(0, COATS_COLOR.length - 1)],
    eyesColor: EYES_COLOR[getRandomInteger(0, EYES_COLOR.length - 1)]
  };
}

var renderWizard = function (wizard) {
  var wizardItem = similarWizardTemplate.cloneNode(true);
  wizardItem.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardItem.querySelector('.wizard-coat').textContent = wizard.coatColor;
  wizardItem.querySelector('.wizard-eyes').textContent = wizard.eyesColor;

  return wizardItem;
};

var fillList = function (list) {
  var fragment = document.createDocumentFragment();
  for (i = 0; i < list.length; i++) {
    fragment.appendChild(renderWizard(list[i]));
  }
  similarListElement.appendChild(fragment);
};

fillList(wizards);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
