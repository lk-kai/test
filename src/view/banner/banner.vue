<template>
  <div class="wrap" ref="a">
    <div class="slide-banner" v-if="banner.length">
      <div class="banner-wrapper">
        <div class="slide-banner-wrapper" ref="slide">
          <div class="slide-banner-content">
            <div
              v-for="(item, index) in banner"
              class="slide-page"
              :key="index"
            >
              <img :src="item.picUrl" alt />
            </div>
          </div>
        </div>
        <div class="dots-wrapper">
          <span
            class="dot"
            v-for="(item, index) in banner"
            :key="index"
            :class="{ active: currentPageIndex === index }"
          ></span>
        </div>
      </div>
      <div class="btn-wrap">
        <button class="next" @click="nextPage">nextPage</button>
        <button class="prev" @click="prePage">prePage</button>
      </div>
    </div>
    <div class="mouse-wheel-vertical-scroll">
      <div class="mouse-wheel-wrapper" ref="scroll">
        <div class="mouse-wheel-content">
          <div class="mouse-wheel-item" v-for="n in 100" :key="n">{{ n }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { getRecommend } from '../../api/index'
import screenfull from 'screenfull'
export default {
  data() {
    return {
      banner: [],
      currentPageIndex: 0
    }
  },
  created() {
    this._getRecommend()
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
      this.init2()
    })
  },
  beforeDestroy() {
    this.slide.destroy()
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.banner = data.slider
        }
      })
    },
    init() {
      this.slide = new BScroll(this.$refs.slide, {
        scrollX: true,
        scrollY: false,
        slide: true,
        momentum: false,
        bounce: false,
        probeType: 3
      })
      this.slide.on('scrollEnd', this._onScrollEnd)
      this.slide.on('slideWillChange', page => {
        this.currentPageIndex = page.pageX
      })
    },
    init2() {
      this.scroll = new BScroll(this.$refs.scroll, {
        mouseWheel: true
      })
    },
    _onScrollEnd() {
      console.log('CurrentPage => ', this.slide.getCurrentPage())
    },
    nextPage() {
      const ele = document.getElementsByClassName('slide-banner')
      console.log(ele);
      // this.slide.next()
      screenfull.toggle(ele[0])
    },
    prePage() {
      this.slide.prev()
    }
  }
}
</script>
<style lang="stylus" scoped>
.wrap {
  background: #ccc
}
.slide-banner
  margin-bottom: 200px
  .banner-wrapper
    position: relative
  .slide-banner-wrapper
    min-height: 1px
    overflow: hidden
  .slide-banner-content
    height: 200px
    white-space: nowrap
    font-size: 0
    .slide-page
      display: inline-block
      height: 200px
      width: 100%
      img
        height: 100%
        width: 100%
  .dots-wrapper
    position: absolute
    bottom: 4px
    left: 50%
    transform: translateX(-50%)
    .dot
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background: #eee
      &.active
        width: 20px
        border-radius: 5px
  .btn-wrap
    margin-top: 20px
    display: flex
    justify-content: center
    button
      margin: 0 10px
      padding: 10px
      color: #fff
      border-radius: 4px
      background-color: #666
.mouse-wheel-vertical-scroll
  .mouse-wheel-wrapper
    position: absolute
    top: 400px
    bottom: 0
    left: 0
    right: 0
    overflow: hidden
    .mouse-wheel-item
      height: 50px
      line-height: 50px
      font-size: 20px
      font-weight: bold
      text-align: center
      &:nth-child(2n)
        background-color: #C3D899
      &:nth-child(2n+1)
        background-color: #F2D4A7
</style>
