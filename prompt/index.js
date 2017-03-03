/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description index.js 类
 */

var prompt = require('prompt');

prompt.get(
  [{
    name: 'username',
    required: true
  }, {
    name: 'password',
    hidden: true,
    conform: function(value) {
      return true;
    }
  }], function(err, result) {
    //
    // Log the results.
    //
    console.log('Command-line input received:');
    console.log('  username: ' + result.username);
    console.log('  password: ' + result.password);
  });
