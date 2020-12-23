<template>
  <div class="list">
    <ul>
      <li v-for="(item, index) in list" :key="index" class="item" @click="select(item,index)">
        <div class="a">
          <h2>{{item.title}}</h2>
          <span :class="{'content':!item.selectIcon}">{{item.content}}</span>
          <span class="icon" :class="{'selectIcon':item.selectIcon}"></span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
  },
  created() {
    console.log(this.list)
    // setTimeout(() => {
    //   this.list.forEach(item => {
    //     this.$set(item, 'selectIcon', false)
    //   })
    // }, 1000)
  },
  methods: {
    select(item) {
      // if (!item.selectIcon) {
      //   this.$set(this.list, 'selectIcon', true)
      // }
      item.selectIcon = !item.selectIcon
    },
  },
}
</script>
<style >
.a {
  padding: 0 20px;
  position: relative;
}
h2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.icon {
  position: absolute;
  top: 10px;
  right: 10px;
  display: block;
  width: 8px;
  height: 8px;
  border: 1px solid red;
  border-bottom: transparent;
  border-left: transparent;
  transform: rotate(45deg);
  transition: all 0.2s;
}
.item {
  border: 1px solid #ccc;
  /* padding: 20px 0; */
  margin-bottom: 10px;
  margin: 10px;
  border-radius: 5px;
}
.content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  transition: all 0.2s;
}
.selectIcon {
  transform: rotate(135deg);
}
</style>