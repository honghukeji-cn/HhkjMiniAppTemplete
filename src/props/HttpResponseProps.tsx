export default interface HttpResponseProps{
  code:number;//状态码 1成功 0失败
  msg?:string;//错误信息
  data:any;//数据包
}
