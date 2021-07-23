import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Qiaoyuwen Core',
  mode: 'site',
  history: {
    type: "hash",
  },
  publicPath: process.env.CI ? "/qiaoyuwen-core/" : "/",
  // more config: https://d.umijs.org/config
});
