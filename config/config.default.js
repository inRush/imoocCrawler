'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_imooc';
  //模板引擎配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    root: path.join(appInfo.baseDir, 'app/view/pages'),
    mapping: {
      '.pug': 'pug',
    },
  }
  config.mongoose = {
    url: 'mongodb://127.0.0.1/webstudy',
    options: {}
  };

  config.userrole = {
    failureHandler(action) {
      switch (action) {
        case 'admin':
          this.status = 403;
          if (this.url == "/rollcall/answer") {
            this.body = {
              success: 0,
              err: '请先登录'
            }
            this.status == 200;
          } else {
            this.redirect('/login');
          }
          break;
        default:
          break;
      }
    },
  };
  config.security = {
    csrf: {
      useSession: true, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
      cookieName: 'csrfToken', // Cookie 中的字段名，默认为 csrfToken
      sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
      ignoreJSON: true
    }
  }
  return config;
};