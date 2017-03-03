var fs = require('fs');
var path = require('path');

traverseDirByLayer('/Users/smalldragonluo', function(fileName, _path, stat) {
  console.log(_path);
});

/**
 * 逐层遍历文件夹
 * @param  {String} dirPath
 * @param  {Function} handler
 */
function traverseDirByLayer(dirPath, handler) {
  // 错误路径
  if (!fs.existsSync(dirPath)) {
    throw 'the path ' + dirPath + ' is not exist.'
  }

  // 不是文件夹
  var stat = fs.statSync(dirPath);

  if (!stat.isDirectory()) {
    throw 'the path ' + dirPath + ' is not a directory.'
  }

  // 当前水平层级文件夹
  var dirs = [dirPath];
  var tmpDirs = [];
  // 当前第几层
  var levelCount = 1;

  topLevel: for (var i = 0, length = dirs.length; i < length; i++) {
    var files = fs.readdirSync(dirs[i]);

    nextLevel: for (var j = 0, nextLevelLength = files.length; j < nextLevelLength; j++) {
      var fileName = files[j];
      var nextLevelDirPath = path.join(dirs[i], fileName);
      var stat = fs.statSync(nextLevelDirPath);
      var result = handler.call(fileName, fileName, dirs[i], stat, levelCount);

      if (typeof result === 'boolean' && !result) {
        // 退出遍历
        break topLevel;
      } else {
        if (stat.isDirectory()) {
          tmpDirs.push(nextLevelDirPath);
        }
      }
    }

    // 重置
    if (i === length - 1 && tmpDirs.length) {
      i = -1;
      dirs = tmpDirs;
      length = dirs.length;
      tmpDirs = [];
      ++levelCount;
    }
  }
}

/**
 * 递归遍历文件夹
 * @param  {String} dirPath
 * @param  {Function} handler
 */
function traverseDirRecursively(dirPath, handler) {
  // 错误路径
  if (!fs.existsSync(dirPath)) {
    throw 'the path ' + dirPath + ' is not exist.'
  }

  // 不是文件夹
  var stat = fs.statSync(dirPath);

  if (!stat.isDirectory()) {
    throw 'the path ' + dirPath + ' is not a directory.'
  }

  var files = fs.readdirSync(dirPath);

  for (var i = 0; i < files.length; i++) {
    var fileName = files[i];
    var fullPath = path.join(dirPath, fileName);
    var stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      traverseDirRecursively(fullPath, handler);
    }

    handler.call(fileName, fileName, dirPath, stat);
  }
}
