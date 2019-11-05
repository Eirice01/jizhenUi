<template>
<div id="part-management">
  <div class="cls-part">
    <div class="part-search">
      <li v-if="isPart">
        <span>部门名称：<Input v-model="partName" placeholder="请输入标题" style="width: 300px" /></span>
        <span style="margin-left: 15px">创建时间：
          <DatePicker type="daterange" split-panels placeholder="Select date" style="width: 260px" :clearable="false":editable="false" v-model="time2"></DatePicker>
</span>
        <span style="margin-left: 50px;margin-right: 20px"><Button type="primary">查询</Button></span>
        <span><Button >重置</Button></span>
        <span><Button style="margin-left: 15px" @click="showAddModal">新增</Button></span>
      </li>
      <li v-if="!isPart">
        <span>用户名称：<Input v-model="partName" placeholder="请输入标题" style="width: 300px" /></span>
        <span style="margin-left: 15px">创建时间：
          <DatePicker type="daterange" split-panels placeholder="Select date" style="width: 260px"  :clearable="false" :editable="false"v-model="time2"></DatePicker>
</span>
        <span style="margin-left: 50px;margin-right: 20px"><Button type="primary">查询</Button></span>
        <span><Button >重置</Button></span>
        <span><Button style="margin-left: 15px" @click="showAddModal">新增</Button></span>
      </li>
    </div>
    <div class="part-content">
        <div class="part-table">
          <Table :columns="currentColumns" :data="currentData">
            <template slot-scope="{row,index}" slot="action">
              <span class="scenic-bts" @click="delRow(row.id)">
               <Button type="primary" style="background:#ff0000" size="small">删除</Button>
              </span>
            </template>
          </Table>
        </div>
        <div class="part-page">
          <Page :total="pageParams.total" :page-size="pageParams.pageSize" :current="this.pageParams.current" show-total style="float: right"  @on-change="ChangePageare"></Page>
        </div>
      </div>
    </div>
  <Modal v-model="isPartModal" title="新增部门" width="700">
    <div  class="new-add">
      <div class="new-conten">
        <Form ref="updateRoleForm2" :model="Part" :rules="ruleValidate2">
          <FormItem label="部门：" prop="dep" >
            <Select v-model="Part.dep" clearable style="width:200px;z-index: 99999;margin-left: 33px">
              <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="用户名称：" prop="userName">
            <Input v-model.trim="Part.userName" style="width: 200px;margin-left: 10px"/>
          </FormItem>
          <FormItem label="创建时间：" >
            <DatePicker type="date" placeholder="Select date" style="width: 200px;margin-left: 18px"  :clearable="false":editable="false" v-model="Part.partTime"></DatePicker>
          </FormItem>
        </Form>
      </div>
    </div>
    <div slot="close" @click="moreCloseModel"><Icon type="ios-close"></Icon></div>
    <div slot="footer" style="margin-right: 25px;">
      <Button type="text" @click="moreCloseModel">取消</Button>
      <Button type="primary" @click="morePartSubmit">确定</Button>
    </div>
  </Modal>
  <Modal v-model="isUserModal" title="新增部门" width="700">
    <div  class="new-add">
      <div class="new-conten">
        <Form ref="updateRoleForm2" :model="user" :rules="ruleValidate2">
          <FormItem label="用户名称：" prop="userName">
            <Input v-model.trim="user.userName" style="width: 200px;margin-left: 10px"/>
          </FormItem>
          <FormItem label="部门：" prop="dep" >
            <Select v-model="user.dep" clearable style="width:200px;z-index: 99999;margin-left: 33px">
              <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="创建时间：" >
            <DatePicker type="date" placeholder="Select date" style="width: 200px;margin-left: 18px" :clearable="false" :editable="false" v-model="user.partTime"></DatePicker>
          </FormItem>
        </Form>
      </div>
    </div>
    <div slot="close" @click="moreCloseModel"><Icon type="ios-close"></Icon></div>
    <div slot="footer" style="margin-right: 25px;">
      <Button type="text" @click="moreCloseModel">取消</Button>
      <Button type="primary" @click="morePartSubmit">确定</Button>
    </div>
  </Modal>
</div>
</template>

