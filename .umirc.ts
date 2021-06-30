import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'React hooks',
  mode: 'site',
  publicPath: process.env.CI ? "/react-hooks/" : "/",
  // more config: https://d.umijs.org/config
});
