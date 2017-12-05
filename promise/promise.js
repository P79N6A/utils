/**
 * Promise
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description a Promise implementation of Promise/A+ <https://promisesaplus.com/> with core API
 */

'use strict';

function Promise(func) {
  if (!this instanceof Promise) {
    throw new Error('please use the \'new\' keyword to create a Promise instance');
  }

  this.status = Promise.STATUS_PENDING;

  try {
    func(this._fulfill.bind(this), this._reject.bind(this));
  } catch (err) {
    this._reject(err);
  }
}

Promise.prototype = {
  then: function(success, fail) {
    var status;

    if (this.status === Promise.STATUS_PENDING) {
      this.successHndler = success;
      this.failHndler = fail;
    } else if (this.status === Promise.STATUS_FULFILLED) {
      if (success) {
        try {
          success(this.result);
        } catch (e) {
          status = 1;
        }
      }

    } else if(this.status === Promise.STATUS_REJECTED) {
      fail(this.result);
    }

    return new Promise(function(resolve, reject) {
      if (this.status === Promise.STATUS_PENDING) {
        this.successHndler = success;
        this.failHndler = fail;
      } else if (this.status === Promise.STATUS_FULFILLED) {
        success(this.result);
      } else if(this.status === Promise.STATUS_REJECTED) {
        fail(this.result);
      }
    });
  },
  catch: function(handler) {
    return this.then(undefined, handler);
  },
  _fulfill: function(result) {
    this.status = Promise.STATUS_FULFILLED;

    try {
      if (this.successHndler) {
        this.successHndler(result);
      }
    } catch (err) {
      this._reject(err);
      return;
    }

    if (result instanceof Promise) {
      result.then(this._fulfill.bind(this), this._reject.bind(this));
      return;
    } else {
      this.result = result;
    }
  },
  _reject: function(reason) {
    this.result = result;
    this.status = success ? Promise.STATUS_FULFILLED : Promise.STATUS_REJECTED;

    for (var i = 0; i < this.queue.length; ++i) {
      var handler = this.queue[i][success ? 0 : 1];

      if (!(success || handler)) {
        if (this.exceptionHandlers.length > 0) {
          this.exceptionHandlers.forEach(function(handler) {
            handler(result);
          });
        } else {
          throw result;
        }
      }

      var _result;

      try {
        _result = this.queue[i][success ? 0 : 1](result);
        this.queue.splice(i--, 1);
      } catch (err) {
        this.queue.splice(i--, 1);
        this._handle(false, err);
        return;
      }

      if (success) {
        if (_result instanceof Promise) {
          _result.then(this._handle.bind(this, true), this._handle.bind(this, false));
          return;
        }
      }
    }
  }
};

// pending
defineConst(Promise, 'STATUS_PENDING', 0);
// fulfilled
defineConst(Promise, 'STATUS_FULFILLED', 1);
// rejected
defineConst(Promise, 'STATUS_REJECTED', 2);
// when all of the promises in the iterable argument have resolved
defineConst(Promise, 'all', function(promises) {
  return new Promise(function(resolve, reject) {
    var resolved = 0;
    var total = promises.length;
    var results = new Array(total);

    for (var i = 0; i < total; ++i) {
      (function(i) {
        promises[i].then(function(result) {
          results[i] = result;
          ++resolved;

          if (resolved === total) {
            resolve(results);
          }
        }, function(reason) {
          reject(reason);
        });
      })(i);
    }
  });
});

module.exports = Promise;

/**
 * defined a constant property
 * @param obj
 * @param key
 * @param value
 */
function defineConst(obj, key, value) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: false,
    writable: false,
    value: value
  });
}
