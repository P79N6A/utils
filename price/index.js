/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description index
 */

'use strict';

console.log(normalizePrice(30));
console.log(normalizePrice(30000));
console.log(normalizePrice(3123100));

function normalizePrice(price) {
  price = parseInt(price) / 100;

  if (price.toString().indexOf('.') !== -1) {
    price = price.toFixed(2);
  }

  return price;
}