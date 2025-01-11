import React, {useEffect, useState, forwardRef, useRef, useImperativeHandle} from 'react'
import {Image, ScrollView, View} from "@tarojs/components";
import { Empty, Grid} from "@nutui/nutui-react-taro";
import "./index.scss"
import {SectionListProps} from "../../props/SectionListDataProps";
import Taro from "@tarojs/taro";
const ListView=(_props:SectionListProps,ref:any)=>{
  const {gap=5,columns=1}=_props;
  const [list,setList]=useState<any[]>([]);
  const [refreshing,setRefreshing]=useState<boolean>(false);//是否正在刷新中
  const [sid,setSid]=useState<string | null>(null);//滚动到哪个地方
  const [width,setWidth]=useState<number>(0)
  useEffect(()=>{
    setWidth(Taro.getSystemInfoSync().windowWidth)
    console.log(Taro.getSystemInfoSync().windowWidth,"getSystemInfoSync")
    onRefresh();
  },[])
  const onRefresh=()=>{
    setRefreshing(true);
    _props.getData((datas)=>{
      setRefreshing(false);
      setList(datas);

    })
  }
  /**
   * 滚动到指定section的某个item
   * @param section
   * @param index
   */
  const scrollToItem=(section:number,index:number)=>{
    setSid("section"+section+"item"+index);
    setTimeout(()=>{
      setSid(null)
    },100)
  }
  /**
   * 滚动到指定section
   * @param section
   */
  const scrollToSection=(section:number)=>{
      setSid("section"+section);
      setTimeout(()=>{
        setSid(null)
      },100)
  }
  /**
   * 滚动到第一个section
   */
  const scrollToTop=()=>{
    scrollToSection(0);
  }
  /**
   * 滚动到最后一个section
   */
  const scrollToBottom=()=>{
    scrollToSection(list.length-1)
  }
  useImperativeHandle(ref,()=>({
    scrollToSection,scrollToItem,scrollToTop,scrollToBottom,onRefresh
  }))
  return (
    <ScrollView
      scrollIntoView={sid}
      refresherEnabled={true}
      scrollWithAnimation={true}
      style={{flex:1}}
      enableFlex={true}
      scrollY={true}
      enhanced={true}
      usingSticky={true}
      refresherTriggered={refreshing}
      onRefresherRefresh={onRefresh}
      {..._props}
    >
      {_props.renderHeader?_props.renderHeader():null}
      {list.length==0 &&
      <Empty image={<Image src={require("../../imgs/NO_DATA.png")} /> } />
      }
      {list.map((section,index)=>{
        return(
          <>
            <View  id={"section"+index}>{_props.renderSection(section,index)}</View>
            {section.children.length==0 &&
              <Empty style={{width:width-gap*2,marginLeft:gap,marginRight:gap}} image={<Image src={require("../../imgs/NO_DATA.png")} /> } />
            }
            {section.children.length>0 &&
            <Grid gap={gap} columns={columns} direction={"horizontal"} style={{flex:1}}>

              {section.children.map((item,key)=>(
                <Grid.Item  id={"section"+index+"item"+key} className={"listViewItem"} >
                  {_props.renderItem(item,key)}
                </Grid.Item>
              ))}
            </Grid>
            }
          </>
        );
      })}
    </ScrollView>
  )
}

export default forwardRef(ListView);
