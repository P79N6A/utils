/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description test.js
 */

'use strict';

const Promise = require('./promise');

Promise.all([
    new Promise(function(resolve, reject) {
      reject('hehe');
    }),
    new Promise(function(resolve, reject) {
      reject('hehe2');
    })])
  .then(function(result) {
    debugger;
  }, function(reason) {
    debugger;
  });

//let p = new Promise(function(resolve, reject) {
//  resolve('hehe');
//});
//
//p.then(function(data) {
//  return new Promise(function(resolve, reject) {
//    reject('hehe');
//  });
//}, function(err) {
//  debugger;
//}).then(function(data) {
//  debugger;
//}, function(err) {
//  debugger;
//});
