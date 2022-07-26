import service from "../util/service.js"
//封装一个可以符合我们所有数据请求的内容  promise

// Promise是什么：https://blog.csdn.net/weixin_41888813/article/details/82882375
let link=(url,method="get",data,params)=>{
    return new Promise((resolve,reject)=>{
        service.request({
            url,
            method,
            data,
            params
        }).then((ok)=>{
            resolve(ok)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export default link