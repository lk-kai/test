<template>
  <div class="slide-banner" v-if="banner.length">
    <div class="banner-wrapper">
      <div class="slide-banner-wrapper" ref="slide">
        <div class="slide-banner-content">
          <div v-for="(item,index) in banner" class="slide-page" :key="index">
            <img :src="item.picUrl" alt />
          </div>
        </div>
      </div>
      <div class="dots-wrapper">
        <span
          class="dot"
          v-for="(item, index) in banner"
          :key="index"
          :class="{'active': currentPageIndex ===index}"
        ></span>
      </div>
    </div>
    <div class="btn-wrap">
      <button class="next" @click="nextPage">nextPage</button>
      <button class="prev" @click="prePage">prePage</button>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { getRecommend } from '../../api/index'
export default {
  data() {
    return {
      banner: [],
      currentPageIndex: 0,
    }
  },
  created() {
    this._getRecommend()
  },
  mounted() {
    // this.$nextTick(() => {
    //   console.log(this.$refs.slide.children[0], this.banner)
    //   //   this.init()
    // })
  },
  beforeDestroy() {
    this.slide.destroy()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        const { code, data } = res
        if (code === 0) {
          this.banner = data.slider
          this.$nextTick(() => {
            this.init()
          })
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
        probeType: 3,
      })
      this.slide.on('scrollEnd', this._onScrollEnd)
      this.slide.on('slideWillChange', (page) => {
        this.currentPageIndex = page.pageX
      })
    },
    _onScrollEnd() {
      console.log('CurrentPage => ', this.slide.getCurrentPage())
    },
    nextPage() {
      this.slide.next()
    },
    prePage() {
      this.slide.prev()
    },
  },
}
</script>
<style lang="stylus" scoped>
.slide-banner
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
</style>
  