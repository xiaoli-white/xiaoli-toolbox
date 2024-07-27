<script lang="ts">
import * as forge from 'node-forge';

export default {
  data() {
    return {
      privateKey: "",
      publicKey: "",
      data: "",
      output: ""
    }
  },
  methods: {
    genKeys() {
      const keys = forge.pki.rsa.generateKeyPair({bits: 2048});
      this.publicKey = forge.pki.publicKeyToPem(keys.publicKey);
      this.privateKey = forge.pki.privateKeyToPem(keys.privateKey);
    },
    encrypt() {
      const publicKey = forge.pki.publicKeyFromPem(this.publicKey);
      const plaintextBytes = forge.util.encodeUtf8(this.data);

      const encryptedBytes = publicKey.encrypt(plaintextBytes, 'RSA-OAEP');
      this.output = forge.util.encode64(encryptedBytes);
    },
    decrypt() {
      const privateKey = forge.pki.privateKeyFromPem(this.privateKey);
      const ctBytes = forge.util.decode64(this.data);

      const plaintextBytes = privateKey.decrypt(ctBytes, 'RSA-OAEP');
      this.output =forge.util.decodeUtf8(plaintextBytes);
    }
  },
}
</script>

<template>
  <a-button @click="genKeys">生成密钥对</a-button>
  <a-button @click="encrypt">加密</a-button>
  <a-button @click="decrypt">解密</a-button>
  <a-input v-model:value="publicKey" prefix="公钥:"/>
  <a-input v-model:value="privateKey" prefix="私钥:"/>
  <a-input v-model:value="data" prefix="待加密/解密数据:"/>
  <a-input v-model:value="output" prefix="结果:"/>
</template>

<style scoped>
</style>