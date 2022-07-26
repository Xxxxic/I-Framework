// 参考链接：https://zhuanlan.zhihu.com/p/455508350#:~:text=%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%E5%99%A8%E7%9A%84%E4%BD%9C%E7%94%A8,%E8%A6%81%E6%94%B9%E4%B9%9F%E9%9D%9E%E5%B8%B8%E5%AE%B9%E6%98%93%E3%80%82

import  axios from "axios"

let axiosurl="http://localhost:8888"
// if(process.env.NODE_ENV==="development"){
//   axiosurl=process.env.VUE_APP_API;
// }else{
//   axiosurl=process.env.VUE_APP_API;
// }

//创建axios实例
const service =axios.create({
  baseURL:axiosurl,
})

// 请求拦截和响应拦截
// 添加请求拦截器
axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(response => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log("error"+error.response.status);   
    switch(error.response.status){
      case 404:
        alert("当前路径有误");
        break;
      case 500:
        alert("服务器连接失败 请稍后再试");
        break;
      default:
        alert("未知错误");
        break;
    } 
    return Promise.reject(error);
  });

  export default service