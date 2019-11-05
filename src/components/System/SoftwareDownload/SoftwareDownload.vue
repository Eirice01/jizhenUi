<template>
<div id="part-management">
  <div class="cls-part">
    <div class="part-search">
      <li>
        <span>软件名称：<Input v-model="sofName" placeholder="请输入软件名称" style="width: 300px" /></span>
        <span style="margin-left: 10px">软件类型：</span>
        <span><Select v-model="sofModal" clearable style="width:200px;z-index: 99999">
             <Option v-for="item in cityList5" :value="item.keys" :key="item.keys">{{ item.val}}</Option>
           </Select>
            </span>
        <span style="margin-left: 50px;margin-right: 20px"><Button type="primary" @click="searchSof">查询</Button></span>
        <span><Button @click="restSof">重置</Button></span>
        <span><Button style="margin-left: 15px" @click="showAddModal">新增</Button></span>
      </li>
    </div>
    <div class="part-content">
      <div class="part-table">
        <Table :columns="columns4" :data="data1">
          <template slot-scope="{row,index}" slot="action">
              <span class="scenic-bts" @click="deleteAny(row)">
               <Button type="primary" style="background:#ff0000" size="small">删除</Button>
              </span>
          </template>
          <!--<template slot-scope="{row,index}" slot="handel">-->
            <!--<span class="use-bts"  style="margin-right: 5px"><Icon type="md-arrow-round-up" title="向前升一级" @click="userEdit('up',row)"/></span>-->
            <!--<span class="use-bts"  ><Icon type="md-arrow-round-down" title="向后降一级" @click="userEdit('down',row)"/></span>-->
            <!--&lt;!&ndash;<span class="use-bts"  >{{row.title}}</span>&ndash;&gt;-->
          <!--</template>-->
        </Table>
      </div>
      <div class="part-page">
        <Page :total="pageParams.total" :page-size="pageParams.pageSize" :current="this.pageParams.current" show-total style="float: right"  @on-change="ChangePageare"></Page>
      </div>
    </div>
  </div>
  <Modal v-model="isUserModal" title="新增软件" width="700">
    <div  class="new-add">
      <div class="new-conten">
        <Form ref="updateRoleForm2" :model="sofware" :rules="ruleValidate">
          <FormItem label="软件类型：">
            <Select v-model="sofware.type" clearable style="width:180px;margin-left: 31px">
              <Option v-for="item in cityList5" :value="item.keys" :key="item.keys">{{ item.val}}</Option>
            </Select>
          </FormItem>
          <FormItem label="下载软件选择：">
            <Select v-model="sofware.address" clearable style="width:180px;margin-left: 8px" filterable   @on-query-change="getSofType" @on-open-change="getALLsof">
              <Option v-for="item in soflist" :value="item.fileName" :key="item.size" @click.native="getinfo(item)">{{ item.fileName }}</Option>
            </Select>
            <span style="width: 100%;color: red;font-size: 8px">{{sofMsg}}</span>
          </FormItem>

          <FormItem label="软件名称：" prop="name" >
            <Input v-model.trim="sofware.name" style="width: 180px;margin-left: 23px"/>
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
  import {querySof,getSofDownload,getTypeDiction,softDownload,delFsofDef,checkSof} from '../../../service/index'
  import {process_error} from '@/config/process_request_conf'
  export default {
    name: "software-download",
    data(){
      return{
        isUserModal:false,
        sofName:'',
        sofModal:'',
        sofInfo:'',
        flag:false,
        sofMsg:'',
        pageParams:{
          pageSize:15,
          current:1,
          total:1
        },
        soflist:[],
        sofware:{
          type:'',
          name:'',
          address:'',
          search:'',
        },
        cityList1: [],
        cityList5:[],
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
            "title":"软件类型",
            "key":"typeName",
            "align":'center',
          },
          {
            "title":"软件名称",
            "key":"name",
            "align":'center',
          },
          {
            "title":"软件大小",
            "key":"fileSizeVal",
            "align":'center',
          },
          {
            "title":"下载次数",
            "key":"downloadCount",
            "align":'center',
          },
          {
            "title":"操作",
            slot: 'action',
            "align":'center',
          },
        ],
        data1:[
        ],
        ruleValidate:{
          type:[
            {
              required: true,
              whitespace: true,
              message: '软件类型不能为空',
              trigger: 'blur'
            }
          ],
          name: [
            {
              required: true,
              whitespace: true,
              transform: value => value ? value.trim() : '',
              max: 30,
              message: '软件名称不能为空且不能超过20个汉字',
              trigger: 'blur'
            }
          ],
          address:[
            {
              required: true,
              whitespace: true,
              transform: value => value ? value.trim() : '',
              // max: 30,
              message: '地址不能为空',
              trigger: 'blur'
            }
          ],
        },
      }
    },
    watch:{
    },
    mounted(){
      let name='';
      let type='';
      let sendData={
        name: name,
        type:type,
        size :this.pageParams.pageSize,
        current:this.pageParams.current
      }
      this.getquerySof(sendData);
      this.getSofTypeList()

    },
    methods:{


       //软件列表搜索
      searchSof(){
        if(this.sofModal==undefined){
          this.sofModal=""
        }
       let name=this.sofName;
       let type=this.sofModal;
        let sendData={
          name: name,
          type:type,
          size :this.pageParams.pageSize,
          current:this.pageParams.current
        }
        this.getquerySof(sendData);
      },
      //重置
      restSof(){
        this.pageParams.current=1;
        this.sofName='';
        this.sofModal='';
        let name=this.sofName;
        let type=this.sofModal;
        let sendData={
          name: name,
          type:type,
          size :this.pageParams.pageSize,
          current:1
        }
        this.getquerySof(sendData);
      },
      //获取下载选择的软件信息
      getinfo(item){
        this.sofInfo=item;
        // console.log(item)
        this.checkSof(item.fileName)
        // console.log(item)
      },


     //软件选择校验
      async checkSof(filename){
        try {
          let res =await checkSof(filename)
          if(res.statusCode !== 200) return process_error(res);
          if(res.data){
            this.sofMsg='选择软件名称已存在!';
            this.flag=false;
          }else {
            this.sofMsg='';
            this.flag=true;
          }
        }catch (err){

        }
      },
      //不输入信息时获取所有软件
    async  getALLsof(val){
        if(val){
          let filename='';
          try {
            let res = await  getSofDownload(filename)
            if(res.statusCode !== 200) return process_error(res);
            this.soflist=res.data;
            if(this.soflist.length==0){
              this.$Message.warning('暂无可以新增的软件!');
              this.flag=false;
            }
          }catch (err){
            //console.log(err)
          }
        }
      },
       //软件类型获取
       async getSofTypeList(){
         try {
           let res=await getTypeDiction();
           if(res.statusCode !== 200) return process_error(res);
           this.cityList5=res.data
         }catch (err){
           //console.log(err)
         }
       },
      //软件下载列表新增使用
       async getSofType(query){
         let filename=query;
         try {
           let res = await  getSofDownload(filename)
           if(res.statusCode !== 200) return process_error(res);
           this.soflist=res.data;
         }catch (err){
           //console.log(err)
         }
       },

      //获取软件信息列表
       async getquerySof(sendData){
         try{
           let res = await querySof(sendData)
           if(res.statusCode !== 200) return process_error(res);
            this.data1=res.data.content;
            this.pageParams.total=res.data.totalElements;
            // this.pageParams.pageSize=res.data.size
         }catch (err){
           //console.log(err)
         }
        },
      //分页
      ChangePageare(current){
        this.pageParams.current=current;
        let name='';
        let type='';
        let sendDatas={
          name: name,
          type:type,
          size :this.pageParams.pageSize,
          current:this.pageParams.current
        }
        this.getquerySof(sendDatas);
      },
      showAddModal(){
          this.isUserModal=true;
      },

      //确认删除

       deleteAny(row){
         this.$Modal.confirm({
           title:'确认删除',
           content:'是否确认删除当前选中的配置软件',
           onOk: ()=>{
             this.delRow(row)
           },
           onCancel:()=>{
             this.$Message.info('取消删除成功')
           }
         })
       },

      //删除
     async delRow(row){
       try{
         let res= await delFsofDef(row.id)
         if(res.statusCode !== 200) return process_error(res);
         this.$Message.success('删除成功!');
         let name='';
         let type='';
         let sendDatas={
           name: name,
           type:type,
           size :this.pageParams.pageSize,
           current:this.pageParams.current
         }
         this.getquerySof(sendDatas);
       }catch (err){
         //console.log(err)
       }
      },
      //取消关闭
      moreCloseModel(){
          this.isUserModal=false;
          this.sofMsg='';
          this.sofware.address='';
          this.soflist=[];
          this.sofware.name='';
          this.sofware.type='';
      },
      //提交
       morePartSubmit(){
         let _this=this;
         this.$refs["updateRoleForm2"].validate((valid)=>{
           if(valid&&_this.flag){
             const sendData={
               fileName:_this.sofInfo.fileName ,
               filePath:_this.sofInfo.filePath ,
               fileSize: _this.sofInfo.fileSize,
               name:_this.sofware.name ,
               type:_this.sofware.type,
             }
             this.saveOfSof(sendData)
           }
         })
      },

      //新增软件保存
      async saveOfSof(sendData){
        try {
          let res =await  softDownload(sendData)
          if(res.statusCode !== 200) return process_error(res);
          this.$Message.success('新增成功!');
          this.moreCloseModel()
          let name='';
          let type='';
          let sendDatas={
            name: name,
            type:type,
            size :this.pageParams.pageSize,
            current:this.pageParams.current
          }
          this.getquerySof(sendDatas);
        }catch (err){
          //console.log(err)
        }
      }
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
