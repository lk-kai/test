<template>
  <div class="wrap">
    <div class="login">
      <countTo :startVal="0" :endVal="endVal || 0" :duration="700"></countTo>
      <Input
        v-model="accountId"
        placeholder="Enter username..."
        style="width:300px;margin-bottom:20px"
      />
      <Input
        v-model="credentials"
        type="password"
        password
        placeholder="Enter
      password..."
        style="width:300px;margin-bottom:30px"
      />
      <Button type="success" style="width:300px" @click="submit">SUBMIT</Button>
    </div>
    <tip :show.sync="show"></tip>
  </div>
</template>
<script>
// import { login } from '@/api'
import countTo from 'vue-count-to'
import tip from '../../components/dialog/dialog.vue'
export default {
  data() {
    return {
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
  },
  methods: {
    submit() {
      this.show = true
      // login({
      //   accountId: this.accountId,
      //   credentials: this.credentials
      // })
      //   .then(res => {
      //     // console.log(res)
      //     if (res.status == '200') {
      //       window.localStorage.setItem('token', res.data.token)
      //       // window.localStorage.setItem('t1n', 1)
      //       this.$router.push('/home1')
      //     }
      //   })
      //   .catch(err => {
      //     err
      //   })
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
