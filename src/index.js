import { copy } from './lib/copy';
import {
  bindEvent,
  removeEvent,
} from './lib/event';
const QRCode  = require("exports-loader?QRCode!./lib/qrcode");;

const global = {};
const showQRCode = (data) => {
  if (!global.qrcode) {
    const nodeQRCode = document.createElement('div');
    nodeQRCode.setAttribute('id', 'qrcode');
    global.qrcode = new QRCode(nodeQRCode, {
      text: window.navigator.userAgent,
      width: 128,
      height: 128,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });
    document.body.appendChild(nodeQRCode);
  } else {
    global.qrcode.clear();
    global.qrcode.makeCode(data);
  }
}

// copy
const nodeUA = document.querySelector('#ua');
ua.innerText = window.navigator.userAgent;
bindEvent(btnCopy, 'click', () => {
  copy(window.navigator.userAgent);
  showQRCode(window.navigator.userAgent);
});