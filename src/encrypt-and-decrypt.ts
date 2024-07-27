import { createApp } from 'vue'
import './style.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import EncryptAndDecrypt from "./EncryptAndDecrypt.vue";

createApp(EncryptAndDecrypt).use(Antd).mount('#app')
