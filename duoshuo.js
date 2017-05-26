/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description duoshuo
 */

'use strict';

const fs = require('fs');
const path = require('path');

let duoshuoComments = JSON.parse(fs.readFileSync(path.join('/Users/smalldragonluo/Downloads', 'export2.json'), 'utf-8'));
let uyanComments = duoshuoComments.posts.filter(function(comment) {
  return !comment.parents;
}).map(function(comment, index) {
  let thread = duoshuoComments.threads.filter(function(thread) {
    return thread.thread_key === comment.thread_key;
  });
  let time = new Date(comment.created_at);

  return {
    su: comment.thread_key, // 自定义页面标识 (如果定义了页面标识则填写，未定义则留空)
    url: thread[0] && thread[0].url, // 页面地址 (su或者url必选一个)
    title: thread[0] && thread[0].title, // 页面标题 (非必选)
    content: comment.message, // 评论内容 (必选)
    time: `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`, // 评论时间 (如果没有时间可以不用填写，但是强烈建议填写，以便评论排序)
    uname: comment.author_name, // 昵称 (必选)
    email: comment.author_email, // 邮箱地址 (非必选)
    ulink: comment.author_url, // 个人主页链接地址 (非必选)
    status: 0, // 评论状态： 0：正常, 1：待验证, 2：垃圾，3：已被删除 (非必选，默认是正常评论)
    child: duoshuoComments.posts.filter(function(_comment) { // 子评论，格式和父级评论大致相同，但是子集评论无更下一级的评论 (包括content，time，uname，email，ulink，status)
      return !!(_comment.parents && _comment.parents[0] === comment.post_id);
    }).map(function(comment) {
      let time = new Date(comment.created_at);

      return {
        su: comment.thread_key, // 自定义页面标识 (如果定义了页面标识则填写，未定义则留空)
        url: thread[0] && thread[0].url, // url: 页面地址 (su或者url必选一个)
        title: thread[0] && thread[0].title, // 页面标题 (非必选)
        content: comment.message, // 评论内容 (必选)
        time: `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`, // 评论时间 (如果没有时间可以不用填写，但是强烈建议填写，以便评论排序)
        uname: comment.author_name, // 昵称 (必选)
        email: comment.author_email, // 邮箱地址 (非必选)
        ulink: comment.author_url, // 个人主页链接地址 (非必选)
        status: 0 // 评论状态： 0：正常, 1：待验证, 2：垃圾，3：已被删除 (非必选，默认是正常评论)
      };
    })
  }
});

fs.writeFileSync(path.join('/Users/smalldragonluo/Downloads', 'import.json'), JSON.stringify(uyanComments, null, 2), 'utf-8');
