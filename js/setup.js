'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Марья', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['Да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var AMOUNT = 4;
var getRandomIndex = function (array) {
  var rand = -0.5 + Math.random() * array.length;
  rand = Math.round(rand);
  return rand;
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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

userDialog.querySelector('.setup-similar').classList.remove('hidden');
