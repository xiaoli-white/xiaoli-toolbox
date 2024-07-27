<script setup lang="ts">
import Title from "./components/Title.vue";
import RSA from "./components/encrypt-and-decrypt/RSA.vue";
</script>

<template>
  <Title/>
  <a-tabs class="tabs" centered>
    <a-tab-pane key="1" tab="RSA" width="120px">
      <RSA/>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>
.tabs {
  width: 500px;
}
</style>