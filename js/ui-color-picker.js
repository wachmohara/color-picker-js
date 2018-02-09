let ratio = 200;
let canvasPlane = document.getElementById('canvas-plane');
let canvasBar = document.getElementById('canvas-bar');
let ctxBox = canvasPlane.getContext('2d');
let ctxBar = canvasBar.getContext('2d');
let curColor = 'rgba(255,0,0,1)';
let cur = document.getElementById('color-ring');
let rValue = document.getElementById('r_value');
let gValue = document.getElementById('g_value');
let bValue = document.getElementById('b_value');
let hexValue = document.getElementById('fs-color-hash');
let colorShow = document.getElementById('color_show');

let thumb = document.getElementById('thumb-ball');
let rgbaStr = '#000';
let currentColorPosition = {x:0,y:0};

function colorBar() {
  let gradientBar = ctxBar.createLinearGradient(0, 0, 0, ratio);
  gradientBar.addColorStop(0, '#f00');
  gradientBar.addColorStop(1 / 6, '#f0f');
  gradientBar.addColorStop(2 / 6, '#00f');
  gradientBar.addColorStop(3 / 6, '#0ff');
  gradientBar.addColorStop(4 / 6, '#0f0');
  gradientBar.addColorStop(5 / 6, '#ff0');
  gradientBar.addColorStop(1, '#f00');

  ctxBar.fillStyle = gradientBar;
  ctxBar.fillRect(0, 0, 10, ratio);

  thumb.onmousedown = function(event) {
    event.preventDefault(); // prevent selection start (browser action)
  
    let shiftY = event.clientY - thumb.getBoundingClientRect().top;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      let newTop = event.clientY - shiftY - canvasBar.getBoundingClientRect().top;
      if (newTop < -5) {
        newTop = -5;
      }

      if (newTop > ratio) {
        newTop = ratio;
      }

      let buttomEdge = ratio - (thumb.offsetHeight-5);
      if (newTop > buttomEdge) {
        newTop = buttomEdge;
      }

      thumb.style.top = newTop + 'px';

      let realOfcolEpos = {
        x: event.offsetX || event.layerX,
        y: newTop
      };

      rgbaStr = getRgbaAtPoint(realOfcolEpos, 'bar');
      let rgbCol = '';
      if( rgbaStr[0] != undefined || rgbCol != ''){
        rgbCol = `rgba(${rgbaStr[0]},${rgbaStr[1]},${rgbaStr[2]},${ parseInt(rgbaStr[3]) })`;
        colorBox(rgbCol);
        findColorPlane(currentColorPosition, rgbaStr);
      }
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  }
}

function rgb2hex(rgb) {
  let aRgb = rgb instanceof Array ? rgb : (rgb.split(',') || [0, 0, 0]);
  let temp;
  return [
      (temp = Number(aRgb[0]).toString(16)).length == 1 ? ('0' + temp) : temp,
      (temp = Number(aRgb[1]).toString(16)).length == 1 ? ('0' + temp) : temp,
      (temp = Number(aRgb[2]).toString(16)).length == 1 ? ('0' + temp) : temp,
  ].join('');
}

function hex2rgb(hex) {
  if (hex.length == 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  return [
      parseInt(hex[0] + hex[1], 16),
      parseInt(hex[2] + hex[3], 16),
      parseInt(hex[4] + hex[5], 16),
  ].join();
}

function putCurDom(color) {
  if (/([0-9a-f]{3}|[0-9a-f]{6})/i.test(color)) {
      // hex
      color = hex2rgb(color);
  } else if (color instanceof Array) {
      color = color.join(',');
  } else if (/\d{1,3}(\,\d{1,3}){2}/i.test(color)) {

  } else {
      return;
  }
}

function colorBox(color) {
  let gradientBase = ctxBox.createLinearGradient(0, 0, ratio, 0);
  gradientBase.addColorStop(1, color);
  gradientBase.addColorStop(0, 'rgba(255,255,255,1)');

  ctxBox.fillStyle = gradientBase;
  ctxBox.fillRect(0, 0, ratio, ratio);

  let my_gradient1 = ctxBox.createLinearGradient(0, 0, 0, ratio);
  my_gradient1.addColorStop(0, 'rgba(0,0,0,0)');
  my_gradient1.addColorStop(1, 'rgba(0,0,0,1)');
  ctxBox.fillStyle = my_gradient1;
  ctxBox.fillRect(0, 0, ratio, ratio);
}

function init() {
  colorBar();
  colorBox(curColor);
  bind();
}

function bind() {
  canvasPlane.addEventListener('click', function(e) {
      moveingRing(ePosition(e), rgbaStr, cur);
  });

  canvasPlane.addEventListener('mousedown', function(e) {
    moveingRing(ePosition(e), rgbaStr, cur);
    this.onmousemove = function(e) {
      moveingRing(ePosition(e), rgbaStr, cur);
    }
  });

  canvasPlane.addEventListener("mouseup", function(e){
    this.onmousemove = null;
  });

  canvasPlane.addEventListener("mouseup", function(e){
    canvasPlane.onmousemove = null;
  });

  window.addEventListener('mouseup', function(e){
    canvasPlane.onmousemove = null;
  });
}

function moveingRing (ePos, rgbaStr, myCur) {
  currentColorPosition = ePos;
  rgbaStr = getRgbaAtPoint(ePos, 'box');
  findColorPlane(ePos, rgbaStr);
  curColorActive(myCur, rgbaStr);
}

function ePosition (e) {
  let ePos = {
    x: e.offsetX || e.layerX,
    y: e.offsetY || e.layerY
  }
  return ePos;
}

function curColorActive (mycur, rgbaStr) {
  mycur.style.border = (rgbaStr[0] > ratio / 2 || rgbaStr[1] > ratio / 2 || rgbaStr[2] > ratio / 2) ? '0.1rem solid #000' : '0.1rem solid #fff';
}

function findColorPlane(event, rgbaStr) {
  rgbaStr = getRgbaAtPoint(event, 'box');
  outColor(rgbaStr.slice(0, 3).join());
  cur.style.left = (event.x-3.5) + 'px';
  cur.style.top = (event.y-3.5) + 'px';
}

function outColor(rgb) {
  let rgbString = rgb.split(',');
  rValue.value = `R : ${rgbString[0]}`;
  gValue.value = `G : ${rgbString[1]}`;
  bValue.value = `B : ${rgbString[2]}`;
  hexValue.value = `#${rgb2hex(rgb)}`;
  // colorShow.style.backgroundColor = 'rgb(' + rgb + ')';
}

function getRgbaAtPoint(pos, area) {
  let imgData;
  if (area == 'bar') {
      imgData = ctxBar.getImageData(0, 0, 10, ratio);
  } else {
      imgData = ctxBox.getImageData(0, 0, canvasPlane.width, canvasPlane.height);
  }

  let data = imgData.data;
  let dataIndex = (pos.y * imgData.width + pos.x) * 4;
  return [
      data[dataIndex],
      data[dataIndex + 1],
      data[dataIndex + 2],
      (data[dataIndex + 3] / 255).toFixed(2),
  ];
}

init();