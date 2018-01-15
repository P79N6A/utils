/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description date
 */

var dateStr = getDateByTime(new Date().getTime());


function getDateByTime(time) {
  var date = new Date(time);

  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}

function holidate(date) {
  if (typeof date === 'string') {

  } else if (typeof date === 'number') {

  } else if (date instanceof Date) {

  }
}

/**
 * 解析日期字符串（格式为：yyyy-MM-dd HH:mm:ss），不支持时区
 * @param dateStr
 * @returns {Date}
 */
function parseDate(dateStr) {
  var matched = dateStr.match(/^(\d{4})-([0-1]?[0-9])-([0-3]?[0-9])\s+([0-2]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])(?::(\d{1,3}))?/);

  if (matched) {
    return new Date(
      parseInt(matched[1], 10),
      parseInt(matched[2], 10) - 1,
      parseInt(matched[3], 10),
      parseInt(matched[4], 10),
      parseInt(matched[5], 10),
      parseInt(matched[6], 10),
      parseInt(matched[7] || 0, 10)
    );
  } else {
    return new Date();
  }
}
