<script lang="ts">
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

      const zeroWidthChars = ['\u200B', '\u200C', '\u200D', '\u2060'];

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
      for (let i = 0; i < fullBinary.length; i += 2) {
        const pair = fullBinary.substring(i, i + 2);
        switch (pair) {
          case '00':
            hiddenChars.push(zeroWidthChars[0]);
            break;
          case '01':
            hiddenChars.push(zeroWidthChars[1]);
            break;
          case '10':
            hiddenChars.push(zeroWidthChars[2]);
            break;
          case '11':
            hiddenChars.push(zeroWidthChars[3]);
            break;
        }
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

      const zeroWidthRegex = /[\u200B\u200C\u200D\u2060]+/g;
      const matches = this.textWithHiddenChars.match(zeroWidthRegex);

      if (!matches || matches.length === 0) {
        this.extractedText = "";
        return;
      }

      let binary = '';
      for (const match of matches) {
        for (let i = 0; i < match.length; i++) {
          switch (match[i]) {
            case '\u200B':
              binary += '00';
              break;
            case '\u200C':
              binary += '01';
              break;
            case '\u200D':
              binary += '10';
              break;
            case '\u2060':
              binary += '11';
              break;
          }
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
          extracted += String.fromCodePoint(codePoint);
        }
      }

      this.extractedText = extracted;
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.textWithHiddenChars)
          .then(() => {
            console.log('内容已复制到剪切板');
          })
          .catch(err => {
            console.error('复制失败:', err);
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