<script lang="ts">
import { message } from 'ant-design-vue';

export default {
  data() {
    return {
      originalText: "",
      hiddenText: "",
      textWithHiddenChars: "",
      extractedText: ""
    }
  },
  methods: {
    insertHiddenChars() {
      if (!this.originalText || !this.hiddenText) {
        return;
      }

      // Use only \u200B (ZWSP) and \u200D (ZWJ) — these survive WeChat mobile transmission.
      // 0 -> \u200B, 1 -> \u200D
      const ZERO = '\u200B';
      const ONE = '\u200D';

      const lengthBinary = this.hiddenText.length.toString(2).padStart(24, '0');

      let binary = '';
      for (let i = 0; i < this.hiddenText.length; i++) {
        let codePoint = this.hiddenText.codePointAt(i);
        if (codePoint === undefined) continue;
        if (codePoint > 0xFFFF) {
          i++;
        }
        const bin = codePoint.toString(2).padStart(24, '0');
        binary += bin;
      }

      const fullBinary = lengthBinary + binary;

      let hiddenChars = [];
      for (let i = 0; i < fullBinary.length; i++) {
        hiddenChars.push(fullBinary[i] === '1' ? ONE : ZERO);
      }

      const originalChars = Array.from(this.originalText);
      const result = [];

      for (let i = 0; i < originalChars.length; i++) {
        result.push(originalChars[i]);

        while (hiddenChars.length > 0) {
          const insertCount = Math.min(
            Math.floor(Math.random() * 4),
            hiddenChars.length
          );

          if (insertCount === 0 && i < originalChars.length - 1) {
            break;
          }

          for (let j = 0; j < insertCount; j++) {
            result.push(hiddenChars.shift());
          }

          if (hiddenChars.length === 0) break;
        }
      }

      this.textWithHiddenChars = result.join('') + hiddenChars.join('');
    },

    extractHiddenChars() {
      if (!this.textWithHiddenChars) {
        return;
      }

      // Match only the two characters used by the current encoding
      const zeroWidthRegex = /[\u200B\u200D]+/g;
      const matches = this.textWithHiddenChars.match(zeroWidthRegex);

      if (!matches || matches.length === 0) {
        this.extractedText = "";
        return;
      }

      let binary = '';
      for (const match of matches) {
        for (let i = 0; i < match.length; i++) {
          binary += match[i] === '\u200D' ? '1' : '0';
        }
      }

      if (binary.length < 24) {
        this.extractedText = "";
        return;
      }

      const lengthBinary = binary.substring(0, 24);
      const textLength = parseInt(lengthBinary, 2);

      const textBinary = binary.substring(24);

      let extracted = '';
      for (let i = 0; i < textBinary.length; i += 24) {
        const chunk = textBinary.substring(i, i + 24);
        if (chunk.length === 24 && extracted.length < textLength) {
          const codePoint = parseInt(chunk, 2);
          if (codePoint > 0x10FFFF || isNaN(codePoint)) {
            message.error('提取失败：数据中包含无效的 Unicode 编码');
            this.extractedText = extracted;
            return;
          }
          try {
            extracted += String.fromCodePoint(codePoint);
          } catch {
            message.error('提取失败：数据损坏或不支持的字符编码');
            this.extractedText = extracted;
            return;
          }
        }
      }

      this.extractedText = extracted;
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.textWithHiddenChars)
          .then(() => {
            message.success('已复制到剪贴板');
          })
          .catch(err => {
            message.error('复制失败: ' + err.message);
          });
    }
  }
}
</script>

<template>
  <div class="unicode-steganography">
    <a-tabs class="sub-tabs" centered>
      <a-tab-pane tab="插入隐藏字符" key="1">
        <a-form layout="vertical">
          <a-form-item label="原始文本:">
            <a-textarea v-model:value="originalText" placeholder="输入要插入隐藏字符的原始文本" :rows="4"/>
          </a-form-item>

          <a-form-item label="要隐藏的文本:">
            <a-textarea v-model:value="hiddenText" placeholder="输入需要隐藏的文本" :rows="4"/>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="insertHiddenChars">生成包含隐藏字符的文本</a-button>
          </a-form-item>

          <a-form-item label="包含隐藏字符的文本:">
            <a-textarea v-model:value="textWithHiddenChars" placeholder="生成的包含隐藏字符的文本" :rows="4"/>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="copyToClipboard">复制到剪贴板</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>

      <a-tab-pane tab="提取隐藏字符" key="2">
        <a-form layout="vertical">
          <a-form-item label="包含隐藏字符的文本:">
            <a-textarea v-model:value="textWithHiddenChars" placeholder="粘贴包含隐藏字符的文本" :rows="4"/>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="extractHiddenChars">提取隐藏文本</a-button>
          </a-form-item>

          <a-form-item label="提取出的隐藏文本:">
            <a-textarea v-model:value="extractedText" placeholder="提取出的隐藏文本" readonly :rows="4"/>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped>
</style>