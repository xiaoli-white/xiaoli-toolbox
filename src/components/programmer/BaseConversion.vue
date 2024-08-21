<script lang="ts">

export default {
  data() {
    return {
      inputMode: "",
      inputValue: "",
      outputMode: "",
      outputValue: "",
    }
  },
  methods: {
    setInputMode(mode: string) {
      this.inputMode = mode;
    },
    setOutputMode(mode: string) {
      this.outputMode = mode;
    },
    convert() {
      if (this.inputMode === "") {
        alert("请选择输入的进制!");
        return;
      }
      if (this.outputMode === "") {
        alert("请选择输出的进制!");
        return;
      }
      if (this.inputValue === "") {
        alert("请输入待转换的数字!");
        return;
      }

      let num: number;
      switch (this.inputMode) {
        case "2":
          num = parseInt(this.inputValue, 2);
          break;
        case "8":
          num = parseInt(this.inputValue, 8);
          break;
        case "10":
          num = parseInt(this.inputValue, 10);
          break;
        case "16":
          num = parseInt(this.inputValue, 16);
          break;
        default:
          num = 0;
      }
      switch (this.outputMode) {
        case "2":
          this.outputValue = num.toString(2);
          break;
        case "8":
          this.outputValue = num.toString(8);
          break;
        case "10":
          this.outputValue = num.toString(10);
          break;
        case "16":
          this.outputValue = num.toString(16);
      }
    }
  }
}
</script>

<template>
  <a-input-group compact>
    <a-select style="width: 130px" @select="setInputMode">
      <a-select-option value="2">二进制(bin)</a-select-option>
      <a-select-option value="8">八进制(oct)</a-select-option>
      <a-select-option value="10">十进制(dec)</a-select-option>
      <a-select-option value="16">十六进制(hex)</a-select-option>
    </a-select>
    <a-input v-model:value="inputValue" style="width: 70%" placeholder="请输入待转换的数字" allow-clear />
  </a-input-group>
  <a-input-group compact>
    <a-select style="width: 130px" @select="setOutputMode">
      <a-select-option value="2">二进制(bin)</a-select-option>
      <a-select-option value="8">八进制(oct)</a-select-option>
      <a-select-option value="10">十进制(dec)</a-select-option>
      <a-select-option value="16">十六进制(hex)</a-select-option>
    </a-select>
    <a-input v-model:value="outputValue" style="width: 70%" placeholder="转换结果"/>
  </a-input-group>
  <a-button @click="convert">转换</a-button>
</template>

<style scoped>

</style>
