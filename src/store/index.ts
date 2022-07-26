import { createStore } from 'vuex'
import url from "../api/api.js"
import link from "../api/link.js"

export default createStore({
  state: {
    // 获取的产品数据
    productlistdata:[],
    // 弹窗开关
    AddOpen:false,
    editOpen:false,
    editlist:[]
  },
  getters: {
  },
  //外部的commit修改动作
  mutations: {
    GetProductList(state:any,ok:any){
      state.productlistdata=ok
      //console.log(ok)
      // 之后在外面就用$useStore().state.productlistdata就行
    },
    //增加弹窗的开关
    AddOpen(state:any){
      state.AddOpen=!state.AddOpen;
    },
    EditOpen(state,ok=[]){
      state.editOpen=!state.editOpen;
      state.editlist=ok;
    }
  },
  // 异步？
  actions: {
    //获取数据内容1
    GetProductList(context:any){
      link(url.productlist).then((ok: any) => {
          //console.log(ok)
          context.commit("GetProductList",ok.data)
        });
    },
    // 删除数据 把要删除的id传过去
    DEL_DATA(context:any,ok:any){
      link(url.productlist+"/"+ok.id,"delete").then((res: any) => {
          //console.log(res)
          window.location.reload()
        });
    }
  },
  modules: {
  }
})