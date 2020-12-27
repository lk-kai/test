<template>
  <List :list="list" @pull="pull" ref="list"></List>
</template>
<script>
import List from '../../components/list/list'
import { getList2 } from '../../api'

export default {
  data() {
    return {
      list: [],
    }
  },
  components: {
    List,
  },
  created() {
    this._getList()
  },
  methods: {
    _getList() {
      getList2()
        .then((res) => {
          let data = res
          data.forEach((item) => {
            item.selectIcon = false
          })
          this.list = data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    pull() {
      // 模拟接口
      setTimeout(() => {
        this._getList()
      }, 1000)
    },
  },
}
</script>
<style lang="">
</style>