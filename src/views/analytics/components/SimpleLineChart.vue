<template>
  <div>
    <div :id="id" class="linechart" />
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'SimpleLineChart',
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    LineList: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      nameList: [], // 选项标题
      aveList: [], // 平均值
      uList: []// 得分
    }
  },
  created() {

  },
  mounted() {
    this.radarData()
    this.radarBtn()
  },
  methods: {
    radarData() {
      // 数据处理
      const arr = this.LineList
      this.aveList = arr.map(n => { return n.DivideScore })
      this.uList = arr.map(n => { return n.UserScore })
      this.nameList = arr.map(n => { return n.Name })
    },
    radarBtn() {
      const myChart = echarts.init(document.getElementById(this.id))
      const option = {
        xAxis: {
          type: 'category',
          data: this.nameList
        },
        yAxis: {
          type: 'value',
          max: 10,
          axisLabel: {
            formatter: '{value} 分'
          }
        },
        series: [
          {
            type: 'line',
            data: this.uList,
            color: '#326092',
            label: {
              show: true,
              fontSize: 16,
              position: 'top'
            },
            markLine: {
              itemStyle: {
                color: '#3dc6c8'
              },
              label: {
                fontSize: 16,
                formatter: '平均分',
                itemStyle: {
                  color: '#3dc6c8'
                },
                padding: [0, 0, 2.2, 0],
                position: 'end'
              },
              data: [
                [
                  {
                    name: '两点之间的线',
                    coord: [0, this.aveList[0]]
                  },
                  {
                    name: '两点之间的线',
                    coord: [4, this.aveList[0]]
                  }
                ]
              ]
            }
          }
        ]
      }
      myChart.setOption(option)
      // 让图表跟随屏幕自动的去适应
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    }
  }
}
</script>

<style scoped>
.radar{
  width:100%;
  height:100%;
  margin:0 auto;
}
</style>
