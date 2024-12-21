import React from "react";

export interface SectionListSourceProps<T>{
  title:string;//section的标题
  children:T[];//section的下属数据
}
type SectionListItemType="section"|"item";
export interface SectionListProps{
  getData:(callBack:(datas:SectionListSourceProps<any>[])=>void)=>void;//加载数据回调 必传
  renderItem:(item:any,index:number)=>React.ReactNode;//渲染item 必传
  renderSection:(section:any,index:number)=>React.ReactNode;//渲染section 必填
  renderHeader?:()=>React.ReactNode;//渲染列表头 不传不展示
  columns?:number;//展示几列
  gap?:number;//列间距
}
