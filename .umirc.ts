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
      'target': 'http://xxxxx',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '/xxx/xx/xxx' },
    },
  },
});
