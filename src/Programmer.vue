<script setup lang="ts">
import { ref, watch } from 'vue'
import Title from "./components/Title.vue";
import BaseConversion from "./components/programmer/BaseConversion.vue";
import AsciiString from "./components/programmer/AsciiString.vue";
import UnicodeSteganography from "./components/programmer/UnicodeSteganography.vue";
import Base64 from "./components/programmer/Base64.vue";

const activeKey = ref(localStorage.getItem('programmer_tab_key') || "1");
watch(activeKey, (val) => localStorage.setItem('programmer_tab_key', val));
</script>

<template>
  <Title/>
  <a-tabs v-model:activeKey="activeKey" class="tabs" centered>
    <a-tab-pane key="1" tab="进制转换" width="120px">
      <BaseConversion/>
    </a-tab-pane>
    <a-tab-pane key="2" tab="ASCII<=>String" width="120px">
      <AsciiString/>
    </a-tab-pane>
    <a-tab-pane key="3" tab="Unicode隐写" width="120px">
      <UnicodeSteganography/>
    </a-tab-pane>
    <a-tab-pane key="4" tab="Base64编解码" width="120px">
      <Base64/>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>
.tabs {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}
</style>