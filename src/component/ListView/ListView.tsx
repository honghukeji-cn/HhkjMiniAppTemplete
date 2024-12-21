import React, {useEffect, useState, forwardRef, useRef, useImperativeHandle} from 'react'
import {Image, ScrollView, Text, View} from "@tarojs/components";
import {ConfigProvider, Empty, Grid, InfiniteLoading, Loading} from "@nutui/nutui-react-taro";
import "./index.scss"
import ListViewProps from "../../props/ListViewProps";
import HttpResponseProps from "../../props/HttpResponseProps";
const ListView=(_props:ListViewProps,ref:any)=>{
  const {gap=5,columns=1,size=10}=_props;
  const [list,setList]=useState<any[]>([]);
   const [page,setPage]=useState<number>(1);
  const [hasMore,setHasMore]=useState<boolean>(true);
  const [refreshing,setRefreshing]=useState<boolean>(false);//正在刷新中
  const[loading,setLoading]=useState<boolean>(false);//是否正在刷新中
  const [sid,setSid]=useState<string | null>(null);//滚动到哪个地方
  useEffect(()=>{
    onRefresh();
  },[])
  const onRefresh=()=>{
    loadData(1)
  }
  const loadMore=()=>{
      if(!hasMore) return;
      loadData(page);
  }
  const loadData=(loadPage:number)=>{
    if(loadPage==1)
    {
      setRefreshing(true);
    }else{
      setLoading(true);
    }
    _props.getData(loadPage,size,(res:HttpResponseProps<any>)=>{
      if(loadPage==1)
      {
        setRefreshing(false);
      }else{
        setLoading(false);
      }
      if(res.code==1)
      {
        let datas=loadPage==1?res.data.datas:list.concat(res.data.datas);
        setList(datas);
        setPage(loadPage+1);
        setHasMore(datas.length<res.data.all)
      }else{
        setHasMore(false);
      }
    });
  }
  const scrollToItem=(index:number)=>{
      setSid("item"+index);
      setTimeout(()=>{
        setSid(null)
      },100)
  }
  const scrollToTop=()=>{
    scrollToItem(0);
  }
  const scrollToBottom=()=>{
    scrollToItem(list.length-1)
  }
  const renderLoading=()=>{
    return(
        <ConfigProvider theme={{ nutuiLoadingIconSize: '24px',nutuiLoadingIconColor:"#333" }}>
          <Loading  ><Text style={{color:"#333",fontSize:16}}>正在加载中</Text></Loading>
        </ConfigProvider>
    );
  }
  const renderNoMore=()=>{
    return(
      <Text style={{color:"#333",fontSize:16}}>没有更多了</Text>
    );
  }
  useImperativeHandle(ref,()=>({
    scrollToItem,scrollToTop,scrollToBottom,onRefresh
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
        onScrollToLower={loadMore}
        {..._props}
      >
        {_props.renderHeader&&_props.renderHeader()}
        {list.length==0 &&
        <Empty image={<Image src={require("../../imgs/NO_DATA.png")} /> } />
        }
        <Grid gap={gap} columns={columns} direction={"horizontal"} style={{flex:1}}>
          {list.map((item,key)=>(
            <Grid.Item key={key} id={"item"+key} className={"listViewItem"} >
              {_props.renderItem(item,key)}
            </Grid.Item>
          ))}
        </Grid>
        <view className={"footView"}>
          {loading && renderLoading()}
          {!hasMore && renderNoMore()}
        </view>
      </ScrollView>
  )
}

export default forwardRef(ListView);
