/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description date
 */

var dateStr = getDateByTime(new Date().getTime());



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


/**
 * 日期转换相关
 * @param date        Date 对象， 如果是 13 位数字，则需要先使用 new Date() 进行转换
 * @param fmt         要转换的格式 比如： yyyy-MM-dd hh:mm:ss 或者 yyyy-MM-dd
 * @returns {*}
 */
function formatDate(date, fmt) {
  const o = {
    'M+': date.getMonth() + 1,                   //月份
    'd+': date.getDate(),                        //日
    'h+': date.getHours(),                       //小时
    'm+': date.getMinutes(),                     //分
    's+': date.getSeconds(),                     //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds()                  //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }

  return fmt;
}

/**
 * 获取接近日期
 * @param date
 * @param level, 0 时分, 1 月日, > 1 年月日
 * @returns {*}
 */
function getRecentTime(date, level) {
  if (level === undefined) {
    level = 0;
  }

  let now = new Date();

  switch (level) {
    case 2:
      return formatDate(date, 'yyyy 年 M 月 d 日');
    case 1:
      return formatDate(date, 'M 月 d 日');
    case 0:
      if (now.getFullYear() === date.getFullYear()) {
        let isInOneDay = (now.getMonth() === date.getMonth()) && (now.getDate() === date.getDate());

        if (isInOneDay) {
          let minutes = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);

          if (minutes < 1) {
            return '刚刚';
          } else if (minutes < 60) {
            return minutes + ' 分钟前';
          } else {
            return Math.floor(minutes / 60) + ' 小时前';
          }
        } else {
          return now.getDate() - date.getDate() === 1 ? '昨天' : formatDate(date, 'M 月 d 日');
        }
      } else {
        return formatDate(date, 'yyyy 年 M 月 d 日');
      }
  }
}

module.exports = {
  formatDate,
  getRecentTime,
  parseDate
};
