import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  theme:{
    '@theme': '#ffe58f',
  },
  proxy: {
    '/api': {
      'target': '',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
});
