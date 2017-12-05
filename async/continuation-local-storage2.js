/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description continuation-local-storage
 */

var writer = require('continuation-local-storage').createNamespace('writer');
var value;

writer.run(function () {
  writer.set('value', 0);

  // run 接受的函数同步执行
  writer.run(function(outer) {
    writer.set('value', 1);
    console.log(writer.get('value'));

    writer.set('value', 2);
    setTimeout(function() {
      console.log(writer.get('value'));
    }, 2000);
  });

  console.log(writer.get('value'));

  writer.set('value', 3);
  setTimeout(function() {
    console.log(writer.get('value'));
  }, 1000);
});
