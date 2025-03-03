import React from "react";
import HttpResponseProps from "./HttpResponseProps";
import {ScrollViewProps} from "@tarojs/components";

export default interface ListViewProps extends ScrollViewProps{
  getData:(page:number,size:number,callBack:(datas:any)=>void)=>void;//加载数据回调 必传
  renderItem:(item:any,key:number)=>React.ReactNode;//渲染item 必传
  renderHeader?:()=>React.ReactNode;//渲染列表头 不传不展示
  renderEmpty?:()=>React.ReactNode;//渲染空数据 不传使用默认
  columns?:number;//展示几列
  gap?:number;//列间距
  pageSize?:number;//每页展示数据
  autoLoad?:boolean;//自动加载
}
