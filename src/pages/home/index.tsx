import React, {useRef, useState} from 'react'
import SectionListView from "../../component/ListView/SectionListView";
import {View} from "@tarojs/components";
import dataList from "../index/data";
import {Button} from "@nutui/nutui-react-taro";
function Index() {
  const listRef=useRef(null);
  const renderHeader=()=>{
    return(
      <View onClick={()=>{
      }} style={{height:300,background:"orange"}}>
        <Button onClick={()=>{
          console.log(listRef.current)
          listRef.current.scrollToSection(3)
        }}>滚动到Section3</Button>
        <Button onClick={()=>{
          console.log(listRef.current)
          listRef.current.scrollToItem(0,1)
        }}>滚动到S0I1</Button>
        <Button onClick={()=>{
          listRef.current.scrollToTop();
        }}>滚动到顶部</Button>
        <Button onClick={()=>{
          listRef.current.scrollToBottom();
        }}>滚动到底部</Button>
      </View>
    );
  }
  const renderSection=(section,index)=>{
    return(
      <View style={{height:50,background:"#ccc"}}>
        Section{index}
      </View>
    );
  }
  const renderItem = (data: any, index: number) => {
    return(
      <View style={{height:200,background:"red"}}>
        Item{index}
      </View>
    );
  }
  const getData=(callback)=>{
    setTimeout(()=>{
      console.log(dataList)
      callback(dataList)
    },1000)
  }
  return (
      <SectionListView
        ref={listRef}
        renderHeader={renderHeader}
        renderItem={renderItem}
        renderSection={renderSection}
        getData={getData}
        columns={2}
      />
  )
}

export default Index
