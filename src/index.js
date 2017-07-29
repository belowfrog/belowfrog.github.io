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
import gen from './js/gen';

const globalShots = {
  'UA': {
    key: 'navigator.userAgent',
    target: window,
  },
  'BURL': {
    target: 'external'
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
  if (globalShots[k].target === 'external') {
    return;
  }
  const data = get(window, globalShots[k].key);
  const nodeText = document.querySelector(`#node_${k}`);
  nodeText.innerText = data;

  const nodeBtnCopy = document.querySelector(`#btnCopy_${k}`);
  bindEvent(nodeBtnCopy, 'click', (e) => {
    copy(data);
    showQRCode(k, e.target.parentNode.parentElement.children[1], data);
  });
});

bindEvent(btnCopy_BURL, 'click', (e) => {
  const burl_oid = document.querySelector(`#burl_oid`).value;
  const burl_prefix = document.querySelector(`#burl_prefix`).value;
  const burl_salt = document.querySelector(`#burl_salt`).value;
  const data = gen(burl_oid, burl_prefix, burl_salt);

  node_BURL.innerText = data;
  copy(data);
  showQRCode('BURL', e.target.parentNode.parentElement.children[1], data);
});



