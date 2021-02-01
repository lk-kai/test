<template>
  <div class="slide-banner">
    <div class="banner-wrapper">
      <div class="slide-banner-wrapper" ref="slide">
        <div class="slide-banner-content">
          <div v-for="url in urls" class="slide-page" :key="url">
            <img :src="url" alt />
          </div>
        </div>
      </div>
      <div class="dots-wrapper">
        <span
          class="dot"
          v-for="(item, index) in urls"
          :key="item"
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
export default {
  data() {
    return {
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
      ],
      nums: 4,
      currentPageIndex: 0,
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.slide.destroy()
  },
  methods: {
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
  