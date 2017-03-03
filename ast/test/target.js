/**
 * @author 作者
 * @version 0.0.1
 * @description 此为转换后的代码，请对比原始代码（目录下 *.old.js），并做必要的修改
 */
"use strict";

var Base = require("@ali/pi/mod-base");

var modXtpl = require("./xtpl/mod.xtpl");

var XTemplate = require("tms/xtemplate");

var xtpl = require("./items-xtpl");

var IO = require("io");

var XCtrl = require("market/xctrl");

var IconMap = require("./icon-map");

var LazyLoad = require("kg/datalazyload/6.0.3/index");

var $ = require("node").all;

var debug = getQuery().debug == "true";

location.href = "";

module.exports = Base.extend({
  initializer: function(config) {
    var self = this;
    var args = Array.prototype.slice.call(arguments);
    if (debug) {
      // debug
      self.init.apply(self, args);
    } else {
      self.init.apply(self, args);
    }
  },
  init: function($container, conf) {
    var ieInfo = navigator.userAgent.match(/MSIE\s(\d)\.\d/);
    if (ieInfo && (ieInfo[1] === "7" || ieInfo[1] === "6")) {
      return;
    }
    var self = this;
    self.$container = $container;
    self.$moduleWrap = $container.one(".module-wrap");
    // debug
    if (debug) {
      conf = {
        moduleinfo: {},
        items: [ {
          data_para: {
            tce_vid: "1",
            env: "debug",
            tce_sid: 362026
          },
          data_type: "tceinner",
          tms_type: "jsonp"
        } ]
      };
    }
    self.conf = conf;
    if (!conf) {
      this.$moduleWrap.html("请填入数据");
      return;
    }
    if (debug) {
      console.log("conf", conf);
    }
    self.bindEvent();
  },
  waitModule: function(callback) {
    var self = this;
    var interval = setInterval(function() {
      if (window.cdjFenleiNav) {
        clearInterval(interval);
        callback.apply(self);
      }
    }, 16.7);
  },
  loadData: function(callback) {
    var conf = this.conf;
    if (debug) {
      // debug
      new IO({
        url: "http://dip.alibaba-inc.com/api/v2/services/schema/mock/12121",
        dataType: "json",
        success: function(data) {
          callback(data.items);
        }
      });
    } else {
      XCtrl.dynamic(conf, "items", function(data) {
        callback(data.items);
      });
    }
  },
  // 绑定
  bindEvent: function() {
    var self = this;
    self.loadData(function(scenes) {
      for (var i = 0; i < scenes.length; ++i) {
        scenes[i].iconUnicode = IconMap[scenes[i].type];
        self.initOneModule(scenes[i]);
      }
      self.$moduleWrap.removeClass("cdj-loading");
    });
  },
  initOneModule: function(scene) {
    var self = this;
    var items = scene.items;
    var $sortWrap = $('<div class="sort-container" data-title="' + S.escapeHtml(scene.type) + '" data-icon="' + S.escapeHtml(scene.iconUnicode) + '"></div>');
    for (var i = 0; i < items.length; ++i) {
      if (items[i].item_status) {
        items[i].subItems = S.map(items[i].item_status.split("潮品"), function(value) {
          var tmp = value.split(":");
          return {
            pic: tmp[0],
            url: tmp[1]
          };
        });
      }
    }
    self.render($sortWrap, scene);
    self.$moduleWrap.append($sortWrap);
  },
  render: function($container, data) {
    var html = new XTemplate(xtpl).render(data);
    $container.append(html);
    new LazyLoad({
      container: $container[0]
    });
  }
});

function getQuery(url) {
  var search = url && url.split(/\?/)[1] || location.search;
  var queryArray = decodeURI(search).match(/[^&?]+=[^&]+/g) || [];
  for (var i = 0, queryObject = {}; i < queryArray.length; i++) {
    var kv = queryArray[i].split(/=/);
    queryObject[kv[0]] = kv[1];
  }
  return queryObject;
}