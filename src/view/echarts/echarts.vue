<template>
  <div class="wrap" ref="wrap">
    <div class="main">
      <ul>
        <li class="list-item" v-for="(item,index) in list " :key="index" data-type="0">
          <div
            class="list-box"
            @touchstart.capture="touchStart"
            @touchend.capture="touchEnd"
            @click="skip"
          >
            <img class="list-img" :src="item.imgUrl" alt />
            <div class="list-content">
              <p class="title">{{item.title}}</p>
              <p class="tips">{{item.tips}}</p>
              <p class="time">{{item.time}}</p>
            </div>
          </div>
          <div class="delete" @click="deleteItem" :data-index="index">删除</div>
        </li>
      </ul>
      <div ref="main" style="width: 100%;height:400px;"></div>
      <mt-button type="primary" @click.native="handleClick">default</mt-button>
      <el-button type="success" @click.native="handleClick2">成功按钮</el-button>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { Message } from 'element-ui'
import BetterScroll from 'better-scroll'

export default {
  data() {
    return {
      list: [
        {
          title: 'Chrome更新了',
          imgUrl: require('../../assets/images/Chrome.png'),
          tips: '不再支持Flash视频播放',
          time: '上午 8:30',
        },
        {
          title: '电影新资讯',
          imgUrl: require('../../assets/images/Sina.png'),
          tips: '电影《红海行动》上映以来票房暴涨，很多国人表示对国产电影有了新的改观',
          time: '上午 12:00',
        },
        {
          title: '聚焦两会·共筑中国梦',
          imgUrl: require('../../assets/images/video.png'),
          tips: '习近平代表的两会故事',
          time: '下午 17:45',
        },
        {
          title: '微信团队',
          imgUrl: require('../../assets/images/Wechat.png'),
          tips: '您的帐号有异常登录，如非本人操作，请及时修改密码',
          time: '昨天',
        },
      ],
      startX: 0,
      endX: 0,
    }
  },
  mounted() {
    this._getInit()
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrap) {
        return
      }
      this.scroll = new BetterScroll(this.$refs.wrap, {
        scrollY: true,
        click: true,
      })
    },
    skip() {
      if (this.checkSlide()) {
        this.restSlide()
      } else {
        alert('You click the slide!')
      }
    },
    //滑动开始
    touchStart(e) {
      // 记录初始位置
      this.startX = e.touches[0].clientX
      console.log(this.startX)
    },
    //滑动结束
    touchEnd(e) {
      // 当前滑动的父级元素
      let parentElement = e.currentTarget.parentElement
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX
      // 左滑
      if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
        this.restSlide()
        parentElement.dataset.type = 1
      }
      // 右滑
      if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
        this.restSlide()
        parentElement.dataset.type = 0
      }
      this.startX = 0
      this.endX = 0
    },
    //判断当前是否有滑块处于滑动状态
    checkSlide() {
      let listItems = document.querySelectorAll('.list-item')
      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].dataset.type == 1) {
          return true
        }
      }
      return false
    },
    //复位滑动状态
    restSlide() {
      let listItems = document.querySelectorAll('.list-item')
      // 复位
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].dataset.type = 0
      }
    },
    //删除
    deleteItem(e) {
      // 当前索引
      let index = e.currentTarget.dataset.index
      // 复位
      this.restSlide()
      // 删除
      this.list.splice(index, 1)
    },
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
<style scoped>
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.list-item {
  position: relative;
  height: 80px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.list-item[data-type='0'] {
  transform: translate3d(0, 0, 0);
}
.list-item[data-type='1'] {
  transform: translate3d(-100px, 0, 0);
}
.list-item:after {
  content: '';
  position: absolute;
  left: 10px;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.list-box {
  padding: 10px;
  background: #fff;
  display: flex;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 0;
}
.list-item .list-img {
  display: block;
  width: 50px;
  height: 50px;
}
.list-item .list-content {
  padding: 5px 0 5px 10px;
  position: relative;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
}
.list-item .title {
  display: block;
  color: #333;
  overflow: hidden;
  font-size: 15px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item .tips {
  display: block;
  overflow: hidden;
  font-size: 12px;
  color: #999;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item .time {
  display: block;
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 5px;
  color: #666;
}
.list-item .delete {
  width: 100px;
  height: 80px;
  background: #ff4949;
  font-size: 17px;
  color: #fff;
  text-align: center;
  line-height: 80px;
  position: absolute;
  top: 0;
  right: -100px;
}
</style>