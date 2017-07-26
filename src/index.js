import './index.scss';
import { copy } from './lib/copy';
import {
  bindEvent,
  removeEvent,
} from './lib/event';
import {
  get,
} from './lib/utils';
const QRCode  = require("exports-loader?QRCode!./lib/qrcode");

const globalShots = {
  'UA': {
    key: 'navigator.userAgent',
  },
  'COOKIE': {
    key: 'document.cookie',
  },
};

const showQRCode = (shot, container, data) => {
  if (!data) {
    globalShots[shot].qrcode && globalShots[shot].qrcode.clear();
    console.info('empty data');
    return;
  }
  if (!globalShots[shot].qrcode) {
    const nodeQRCode = document.createElement('div');
    container.appendChild(nodeQRCode);
    globalShots[shot].qrcode = new QRCode(nodeQRCode, {
      text: data,
      width: 128,
      height: 128,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });
  } else {
    globalShots[shot].qrcode.clear();
    globalShots[shot].qrcode.makeCode(data);
  }
}

Object.keys(globalShots).forEach(k => {
  const data = get(window, globalShots[k].key);
  const nodeText = document.querySelector(`#node_${k}`);
  nodeText.innerText = data;

  const nodeBtnCopy = document.querySelector(`#btnCopy_${k}`);
  bindEvent(nodeBtnCopy, 'click', (e) => {
    copy(data);
    showQRCode(k, e.target.parentNode.parentElement.children[1], data);
  });
});
