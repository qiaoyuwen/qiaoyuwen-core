import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'React hooks',
  mode: 'site',
  history: {
    type: "hash",
  },
  publicPath: process.env.CI ? "/react-hooks/" : "/",
  // more config: https://d.umijs.org/config
});
