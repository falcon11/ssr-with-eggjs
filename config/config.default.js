/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 * @param {Egg.EggAppConfig} appConfig config
 */
module.exports = (appInfo, appConfig = {}) => {
  const assetsDir = (appConfig.assets && appConfig.assets.dir) || 'app/web';

  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1636442650677_1894';

  // add your middleware config here
  config.middleware = [ 'reverseProxy' ];

  // add your user config here
  const userConfig = {
    // 开启 gzip
    static: {
      gzip: true,
    },
    // 配置 assets
    assets: {
      publicPath: '/public',
      devServer: {
        command: 'umi dev',
        env: {
          APP_ROOT: path.join(appInfo.baseDir, assetsDir),
          PORT: '{port}',
          BROWSER: 'none',
          ESLINT: 'none',
          SOCKET_SERVER: 'http://127.0.0.1:{port}',
          PUBLIC_PATH: 'http://127.0.0.1:{port}',
        },
      },
    },
    // 配置 view
    view: {
      mapping: {
        '.html': 'nunjucks',
      },
      defaultViewEngine: 'nunjucks',
    },
    proxy: true,
    security: {
      csrf: { enable: true },
      xframe: {
        enable: true,
      },
    },
    reverseProxy: {
      match: '/api', // 当请求路径以此字符串开头时，使用该中间件
      proxy: {
        changeOrigin: true,
        router: req => {
          console.log('req.url', req.url);
          // 可以根据请求的 url 返回不同的 target
          return 'https://httpbin.org';
        },
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
