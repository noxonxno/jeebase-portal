<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div>
    <div id="main" style="width: 100%;height: 400px;"></div>
    <div id="main1" style="width:100%;height: 300px"></div>
    <div id="myChart" style="width: 300px;height:300px"></div>
    <div id="myChart1" style="width:100%';height:300px"></div>
  </div>
</template>
<script>
import echarts from 'echarts'

// 引入饼状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
    name: '',
    data () {
       return {
       charts: '',
       opinion:['男','女'],
          opinionData:[
             {value:335, name:'男'},
             {value:310, name:'女'},
          ]
       }
     },
    methods:{
        drawPie(id){
            //初始化图表
            this.charts = echarts.init(document.getElementById(id))
            //设置图表元素
            this.charts.setOption({
              tooltip: {
                trigger: 'item',
              },
              legend: {
                orient: 'vertical',
                x: 'center',
                data:this.opinion
              },
              series: [
                {
                  name:'性别',
                  type:'pie',
                  radius:['50%','70%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                       show: false,
                       position: 'center'
                    },
                    emphasis: {
                       show: true,
                       textStyle: {
                         fontSize: '30',
                         fontWeight: 'blod'
                       }
                     }
                 },
                 labelLine: {
                    normal: {
                      show: false
                    }
                 },
                 data:this.opinionData
                }
               ]
            })
        },
        drawLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
          myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {
              
            },
            xAxis: {
              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              itemStyle:{//
              normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'blue'},
                            {offset: 0.5, color: '#44C0C1'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
            },
            label:{//label要加入normal才可生效,label即为x轴对应Y轴的值
                normal:{
                  show:true,  
                  color:'red',//设置渐变时候控制不到颜色，只能通过全局textStyle来控制
                  position:'top'
                }
            },
            barWidth: '40%',
            data:[10, 52, 200, 334, 390, 330]
            }]
          });
          let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
          myChart1.setOption({
            legend: {
              icon: 'rect',//形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
              itemWidth: 10,  // 设置宽度
              itemHeight: 4, // 设置高度
              itemGap: 24, // 设置间距
              data: ['温度', '湿度'],
              textStyle: {
                //文字样式
                color: '#c1dafc',
                fontSize: '12'
              },
              right: '50%',
              selectedMode: 'single'
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
            type: 'category',
            splitLine: {
              lineStyle: {
                color: '#29457e'
              }
            },
            axisLabel:{
              interval: 0
            },
            data: ['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h',
            '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h',
            '17h', '18h', '19h', '20h', '21h', '22h', '23h','24h']
            },
            yAxis: [
            {
              type: 'value',
              axisTick:{       //y轴刻度线
              show: false
              },
              name: '单位：(°C)',
              min: 0,
              max: 50,
              interval: 10,
              axisLabel: {
              formatter: '{value}'
              }
            }
            ],
            series: [
            {
              name: '温度',
              type: 'line',
              itemStyle : {  
                    normal : {  
                      lineStyle:{  
                        color:'#b1de6a'  
                      }  
                    }  
              }, 
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 23, 25, 21, 26, 20, 25, 36, 48, ]
            },
            {
              name: '湿度',
              type: 'line',
              itemStyle : {  
                    normal : {  
                      lineStyle:{  
                        color:'#4ab0ee'  
                      }  
                    }  
              }, 
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 54, 63]
            }
            ]
        });
		  },
      //初始化数据
      initData() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main1'));
        // 绘制图表
        myChart.setOption({
            title : {
                text: '某站点用户访问来源',//主标题
                subtext: '纯属虚构',//副标题
                x:'center',//x轴方向对齐方式
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                bottom: 'bottom',
                data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
      }
    },
    //调用
    //created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
    //mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
    mounted(){
       this.$nextTick(function() {
			      this.drawPie('main')
            this.drawLine();
            this.initData();
        })
    }
}
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>
