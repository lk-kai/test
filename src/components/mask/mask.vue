<template>
  <transition name="move">
    <div class="wrap" v-show="mark" @touchmove.stop @click.stop="hide">
      <div class="content" @click.stop>
        优惠折扣: <input type="text" v-model="comments" />%
        <button @click="sub">确定</button>
        <span>11111</span>
        <span>11111</span>
        <span>11111</span>
        <span>11111</span>
        <span>11111</span>
        <span>11111</span>
        <span>11111</span>
        {{ item.title }}
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      mark: false,
<<<<<<< Updated upstream
      comments: ''
=======
      item: {}
>>>>>>> Stashed changes
    }
  },
  methods: {
    show() {
      this.mark = true
    },
    hide() {
      this.mark = false
<<<<<<< Updated upstream
    },
    sub() {
      this.$emit('sub', this.comments)
=======
>>>>>>> Stashed changes
    }
  }
}
</script>
<style lang="stylus" scoped>
.move-enter-active, .move-leave-active
  transition: all 0.1s
.move-enter, .move-leave-to
  transform: translateX(100%)
.wrap
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(0, 0, 0, 0.3)
  z-index: 1100
  .content
    position: absolute
    top: 0
    left: 60px
    right: 0
    bottom: 0
    height: 100%
    background-color: #fff
    span
      display: block
</style>
