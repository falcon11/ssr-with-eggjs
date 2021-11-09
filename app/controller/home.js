'use strict';

const Controller = require('egg').Controller;
const mime = require('mime');

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.serverRender = require('../public/umi.server');
  }
  async index() {
    const { ctx } = this;

    // 先走 eggjs 的 view 渲染
    const htmlTemplate = await ctx.view.render('index.html');

    // 将 html 模板传到服务端渲染函数中
    const { html, error } = await this.serverRender({
      path: ctx.url,
      getInitialPropsCtx: {},
      htmlTemplate,
    });

    if (error) {
      ctx.logger.error(
        '[SSR ERROR] 渲染报错，切换至客户端渲染',
        error,
        ctx.url
      );
    }
    // 获取媒体类型
    ctx.type = mime.getType(ctx.url);
    ctx.status = 200;
    ctx.body = html;
  }
}

module.exports = HomeController;
