import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  ssr: {
    // dev 模式 服务端渲染交给 eggjs 处理
    devServerRender: false,
  },
  hash: true,
  outputPath: '../public',
  manifest: {
    fileName: '../../config/manifest.json',
    publicPath: '',
  }
});
