import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      // 配置多页面
      input: {
        index: './index.html',
        programmer: './programmer.html',
        "encrypt-and-decrypt": './encrypt-and-decrypt.html',
      },
    },
  },

})
