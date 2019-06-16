var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var GAP_BAR = 50;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (maxElement < arr[i]) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, names, times) {

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';

  ctx.fillText('Ура вы победили!', CLOUD_X + GAP_BAR - GAP, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP_BAR - GAP, CLOUD_Y + GAP * 2 + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var time = Math.round(times[i]);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], CLOUD_X + GAP_BAR + (BAR_WIDTH + GAP_BAR) * i, CLOUD_Y + CLOUD_HEIGHT - GAP);
    ctx.fillText(time, CLOUD_X + GAP_BAR + (BAR_WIDTH + GAP_BAR) * i,
    CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - GAP - (BAR_HEIGHT * times[i]) / maxTime - GAP);
    if (names[i] == 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.globalAlpha = 1/time * 1000;
      ctx.fillStyle = 'rgb(0, 0, 255)';
    }
    ctx.fillRect(CLOUD_X + GAP_BAR + (BAR_WIDTH + GAP_BAR) * i,
      CLOUD_Y + CLOUD_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime - GAP - FONT_GAP - GAP,
      BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  }
};
