<template>
    <div id="contentofcuration">
     <div class="cls-search">
       <li class="cls-time">
         <span>标题：<Input v-model="titleName" placeholder="请输入标题" style="width: 300px" /></span>
       </li>
       <li class="cls-time" style="margin-left: 20px">
         <span style="margin-left: 10px">内容类型：</span>
            <span><Select v-model="type2"  style="width:200px;z-index: 99999">
             <Option v-for="item in menuList" :value="item.keys" :key="item.keys">{{ item.descs }}</Option>
           </Select>
         </span>
         <span style="margin-left: 10px">置顶类型：</span>
         <span><Select v-model="topType"  style="width:200px;z-index: 99999">
             <Option v-for="item in topList" :value="item.top" :key="item.top">{{ item.name }}</Option>
           </Select>
         </span>
         <span style="margin-left: 50px;margin-right: 20px"><Button type="primary" @click="morSearch">查询</Button></span>
         <span><Button  @click="restMor">重置</Button></span>
         <span><Button style="margin-left: 20px" @click="showEditor">新增发布内容</Button></span>
       </li>
     </div>
      <div class="cls-table">
        <div class="table-content">
          <Table :columns="columns1" :data="data1">
            <template slot-scope="{row,index}" slot="action">
               <span>
                <Button type="primary" style="background:#169bd5" size="small" v-show="row.publishflag==0?true:false" @click="sendWord(row)">未发布</Button>
                <Button  style="background:#008000;color: #fff" v-show="row.publishflag==1?true:false" size="small" @click="sendWord(row)">已发布</Button>
              </span>
              <span>
                <Button type="primary" style="background:#169bd5;margin: 0 3px;" size="small" v-show="row.top==0?true:false" @click="sendTop(row)">未置顶</Button>
                <Button  style="background:#ff0000;color: #fff;margin: 0 3px;" v-show="row.top==1?true:false" size="small" @click="sendTop(row)">已置顶</Button>
              </span>
              <span class="scenic-bts" @click="prebiew(row)" >
                <Button type="primary" style="background:#169bd5" size="small">预览</Button>
              </span>
              <span class="scenic-bts" @click="editData(row)"  v-show="row.publishflag==0?true:false">
                <Button type="primary" style="background:#008000" size="small">编辑</Button>
              </span>
              <span class="scenic-bts" @click="editErr" v-show="row.publishflag==1?true:false">
                <Button type="primary" style="background:rgb(204, 204, 204)" size="small">编辑</Button>
              </span>
              <span class="scenic-bts" @click="delRow(row.id)" v-show="row.publishflag==0?true:false">
               <Button type="primary" style="background:#ff0000" size="small">删除</Button>
              </span>
              <span class="scenic-bts" @click="delErr" v-show="row.publishflag==1?true:false">
               <Button type="primary" style="background:rgb(204, 204, 204)" size="small">删除</Button>
              </span>
            </template>
          </Table>
        </div>
        <div class="table-page">
          <Page :total="pageParams.total" :page-size="pageParams.pageSize" :current="this.pageParams.current"@on-change="ChangePageare"show-total style="float: right"></Page>
        </div>
      </div>
      <editor-model ref="editormodel" :testData="testData" :menuList="menuList" @menuPage="menuPage"></editor-model>
      <preview-modal ref="previewmodal"></preview-modal>
    </div>
</template>

