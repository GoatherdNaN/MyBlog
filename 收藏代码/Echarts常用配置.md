
```
const option = {
  //添加鼠标移入数据提示框
  tooltip : {
      trigger: 'axis',
      axisPointer: {
          type: 'cross',
          label: {
              backgroundColor: '#6a7985'
          }
      }
  },
  //移动图表的位置
  grid:{
      x:60,
      x2:50,
      y:26,
      y2:40
  },
  xAxis: {
      name:'时间',
      type: 'category',
      boundaryGap: false,
      splitLine:{
          show:true
      },
      data: xAxisData
  },
  yAxis: {
    name:btnText,
    min:'dataMin',
    max:'dataMax'
  },
  series: [
    {
      name:`${name}${btnText}`,
      type:'line',
      stack: '价格',
      smooth:true,
      areaStyle: {normal: {
        color: 'rgba(241,250,250,0.9)'
      }},
      symbol:'circle',//拐点类型
      symbolSize: 14,//拐点大小
      itemStyle : {
          normal : {
            //拐点样式
            color:'#8FD7D4',
            borderColor:'#fff',
            borderWidth:4,
            borderType:'solid',
            //折线样式
            lineStyle:{
                width:6,//折线宽度
                color:"#D8EBE9"//折线颜色
            }
          }
      },
      data:seriesData
    }
  ]

};
```
