/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description index.js
 */

'use strict';

var compiler = Tpl(
  '<% for(var i = 0; i < modules.length; ++i) { %>\
       <% if(!keyword || modules[i].name.indexOf(keyword) !== -1) %>\
         <div class="module-item">\
           <h3><a href="#Module<%= i %>" target="_self">☞ 锚点: <%= modules[i].name %></a></h3>\
         </div>\
       <% } %>\
   <% } %>'
);

function Tpl(tpl) {
  var snippet = tpl.split(/(?=<%)|(%>)/);
  var mCode = [
    'var _tplSnippet = [];',
    'with(_tplData) {'
  ];

  for (var i = 0; i < snippet.length; ++i) {
    if (typeof snippet[i] !== 'undefined' && snippet[i] !== '%>') {
      if (snippet[i].substring(0, 2) === '<%') {
        // 如果是表达式
        if (snippet[i].charAt(2) === '=') {
          mCode.push(snippet[i].replace(/<%=((\s|.)+)/g, '_tplSnippet.push($1);'));
        } else {
          // 如果是语句
          mCode.push(snippet[i].replace(/<%((\s|.)+)/g, '$1'));
        }
      } else {
        // 如果是 html
        mCode.push('_tplSnippet.push(\'' + snippet[i].replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/\n/g, '\\n') + '\');');
      }
    }
  }

  mCode.push('}', 'return _tplSnippet.join(\'\');');

  return new Function('_tplData', mCode.join(''));
}