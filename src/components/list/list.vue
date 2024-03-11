<template>
  <div class="list" ref="wrapper">
    <ul>
      <p>{{ text }}</p>
      <li
        v-for="(item, index) in list"
        :key="index"
        class="item"
        @click="select(item, index)"
        ref="lists"
      >
        <div class="a">
          <h2>{{ item.title }}</h2>
          <span :class="{ content: !item.selectIcon }">{{ item.content }}</span>
          <span class="icon" :class="{ selectIcon: item.selectIcon }"></span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import BetterScroll from 'better-scroll'
window.addEventListener('resize', () => {
  console.log(1)
})
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  created() {
    console.log(this.list)
    // setTimeout(() => {
    //   this.list.forEach(item => {
    //     this.$set(item, 'selectIcon', false)
    //   })
    // }, 1000)
  },
  mounted() {
    // setTimeout(() => {
      this.initScroll()
      console.log(this.$refs.lists[0])
      console.log(this.listsHeight())
    // }, 20)
  },
  data() {
    return {
      text: '下拉刷新'
    }
  },
  methods: {
    listsHeight() {
      let heights = []
      let height = 0
      heights.push(height)
      for (let index = 0; index < this.$refs.lists.length; index++) {
        const element = this.$refs.lists[index]
        height += element.clientHeight
        heights.push(height)
      }
      return heights
    },
    select(item) {
      // if (!item.selectIcon) {
      //   this.$set(this.list, 'selectIcon', true)
      // }
      item.selectIcon = !item.selectIcon
      this.$nextTick(() => {
        this.scroll.refresh()
      })
      this.$emit('a', item)
    },
    initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BetterScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true,
        pullDownRefresh: {
          threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
          stop: 50 // 刷新数据的过程中，回弹停留在距离顶部还有 50px 的位置
        }
      })
      this.scroll.on('pullingDown', () => {
        this.scroll.scrollTo(0, 50, 100)
        this.text = '正在刷新'
        this.$emit('pull')
      })
      this.scroll.on('scroll', pos => {
        // console.log(pos.y)
        if (pos.y > 50) {
          this.text = '释放立即刷新'
        } else if (pos.y < 50) {
          this.text = '下拉刷新'
        } else if (pos.y === 50) {
          this.text = '正在刷新'
        }
      })
    },
    finishPullDown() {
      this.scroll&&this.scroll.finishPullDown()
    }
  },
  watch: {
    list() {
      this.text = '刷新成功'
      setTimeout(() => {
        // 在刷新数据完成之后，调用 finishPullDown 方法，回弹到顶部
        this.scroll&&this.scroll.scrollTo(0, 0, 100)
        this.finishPullDown()
      }, 600)
      setTimeout(() => {
        this.text = '下拉刷新'
        this.scroll&&this.scroll.refresh()
      }, 750)
      this.$nextTick(() => {
        this.scroll&&this.scroll.refresh()
      })
    }
  }
}
</script>
<style scoped>
.a {
  padding: 0 20px;
  position: relative;
}
h2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.icon {
  position: absolute;
  top: 10px;
  right: 10px;
  display: block;
  width: 8px;
  height: 8px;
  border: 1px solid red;
  border-bottom: transparent;
  border-left: transparent;
  transform: rotate(45deg);
  transition: all 0.2s;
}
.item {
  border: 1px solid #ccc;
  /* padding: 20px 0; */
  margin: 10px;
  border-radius: 5px;
}
.content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  transition: all 0.5s;
}
.selectIcon {
  transform: rotate(135deg);
}
.list {
  /* 解决切换动画时有滚动条  */
  position: fixed;
  top: 60px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
}
p {
  position: absolute;
  top: -40px;
  text-align: center;
  width: 100%;
}
ul {
  position: relative;
}
</style>
