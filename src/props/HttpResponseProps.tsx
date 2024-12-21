export default interface HttpResponseProps<T>{
  code:number;//状态码 1成功 0失败
  msg?:string;//错误信息
  data:T;//数据包
}
