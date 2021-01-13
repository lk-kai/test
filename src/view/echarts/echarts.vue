<template>
  <div class="wrap">
    <div ref="main" style="width: 100%;height:400px;"></div>
    <mt-button type="primary" @click.native="handleClick">default</mt-button>
    <el-button type="success" @click.native="handleClick2">成功按钮</el-button>
  </div>
</template>
<script>
import echarts from 'echarts'
import { Message } from 'element-ui'
export default {
  mounted() {
    this._getInit()
  },
  methods: {
    _getInit() {
      var myChart = echarts.init(this.$refs.main)
      var option = {
        title: {
          text: 'ECharts 入门示例',
        },
        tooltip: {},
        legend: {
          data: ['销量'],
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      }
      myChart.setOption(option)
    },
    handleClick() {
      this.$Toast('提示信息')
    },
    handleClick2() {
      Message('这是一条消息提示')
    },
  },
}
</script>
<style lang="stylus" scoped></style>