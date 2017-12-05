/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description location
 */

'use strict';

var url = 'https://huodong.taobao.com/a/b/c?k=v&b=2#q';
var location = getLocation(url);
var params = getParams(location.search);

params.itemId = 123456;

var paramList = [];

for (var k in params) {
  paramList.push(k + '=' + params[k]);
}

var href = location.origin + location.pathname + '?' + paramList.join('&') + location.hash;

console.log(href);

/**
 * 解析 location
 * @param url
 * @returns {*}
 */
function getLocation(url) {
  let _location;

  if (typeof url === 'undefined') {
    _location = location;
  } else {
    let matched = url.match(/(https?:)?\/\/([^\/:?#]+)(:(\d+))?([^?#]+)?(\?[^#]+)?(#.+)?/);

    _location = {
      hash: matched[7] || '',
      host: matched[2] + (matched[3] || ''),
      hostname: matched[2],
      href: url,
      origin: (matched[1] || '') + '//' + matched[2] + (matched[3] || ''),
      pathname: matched[5] || '',
      port: matched[4] || '',
      protocol: matched[1] || '',
      search: matched[6] || ''
    };
  }

  return _location;
}

/**
 * 获取 url 参数
 * @param url
 * @returns {{}}
 */
function getParams(url) {
  let search;

  if (typeof url === 'undefined') {
    search = location.search;
  } else if (url[0] === '?') {
    search = url;
  } else if (url === '') {
    return {};
  } else {
    search = getLocation(url).search;
  }

  let queryArray = search.match(/[^&?]+=[^&]+/g) || [];
  let params = {};

  for (let i = 0; i < queryArray.length; i++) {
    let map = queryArray[i].split(/=/);

    params[map[0]] = decodeURIComponent(map[1]);
  }

  return params;
}

module.exports.getLocation = getLocation;
