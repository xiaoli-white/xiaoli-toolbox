<script setup lang="ts">
import Title from "./components/Title.vue";
import BaseConversion from "./components/programmer/BaseConversion.vue";
import AsciiString from "./components/programmer/AsciiString.vue";
import UnicodeSteganography from "./components/programmer/UnicodeSteganography.vue";
</script>

<template>
  <Title/>
  <a-tabs class="tabs" centered>
    <a-tab-pane key="1" tab="进制转换" width="120px">
      <BaseConversion/>
    </a-tab-pane>
    <a-tab-pane key="2" tab="ASCII<=>String" width="120px">
      <AsciiString/>
    </a-tab-pane>
    <a-tab-pane key="3" tab="Unicode隐写" width="120px">
      <UnicodeSteganography/>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>
.tabs {
  width: 500px;
  margin: 0 auto;
}
</style>