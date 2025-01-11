import Taro from "@tarojs/taro";
import HttpResponseProps from "../props/HttpResponseProps";

interface Method {
  /** HTTP 请求 OPTIONS */
  OPTIONS
  /** HTTP 请求 GET */
  GET
  /** HTTP 请求 HEAD */
  HEAD
  /** HTTP 请求 POST */
  POST
  /** HTTP 请求 PUT */
  PUT
  /** HTTP 请求 PATCH */
  PATCH
  /** HTTP 请求 DELETE */
  DELETE
  /** HTTP 请求 TRACE */
  TRACE
  /** HTTP 请求 CONNECT */
  CONNECT
}
//接口域名
const API_URL="http://127.0.0.1:8083/";
const request=(url:string,data:any,method:keyof Method)=>{
  return new Promise<HttpResponseProps>((resolve)=>{
    Taro.request({
      url: API_URL+url, //仅为示例，并非真实的接口地址
      data,
      timeout:3000,//超时时间
      header: {
        'content-type': 'application/json', // 默认值
        "token":Taro.getStorageSync("token")
      },
      method:method,
      dataType:"json",
      success: function (res) {
        let result:HttpResponseProps={
          code:res.data.code,
          msg:res.data.msg,
          data:res.data.data
        }
        resolve(result)
      },
      fail:(err)=>{
          Taro.showToast({
            title:err.errMsg,
            icon:"none"
          })
          let result:HttpResponseProps={
            code:0,
            msg:err.errMsg,
            data:[]
          }
          resolve(result)
      }
    })
  })
}
export  default  class Request{
  static POST(url:string,data:any){
      return request(url,data,"POST")
  }
  static GET(url:string)
  {
    return request(url,{},"GET");
  }
}
