<template>
  <div class='screen'>
    1
    {{ mediaStream }}
    <video ref='video' class='video' controls></video>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mediaStream: null,
      useBackCamera: true
    }
  },
  mounted() {
    this.getUserMedia()
  },

  methods: {
    getUserMedia() {
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia
      // 因为这样可能会覆盖已有的属性。这里我们只会在没有 getUserMedia 属性的时候添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // 首先，如果有 getUserMedia 的话，就获得它
          const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia
          // 一些浏览器根本没实现它 - 那么就返回一个 error 到 promise 的 reject 来保持一个统一的接口
          if (!getUserMedia) {
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser"),
            );
          }
          // 否则，为老的 navigator.getUserMedia 方法包裹一个 Promise
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        }
      }
      navigator.mediaDevices.getUserMedia({video: { facingMode: {exact: "environment"}} }).then(stream => {
        if (this.$refs.video.srcObject !== undefined) {
          this.$refs.video.srcObject = stream;
        } else if (window.videoEl.mozSrcObject!== undefined) {
          this.$refs.video.mozSrcObject = stream;
        } else if (window.URL.createObjectURL) {
          this.$refs.video.src = window.URL.createObjectURL(stream);
        } else if (window.webkitURL) {
          this.$refs.video.src = window.webkitURL.createObjectURL(stream);
        } else {
          this.$refs.video.src = stream;
        }
        this.$refs.video.playsInline = true;
        const playPromise = this.$refs.video.play();
        playPromise.catch();
        // video.onloadedmetadata = function () {
        //   video.play();
        // };
      }).catch(err => {
        alert(err.name + ": " + err.message)
        console.log(err)
      })

      }
  }
}
</script>
<style lang="stylus" scoped>
.screen {
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  .video {
    height 100%
  }
}
</style>
