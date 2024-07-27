<script setup lang="ts">
import Title from "./App.vue";
import BaseConversion from "./components/programmer/BaseConversion.vue";
</script>

<template>
  <Title/>
  <a-tabs class="tabs" centered>
    <a-tab-pane key="1" tab="进制转换" width="120px">
      <BaseConversion/>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>
.tabs {
  width: 500px;
}
</style>