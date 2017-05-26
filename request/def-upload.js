/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description def-upload
 */

'use strict';

const path = require('path');
const fs = require('fs');
const stream = require('stream');
const request = require('request');

// DEF ticket
let ticket = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnQiOiJ4aWFvbG9uZy5seGwiLCJidWNpZCI6IjI5OTU1NCIsImNyZWF0ZXRpbWUiOiIxNDg4MTc5NDcyNTkxIiwiZW1haWwiOiJ4aWFvbG9uZy5seGxAYWxpYmFiYS1pbmMuY29tIiwiZW1waWQiOiI3ODEwNCIsIm5hbWUiOiLpqoblsI_pvpkiLCJuaWNrIjoi6b6Z5ZacIiwidGJ3dyI6Ium-meWWnCJ9LCJpYXQiOjE0OTA4NDQ4NjIsImV4cCI6MTQ5MDg0NTE2Mn0.RaK0_5ySF-nOp1Nmo5esCDxojtA6T4gHXKfMDLJdVWc';
let filePath = '/Users/smalldragonluo/Downloads/拿铁汇/颁奖.jpg';
let fileName;
let dataStream;

if (filePath instanceof Buffer) {
  fileName = 'Buffer 数据';
  dataStream = new stream.PassThrough();
  dataStream.end(filePath);
} else {
  fileName = path.basename(filePath);

  try {
    let _filePath = path.resolve(filePath);
    let stats = fs.statSync(_filePath);

    if (!stats.isFile()) {
      reject(new Error(fileName + ' 上传失败：不支持的文件类型'));
      return;
    }

    dataStream = fs.createReadStream(_filePath);
  } catch (e) {
    reject(new Error(fileName + ' 上传失败：获取文件失败'));
    return;
  }
}

let req = request({
    proxy:'http://127.0.0.1:8888',
    method: 'post',
    url: 'http://30.8.71.67:6001/def/upload',
    qs: {
      filename: fileName,
      force: 'true'
    },
    headers: {
      //'Content-Type': 'application/json',
      //'User-Agent': 'request',
      appname: 'def',
      ticket: ticket
    }
  },
  // 结果回调
  function(err, response, body) {
    if (!err) {
      let json = JSON.parse(body);

      if (!json.error) {
        resolve({
          url: json.data.url
        });
      } else {
        reject(new Error(fileName + ' 上传失败：' + body));
      }
    } else {
      reject(err);
    }
  });

dataStream.pipe(req);
