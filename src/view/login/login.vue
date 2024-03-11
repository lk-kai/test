<template>
  <div class="wrap">
    <el-upload
      ref='upload'
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div class="login">
      <countTo :startVal="0" :endVal="endVal || 0" :duration="700"></countTo>
      <Input
        v-model="accountId"
        placeholder="Enter username..."
        style="width:300px;margin-bottom:20px"
        @input='val=>a(val,1)'
      />
      <Input
        v-model="credentials"
        type="password"
        password
        placeholder="Enter
      password..."
        style="width:300px;margin-bottom:30px"
      />
      <Button type="success" style="width:300px" @click="submit">SUBMIT2222233399</Button>
    </div>
    <tip :show.sync="show"></tip>
  </div>
</template>
<script>
import { login } from '@/api'
import countTo from 'vue-count-to'
import tip from '../../components/dialog/dialog.vue'
import axios from 'axios'
export default {
  data() {
    return {
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      // startVal: 0,
      endVal: 0,
      accountId: 'admin',
      credentials: 'a',
      show: false
    }
  },
  components: {
    tip,
    countTo
  },
  created() {
    setTimeout(() => {
      this.endVal = 9837
    }, 50)
    axios.post('http://www.51bijiawang.cn:9666/admin/user/loginByPwd',{
      device:'device_web',
      token:null,
      params:{
        username:'admin',
        password:'a123123'
      }
    }).then(res=>{
      console.log(res)
    })
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    a(val,num) {
      console.log(val,num)
      this.val = 0
    },
    submit() {
      this.$refs.upload.$refs['upload-inner'].handleClick()
      console.log( this.$refs.upload)
      this.show = true
      login({
        accountId: this.accountId,
        credentials: this.credentials
      })
        .then(res => {
          // console.log(res)
          if (res.status == '200') {
            window.localStorage.setItem('token', res.data.token)
            // window.localStorage.setItem('t1n', 1)
            this.$router.push('/home1')
          }
        })
        .catch(err => {
          err
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrap
  width 100%
  height 100%
  background-color #ccc
  .login
    display flex
    flex-flow column
    justify-content center
    align-items center
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
</style>
