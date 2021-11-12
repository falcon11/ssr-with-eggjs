'use strict';
const { createProxyMiddleware } = require('http-proxy-middleware');
const c2k = require('koa2-connect');

module.exports = (options = {}) => {
  return c2k(createProxyMiddleware(options.proxy));
};
