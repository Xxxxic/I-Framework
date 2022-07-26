/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
//解决store里面报错：https://blog.csdn.net/Haveyounow/article/details/118819037
declare module '*.js'
