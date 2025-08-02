<script lang="ts">
import * as forge from 'node-forge';

export default {
  data() {
    return {
      privateKey: "",
      publicKey: "",
      origin: "",
      encrypted: "",
      msg: "",
      ret: "",
      result: ""
    }
  },
  methods: {
    generateKeys() {
      const keys = forge.pki.rsa.generateKeyPair({bits: 4096});
      this.publicKey = forge.pki.publicKeyToPem(keys.publicKey);
      this.privateKey = forge.pki.privateKeyToPem(keys.privateKey);
    },
    encrypt() {
      this.encrypted = "";
      const publicKey = forge.pki.publicKeyFromPem(this.publicKey);
      const plaintextBytes = forge.util.encodeUtf8(this.origin);

      const encryptedBytes = publicKey.encrypt(plaintextBytes, 'RSA-OAEP');
      this.encrypted = forge.util.encode64(encryptedBytes);
    },
    decrypt() {
      this.origin = "";
      const privateKey = forge.pki.privateKeyFromPem(this.privateKey);
      const ctBytes = forge.util.decode64(this.encrypted);

      const plaintextBytes = privateKey.decrypt(ctBytes, 'RSA-OAEP');
      this.origin = forge.util.decodeUtf8(plaintextBytes);
    },
    sign() {
      this.ret = "";
      const privateKey = forge.pki.privateKeyFromPem(this.privateKey);
      const md = forge.md.sha256.create();
      md.update(this.msg, 'utf8');
      this.ret = forge.util.encode64(privateKey.sign(md));
    },
    verify() {
      this.result = "";
      const publicKey = forge.pki.publicKeyFromPem(this.publicKey);
      const md = forge.md.sha256.create();
      md.update(this.msg, 'utf8');
      const signatureBytes = forge.util.decode64(this.ret);
      this.result = publicKey.verify(md.digest().bytes(), signatureBytes) ? "Success" : "Failed";
    },
  },
}
</script>

<template>
  <a-button @click="generateKeys">生成密钥对</a-button>
  <a-input v-model:value="publicKey" prefix="公钥:" allow-clear/>
  <a-input v-model:value="privateKey" prefix="私钥:" allow-clear/>
  <a-tabs class="sub-tabs" centered>
    <a-tab-pane tab="加解密" key="1">
      <a-button @click="encrypt">加密</a-button>
      <a-button @click="decrypt">解密</a-button>
      <a-input v-model:value="origin" prefix="原文:" allow-clear/>
      <a-input v-model:value="encrypted" prefix="密文:"/>
    </a-tab-pane>
    <a-tab-pane tab="签名/验证" key="2">
      <a-button @click="sign">签名</a-button>
      <a-button @click="verify">验证</a-button>
      <a-input v-model:value="msg" prefix="原始数据:" allow-clear/>
      <a-input v-model:value="ret" prefix="签名结果:"/>
      <a-input v-model:value="result" prefix="验证结果:"/>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>
</style>