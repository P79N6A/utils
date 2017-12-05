/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description 基于 continuation-local-storage 的数据库事务控制
 */

'use strict';

const cls = require('continuation-local-storage');
const ns = cls.createNamespace('connectionNS');
const decorators = {
  connection: function(target, name, descriptor) {
    descriptor.get = function() {
      return ns.get('connection');
    };
    return descriptor;
  },
  transaction: function(target, name, descriptor) {
    const originMethod = descriptor.value;

    descriptor.value = function() {
      const args = Array.from(arguments);
      const context = ns.createContext();
      const connection = getConnection();

      ns.enter(context);
      ns.set('connection', connection);

      const result = originMethod.apply(target, args);

      // todo submit commit with connection or rollback

      ns.exit(context);

      return result;
    };

    return descriptor;
  }
};

/**
 * 获取一个数据库连接
 * @returns {number}
 */
function getConnection() {
  // return a random number instead of a real connection
  return Math.round(Math.random() * 100);
}

class Dao {
  @decorators.connection
  get connection() {};

  add() {
    console.log(this.connection);
  }
}

const dao = new Dao();

class Service {
  get dao() {
    return dao;
  }

  @decorators.transaction
  add() {
    this.dao.add();
    setTimeout(() => {
      this.dao.add();
    }, 500);
  }
}

const service = new Service();

service.add();
service.add();
