<template>
  <div class="wrap">
    <div class="login">
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
  </div>
</template>
<script>
import { login } from '@/api'
export default {
  data() {
    return {
      accountId: 'admin',
      credentials: '12345678'
    }
  },
  methods: {
    submit() {
      login({
        accountId: this.accountId,
        credentials: this.credentials
      })
        .then((res) => {
          // console.log(res)
          if (res.status == '200') {
            window.localStorage.setItem('token', res.data.token)
            // window.localStorage.setItem('t1n', 1)
            this.$router.push('/home1')
          }
        })
        .catch((err) => {
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
