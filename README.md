## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload
npm run dev
npm run analyzer

# build for production with minification
npm run build
npm run build:test

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
```

## WASM Build Setup
``` bash
# wasm-pack目前是通过Cargo发布的命令行工具。要安装它，请安装Rust开发环境
# cargo install wasm-pack
cd wasm/pano-tools
wasm-pack build
```

## package.json postinstall
git 版本自增脚本 (如不需要可删除)
