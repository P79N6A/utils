/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description shade
 */

'use strict';

var hexStr = ' #3961d0 ';
var rgbStr = ' rgba ( 57, 97 , 208 , 1)';
var color = shade(hexStr, 0, .369863014, -.536585366);


function shade(color, perH, perS, perV) {
  var r, g, b, a, hex, rgb;

  // remove all blank chars
  color = color.replace(/\s+/g, '');

  if (hex = color.match(/#([\w\d]{1,2})([\w\d]{1,2})([\w\d]{1,2})/)) {
    r = parseInt(hex[1].length > 1 ? hex[1] : hex[1] + hex[1], 16);
    g = parseInt(hex[2].length > 1 ? hex[2] : hex[2] + hex[2], 16);
    b = parseInt(hex[3].length > 1 ? hex[3] : hex[3] + hex[3], 16);
  } else if (rgb = color.match(/^(rgba?)\((\d+),(\d+),(\d+)(?:,(0?\.?\d+))?\)$/)) {
    r = parseInt(rgb[2]);
    g = parseInt(rgb[3]);
    b = parseInt(rgb[4]);

    if (rgb[5] !== undefined) {
      a = parseFloat(rgb[5]);
    }
  } else {
    throw new Error('invalid color');
  }

  // process color
  var hsv = rgb2hsv(r, g, b);

  hsv.h *= (1 + perH);
  hsv.s *= (1 + perS);
  hsv.v *= (1 + perV);

  var _rgb = hsv2rgb(hsv.h, hsv.s, hsv.v);
  var _hex = [parseInt(_rgb.r).toString(16), parseInt(_rgb.g).toString(16), parseInt(_rgb.b).toString(16)];

  for (var i = 0; i < _hex.length; ++i) {
    while (_hex[i].length < 2) {
      _hex[i] = '0' + _hex[i];
    }
  }

  if (hex) {
    return '#' + _hex.join('');
  } else if (rgb) {
    return rgb[1] + '(' + parseInt(_rgb.r) + ', ' + parseInt(_rgb.g) + ', ' + parseInt(_rgb.b) + (a === undefined ? '' : ', ' + a) + ')'
  }
}


/**
 * convert rgb to hsv
 * @reference http://blog.csdn.net/jiangxinyu/article/details/8000999
 */
function rgb2hsv(r, g, b) {
  r = Math.max(0, Math.min(r, 255)) / 255;
  g = Math.max(0, Math.min(g, 255)) / 255;
  b = Math.max(0, Math.min(b, 255)) / 255;

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h, s, v;

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (g - b) / (max - min) + (g < b ? 360 : 0);
  } else if (max === g) {
    h = 60 * (b - r) / (max - min) + 120;
  } else if (max === b) {
    h = 60 * (r - g) / (max - min) + 240;
  }

  s = max === 0 ? 0 : 1 - min / max;
  v = max;

  return {
    h: h, s: s, v: v
  }
}

/**
 * convert hsv to rgb
 * @reference http://snipplr.com/view/14590/hsv-to-rgb/
 */
function hsv2rgb(h, s, v) {
  var r, g, b;
  var i;
  var f, p, q, t;

  h = Math.max(0, Math.min(360, h));
  s = Math.max(0, Math.min(1, s));
  v = Math.max(0, Math.min(1, v));

  if (s == 0) {
    r = g = b = v;
    return {r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255)};
  }

  h /= 60; // sector 0 to 5
  i = Math.floor(h);
  f = h - i; // factorial part of h
  p = v * (1 - s);
  q = v * (1 - s * f);
  t = v * (1 - s * (1 - f));

  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;

    case 1:
      r = q;
      g = v;
      b = p;
      break;

    case 2:
      r = p;
      g = v;
      b = t;
      break;

    case 3:
      r = p;
      g = q;
      b = v;
      break;

    case 4:
      r = t;
      g = p;
      b = v;
      break;

    default: // case 5:
      r = v;
      g = p;
      b = q;
  }

  return {r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255)};
}
