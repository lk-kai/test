<template>
  <el-dialog
    title="提示"
    :visible.sync="show"
    width="30%"
    :modal-append-to-body="false"
    :show-close="false"
  >
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: {
      require: true,
      typeof: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      dialogVisible: true
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },
    submit() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped></style>
