'use strict';
const { createProxyMiddleware } = require('http-proxy-middleware');
const c2k = require('koa2-connect');

const httpbinProxyOptions = {
  target: 'https://httpbin.org',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
};

const proxyMiddleware = c2k(createProxyMiddleware(httpbinProxyOptions));

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.use('/api', proxyMiddleware);
  // 所有请求都走 controller.home.index
  router.get('*', controller.home.index);
};
