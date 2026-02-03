<script lang="ts">
export default {
  data() {
    return {
      ascii: "",
      str: ""
    }
  },
  methods: {
    ascii2string() {
      const textDecoder = new TextDecoder();
      this.str = textDecoder.decode(new Uint8Array(this.ascii.split(",").map(c => Number(c))));
    },
    string2ascii() {
      const textEncoder = new TextEncoder();
      this.ascii = textEncoder.encode(this.str).join(",");
    }
  }
}
</script>

<template>
  <a-button @click="ascii2string">ASCII=>String</a-button>
  <a-button @click="string2ascii">String=>ASCII</a-button>
  <a-form layout="vertical">
    <a-form-item label="ASCII:">
      <a-input v-model:value="ascii" placeholder="ASCII" allow-clear/>
    </a-form-item>
    <a-form-item label="String:">
      <a-textarea v-model:value="str" placeholder="String" allow-clear/>
    </a-form-item>
  </a-form>
</template>

<style scoped>

</style>