<script>

 import EditorModel from '../../../common/editorModel/editorModel'
 import PreviewModal from '../../../common/preview/previewModal'
 import {process_error} from '@/config/process_request_conf'
 import { menuSelect,menuPage,deleteMenu,menuSearch,changeStatus,changeTop} from '../../../service/index'
 export default {
   name: "content-ofcuration",
      data(){
          return{
            titleName:'',
            editDate:"",
            type2:'',
            topType:'',
            menuList:[],
            newName:'',
            times:'',
            testData:'',
            isShowAnyType:false,
            data1:[],
            pageParams:{
              pageSize:10,
              current:1,
              total:30
            },
            topList:[
              {
                name:'已置顶',
                top:'1'
              },
              {
                name:'未置顶',
                top:'0'
              }
            ],
            columns1:[
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
            "title":"类型",
            // "key":"type",
            render:(h,params) => {
              if(params.row.type.val!=undefined){
                return h('div', [
                    h('span',{
                    },params.row.type.val)
                  ]
                )
              }
            },
            "align":'center',
          },
          {
            "title":"标题",
             width: 400,
            render:(h,params) => {
              return h('p',[
                h('Tooltip',{
                  props:{
                    placement:'top',
                    transfer:true
                  },
                  style:{
                    display: 'inline-block',
                    width:'390px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    //marginTop:'5px'
                  }
                },[
                  params.row.title.split("#")[0],
                  h('p',{
                      slot:'content',
                      style:{
                        whiteSpace:'normal',
                        wordWrap:'bread-word',
                        wordBreak:'break-all',
                      }
                    },
                    params.row.title.replace(/#/g,"\n"),)
                ])
              ])
            },
            align: 'center',
          },
          {
            "title":"发布时间",
            "key":"createTime",
            "align":'center',
          },
          {
            "title":"发布人",
            "key":"createName",
            "align":'center',
          },
          {
            "title":"发布部门",
            // "key":"reh",
            render:(h,params) => {
              if(params.row.userid.departName!=undefined){
                return h('div', [
                    h('span',{
                    },params.row.userid.departName)
                  ]
                )
              }
            },
            "align":'center',
          },

          {
              "title":"操作",
               width: 300,
               slot: 'action',
              "align":'center',
          },
        ],

          }
      },
   components: {
     EditorModel,
     PreviewModal
   },
      mounted(){
      this.menuSelect()
        let sendData={
          top:this.topType,
          type1: this.type2,
          title: this.titleName,
          sort:'createTime,desc',
          size :this.pageParams.pageSize,
          current:this.pageParams.current
      }
      this.menuPage(sendData)
      },
      created(){
        this.getZishiying()
      },

      methods:{

        getZishiying(){
          if(window.screen.width<1920){
            let rate = window.screen.width / 1920;
            document.body.style.zoom = rate
          }else{
            document.body.style.zoom = 1;
          }
        },
       //置顶
        sendTop(row){
          if(row.publishflag=="1"){
            let top=row.top;
            let sendTop=""
            if(top==0){
              sendTop=1
            }else {
              sendTop=0
            }
            let data1={
              id:row.id,
              top:sendTop
            }
            this.changeTop(data1,sendTop)
          }else {
            this.$Message.info('内容未发布，请发布后再置顶')
          }
        },


        async changeTop(data,sendTop){
          try {
            let res =await changeTop(data);
            if(res.statusCode !== 200) return process_error(res);
            if(sendTop==1){
              this.$Message.success("置顶成功！")
            }else {
              this.$Message.success("取消置顶！")
            }
            if(this.topType==undefined){
              this.topType="";
            }
            let sendData={
              type1: this.type2,
              title: this.titleName,
              top:this.topType,
              sort:'createTime,desc',
              size :this.pageParams.pageSize,
              current:this.pageParams.current
            }
            this.menuPage(sendData)
          }catch (err){
            //console.log(err)
          }
        },
       //已发布不能删除
        delErr(){
          this.$Message.info('内容已发布，不能删除')
        },
        //已发布不能编辑
        editErr(){
          this.$Message.info('内容已发布，请取消发布后再编辑')
        },
       //获取内容类型下拉列表
         async  menuSelect(){
          try {
            let res =await menuSelect()
            if(res.statusCode !== 200) return process_error(res);
            this.menuList=res.data

          }catch (err){
            //console.log(err)
          }
        },

        //内容维护所有分页
         async menuPage(data){
           try{
             let res = await menuPage(data)
             if(res.statusCode !== 200) return process_error(res);
             if(res.data!=undefined){
               this.data1=res.data.content;
             }
             this.pageParams.total=res.data.totalElements;
             this.pageParams.pageSize=res.data.size;
           }catch (err){
             //console.log(err)
           }
         },
       //分页
        ChangePageare(current){
          this.pageParams.current=current;
          if(this.type2==undefined){
            this.type2=""
          }
          if(this.topType==undefined){
            this.topType='';
          }
          let sendData={
            top:this.topType,
            type1: this.type2,
            title: this.titleName,
            sort:'createTime,desc',
            size :this.pageParams.pageSize,
            current:this.pageParams.current
          }
          this.menuPage(sendData)
        },
       //编辑窗口
        showEditor(){
          this.$refs.editormodel.typeSelect()
          this.$store.commit("showEditorModal", true);
          // this.$refs.editormodel.intEditor();

        },

       //删除
        delRow(id){
          this.$Modal.confirm({
            title:'确认删除',
            content:'是否确认删除当前选中的配置系统',
            onOk: ()=>{
              this.deleteMenu(id)
            },
            onCancel:()=>{
              this.$Message.info('取消删除成功')
            }
          })
        },

       //表格删除
       async deleteMenu(id){
         try {
           let res=await deleteMenu(id)
           if(res.statusCode !== 200) return process_error(res);
           this.$Message.success("删除成功！")
           // this.isMoreModal2=false;
           let sendData={
             top:this.topType,
             type1: this.type2,
             title: this.titleName,
             sort:'createTime,desc',
             size :this.pageParams.pageSize,
             current:this.pageParams.current
           }
           this.menuPage(sendData)
         }catch (err){
           //console.log(err)
         }
       },

        //已发布/未发布
        sendWord(row){
          // console.log(row)
          let type=row.publishflag
          let sendType='';
          let data1={};
          if(type==0){
            sendType=1
             data1={
              id:row.id,
              publishflag:sendType,
              top:row.top
            }
          }else {
            sendType=0
            data1={
              id:row.id,
              publishflag:sendType,
              top:0
            }
          }
          this.changeStatus(data1,sendType)
        },

        //文档发布状态更新
        async changeStatus(data,sendType){
           try {
             let res =await changeStatus(data);
             if(res.statusCode !== 200) return process_error(res);
             if(sendType==1){
               this.$Message.success("发布成功！")
             }else {
               this.$Message.success("取消发布！")
             }
             if(this.topType==undefined){
               this.topType=""
             }
             let sendData={
               top:this.topType,
               type1: this.type2,
               title: this.titleName,
               sort:'createTime,desc',
               size :this.pageParams.pageSize,
               current:this.pageParams.current
             }
             this.menuPage(sendData)
           }catch (err){
             //console.log(err)
           }
        },
       //编辑
        editData(row){
          this.$store.commit("showEditorModal", true);
          this.$refs.editormodel.intEditor(row.contents);
          this.$refs.editormodel.isEdit=true;
          this.$refs.editormodel.newName=row.title;
          this.$refs.editormodel.model8=row.type.keys;
          this.$refs.editormodel.menuContent=row.contents;
          this.$refs.editormodel.upIds=row.id
          let tep=row.files;
          let newTep=[];
          if(tep!=null){
            tep=tep.split(";")
            for(let i=0;i<tep.length;i++){
              newTep.push({
                fileBs: tep[i].split(',')[0],
                fileName:tep[i].split(',')[1]
              })
            }
            this.$refs.editormodel.filelist=newTep;
          }
        },
         //搜索查询
        morSearch(){
          this.pageParams.current=1;
          if(this.type2==undefined){
            this.type2="";
          }
          if(this.topType==undefined){
            this.topType='';
          }
           let date1={
             sort:'createTime,desc',
             top: this.topType,
             type1: this.type2,
             title: this.titleName,
             size :this.pageParams.pageSize,
             current:this.pageParams.current
           }
          this.menuSearch(date1)
        },
        //内容列表搜索
        async menuSearch(date1){
          try {
             let res = await menuSearch(date1);
            if(res.statusCode !== 200) return process_error(res);
            this.data1=res.data.content;
            this.pageParams.total=res.data.totalElements;
            this.pageParams.pageSize=res.data.size
          }catch (err){
            //console.log(err)
          }
        },
        //重置
        restMor(){
          this.type2='';
          this.topType='';
          this.titleName='';
          this.pageParams.current=1
          let sendData={
            top:this.topType,
            type1: this.type2,
            title: this.titleName,
            sort:'createTime,desc',
            size :this.pageParams.pageSize,
            current:1
          }
          this.menuPage(sendData)
        },
        //预览
        prebiew(row){
          this.$store.commit("showPreviewModal",true);
          let thl="";
          this.$refs.previewmodal.title=row.title.split("#")
          this.$refs.previewmodal.depPart=row.userid.departName
          this.$refs.previewmodal.createTimes=row.createTime
          this.$refs.previewmodal.isType=row.type.descs;
          thl=row.contents
          // thl=thl.replace(/\"/g,"'")
          //console.log(thl)
          this.$refs.previewmodal.getShowHtml(thl)

        },

      }
    }
</script>

<style scoped lang="less">
#contentofcuration{
  width: 100%;
  height:calc(100% - 50px) ;
  padding:30px;
.cls-search{
  width: 100%;
  margin-top: 30px;
  display: flex;
   .ivu-btn {
   background: #6b8caf;
    color: #f5f7f9;
  }
}
.cls-table{
  margin-top: 15px;
  width: 100%;
  height:calc(100% - 150px);

.table-content{
  width: 100%;
  height:calc(100% - 50px);
  overflow: auto;
}
.table-page{
  margin-top: 5px;
  width: 100%;
  height: 50px;
}
}
}
.scenic-bts{
  margin-left:5px;
}

#new-info{
  width: 80%;
  margin:0 auto;
  height:calc(100% - 150px);
  overflow: auto;
  background: #fff;
}
.cls-btn{
  margin-top: 10px;
  width: 100%;
  height: 30px;
  text-align: center;
}
</style>
