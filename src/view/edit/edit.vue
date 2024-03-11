<template>
  <div class="layout">
    <Layout>
      <!-- 头部 -->
      <Header style="height: 49px">
        <Menu mode="horizontal" theme="dark" active-name="1" style="height: 49px">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              Item 1
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              Item 3
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>
              Item 4
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout class="content">
        <!-- 侧边栏 -->
        <Sider hide-trigger :style="{ background: '#fff' }">
          <Menu theme="light" width="auto" accordion>
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                Item 1
              </template>
              <MenuItem name="1-1">Option 1</MenuItem>
              <MenuItem name="1-2">Option 2</MenuItem>
              <MenuItem name="1-3">Option 3</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{ padding: '0 0 0 24px' }">
          <!-- 面包屑 -->
          <Breadcrumb :style="{ margin: '24px 0' }">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <!-- 主体内容 -->
          <Content :style="{ padding: '24px', background: '#fff' }">
            <div class="title">
              <h3>新增会员编辑</h3>
              <Form :model="formItem" :label-width="100">
                <FormItem label="姓名">
                  <Input
                    v-model="formItem.userName"
                    placeholder="Enter something..."
                    class="input"
                  ></Input>
                </FormItem>
                <FormItem label="寄卖商编码" v-if="$route.query.from">
                  <Input
                    v-model="formItem.userId"
                    placeholder="Enter something..."
                    class="input"
                  ></Input>
                </FormItem>
                <FormItem label="角色">
                  <span>{{ formItem.roleName }}</span> </FormItem
                ><FormItem label="账户余额">
                  <span>￥0.00</span>
                </FormItem>
                <FormItem label="qq号">
                  <Input
                    v-model="formItem.qq"
                    placeholder="Enter something..."
                    class="input"
                  ></Input>
                </FormItem>
                <FormItem label="微信号">
                  <Input
                    v-model="formItem.wechat"
                    placeholder="Enter something..."
                    class="input"
                  ></Input>
                </FormItem>
                <FormItem label="手机号">
                  <Input
                    v-if="formItem.mobile1 && $route.params.row"
                    v-model="formItem.mobile1"
                    placeholder="Enter something..."
                    class="input"
                    disabled
                  ></Input
                  ><Input
                    v-else
                    v-model="formItem.mobile1"
                    placeholder="Enter something..."
                    class="input"
                  ></Input>
                </FormItem>
                <FormItem label="优惠折扣" v-if="$route.query.from">
                  <Input
                    v-model="formItem.comments"
                    placeholder="Enter something..."
                    class="in"
                  ></Input
                  >%
                </FormItem>
                <FormItem label="支付密码">
                  <span style="color: red"
                    >支付初始密码和重置后的密码为：12345678</span
                  > </FormItem
                ><FormItem label="登录密码">
                  <span style="color: red">登录初始密码和重置后的密码为：12345678</span>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="handleSubmit()" v-if="formItem.mobile1"
                    >提交</Button
                  >
                  <Button type="primary" @click="handleSubmit()" disabled v-else
                    >提交</Button
                  >
                  <Button @click="handleCal()">取消</Button>
                </FormItem>
              </Form>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import { add, edit } from "@/api";
export default {
  data() {
    return {
      formItem: {
        address: "",
        availableAmount: 0,
        comments: this.$route.query.from ? "67.32" : "",
        createDate: "",
        creator: "",
        id: "",
        mobile1: "",
        qq: "",
        roleId: "",
        roleName: this.$route.query.from ? "寄卖商" : "分销商",
        status: "",
        switch: "",
        userId: "",
        userName: "",
        userinfoId: "",
        wechat: "",
      },
    };
  },
  created() {
    setTimeout(() => {
      if (this.$route.params.row) {
        this.formItem = this.$route.params.row;
      }
      console.log(this.$route);
    }, 100);
  },
  methods: {
    handleSubmit() {
      if (this.$route.params.row) {
        edit({
          ...this.formItem,
        })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        add({
          ...this.formItem,
        })
          .then((result) => {
            console.log(result.data.result);
            if (result.data.result == "success") {
              console.log(result);
              this.$router.push("/home1");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    handleCal() {
      this.$router.go(-1);
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.row = to.params.row
  //   })
  // }
};
</script>
<style scoped>
.ivu-form-item >>> .ivu-form-item-content {
  margin-left: 100px !important;
}
.ivu-input-wrapper {
  width: 500px !important;
}
.ivu-form-item >>> .ivu-input-wrapper .in {
  width: 100px !important;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
  height: 100%;
}
.line {
  margin-right: 5px;
  cursor: pointer;
  color: #5cadff;
}
.line:hover {
  color: #2d8cf0;
}
.layout-nav li {
  height: 49px;
  line-height: 49px;
}
.content {
  position: absolute;
  top: 49px;
  bottom: 0;
  left: 0;
  right: 0;
}
.ivu-menu-vertical.ivu-menu-light:after {
  content: "";
  display: block;
  width: 0px;
  height: 100%;
  background: #dcdee2;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
}
.ivu-layout >>> .ivu-table-cell {
  padding: 0;
}
h1 {
  color: #4c4f53 !important;
  font-size: 24px;
  font-weight: 300;
}
.button {
  margin-right: 5px;
}

/* .ivu-layout >>> .ivu-table-body {
  padding: 0;
  font-size: 12px;
  height: 33px !important;
  line-height: 33px;
}
.ivu-layout >>> .ivu-table-header{
  padding: 0!important;
  font-size: 12px;
  height: 33px !important;
  line-height: 33px;
} */
.ivu-table td {
  height: 35px;
}
</style>
