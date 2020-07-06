## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload
npm run dev
npm run analyzer # script analyzer

# build for production with minification
npm run build # production
npm run build:test # production_test
```

## WASM Build Setup
``` bash
# wasm-pack目前是通过Cargo发布的命令行工具。要安装它，请安装Rust开发环境
# cargo install wasm-pack
cd wasm/pano-tools
wasm-pack build
```

## package.json postinstall
"postinstall": "./.plugins/postinstall.sh",
git 版本自增脚本 (node environment required)
