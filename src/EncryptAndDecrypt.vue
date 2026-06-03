<script setup lang="ts">
import { ref, watch } from 'vue'
import Title from "./components/Title.vue";
import RSA from "./components/encrypt-and-decrypt/RSA.vue";
import AES128 from "./components/encrypt-and-decrypt/AES128.vue";

const activeKey = ref(localStorage.getItem('main_tab_key') || "1");
watch(activeKey, (val) => localStorage.setItem('main_tab_key', val));
</script>

<template>
  <Title/>
  <a-tabs v-model:activeKey="activeKey" class="tabs" centered>
    <a-tab-pane key="1" tab="RSA" width="120px">
      <RSA/>
    </a-tab-pane>
    <a-tab-pane key="2" tab="AES128" width="120px">
      <AES128/>
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