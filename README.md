# XiaoLi-Toolbox

一个基于Vue 3 + TypeScript的前端工具箱项目，提供了常用的加密解密和程序员工具。

## 功能特性

### 加密解密工具
- AES128 加密解密
- RSA 加密解密

### 程序员工具
- ASCII 与字符串互转
- 进制转换（二进制、八进制、十进制、十六进制）
- Unicode 隐写术
- Base64 编解码

## 技术栈

- Vue 3.4.31
- TypeScript 5.2.2
- Vite 5.3.4
- Ant Design Vue 4.2.3

## 安装与使用

### 环境要求

- Node.js >= 18.x
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 项目结构

```
src/
├── components/
│   ├── encrypt-and-decrypt/     # 加密解密相关组件
│   │   ├── AES128.vue
│   │   └── RSA.vue
│   └── programmer/              # 程序员相关工具组件
│       ├── AsciiString.vue
│       ├── BaseConversion.vue
│       ├── Base64.vue
│       └── UnicodeSteganography.vue
├── App.vue                      # 主应用组件
├── EncryptAndDecrypt.vue        # 加密解密页面
├── Programmer.vue               # 程序员工具页面
├── encrypt-and-decrypt.ts       # 加密解密入口文件
├── programmer.ts                # 程序员工具入口文件
└── main.ts                      # 项目主入口
```

## 使用说明

1. 访问首页可选择进入加密解密工具或程序员工具
2. 在各工具页面中，根据需要选择相应功能
3. 输入需要处理的数据，点击对应按钮执行操作

## 贡献

欢迎提交 Issue 或 Pull Request 来改进这个工具箱。