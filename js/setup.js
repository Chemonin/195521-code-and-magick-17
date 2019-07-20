'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Марья', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['Да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var AMOUNT = 4;

  var setup = document.querySelector('.setup');

  document.querySelector('.setup-similar').classList.remove('hidden');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var getWizards = function (names, surnames, coatColor, eyesColor, amount) {
    var wizards = [];
    for (var i = 0; i < amount; i++) {
      wizards[i] = {
        name: names[window.util.getRandomIndex(names)] + ' ' + surnames[window.util.getRandomIndex(surnames)],
        coatColor: coatColor[window.util.getRandomIndex(coatColor)],
        eyesColor: eyesColor[window.util.getRandomIndex(eyesColor)]
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

  var wizards = getWizards(WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYES_COLORS, AMOUNT);

  fillList(wizards);

  var wizardCoat = setup.querySelector('.wizard-coat');
  var inputCoatColor = setup.querySelector('input[name = coat-color]');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var inputEyesColor = setup.querySelector('input[name = eyes-color]');
  var fireball = setup.querySelector('.setup-fireball-wrap');
  var inputFireballColor = fireball.querySelector('input[name = fireball-color]');

  window.colorize(wizardCoat, COAT_COLORS, inputCoatColor);
  window.colorize(wizardEyes, EYES_COLORS, inputEyesColor);
  window.colorize(fireball, FIREBALL_COLORS, inputFireballColor);
})();
