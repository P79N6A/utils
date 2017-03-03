/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description index.js 类
 */

var inquirer = require("inquirer");

inquirer.prompt([
  {
    type: 'confirm',
    name: 'kill',
    message: 'a process is running on port 3008, kill it?',
    default: true
  }
], function(answers) {
  console.log(answers.kill);
});
