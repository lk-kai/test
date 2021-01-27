<template>
  <div>
    <div class="tab">
      <div
        class="tab-item"
        ref="label"
        v-for="(item, index) in tabsList"
        :key="index"
        @click="tabclick(index,item)"
      >
        <span :class="{active:item.active}">{{item.name}}</span>
      </div>
      <!-- 下划线 -->
      <div class="tabs-active-bar" :style="{width:lineWidth+'px',left:lineLeftWidth+'px'}"></div>
    </div>
    <transition :name="transtionname">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <button @click="next()">echarts</button>
  </div>
</template>
<script>
import $ from 'jquery'
var that
export default {
  created() {
    that = this
  },
  mounted() {
    $('#btn').on('click', () => {
      console.log('jquery引入成功')
    })
    this.getWidth()
    window.addEventListener('resize', () => {
      this.getWidth()
    })
  },
  data() {
    return {
      transtionname: '',
      text: '拉萨解放了是就',
      text1: 'aaaa',
      tabsList: [
        {
          name: '列表1',
          active: true,
          url: '/home/list1',
        },
        {
          name: '列表2',
          active: false,
          url: '/home/list2',
        },
      ],
      lineWidth: 0,
      lineLeftWidth: 0,
    }
  },
  methods: {
    getWidth() {
      const url = this.$route.path
      let index = null
      this.tabsList.forEach((item, i) => {
        if (item.url == url) {
          index = i
        }
        item.active = false
      })
      this.tabsList[index].active = true
      this.lineWidth = this.$refs.label[index].childNodes[0].offsetWidth
      this.lineLeftWidth = this.$refs.label[index].childNodes[0].offsetLeft
    },
    tabclick(index, item) {
      this.lineWidth = this.$refs.label[index].childNodes[0].offsetWidth
      this.lineLeftWidth = this.$refs.label[index].childNodes[0].offsetLeft
      this.tabsList.forEach((element) => {
        element.active = false
      })
      this.tabsList[index].active = true
      this.$router.push(item.url)
    },
    next() {
      // 传参 不在路由配置找不到页面
      this.$router.push('/echarts')
      // this.$router.push(`/echarts/2`)
      // this.$router.push({
      //   path: '/echarts',
      //   query: {
      //     id: 1,
      //     name: '张三',
      //   },
      // })
      // this.$router.push({
      //   name: 'Echarts',
      //   params: {
      //     id: 1,
      //     name: '张三',
      //   },
      // })
    },
  },
  filters: {
    capitalize: function () {
      // console.log(this)

      return that.text1
      // if (!value) return ''
      // value = value.toString()
      // return value.charAt(0).toUpperCase() + value.slice(1)
      // console.log(this)
    },
  },
  watch: {
    $route(to, from) {
      // console.log(to.meta.index)
      // console.log(from.meta.index)
      // const fromIndex = from.mata.index
      this.transtionname = to.meta.index < from.meta.index ? 'fade_right' : 'fade_left'
      // console.log(this.$route)
      // this.tabclick(to)
    },
  },
}
</script>

<style scoped>
.fade_right-enter-active,
.fade_right-leave-active,
.fade_left-enter-active,
.fade_left-leave-active {
  width: 100%;
  position: absolute;
  transition: all 0.5s;
}
.fade_left-enter {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}
.fade_left-leave-active {
  transform: translate3d(-100%, 0, 0);
  opacity: 0;
}
.fade_right-enter {
  transform: translate3d(-100%, 0, 0);
  opacity: 0;
}
.fade_right-leave-active {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}
* {
  margin: 0;
  padding: 0;
}
span {
  margin: 0;
  padding: 0;
}
.tab {
  display: flex;
  position: relative;
  margin-bottom: 20px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
}
.tab-item {
  flex: 1;
  text-align: center;
}
.active {
  color: #409eff;
}
.tabs-active-bar {
  position: absolute;
  /* left: 0; */
  bottom: 0;
  /* width: 56px; */
  height: 2px;
  /* margin-left: 4px; */
  /* transform: translateX(0px); */
  /* box-sizing: border-box; */
  background-color: #409eff;
  z-index: 1;
  transition: all 0.3s;
}
button {
  position: fixed;
  bottom: 20px;
  right: 10px;
  border: 0;
  width: 100px;
  height: 30px;
  font-size: 18px;
  background-color: #409eff;
  color: #fff;
  opacity: 0.6;
  border-radius: 5px;
  cursor: pointer;
}
</style>
