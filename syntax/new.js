/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description Set
 */

'use strict';

// new require('./test')();
//
// /**
//  * 为今天预定的用户订阅今天推荐的电影
//  * @return {Promise<[any , any]>}
//  */
// function bookTodayMovieForTodayUser() {
//   return Promise.all([
//     new Promise(function(resolve) {
//       getTodayUsers(resolve);
//     }),
//     new Promise(function(resolve) {
//       getTodayMovie(resolve);
//     })
//   ]).then(function(results) {
//     return new Promise(function(resolve) {
//       bookMovieForUsers(results[0], results[1], function() {
//         resolve();
//       });
//     });
//   });
// }


// function computePairs(n, k) {
//   let count = 0;
//
//   for(let x = 1; x <= n; ++x) {
//     for(let y = 1; y <= n; ++y) {
//       console.log(x, y, x % y >= k);
//       if (x % y >= k) {
//         ++count;
//       }
//     }
//   }
//
//   return count;
// }
//
// console.log(computePairs(5, 2));

// const directionMap = {
//   0: 'N',
//   1: 'E',
//   2: 'S',
//   3: 'W'
// };
//
// function getDirection(step, path) {
//   let turned = 0;
//
//   for(let i = 0; i < step; ++i) {
//     if (path.charAt(i) === 'L') {
//       --turned;
//     } else if (path.charAt(i) === 'R') {
//       ++turned;
//     }
//   }
//
//   return directionMap[turned % 4];
// }
//
// console.log(getDirection(11, 'LLLLLRRRRLR'));

// var naturalStr = 'QWERTYUIOPASDFGHJKLZXCVBNM0123456789,.? ';
// var standardStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.? ';
// var keyMap = {};
//
// for(var i = 0; i < naturalStr.length; ++i) {
//   keyMap[standardStr[i]] = naturalStr[i];
//   keyMap[standardStr[i].toLowerCase()] = naturalStr[i].toLowerCase();
// }
//
// function convert(naturalStr) {
//   var standardStr = [];
//
//   for(var i = 0; i < naturalStr.length; ++i) {
//     if (keyMap[naturalStr[i]]) {
//       standardStr.push(keyMap[naturalStr[i]]);
//     } else {
//       standardStr.push(naturalStr[i]);
//     }
//   }
//
//   return standardStr.join('');
// }
//
// console.log(convert('2, -3, 4, 11, -5, 8, 3, -6'));

function compute(arg) {
  var arr = arg.split(/,s?/).map(function(str) {
    return +str;
  });

  if (!arr.length) {
    return 0;
  }

  var totals = [];

  for(var i = 1; i <= arr.length; ++i) {
    for(var j = 0; j < arr.length; ++j) {
      if (arr.length - j >= i) {
        var conti = 0;
        var totalArr = [];

        while (conti < i) {
          totalArr.push(arr[j + conti]);
          ++conti;
        }

        totals.push(totalArr);
      }
    }
  }

  console.log(totals);

  return totals.map(function(arr) {
    return arr.reduce(function(result, inc) {
      return result + inc;
    }, 0);
  }).sort(function(pre, next) {
    return pre - next >= 0 ? -1 : 1;
  })[0];
}

console.log(compute('2, -3, 4, 11, -5, 8, 3, -6, 99'));
