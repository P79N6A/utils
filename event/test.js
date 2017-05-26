/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description test
 */

'use strict';

var extend = require('../extend/extend');
var event = require('./event');

var Eventable = extend(function() {
  this.super.call(this);
}, event, {}, {});

var instance = new Eventable();

instance.on('test', function(data) {
  console.log(data);
});

instance.fire('test', 'hello world!');
