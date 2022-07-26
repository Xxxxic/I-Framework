const { defineConfig } = require('@vue/cli-service')

//element-plus按需引入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  // 指定哪些文件夹或文件需要编译
  transpileDependencies: true,
  //设置是否在开发环境下每次保存代码时都启用 eslint验证
  // false：关闭每次保存都进行检测
  // true：开启每次保存都进行检测，效果与warning一样
  // ‘warning’：开启每次保存都进行检测，lint 错误将显示到控制台命令行，而且编译并不会失败。
  // ‘error’：开启每次保存都进行检测，lint 错误将显示到浏览器页面上，且编译失败。
  // ‘default’：同’error’
  lintOnSave: false,
  // css相关配置
  css: {
    // css预设器配置项
    loaderOptions: {
      scss:{ 
        additionalData: `@import "./src/styles/style.scss";`//主入口css文件路径
      }
    }
  },
  // 设置element-plus插件配置
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ]
  }
})