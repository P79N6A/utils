/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description event
 */

'use strict';

function Mod() {
  this.handlerMap = {};
}

Mod.prototype = {
  on: function(eventType, handler) {
    if (!this.handlerMap[eventType]) {
      this.handlerMap[eventType] = [];
    }

    this.handlerMap[eventType].push(handler);
  },
  fire: function(eventType, data) {
    if (!this.handlerMap[eventType]) {
      throw new Error('event type doesn\'t exist');
    }

    this.handlerMap[eventType].forEach(function(handler) {
      handler.call(null, data);
    });
  },
  off: function(eventType, handler) {
    if (!this.handlerMap[eventType]) {
      throw new Error('event type doesn\'t exist');
    }

    var index = this.handlerMap[eventType].indexOf(handler);

    // 重复 handler 需要多次调用
    if (index !== -1) {
      return this.handlerMap[eventType].splice(index, 1);
    }
  }
};

class MicroEvent {
  handlerMap = {};

  on(eventType, handler) {
    if (!this.handlerMap[eventType]) {
      this.handlerMap[eventType] = [];
    }

    this.handlerMap[eventType].push(handler);
  }

  fire(eventType, data) {
    if (!this.handlerMap[eventType]) {
      throw new Error('event type doesn\'t exist');
    }

    this.handlerMap[eventType].forEach(function(handler) {
      handler.call(null, data);
    });
  }

  off(eventType, handler) {
    if (!this.handlerMap[eventType]) {
      throw new Error('event type doesn\'t exist');
    }

    const index = this.handlerMap[eventType].indexOf(handler);

    // 重复 handler 需要多次调用
    if (index !== -1) {
      return this.handlerMap[eventType].splice(index, 1);
    }
  }
}

module.exports = MicroEvent;
