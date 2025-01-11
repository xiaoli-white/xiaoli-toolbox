<script lang="ts">
import * as CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      key: "",
      iv: "",
      plaintext: "",
      ciphertext: ""
    }
  },
  methods: {
    generateKey() {
      const array = new Uint8Array(16);
      window.crypto.getRandomValues(array);
      this.key = CryptoJS.lib.WordArray.create(array.slice(0, 16)).toString();
    },
    generateIV() {
      const array = new Uint8Array(16);
      window.crypto.getRandomValues(array);
      this.iv = CryptoJS.lib.WordArray.create(array.slice(0, 16)).toString();
    },
    encrypt() {
      const keyParsed = CryptoJS.enc.Utf8.parse(this.key);
      const ivParsed = CryptoJS.enc.Utf8.parse(this.iv);
      const ciphertext = CryptoJS.AES.encrypt(this.plaintext, keyParsed, {
        iv: ivParsed,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      this.ciphertext = ciphertext.toString();
    },
    decrypt() {
      const keyParsed = CryptoJS.enc.Utf8.parse(this.key);
      const ivParsed = CryptoJS.enc.Utf8.parse(this.iv);
      const plaintext = CryptoJS.AES.decrypt(this.ciphertext, keyParsed, {
        iv: ivParsed,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      this.plaintext = plaintext.toString(CryptoJS.enc.Utf8);
    }
  }
}
</script>

<template>
  <a-button @click="generateKey">生成Key</a-button>
  <a-button @click="generateIV">生成IV</a-button>
  <a-button @click="encrypt">加密</a-button>
  <a-button @click="decrypt">解密</a-button>
  <a-input v-model:value="key" prefix="Key:" allow-clear/>
  <a-input v-model:value="iv" prefix="IV:" allow-clear/>
  <a-input v-model:value="plaintext" prefix="原文:" allow-clear/>
  <a-input v-model:value="ciphertext" prefix="密文:"/>
</template>

<style scoped>
</style>