/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description process
 */

'use strict';

async function processControl() {
  // 1
  do {
    if (condition) {
      var data = await fetchData();

      if (data.length) {
        // do sth
        break;
      }
    }

    // do other things
  } while (0);

  // 2
  if (condition) {
    var data = await fetchData();

    if (data.length) {
      // do sth
    } else {
      // do other things
    }
  } else {
    // do other things
  }
}
