/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description duoshuo
 */

'use strict';

const fs = require('fs');
const path = require('path');
const Config = {
  modules: {
    'a/b/2.0.12/1': 1,
    'a/b/1.9.22/1': 1,
    'a/b/2.0.13/1': 1,
    'a/c/2.0.12/1': 1
  }
};

//console.log(sinon.stub);
console.log(_getLatestVersion('a/b/2.0.1/1'));

function _getLatestVersion(moduleName) {
  var nameRegRxp = /([^\/]+\/[^\/]+\/)([^\/]+)\/(.+)/;
  var matchedTarget = moduleName.match(nameRegRxp);

  if (!matchedTarget) {
    return moduleName;
  }

  // 无版本模块名
  var noVersionTarget = matchedTarget[1] + matchedTarget[3];
  var currentVersion = matchedTarget[2];
  var satisfiedModName;

  Object.keys(Config.modules).forEach(function(definedModName) {
    // e.g. tms/tb-init-kimi/4.3.0/km-tracker/mods/parseException
    var matchedModName = definedModName.match(nameRegRxp);

    // 匹配到模块定义
    if (matchedModName && noVersionTarget === matchedModName[1] + matchedModName[3]) {
      if (_semVerCompare(matchedModName[2], currentVersion) > 0) {
        satisfiedModName = definedModName;
        currentVersion = matchedModName[2];
      }
    }
  });

  return satisfiedModName || moduleName;
}

function _semVerCompare(target, origin) {
  target = target.split('.');
  origin = origin.split('.');

  for (var i = 0, result; i < target.length; ++i) {
    result = Math.min(Math.max(+target[i] - +origin[i], -1), 1);

    if (result !== 0) {
      return result;
    }
  }

  return 0;
}