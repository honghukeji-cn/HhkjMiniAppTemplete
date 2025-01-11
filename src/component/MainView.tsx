import React, {forwardRef} from "react";
import {View, ViewProps} from "@tarojs/components";

const MainView=(_props:ViewProps,ref:any)=>{
  return(
      <View style={{width:"100vw",height:"100vh",background:"red",display:"flex",flexDirection:"column",overflowY:"hidden"}}  {..._props} />
  );
}

export default forwardRef(MainView);
