/**
 * utils
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 */

module.exports = {
  /**
   * 节流阀
   * @param fn        节流方法
   * @param interval  时间间隔
   * @param context   上下文
   * @param accurate  是否保证最后一次调用被执行
   * @returns {Function}
   */
  throttle: function(fn, interval, context, accurate) {
    var lastTime, timeout;

    if (accurate) {
      return function() {
        clearTimeout(timeout);

        var currentTime = new Date().getTime();
        var args = arguments;

        timeout = setTimeout(function() {
          fn.apply(context || null, Array.prototype.slice.call(args));
          lastTime = currentTime;
        }, interval - (currentTime - (lastTime || currentTime - interval)));
      };
    } else {
      return function() {
        var currentTime = new Date().getTime();

        if (!lastTime || currentTime - lastTime >= interval) {
          fn.apply(context, Array.prototype.slice.call(arguments));
          lastTime = currentTime;
        }
      };
    }
  },
  /**
   * 缓动
   * @param animationVars
   * @param duration
   * @param timingFunction
   * @param callback
   */
  Easing: function() {
    var
      debug = false,  //如果debug，遇到异常将抛出
      fx = {          //缓动函数
        linear: function(currentTime, initialDistance, totalDistance, duration) {   //自带一个线性缓动函数
          return initialDistance + (currentTime / duration * totalDistance);
        }
      },
      getTime = (window.performance && performance.now) ? function() {              //获取当前时间（ms或更精确）
        return performance.now();
      } : function() {                                                              //获取当前时间（ms或更精确）
        return new Date().getTime();
      },
      executorCanceler = window.cancelAnimationFrame,                               //取消帧函数
      executor = window.requestAnimationFrame                                       //帧执行函数
        || window.webkitRequestAnimationFrame
        || window.msRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame
        || function() {
          var callbacks = [];

          !function frame() {
            var oldTime = getTime(),
              tmp = callbacks;

            callbacks = [];

            for (var i = 0, length = tmp.length; i < length; i++) {
              tmp[i].callback(oldTime);
            }

            var
              currentTime = getTime(),
              delayTime = Math.max(16.66 - currentTime + oldTime, 0);

            setTimeout(frame, delayTime);
          }();

          executorCanceler = function(id) {
            for (var i = 0, length = callbacks.length; i < length; i++) {
              if (callbacks[i].id === id) {
                callbacks.splice(i, 1);
              }
            }
          };

          return function(callback) {
            var context = {callback: callback, id: Math.random()};

            callbacks.push(context);

            return context.id;
          };
        }(),
      animate = function(attribute, distances, duration, timingFunction, completeCallback) {  // 为每个属性运行此函数，类似于启动一个线程（虽然不是真正的线程）
        var oldTime = getTime(),
          animationPassedTime = 0,
          executorReference = executor(function anonymous(currentTimeStamp) {
            animationPassedTime = currentTimeStamp - oldTime;

            var computedValues = [];    //computedValues为缓动函数计算值，可能返回数值或者数组（按动画属性不同，比如rgb）

            if (animationPassedTime >= duration) {
              if (distances.length > 1) {
                for (var j = 0, length = distances.length; j < length; j++) {
                  computedValues.push(distances[j][0] + distances[j][1]);
                }
              } else {
                computedValues = distances[0][0] + distances[0][1];
              }

              stop();
            } else {
              if (distances.length > 1) {
                for (var i = 0, length = distances.length; i < length; i++) {
                  computedValues.push(fx[timingFunction](animationPassedTime, distances[i][0], distances[i][1], duration));
                }
              } else {
                computedValues = fx[timingFunction](animationPassedTime, distances[0][0], distances[0][1], duration);
              }

              animationPassedTime = getTime() - oldTime;
              executorReference = executor(anonymous);
            }
            attribute.keyframe(computedValues);
          }, Math.random()),
          completed = false,
          stop = function(skipCallback) {
            executorCanceler(executorReference);
            if (!skipCallback) {
              completeCallback();      //执行回调函数
            }
          };

        return {
          stop: stop
        };
      },
      init = function(animationVars, duration, timingFunction, callback) {  // Animation 引用的函数，此函数返回一个包含所有动画属性的控制对象（如停止操作），因此可以采取函数调用或者new的方式创建一个动画对象
        var animateQueue = {},
          animationCount = 0,
          animationCompletedCount = 0,
          completeCallback = function() {
            return function() {
              animationCompletedCount++;

              if (animationCount === animationCompletedCount) {
                typeof timingFunction === 'function' ? timingFunction() : callback && callback();
              }
            };
          }();

        for (var attribute in animationVars) {
          var initialDistance = animationVars[attribute].start,
            finalDistance = animationVars[attribute].end,
            distances = [];

          if (typeof initialDistance === 'number') {
            distances.push([initialDistance, finalDistance - initialDistance]);
          } else {
            for (var i = 0, length = initialDistance.length; i < length; i++) {
              distances.push([initialDistance[i], finalDistance[i] - initialDistance[i]]);
            }
          }
          // 可以为每个属性指定缓动函数与时间
          animateQueue[attribute] = animate(animationVars[attribute], distances, animationVars[attribute].duration || duration, animationVars[attribute].timingFunction || (typeof timingFunction === 'string' ? timingFunction : false) || 'linear', completeCallback);

          animationCount++;
        }

        animateQueue.stop = function() {
          for (var attribute in animateQueue) {
            animateQueue[attribute].stop && animateQueue[attribute].stop();
          }
        };

        return animateQueue;
      };

    init.config = function(configVars) {
      if (configVars) {
        if (configVars.fx) {
          for (var fxName in configVars.fx) {
            if (typeof configVars.fx[fxName] === 'function') {
              fx[fxName] = configVars.fx[fxName];
            }
          }
        }

        if (configVars.debug) {
          debug = configVars.debug || false;
        }
      }
    };

    init.each = function(array, handler) {
      if (typeof handler === 'function') {
        for (var i = 0, length = array.length; i < length; i++) {
          handler.call(array[i], i, array);
        }
      }
    };

    init.config({   //扩充
      debug: true,
      fps: 60,
      fx: {
        easeOutElastic: function(t, b, c, d) {
          var s = 1.70158;
          var p = 0;
          var a = c;
          if (t == 0) {
            return b;
          }
          if ((t /= d) == 1) {
            return b + c;
          }
          if (!p) {
            p = d * .3;
          }
          if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
          }
          else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
          }
          return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        easeInOutQuint: function(t, b, c, d) {
          t /= d / 2;
          if (t < 1) {
            return c / 2 * t * t * t * t * t + b;
          }
          t -= 2;
          return c / 2 * (t * t * t * t * t + 2) + b;
        }
      }
    });

    return init;
  }(),
  /**
   * 对象浅合并
   * @param target
   * @param origin
   */
  merge: function(target, origin) {
    for (var key in origin) {
      if (origin.hasOwnProperty(key)) {
        target[key] = origin[key];
      }
    }
  },

  /**
   * 深度克隆（只处理了常用内置对象）
   * @param origin
   * @returns {*}
   */
  deepClone: function(origin) {
    var target;

    if (typeof origin === 'string' || typeof origin === 'number' || typeof origin === 'boolean' || typeof origin === 'undefined' || origin === null || origin instanceof Function || origin instanceof Date) {
      return origin;
    } else if (origin instanceof Array) {
      target = [];

      for (var i = 0; i < origin.length; ++i) {
        target.push(this.deepClone(origin[i]));
      }

    } else {
      target = {};

      for (var key in origin) {
        if (origin.hasOwnProperty(key)) {
          target[key] = this.deepClone(origin[key]);
        }
      }
    }

    return target;
  },
  /**
   * 加载脚本
   * @param src
   */
  loadScript: function(src) {
    var scriptElmt = document.createElement('script');

    scriptElmt.setAttribute('src', src);
    document.getElementsByTagName('head')[0].appendChild(scriptElmt);
  },
  /**
   * 加载样式
   * @param cssStr
   */
  appendStyleSheet: function(cssStr) {
    var style = document.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = cssStr;
    } else {
      style.appendChild(document.createTextNode(cssStr));
    }

    (document.head || document.getElementsByTagName('head')[0]).appendChild(style);
  },
  /**
   * 根据 rem 获取 px
   * @param rem
   * @returns {number}
   */
  getPxByRem: function(rem) {
    try {
      var fontSize = parseFloat(getComputedStyle(document.documentElement)['font-size']);

      return rem * fontSize;
    } catch (e) {
      return rem * 32;
    }
  },
  // 判断是否支持sticky属性
  isStickySupported: function() {
    var style = ['', '-webkit-', '-ms-', '-moz-', '-o-'].map(function(prefix) {
      return 'position: ' + prefix + 'sticky'
    }).join(';');
    var element = document.createElement('div');
    var body = document.body;

    element.style.cssText = style;

    body.appendChild(element);

    var isSupported = /sticky/i.test(window.getComputedStyle(element).position);

    body.removeChild(element);

    return isSupported;
  }
};
