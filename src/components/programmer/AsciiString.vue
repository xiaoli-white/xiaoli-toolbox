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
        this.str = String.fromCharCode(...this.ascii.split('').map(Number));
      },
      string2ascii() {
        this.ascii = this.str.split('').map(char => char.charCodeAt(0).toString()).join(",");
      }
    }
  }
</script>

<template>
  <a-button @click="ascii2string">ASCII=>String</a-button>
  <a-button @click="string2ascii">String=>ASCII</a-button>
  <a-input v-model:value="ascii" prefix="ASCII:" allow-clear />
  <a-input v-model:value="str" prefix="String:" allow-clear />
</template>

<style scoped>

</style>