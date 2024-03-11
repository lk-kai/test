<template>
  <div>
    <List v-if="list.length" :list="list" @pull="pull" ref="list" @a="a"></List>
    <Mark ref="mark"></Mark>
  </div>
</template>
<script>
import List from '../../components/list/list'
import Mark from '../../components/mask/mask'

import { getList1 } from '../../api'

export default {
  data() {
    return {
      list: []
    }
  },
  components: {
    List,
    Mark
  },
  created() {
    this._getList()
  },
  methods: {
    // a(item) {
    //   console.log(item)
    //   this.$refs.mark.item = item
    //   this.$refs.mark.show()
    // },
    _getList() {
      getList1()
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
    }
  }
}
</script>
<style lang="" scoped></style>
