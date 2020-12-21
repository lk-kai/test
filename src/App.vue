<template>
  <div id="app">
    <mt-button type="primary" id="btn">primary</mt-button>
    <p>{{text | capitalize}}</p>
    <List :list="list"></List>
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
      console.log('已经jquery引入成功')
      console.log('测试一222222')
      console.log('测试二')
      console.log('测试四')
    })
  },
  data() {
    return {
      list: [],
      text: '拉萨解放了是就',
      text1: 'aaaa',
    }
  },
  methods: {
    _getList() {
      axios.get('/api/list').then((res) => {
        if (res.data.code === 0) {
          this.list = res.data.data
        }
      })
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
</style>
