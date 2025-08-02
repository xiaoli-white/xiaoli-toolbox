<script lang="ts">
export default {
  data() {
    return {
      input: "",
      output: ""
    }
  },
  methods: {
    encode() {
      try {
        this.output = btoa(this.input);
      } catch (e) {
        alert("编码失败: " + e);
      }
    },
    decode() {
      try {
        this.output = atob(this.input);
      } catch (e) {
        alert("解码失败: " + e);
      }
    }
  }
}
</script>

<template>
  <a-button @click="encode">编码(Base64 Encode)</a-button>
  <a-button @click="decode">解码(Base64 Decode)</a-button>
  <a-textarea v-model:value="input" placeholder="输入内容" :rows="4" allow-clear/>
  <a-textarea v-model:value="output" placeholder="输出内容" :rows="4" allow-clear/>
</template>

<style scoped>
  .ant-btn {
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>