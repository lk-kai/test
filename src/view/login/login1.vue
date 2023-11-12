<template>
  <div>
    <el-upload
      action="#"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
    >
      <video v-if='videoUrl' :src='videoUrl'></video>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>

</template>

<script>
import { cutFile } from './utils'
export default {
  data() {
    return {
      videoUrl: ''
    }
  },
  methods: {
    async beforeAvatarUpload(file) {
      console.log(file)
      const hashList = await cutFile(file)
      console.log(hashList)
    }
  }
}
</script>
<style scoped>
>>> .el-upload {
  margin-left: 20px;
  width: 200px;
  height: 200px;
  text-align: center;
  font-size: 30px;
  line-height: 200px;
  background: #ccc;
}
</style>
