<script lang="ts">
export default {
}
</script>

<template>
  <h1>XiaoLiToolbox</h1>
  <div class="nav-buttons">
    <a-button type="primary" href="/" size="large">主页</a-button>
    <a-button type="primary" href="/programmer.html" size="large">程序员</a-button>
    <a-button type="primary" href="/encrypt-and-decrypt.html" size="large">加解密</a-button>
  </div>
</template>

<style scoped>
.nav-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
}

@media (max-width: 480px) {
  .nav-buttons {
    flex-direction: column;
    align-items: center;
  }
  .nav-buttons .ant-btn {
    width: 100%;
    max-width: 280px;
  }
}
</style>