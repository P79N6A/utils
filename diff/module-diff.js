/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description module-diff
 */

'use strict';

const diff = require('diff');

let result = diff.diffLines(
  `[{"grid":{"index":0,"name":"grid-0"},"regions":[{"modules":[{"guid":"8888","guidCopyFrom":"","hidden":"","moduleId":"0","cvId":"2267","name":"lx-test-r20170313","sceneId":"13765","sceneVersion":"0","schemaId":"","schemaVersion":"","schemaMD5":"924d9f2fa3c557edf15e3e395d934eaa","schemaMD5Source":"6f6554198396580eb726d65d15014f5a","version":"0.0.2","regionId":"","regionPath":"","ext":"","remark":"","shareSceneFrom":"","attrs":"","engine":"tce","gitGroup":"tb-mod"}]}]}]`,
  `[{"regions":[{"modules":[{"name":"lx-test-r20170313","version":"0.0.2","schemaId":"","schemaVersion":"","sceneId":"13765","sceneVersion":"0","regionId":"","regionPath":"","guid":"8888","guidCopyFrom":"","remark":"","hidden":"","ext":"","cvId":"2267","moduleId":"0","schemaMD5":"924d9f2fa3c557edf15e3e395d934eaa","schemaMD5Source":"6f6554198396580eb726d65d15014f5a","shareSceneFrom":"","attrs":"","engine":"tce","scenePublishVersion":"","gitGroup":"tb-mod"}]}],"grid":{"index":0,"name":"grid-0"}}]`,
  {});


let result2 = diff.diffArrays(
  [
    {
      "grid": {"index": 0, "name": "grid-0"},
      "regions": [{
        "modules": [{
          "guid": "8888",
          "guidCopyFrom": "",
          "hidden": "",
          "moduleId": "0",
          "cvId": "2267",
          "name": "lx-test-r20170313",
          "sceneId": "13765",
          "sceneVersion": "0",
          "schemaId": "123123123232312",
          "schemaVersion": "",
          "schemaMD5": "924d9f2fa3c557edf15e3e395d934eaa",
          "schemaMD5Source": "6f6554198396580eb726d65d15014f5a",
          "version": "0.0.2"
        }]
      }]
    },
    {
      "grid": {"index": 0, "name": "grid-0"},
      "regions": [{
        "modules": [{
          "guid": "8888",
          "guidCopyFrom": "",
          "hidden": "",
          "moduleId": "0",
          "cvId": "2267",
          "name": "lx-test-r20170313",
          "sceneId": "13765",
          "sceneVersion": "0",
          "schemaId": "123123123232312",
          "schemaVersion": "",
          "schemaMD5": "924d9f2fa3c557edf15e3e395d934eaa",
          "schemaMD5Source": "6f6554198396580eb726d65d15014f5a",
          "version": "0.0.2"
        }]
      }]
    },
    {
      "grid": {"index": 0, "name": "grid-0"},
      "regions": [{
        "modules": [{
          "guid": "8889",
          "guidCopyFrom": "",
          "hidden": "",
          "moduleId": "0",
          "cvId": "2267",
          "name": "lx-test-r20170313",
          "sceneId": "13765",
          "sceneVersion": "0",
          "schemaId": "",
          "schemaVersion": "",
          "schemaMD5": "924d9f2fa3c557edf15e3e395d934eaa",
          "schemaMD5Source": "6f6554198396580eb726d65d15014f5a",
          "version": "0.0.2"
        }]
      }]
    }
  ],
  [
    {
      "regions": [{
        "modules": [{
          "name": "lx-test-r20170313",
          "version": "0.0.2",
          "schemaId": "",
          "schemaVersion": "",
          "sceneId": "13765",
          "sceneVersion": "0",
          "regionId": "",
          "regionPath": "",
          "guid": "8888",
          "guidCopyFrom": "",
          "remark": "",
          "hidden": "",
          "ext": "",
          "cvId": "2267",
          "moduleId": "0",
          "schemaMD5": "924d9f2fa3c557edf15e3e395d934eaa",
          "schemaMD5Source": "6f6554198396580eb726d65d15014f5a",
          "shareSceneFrom": "",
          "attrs": "",
          "engine": "tce",
          "scenePublishVersion": "",
          "gitGroup": "tb-mod"
        }]
      }], "grid": {"index": 0, "name": "grid-0"}
    },
    {
      "regions": [{
        "modules": [{
          "name": "lx-test-r20170313",
          "version": "0.0.2",
          "schemaId": "",
          "schemaVersion": "",
          "sceneId": "13765",
          "sceneVersion": "0",
          "regionId": "",
          "regionPath": "",
          "guid": "8888",
          "guidCopyFrom": "",
          "remark": "",
          "hidden": "",
          "ext": "",
          "cvId": "2267",
          "moduleId": "0",
          "schemaMD5": "924d9f2fa3c557edf15e3e395d934eaa",
          "schemaMD5Source": "6f6554198396580eb726d65d15014f5a",
          "shareSceneFrom": "",
          "attrs": "",
          "engine": "tce",
          "scenePublishVersion": "",
          "gitGroup": "tb-mod"
        }]
      }], "grid": {"index": 0, "name": "grid-0"}
    },
    {
      "regions": [{
        "modules": [{
          "name": "lx-test-r20170313",
          "version": "0.0.3",
          "schemaId": "",
          "schemaVersion": "",
          "sceneId": "13765",
          "sceneVersion": "0",
          "guid": "8887",
          "guidCopyFrom": "",
          "remark": "",
          "hidden": "",
          "ext": "",
          "cvId": "2267",
          "moduleId": "0",
          "schemaMD5": "924d9f2fa3c557edf15e3e395d934eaa",
          "schemaMD5Source": "6f6554198396580eb726d65d15014f5a",
          "shareSceneFrom": ""
        }]
      }], "grid": {"index": 0, "name": "grid-0"}
    }],
  {
    comparator: function(left, right) {
      return left.regions.every(function(region, i) {
        return region.modules.length === right.regions[i].modules.length && region.modules.every(function(module, j) {
          return module.guid === right.regions[i].modules[j].guid;
        });
      });
    }
  });

console.log(result, result2);
