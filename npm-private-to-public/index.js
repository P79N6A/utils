/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description 将一个内部 tnpm 私有（@ali）package 发布到 npm，并同时发布所有子依赖
 */

'use strict';

const fsExtra = require('fs-extra');
const semver = require('semver');
const path = require('path');
const glob = require('glob');
const co = require('co');
const fs = require('fs');
const JSONStore = require('../json/jsonStore');
const cpUtils = require('../cp/utils');
// 将要发布到外部 npm 的 package
const packagePaths = [
  '/Users/smalldragonluo/code/def/def-kit-light-isv',
  '/Users/smalldragonluo/code/def/builder-isv'
];
// 对外 package 以及其子依赖存储位置（方便编辑单独发布）
const publicPath = '/Users/smalldragonluo/code/npm';
const commonVersion = '10.0.9';

co(function*() {
  packagePaths.forEach(function(packagePath) {
    moveOnePackage(packagePath)
  });
  processPackages(publicPath);
  fixRequire(publicPath);
  yield publishPackages(publicPath);
  //yield unPublishPackages(publicPath);

  console.log('done');
}).catch(function(err) {
  console.error(err.stack);
});

/**
 * 将当前 package 以及其所有子依赖创建副本到 publicPath
 * @param packagePath
 */
function moveOnePackage(packagePath) {
  let originPackageJSON = JSONStore.create(path.join(packagePath, 'package.json'));
  let destDir = path.join(publicPath, `isv-${path.basename(packagePath)}@${originPackageJSON.version}`);

  console.time(packagePath);

  // 保存到对外目录
  fsExtra.copySync(packagePath, destDir, {
    filter: (origin, dest) => {
      return !(
        origin.match(/\/node_modules$/) ||
        origin.match(/\/.idea$/) ||
        origin.match(/\/.git$/) ||
        origin.match(/\/.DS_Store$/)
      );
    }
  });

  console.timeEnd(packagePath);

  let packageJSON = JSONStore.create(path.join(destDir, 'package.json'));
  let dependencies = packageJSON.dependencies;

  if (dependencies) {
    module.paths.unshift(path.join(packagePath, 'node_modules'));

    Object.keys(dependencies).forEach((key) => {
      if (key.match(/^@ali\//)) {
        let packageMainFile = require.resolve(key);
        let matchedPackagePath = packageMainFile.match(/(.+@ali(?:\/|\\)[^\/\\]+)/);
        let correctPackagePath;

        if (matchedPackagePath) {
          correctPackagePath = matchedPackagePath[1];
        } else {
          correctPackagePath = path.dirname(packageMainFile);
        }

        moveOnePackage(correctPackagePath);
      }
    });

    module.paths.shift();
  }
}

/**
 * 预处理（修改名称、版本号以及 dependencies 前缀和版本号，去除私有 registry 配置）
 * @param publicPath
 */
function processPackages(publicPath) {
  let packages = fs.readdirSync(publicPath)
    .map(function(fileName) {
      return path.join(publicPath, fileName);
    })
    .filter(function(filePath) {
      return fs.statSync(filePath).isDirectory() && filePath.match(/isv/);
    });

  packages.forEach((packagePath) => {
    let packageJSON = JSONStore.create(path.join(packagePath, 'package.json'));

    packageJSON.name = packageJSON.name.replace(/^@ali\//, 'isv-');
    //packageJSON.version = semver.inc(packageJSON.version, 'patch');
    packageJSON.version = commonVersion;

    delete packageJSON.publishConfig;
    delete packageJSON._from;
    delete packageJSON._resolved;

    if (packageJSON.scripts && packageJSON.scripts.prepublish) {
      delete packageJSON.scripts.prepublish;
    }

    if (packageJSON.dependencies) {
      module.paths.unshift(path.join(packagePath, 'node_modules'));

      Object.keys(packageJSON.dependencies).forEach((key) => {
        if (key.match(/^@ali\//)) {
          // 重命名依赖
          packageJSON.dependencies[key.replace(/^@ali\//, 'isv-')] = '*';

          delete packageJSON.dependencies[key];
        }

        if (key === 'buc-client') {
          // 重命名依赖
          packageJSON.dependencies['isv-buc-client'] = '*';

          delete packageJSON.dependencies[key];
        }

        if (key === 'util-def') {
          // 重命名依赖
          packageJSON.dependencies['isv-util-def'] = '*';

          delete packageJSON.dependencies[key];
        }

        if (key.match(/^isv-/)) {
          packageJSON.dependencies[key] = '*';
        }
      });

      module.paths.shift();
    }

    packageJSON.__save();
  });
}

/**
 * 发布所有 packages
 * @param publicPath
 */
function* publishPackages(publicPath) {
  let packages = fs.readdirSync(publicPath)
    .sort(function(prev, next) {
      prev = prev.match(/\d+\.\d+\.\d+$/);
      next = next.match(/\d+\.\d+\.\d+$/);

      if (!prev) {
        return 1;
      }

      if (!next) {
        return -1;
      }

      return semver.gt(prev[0], next[0]) ? -1 : 1;
    })
    .map(function(fileName) {
      return path.join(publicPath, fileName);
    })
    .filter(function(filePath) {
      return fs.statSync(filePath).isDirectory() && !filePath.match(/.idea$/);
    });

  console.log(packages);

  for (let i = 0; i < packages.length; ++i) {
    try {
      yield cpUtils.spawns(packages[i], 'npm', ['publish']);
    } catch (e) {
      console.error(packages[i], '发布失败');
    }
  }
}

/**
 * 取消发布所有 packages
 * @param publicPath
 */
function* unPublishPackages(publicPath) {
  let packages = fs.readdirSync(publicPath)
    .map(function(fileName) {
      return path.join(publicPath, fileName);
    })
    .filter(function(filePath) {
      return fs.statSync(filePath).isDirectory() && !filePath.match(/.idea$/);
    });

  for (let i = 0; i < packages.length; ++i) {
    try {
      yield cpUtils.spawns(packages[i], 'npm', ['unpublish', '-f']);
    } catch (e) {
      console.error(packages[i], '发布失败');
    }
  }
}

/**
 * 替换依赖名称（require('@ali/xxx')）
 * @param dirPath
 */
function fixRequire(dirPath) {
  glob.sync('**/*.js', {
    cwd: dirPath,
    dot: false
  }).forEach(function(filePath) {
    if (!filePath.match(/node_modules/)) {
      let fullFilePath = path.join(dirPath, filePath);
      let fileContent = fs.readFileSync(fullFilePath, 'utf-8');

      fileContent = fileContent.replace(/('|")@ali\/[^"']+?\1/g, function(matched, $1) {
        if (matched.match(/loader|plugin/g)) {
          return matched.replace(/@ali\//g, 'isv-');
        } else {
          return matched;
        }
      }).replace(/require\((['"])@ali\//g, function(matched, $1) {
        return `require(${$1}isv-`;
      }).replace(/require\((['"])buc-client/g, function(matched, $1) {
        return `require(${$1}isv-buc-client`;
      }).replace(/require\((['"])util-def/g, function(matched, $1) {
        return `require(${$1}isv-util-def`;
      });

      console.log(fullFilePath, 'replaced');

      fs.writeFileSync(fullFilePath, fileContent, 'utf-8');
    }
  });
}
