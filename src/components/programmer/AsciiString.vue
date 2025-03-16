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
  <a-input v-model:value="ascii" prefix="ASCII:" allow-clear/>
  <a-input v-model:value="str" prefix="String:" allow-clear/>
</template>

<style scoped>

</style>