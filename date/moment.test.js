/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description moment
 */

'use strict';

const moment = require('moment');
const expect = require('chai').expect;

describe('utc', () => {
  it('should log time', () => {
    console.log(moment().utcOffset(480).format('YYYY-MM'));
    console.log(moment().subtract(12, 'M').utcOffset(480).format('YYYY-MM'));
    console.log(moment.parseZone('2018-12-20T00:00:00.000+0800').format('YYYY-MM-DD HH:mm:ss'));
    console.log(moment(1543964400000).utcOffset(480).format('YYYY-MM-DD HH:mm:ss'));
  })
});
