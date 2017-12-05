/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description compare
 */

'use strict';

console.log(
  _semVerCompare('1.03.23103', '1.3.023110')
);

/**
 * 获取 define 格式为 group/name/version/* 的最高版本定义
 * @param moduleName
 * @returns {*}
 * @private
 */
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

/**
 * 比较 semver，仅支持 x.x.x
 * @param target
 * @param origin
 * @returns {Number} -1|0|1
 * @private
 */
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