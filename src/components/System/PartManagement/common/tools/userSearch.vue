<style lang="less">
  .userSearchBox{
      .ivu-form-inline .ivu-form-item{
        margin-bottom: 0;
      }
      .searchInfo .ivu-cascader-rel .ivu-input-wrapper{
        width:230px
      }
  }
</style>
<template>
  <div class="userSearchBox">
  <Form  :model="searchInfo" inline>
    <Row class="searchInfo">
      <Col span="24">
      <FormItem :label-width="40" label="账号">
        <Input v-model="searchInfo.username" placeholder="查询账号" style="width: 150px;margin-bottom:7px" clearable />
      </FormItem>
      <FormItem :label-width="40" label="姓名">
        <Input v-model="searchInfo.fullname" placeholder="查询姓名" style="width: 150px;margin-bottom:7px" clearable />
      </FormItem>

      <FormItem>
        <Button @click="search" style="margin-bottom:8px" type="primary" icon="ios-search" size="small">搜索</Button>&nbsp;
        <Button type="primary" @click="resat" style="margin-bottom:8px" size="small" icon="ios-sync"> 重置</Button>
      </FormItem>
      </Col>
    </Row>
    <Row style="margin-bottom: 2px">
      <Col span="8">
      <FormItem>
        <RadioGroup v-model="filter" @on-change="radioSelect" type="button">
          <!--<Radio label="0">全部</Radio>-->
          <!--<Radio label="2">启用用户</Radio>
          <Radio label="1">禁用用户</Radio>-->
          <!--<Radio label="3">已删用户</Radio>-->
        </RadioGroup>
      </FormItem>
      </Col>
      <Col span="16" style="text-align: right">
      <FormItem :label-width="10">
        <Button size="small"  @click="addUserinfo" type="success" icon="md-add" title="新增用户信息">新增</Button>&nbsp;
        <!--<Button size="small" @click="exportUser" style="background: #495060;color: #fafafa" title="导出全部" icon="ios-cloud-download">导出</Button>-->
      </FormItem>
      </Col>
    </Row>
  </Form>
  </div>
</template>
<script>
import { getDept, getDeptChildren, getAllDuty } from '../../../../../service/index';
export default {
  name: 'UserSearch',
  props: {
    searchInfo: Object,
    departList: Array,
    dutylist: Array,
  },
  components: {},
  data() {
    return {
      filter: '0',//单选默认的值
      departId: '',//部门id
      departValue: [],//框内的值
    }
  },
  methods: {
    //初始化下拉
    async selectData() {
      this.$emit('selectData');
    },

    //异步加载
    async  loadData(item, callback) {
      this.$emit('loadData', item, callback);
    },
    //刷新对应的表格
    radioSelect() {
      this.$emit('radioSelect', this.filter)
    },
    //查询
    search() {
      this.$emit('search', this.departId);
    },
    //部门下拉
    departFun(value, selectedData) {
      if (0 < value.length) {
        let obj = selectedData.pop();
        this.departId = obj.value;
      }
      this.departValue = value;
    },
    //重置
    resat() {
      this.departValue = [];
      this.$emit('resat');
    },
    //新增
    addUserinfo() {
      this.$emit('addUserinfo');
    },
    //上传
    addUpload() {
      this.$emit('addUpload');
    },
    //导出
    exportUser() {
      let url = '/api/mana/userinfo/usersExport';
      window.open(location.origin+url,'_self')
    },
    //对选项重新赋值
    setFilter(b) {
      this.filter = b;
    }
  },
  created() {
    // this.selectData();
  },
}
</script>
