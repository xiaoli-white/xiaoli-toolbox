<script lang="ts">
import { message } from 'ant-design-vue';
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
  mounted() {
    this.key = localStorage.getItem('aes_key') || "";
    this.iv = localStorage.getItem('aes_iv') || "";
  },
  methods: {
    generateKey() {
      const array = new Uint8Array(16);
      window.crypto.getRandomValues(array);
      this.key = CryptoJS.lib.WordArray.create(array.slice(0, 16)).toString();
      localStorage.setItem('aes_key', this.key);
    },
    generateIV() {
      const array = new Uint8Array(16);
      window.crypto.getRandomValues(array);
      this.iv = CryptoJS.lib.WordArray.create(array.slice(0, 16)).toString();
      localStorage.setItem('aes_iv', this.iv);
    },
    encrypt() {
      if (!this.key || !this.iv) {
        message.warning('请先填写 Key 和 IV');
        return;
      }
      if (!this.plaintext) {
        message.warning('请先填写原文');
        return;
      }
      try {
        const keyParsed = CryptoJS.enc.Utf8.parse(this.key);
        const ivParsed = CryptoJS.enc.Utf8.parse(this.iv);
        const ciphertext = CryptoJS.AES.encrypt(this.plaintext, keyParsed, {
          iv: ivParsed,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
        this.ciphertext = ciphertext.toString();
        message.success('加密成功');
      } catch (err) {
        message.error('加密失败: ' + (err as Error).message);
      }
    },
    decrypt() {
      if (!this.key || !this.iv) {
        message.warning('请先填写 Key 和 IV');
        return;
      }
      if (!this.ciphertext) {
        message.warning('请先填写密文');
        return;
      }
      try {
        const keyParsed = CryptoJS.enc.Utf8.parse(this.key);
        const ivParsed = CryptoJS.enc.Utf8.parse(this.iv);
        const plaintext = CryptoJS.AES.decrypt(this.ciphertext, keyParsed, {
          iv: ivParsed,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
        const result = plaintext.toString(CryptoJS.enc.Utf8);
        if (!result) {
          message.error('解密失败，请检查密钥和密文是否正确');
          return;
        }
        this.plaintext = result;
        message.success('解密成功');
      } catch (err) {
        message.error('解密失败: ' + (err as Error).message);
      }
    }
  }
}
</script>

<template>
  <a-button @click="generateKey">生成Key</a-button>
  <a-button @click="generateIV">生成IV</a-button>
  <a-button @click="encrypt">加密</a-button>
  <a-button @click="decrypt">解密</a-button>
  <a-form layout="vertical">
    <a-form-item label="Key:">
      <a-input v-model:value="key" placeholder="Key" allow-clear/>
    </a-form-item>
    <a-form-item label="IV:">
      <a-input v-model:value="iv" placeholder="IV" allow-clear/>
    </a-form-item>
    <a-form-item label="原文:">
      <a-textarea v-model:value="plaintext" placeholder="原文" allow-clear/>
    </a-form-item>
    <a-form-item label="密文:">
      <a-input v-model:value="ciphertext" placeholder="密文" allow-clear/>
    </a-form-item>
  </a-form>
</template>

<style scoped>
</style>