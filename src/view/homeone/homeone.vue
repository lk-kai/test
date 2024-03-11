<template>
  <div class="layout">
    <Layout>
      <!-- 头部 -->
      <Header style="height: 49px">
        <Menu
          mode="horizontal"
          theme="dark"
          active-name="1"
          style="height: 49px"
        >
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
            <Row style="height:66px;line:height:66px" class="row1">
              <Col :xs="24" :sm="24" :md="12" :lg="16"><h1>会员列表</h1></Col>
              <Col :xs="24" :sm="24" :md="12" :lg="8"
                ><Button type="primary" class="button" @click="addsell"
                  >新增寄卖商</Button
                ><Button type="primary" class="button" @click="a"
                  >新增分销商</Button
                >
                <Button type="primary" class="button">导出Excel</Button></Col
              >
            </Row>
            <Row :gutter="10">
              <Col span=""
                ><Input
                  v-model="mobile1"
                  placeholder="手机号查询"
                  style="width: 218px"
              /></Col>
              <Col span="">
                <Input
                  v-model="userName"
                  placeholder="姓名查询"
                  style="width: 218px"
              /></Col>
              <Col span="">
                <Select v-model="roleId" style="width: 218px">
                  <Option
                    v-for="item in cityList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</Option
                  >
                </Select>
              </Col>
            </Row>
            <Row :gutter="10" index="" style="margin-top: 20px">
              <Col span="">
                <Input
                  v-model="userId"
                  placeholder="寄卖商编码查询"
                  style="width: 218px"
              /></Col>
              <Col span="">
                <Button
                  type="primary"
                  style="margin-right: 10px"
                  @click="search"
                  >搜索</Button
                ><Button @click="clear">清空</Button></Col
              >
            </Row>
            <!-- <Row style="margin-top:20px;font-size:12px;width:100%"> -->
            <!-- <Col :xs="24" :sm="24" :md="24" :lg="24"> -->
            <Table
              border
              :columns="columns1"
              :data="data1"
              size="small"
              stripe
              max-height="480px"
              style="margin-top: 20px; font-size: 12px; width: 100%"
              class="table"
            >
              <template slot-scope="{ row, index }" slot="action">
                <span @click="set(row, index)" class="line">设置费率</span>
                <span class="line" @click="edit(row)">编辑</span>
                <span class="line">禁用</span>
              </template>
            </Table>
            <Page
              :current="pageNum"
              :page-size="pageSize"
              :page-size-opts="[2, 4, 10]"
              @on-change="changePage"
              @on-page-size-change="changePageSize"
              :total="pageTotal"
              show-sizer
              show-total
              style="margin: 24px 0; text-align: right"
            ></Page>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <Mark ref="mark" @sub="sub" :row="selectId"></Mark>
  </div>
</template>
<script>
import { getAll, comments } from '@/api'
import Mark from '../../components/mask/mask'

export default {
  components: {
    Mark
  },
  data() {
    return {
      mobile1: '',
      userId: '',
      roleId: '0',
      userName: '',
      pageNum: 1,
      pageSize: 10,
      pageTotal: 0,
      cityList: [
        {
          value: '0',
          label: '角色选择',
          className: 'demo-table-info-column'
        },
        {
          value: '1',
          label: '分销商',
          className: 'demo-table-info-column'
        },
        {
          value: '2',
          label: '寄卖商'
        }
      ],
      columns1: [
        {
          // type: 'index',
          width: 40,
          align: 'center',
          title: '序号',
          render: (h, params) => {
            return h(
              'span',
              params.index + (this.pageNum - 1) * this.pageSize + 1
            )
          }
        },
        {
          title: '手机号',
          align: 'center',
          key: 'mobile1'
        },
        {
          title: '姓名',
          align: 'center',
          key: 'userName'
        },
        {
          title: '寄卖商编码',
          align: 'center',
          key: 'userId',
          minwidth: 70
        },
        {
          title: '角色',
          align: 'center',
          key: 'roleName',
          width: 50
        },
        {
          title: '账户余额',
          align: 'center',
          key: 'availableAmount',
          minwidth: 80
        },
        {
          title: 'QQ号',
          align: 'center',
          key: 'qq',
          width: 70
        },
        {
          title: '微信号',
          align: 'center',
          key: 'wechat',
          width: 80
        },
        {
          title: '注册时间',
          align: 'center',
          key: 'createDate'
        },
        {
          title: '优惠折扣',
          align: 'center',
          key: 'comments',
          width: 50
        },
        {
          title: '操作',
          width: 180,
          align: 'center',
          slot: 'action'
        }
      ],
      data1: [],
      feilv: '',
      selectId: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    addsell() {
      this.$router.push({
        path: '/edit',
        query: {
          from: 'sell',
          a: {
            id: 1
          }
        }
      })
    },
    sub(comment) {
      comments({
        id: this.selectId,
        comments: comment
      })
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
    },
    set(row, index) {
      console.log(row, index)
      this.selectId = row
      this.$refs.mark.show()
    },
    edit(row) {
      this.$router.push({
        name: 'Edit',
        params: {
          row: row
        }
      })
    },
    a() {
      this.$router.push({
        path: '/edit'
      })
    },
    // b() {
    //   this.$router.push('/edit')
    // },
    clear() {
      this.mobile1 = ''
      this.userId = ''
      this.roleId = '0'
      this.userName = ''
    },
    search() {
      this.pageNum = 1
      this.getList()
    },
    changePage(pageNum) {
      this.pageNum = pageNum
      this.getList()
    },
    // 更改分页查询条数
    changePageSize(pageSize) {
      this.pageNum = 1
      this.pageSize = pageSize
      this.getList()
    },
    getList() {
      getAll({
        model: {
          mobile1: this.mobile1,
          userId: this.userId,
          roleId: this.roleId === '0' ? '' : this.roleId,
          userName: this.userName
        },
        pageObject: { currentPage: this.pageNum, pageSize: this.pageSize }
      }).then(result => {
        if (result.status === 200) {
          let res = result.data.data
          res.forEach(item => {
            item.availableAmount = '￥' + item.availableAmount
            if (item.comments) {
              item.comments = item.comments + '%'
            }
          })
          console.log(res)
          this.pageTotal = result.data.totalCount
          this.data1 = res
        }
      })
    }
  }
}
</script>
<style scoped>
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
  content: '';
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
