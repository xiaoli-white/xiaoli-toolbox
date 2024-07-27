import { createApp } from 'vue'
import './style.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import Programmer from "./Programmer.vue";

createApp(Programmer).use(Antd).mount('#app')
