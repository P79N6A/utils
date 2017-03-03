/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description parse
 */

'use strict';

var jsonStr = "{\\n  \"name\": \"cp-xctrl-config\",\\n  \"version\": \"0.0.2\",\\n  \"author\": {\\n    \"name\": \"your name\"\\n  },\\n  \"background\": { \"scripts\": [\\n    \"http://127.0.0.1:3290/src/background.js\"\\n    ]},\\n  \"content_scripts\": [{\\n    \"matches\":[\"*://*.taobao.com/*\"],\\n    \"js\":[\\n      \"http://127.0.0.1:3290/src/index.js\"\\n    ],\\n    \"css\":[\\n      \"http://127.0.0.1:3290/src/index.css\"\\n    ]\\n  }],\\n  \"message\": \"\"\\n}\\n";
var data = JSON.parse(jsonStr);
debugger;