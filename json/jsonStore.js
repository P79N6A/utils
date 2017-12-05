/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description jsonStore
 */

'use strict';

const path = require('path');
const fs = require('fs');

function defineConst(obj, key, value) {
  Object.defineProperty(obj, key, {
    enumerable: false,
    configurable: false,
    writable: false,
    value: value
  });
}

/**
 * 创建一个可快速存储的 JSON 数据
 * @method __save 保存 JSON 到本地
 */
class JSONStore {
  /**
   * 构造方法
   * @param {String | Object} target JSON 文件路径或者对象，如果是对象，其键值只能为 JSONStore 实例
   * @param {Boolean} createIfNotExists 不存在就新建
   */
  static create(target, createIfNotExists) {
    if (typeof target === 'string') {
      let json;

      try {
        json = JSON.parse(fs.readFileSync(target, 'utf-8'));
      } catch (e) {
        if (createIfNotExists) {
          json = {};

          // 标记不存在
          defineConst(json, '__exists', false);
        } else {
          throw e;
        }
      }

      /**
       * 保存到本地
       */
      defineConst(json, '__save', function() {
        // https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureDir-sync.md
        require('fs-extra').ensureDirSync(path.dirname(target));
        fs.writeFileSync(target, JSON.stringify(json, null, 2), 'utf-8');
      });

      return json;
    } else if (typeof target === 'object') {
      /**
       * 递归调用 __save 方法
       */
      defineConst(target, '__save', function() {
        for (let k in target) {
          if (target.hasOwnProperty(k) && target[k] instanceof JSONStore) {
            target[k].__save();
          }
        }
      });

      return target;
    } else {
      throw {
        message: '不支持的参数'
      }
    }
  }
}

module.exports = JSONStore;
