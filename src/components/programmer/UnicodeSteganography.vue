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

      let hiddenString = '';
      for (let i = 0; i < binary.length; i += 2) {
        const pair = binary.substring(i, i + 2);
        switch (pair) {
          case '00':
            hiddenString += zeroWidthChars[0];
            break;
          case '01':
            hiddenString += zeroWidthChars[1];
            break;
          case '10':
            hiddenString += zeroWidthChars[2];
            break;
          case '11':
            hiddenString += zeroWidthChars[3];
            break;
        }
      }

      this.textWithHiddenChars = this.originalText + hiddenString + '\u200B';
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

      const hiddenPart = matches[matches.length - 1];

      const hiddenChars = hiddenPart.substring(0, hiddenPart.length - 1);

      let binary = '';
      for (let i = 0; i < hiddenChars.length; i++) {
        switch (hiddenChars[i]) {
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

      let extracted = '';
      for (let i = 0; i < binary.length; i += 24) {
        const chunk = binary.substring(i, i + 24);
        if (chunk.length === 24) {
          const codePoint = parseInt(chunk, 2);
          // 将码点转换为UTF-16编码单元序列
          extracted += String.fromCodePoint(codePoint);
        }
      }

      this.extractedText = extracted;
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.textWithHiddenChars)
          .then(() => {
            console.log('内容已复制到剪切板');
            // 可以在这里添加成功提示
          })
          .catch(err => {
            console.error('复制失败:', err);
            // 可以在这里添加错误提示
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
            <a-textarea v-model:value="originalText" placeholder="输入要插入隐藏字符的原始文本" :rows="3"/>
          </a-form-item>

          <a-form-item label="要隐藏的文本:">
            <a-input v-model:value="hiddenText" placeholder="输入需要隐藏的文本"/>
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
            <a-input v-model:value="extractedText" placeholder="提取出的隐藏文本"/>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped>
</style>