<script>
    export default {
        name: "part-management",
        data(){
          return{
            isPart:true,
            partName:'',
            currentColumns:this.columns4,
            isPartModal:false,
            isUserModal:false,
            time2:'',
            currentData:[],
            pageParams:{
              pageSize:15,
              current:1,
              total:30
            },
            userPage:{
              pageSize:15,
              current:1,
              total:30
            },
            Part:{
              dep:'',
              userName:'',
              partTime:''
            },
            user:{
              dep:'',
              userName:'',
              partTime:''
            },
            columns4:[
              {
                // type: 'index',
                title: "序号",
                width: 90,
                align: 'center',
                render:(h,params) => {
                  return h('div',[
                    h('span',(params.index+1)+this.pageParams.pageSize*(this.pageParams.current-1)),
                  ])
                } ,
              },
              {
                "title":"部门名称",
                "key":"partName",
                "align":'center',
              },
              {
                "title":"用户名称",
                "key":"userName",
                "align":'center',
              },
              {
                "title":"创建时间",
                "key":"createTime",
                "align":'center',
              },
              {
                "title":"操作",
                slot: 'action',
                "align":'center',
              },
            ],
            columns5:[
              {
                // type: 'index',
                title: "序号",
                width: 90,
                align: 'center',
                render:(h,params) => {
                  return h('div',[
                    h('span',(params.index+1)+this.userPage.pageSize*(this.userPage.current-1)),
                  ])
                } ,
              },
              {
                "title":"用户名称",
                "key":"userName",
                "align":'center',
              },
              {
                "title":"所属部门",
                "key":"blonPart",
                "align":'center',
              },
              {
                "title":"创建时间",
                "key":"createTime",
                "align":'center',
              },
              {
                "title":"操作",
                slot: 'action',
                "align":'center',
              },
            ],
            data4:[
              {
                "partName":"宣传部1",
                "userName":'管理员1',
                "createTime":'2018-09-14',
                "id":"001",
              },
              {
                "partName":"宣传部1",
                "userName":'管理员1',
                "createTime":'2018-09-14',
                "id":"001",
              },
              {
                "partName":"宣传部1",
                "userName":'管理员1',
                "createTime":'2018-09-14',
                "id":"001",
              },
              {
                "partName":"宣传部1",
                "userName":'管理员1',
                "createTime":'2018-09-14',
                "id":"001",
              },
              {
                "partName":"宣传部1",
                "userName":'管理员1',
                "createTime":'2018-09-14',
                "id":"001",
              },
              {
                "partName":"宣传部1",
                "userName":'管理员1',
                "createTime":'2018-09-14',
                "id":"001",
              },
            ],
            data5:[
              {
                "userName":"测试1",
                "blonPart":'管理员1',
                "createTime":'2018-09-14',
                "id":"001",
              },
              {
                "userName":"测试1",
                "blonPart":'管理员1',
                "createTime":'2018-09-14',
                "id":"001",
              },
              {
                "userName":"测试2",
                "blonPart":'管理员1',
                "createTime":'2019-09-14',
                "id":"001",
              },
              {
                "userName":"测试1",
                "blonPart":'管理员1',
                "createTime":'2018-02-14',
                "id":"001",
              },
              {
                "userName":"测试5",
                "blonPart":'管理员1',
                "createTime":'2018-09-10',
                "id":"001",
              },
              {
                "userName":"测试1",
                "blonPart":'管理员1',
                "createTime":'2018-09-16',
                "id":"001",
              },
            ],
            cityList2: [
              {
                value: 'type1',
                label: '全国厅局单位'
              },
              {
                value: 'type2',
                label: '全省市单位'
              },
              {
                value: 'type3',
                label: '全市单位'
              },
            ],
            ruleValidate2:{
              userName: [
                {
                  required: true,
                  whitespace: true,
                  transform: value => value ? value.trim() : '',
                  max: 30,
                  message: '用户名称不能为空且不能超过20个汉字',
                  trigger: 'blur'
                }
              ],
              dep:[
                {
                  required: true,
                  whitespace: true,
                  transform: value => value ? value.trim() : '',
                  // max: 30,
                  message: '部门不能为空',
                  trigger: 'blur'
                }
              ],
              partTime:[
                {
                  required: true,
                  whitespace: true,
                  transform: value => value ? value.trim() : '',
                  // max: 30,
                  message: '创建时间不能为空',
                  trigger: 'blur'
                }
              ]
            },
          }
        },
      watch:{
        '$route.query.type'(){
          if(this.$route.query.type=='part'){
            this.currentColumns=this.columns4
            this.currentData=this.data4;
            this.isPart=true;
          }else {
            this.currentColumns=this.columns5
            this.currentData=this.data5;
            this.isPart=false;
          }
        }
      },
      mounted(){
        if(this.$route.query.type=='part'){
          this.currentColumns=this.columns4
          this.currentData=this.data4;
          this.isPart=true;
        }else {
          this.currentColumns=this.columns5
          this.currentData=this.data5;
          this.isPart=false;
        }
      },
      methods:{
         //分页
        //分页
        ChangePageare(current){
          this.pageParams.current=current;
          let parms={
            roleName:'',
            currPage:this.pageParams.current,
            pageSize:this.pageParams.pageSize,
          }
        },
        showAddModal(){
          if(this.$route.query.type=='part'){
            this.isUserModal=false;
            this.isPartModal=true;
          }else {
              this.isPartModal=false;
              this.isUserModal=true;
          }
        },
        //删除
        delRow(id){

        },
        //取消关闭
        moreCloseModel(){
          if(this.$route.query.type=='part'){
            this.isPartModal=false;
            this.Part={
              dep:'',
              userName:'',
              partTime:''
            }
          }else {
            // this.isMoreModal2=true;
          }

        },
        //提交
        morePartSubmit(){

        },
      }
    }
</script>

<style scoped lang="less">
  #part-management{
    width: 100%;
    height:calc(100% - 50px);
    padding:15px;
  .cls-part{
    width: 100%;
    height:100%;
    overflow: hidden;
  }
  .part-search{
    width: 100%;
  }
  }
  .part-search li .ivu-btn {
    background: #6b8caf;
    color: #f5f7f9;
  }
.part-content{
  margin-top: 15px;
  width: 100%;
  height:calc(100% - 50px);
  /*background: #0e2456;*/
}
  .part-table{
    width: 100%;
    height:calc(100% - 55px);
    overflow: auto;
  }

  .part-page{
    margin-top: 5px;
    width: 100%;
    height: 50px;
  }
</style>
