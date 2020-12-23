<template>
  <div id="app">
    <div class="tab">
      <div
        class="tab-item"
        ref="label"
        v-for="(item, index) in tabsList"
        :key="index"
        @click="tabclick(index)"
      >
        <span :class="{active:item.active}">{{item.name}}</span>
      </div>
      <!-- 下划线 -->
      <div class="tabs-active-bar" :style="{width:lineWidth+'px',left:lineLeftWidth+'px'}"></div>
    </div>
    <!-- <mt-button type="primary" id="btn">primary</mt-button> -->
    <!-- <p>{{text | capitalize}}</p> -->
    <List :list="list" @pull="pull" ref="list"></List>
  </div>
</template>
<script>
import List from './components/list/list'
import axios from 'axios'
import $ from 'jquery'
var that
export default {
  name: 'App',
  components: {
    List,
  },
  created() {
    that = this
    this._getList()
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
      list: [],
      text: '拉萨解放了是就',
      text1: 'aaaa',
      tabsList: [
        {
          name: '首页',
          active: true,
        },
        {
          name: '评论',
          active: false,
        },
        {
          name: '我的商家',
          active: false,
        },
      ],
      lineWidth: 0,
      lineLeftWidth: 0,
    }
  },
  methods: {
    _getList() {
      axios.get('/api/list').then((res) => {
        if (res.data.code === 0) {
          let data = res.data.data
          // this.list = res.data.data
          data.forEach((item) => {
            item.selectIcon = false
          })
          this.list = data
        }
      })
    },
    pull() {
      // 模拟接口
      setTimeout(() => {
        this._getList()
      }, 1000)
    },
    getWidth() {
      this.lineWidth = this.$refs.label[0].childNodes[0].offsetWidth
      this.lineLeftWidth = this.$refs.label[0].childNodes[0].offsetLeft
    },
    tabclick(index) {
      this.lineWidth = this.$refs.label[index].childNodes[0].offsetWidth
      this.lineLeftWidth = this.$refs.label[index].childNodes[0].offsetLeft
      this.tabsList.forEach((element) => {
        element.active = false
      })
      this.tabsList[index].active = true
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
}
</script>

<style>
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
</style>
