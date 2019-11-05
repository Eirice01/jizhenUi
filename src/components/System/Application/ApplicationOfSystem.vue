<template>
    <div id="cls-application">
      <div class="cls-application-content">
        <div class="app-search">
          <li v-if="isApp">
            <span>系统名称：<Input v-model="systemName" placeholder="名称" style="width: 200px" /></span>
            <span style="margin-left: 10px">适配浏览器：</span>
            <span><Select v-model="APPKey"  style="width:200px;z-index: 99999">
             <Option v-for="item in applist" :value="item.keys" :key="item.keys">{{ item.descs }}</Option>
           </Select>
            </span>
          </li>
          <li v-if="!isApp">
            <span>名称：<Input v-model="linkNames" placeholder="名称" style="width: 200px" /></span>
            <span style="margin-left: 10px">类型：</span>
            <span><Select v-model="type1"  style="width:200px;z-index: 99999">
             <Option v-for="item in outLink" :value="item.keys" :key="item.keys">{{ item.descs }}</Option>
           </Select>
            </span>
          </li>
          <li class="app-btn">
            <span style="margin-left: 50px;margin-right: 20px"><Button type="primary" @click="searchMro">查询</Button></span>
            <span><Button @click="restMyInfo">重置</Button></span>
            <span><Button style="margin-left: 15px" @click="showAddModal">新增</Button></span>
          </li>
        </div>
         <div class="app-content">
            <div class="app-table">
              <Table :columns="currentColumns" :data="currentData">
                <template slot-scope="{row,index}" slot="action">
                  <span class="scenic-bts" @click="editData(row)">
                <Button type="primary" style="background:#008000" size="small">编辑</Button>
              </span>
                  <span class="scenic-bts" @click="delRow(row.id)">
               <Button type="primary" style="background:#ff0000" size="small">删除</Button>
              </span>
                </template>
                <template slot-scope="{row,index}" slot="handel">
                  <span class="use-bts"  style="margin-right: 5px;color: #33cc2e;font-size: 20px"><Icon type="md-arrow-round-up" title="上升一位" @click="userEdit('1',row.id)"/></span>
                  <span class="use-bts" style="color: #ff4e44;font-size: 20px" ><Icon type="md-arrow-round-down" title="下降一位" @click="userEdit('0',row.id)"/></span>
                  <!--<span class="use-bts"  >{{row.title}}</span>-->
                </template>
              </Table>
            </div>
           <div class="app-page" v-if="this.$route.query.type=='app'?true:false">
             <Page :total="pageParams.total" :page-size="pageParams.pageSize" :current="this.pageParams.current" show-total style="float: right"  @on-change="ChangePageare"></Page>
           </div>
           <div class="app-page" v-if="this.$route.query.type=='nav'?true:false">
             <Page :total="link.total" :page-size="link.pageSize" :current="this.link.current" show-total style="float: right"  @on-change="ChangePageareLink"></Page>
           </div>
         </div>
      </div>
      <Modal v-model="isMoreModal1" title="新增平台信息" width="700">
        <div  class="new-add">
          <div class="new-conten">
            <Form ref="updateRoleForm" :model="updateParam" :rules="ruleValidate1">
              <FormItem label="系统名称：" prop="sysName">
                <Input v-model="updateParam.sysName" style="width: 200px;margin-left: 12px"/>
              </FormItem>
              <FormItem label="访问地址：" prop="sysAddress" >
                <Input v-model="updateParam.sysAddress" style="width: 200px;margin-left: 13px"/>
              </FormItem>

              <FormItem label="适配浏览器：" style="margin-bottom:0px">
                <Select v-model="updateParam.sysType" clearable style="width:200px;margin-left: 15px" @on-change="getKey">
                  <Option v-for="item in applist" :value="item.keys" :key="item.keys">{{ item.descs }}</Option>
                </Select>
                <span style="width: 100%;color: #ff301f;display: inline-block;text-align: center">{{errWeb}}</span>
              </FormItem>

              <!--<FormItem label="图标名称：" prop="syspic">-->
                <!--&lt;!&ndash;<Input v-model="updateParam.syspic" style="width: 198px;margin-left: 20px;"/>&ndash;&gt;-->
              <!--</FormItem>-->
              <div class="cls-img">
                 <span style="display:block;width: 100%;height: 100%">
                          选择上传图标：<span style="color: #ff5809">{{pciMsg}}</span>
                   <form id="files">
                      <input type="file" id="myimg"
                             @change="imgChange($event)"
                             accept="image/png,image/jpeg"
                      />
                   </form>
                </span>
                <span style="display: inline-block;width: 50px;height: 50px" id="imgs">
                  <!--<img   :src=appsrc  style="width: 100%;height: 100%" >-->
                </span>

              </div>
            </Form>
          </div>
        </div>
        <div slot="close" @click="moreCloseModel"><Icon type="ios-close"></Icon></div>
        <div slot="footer" style="margin-right: 25px;">
          <Button type="text" @click="moreCloseModel">取消</Button>
          <Button type="primary" @click="morePartSubmit('1')" v-if="!isEdit">确定</Button>
          <Button type="primary" @click="morePartSubmit('2')"v-if="isEdit">确定</Button>
        </div>
      </Modal>
      <Modal v-model="isMoreModal2" title="新增外部导航" width="700">
        <div  class="new-add">
          <div class="new-conten">
            <Form ref="updateRoleForm2" :model="Params" :rules="ruleValidate2">
              <FormItem label="类型：" style="margin-bottom:0px;margin-left: 10px">
                <Select v-model="Params.linkType" clearable style="width:200px;margin-left: 33px" @on-change="getlink">
                  <Option v-for="item in outLink" :value="item.keys" :key="item.keys">{{ item.title }}</Option>
                </Select>
                <span style="width: 100%;color: #ff301f;display: inline-block;text-align: center">{{errWof}}</span>
              </FormItem>
              <FormItem label="单位名称：" prop="linkName">
                <Input v-model.trim="Params.linkName" style="width: 200px;margin-left: 10px"/>
              </FormItem>
              <FormItem label="访问地址：" prop="linkAddress" >
                <Input v-model.trim="Params.linkAddress" style="width: 200px;margin-left: 10px"/>
              </FormItem>
            </Form>
          </div>
        </div>
        <div slot="close" @click="moreCloseModel('3')"><Icon type="ios-close"></Icon></div>
        <div slot="footer" style="margin-right: 25px;">
          <Button type="text" @click="moreCloseModel('3')">取消</Button>
          <Button type="primary" @click="morePartSubmit('4')" v-if="!isEdit2">确定</Button>
          <Button type="primary" @click="morePartSubmit('5')"v-if="isEdit2">确定</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
  import {appPageData,appSelectData,upDtaAppPage,changeIds,deleteApptData,upAppPage,appSearch,outLinkPage,outLinkList,
    deleteLink,addLink,updateLink,linkCahngeIds,linkSearch} from '../../../service/index'
  import {process_error} from '@/config/process_request_conf'
  export default {
        name: "application-of-system",
        data(){
          return{
            appsrc:'',
            pciMsg:'',
            errWeb:'',
            pic:'',
            systemName:'',
            linkNames:'',
            type1:'',
            isEdit:false,
            isEdit2:false,
            isApp:true,
            form1:true,
            sendIds:[],
            sendPic:[],
            form2:false,
            isMoreModal1:false,
            isMoreModal2:false,
            applist:[],
            outLink:[],
            APPKey: '',
            pageParams:{
              pageSize:15,
              current:1,
              total:30
            },
            link:{
              pageSize:15,
              current:1,
              total:30
            },
            updateParam:{
              sysName:'',
              sysAddress:'',
              sysType:'',
              syspic:''
            },
            Params:{
              linkName:'',
              linkAddress:'',
              linkType:'',
            },
            ruleValidate1:{
              sysName: [
                {
                  required: true,
                  whitespace: true,
                  // transform: value => value ? value.trim() : '',
                  max: 30,
                  message: '系统名称不能为空且不能超过20个汉字',
                  trigger: 'blur'
                }
              ],
              sysAddress:[
                {
                  required: true,
                  whitespace: true,
                  // transform: value => value ? value.trim() : '',
                  // max: 30,
                  message: '地址不能为空',
                  trigger: 'blur'
                }
              ],

              syspic:[
                {
                  required: true,
                  whitespace: true,
                  // transform: value => value ? value.trim() : '',
                  // max: 30,
                  message: '图标不能为空',
                  trigger: 'blur'
                }
              ]
            },
            ruleValidate2:{
              linkName: [
                {
                  required: true,
                  whitespace: true,
                  transform: value => value ? value.trim() : '',
                  max: 30,
                  message: '名称不能为空且不能超过20个汉字',
                  trigger: 'blur'
                }
              ],
              linkAddress:[
                {
                  required: true,
                  whitespace: true,
                  transform: value => value ? value.trim() : '',
                  // max: 30,
                  message: '地址不能为空',
                  trigger: 'blur'
                }
              ],
              linkType:[
                {
                  required: true,
                  whitespace: true,
                  transform: value => value ? value.trim() : '',
                  // max: 30,
                  message: '类型不能为空',
                  trigger: 'blur'
                }
              ]
            },
            currentColumns:this.columns2,
            currentData:this.data1,
            data1:[

            ],
            columns2:[
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
                "title":"系统图标",
                // "key":"name",
                render:(h,params) => {
                  return h('div',
                    {
                      attrs:{
                        style:'width:25px;height:25px'
                      }
                    },
                    [
                   h('img',{
                     props:{
                       type:'primary',
                       size:'small'
                     },
                     attrs:{
                       src:params.row.images,style:'width:25px;height:25px'
                     }
                   })
                  ])
                } ,
              },
              {
                "title":"系统名称",
                "key":"name",
                "align":'center',
              },
              {
                "title":"地址",
                "key":"url",
                "align":'center',
              },
              {
                "title":"适配浏览器",

                "key":"val",
                render:(h,params) => {
                  if(params.row.des.descs){
                    return h('div', [
                        h('span',{
                        },params.row.des.descs)
                      ]
                    )
                  }

                } ,
                "align":'center',
              },
              {
                "title":"自定义排序",
                 'width':'100',
                 slot:'handel',
                "align":'center',
              },
              {
                "title":"编号",
                "key":"serial",
                "align":'center',
              },

              {
                "title":"操作",
                slot: 'action',
                "align":'center',
              },
            ],
            columns3:[
              {
                // type: 'index',
                title: "序号",
                width: 90,
                align: 'center',
                render:(h,params) => {
                  return h('div',[
                    h('span',(params.index+1)+this.link.pageSize*(this.link.current-1)),
                  ])
                } ,
              },
              {
                "title":"类型",
                "key":"type",
                render:(h,params) => {
                  if(params.row.type.descs!=null){
                    return h('div', [
                        h('span',{
                        },params.row.type.descs)
                      ]
                    )
                  }
                } ,
                "align":'center',
              },
              {
                "title":"单位名称",
                "key":"name",
                "align":'center',
              },
              {
                "title":"访问地址",
                "key":"url",
                "align":'center',
              },
              {
                "title":"自定义排序",
                'width':'100',
                slot:'handel',
                "align":'center',
              },
              {
                "title":"编号",
                "key":"serial",
                "align":'center',
              },

              {
                "title":"操作",
                slot: 'action',
                "align":'center',
              },
            ],
            appId:'' ,//应用平台编辑id
            linkId:'', //外部导航id
            isNewImg:false,
            errWof:'',
            isrest:false
          }
        },
        watch:{
          '$route.query.type'(){
            if(this.$route.query.type=='app'){
              let sendData={
                sort:'serial,asc',
                size :this.pageParams.pageSize,
                current:this.pageParams.current
              }
              this.getAppPageData(sendData)
              this.getAppSelectData()
              this.isApp=true;
            }else {
              this.outLinkList()
              let data={
                name:this.linkNames,
                type1: this.type1,
                sort:'serial,asc',
                size :this.link.pageSize,
                current:this.link.current
              }
              this.outLinkPage(data)
              this.isApp=false;
            }
          }
        },
        created(){

        },
        mounted(){
          if(this.$route.query.type=='app'){
            let sendData={
              sort:'serial,asc',
              size :this.pageParams.pageSize,
              current:this.pageParams.current
            }
            this.getAppPageData(sendData)
            this.getAppSelectData()
            this.isApp=true;
          }else {

            this.isApp=false;
            let data={
              name:this.linkNames,
              type1: this.type1,
              sort:'serial,asc',
              size :this.link.pageSize,
              current:this.link.current
            }
            this.outLinkList()
            this.outLinkPage(data)
          }
        },
        methods:{


          getlink(value){
            if(value!=undefined){
              this.errWof='';
            }
          },
          getKey(value){
            if(value!=undefined){
              this.errWeb='';
            }
          },
          //查询
          searchMro(){
           if(this.$route.query.type=='app'){
             this.pageParams.current=1;
             if(this.APPKey==undefined){
               this.APPKey="";
             }
             let data={
               name:this.systemName,
               des1: this.APPKey,
               sort:'serial,asc',
               size :this.pageParams.pageSize,
               current:this.pageParams.current
             }

            this.appSearch(data)
           }else if(this.$route.query.type=='nav'){
             if(this.type1==undefined){
               this.type1="";
             }
             this.link.current=1;
             let data2={
               name:this.linkNames,
               type1: this.type1,
               sort:'serial,asc',
               size :this.link.pageSize,
               current:this.link.current
             }
             this.linkSearch(data2)
           }
          },
          //应用平台查询
          async appSearch(data){
            try {
              let res =await appSearch(data);
                if(res.statusCode !== 200) return process_error(res);
              this.currentData=res.data.content;
              this.pageParams.total=res.data.totalElements;
              this.pageParams.pageSize=res.data.size
            }catch (err){
              //console.log(err)
            }
          },
          //平台查询重置
          restMyInfo(){

            if(this.$route.query.type=='app'){
              this.pageParams.current=1;
              this.systemName="";
              this.APPKey="";
              let sendData={
                sort:'serial,asc',
                size :this.pageParams.pageSize,
                current:1
              }
              this.getAppPageData(sendData)
            }else if(this.$route.query.type=='nav'){
              this.link.current=1;
                this.isrest=true;
                this.linkNames='';
                this.type1='';
                 let data2={
                name:this.linkNames,
                type1:this.type1,
                sort:'serial,asc',
                size :this.link.pageSize,
                current:1
              }
              this.outLinkPage(data2)
            }
          },
          //上传图片
          imgChange(e){
            this.pciMsg='';
            var file=e.target.files[0];
            this.updateParam.syspic=e.target.files[0].name
            var reader =new FileReader();
            reader.readAsDataURL(file);
            reader.onload=function (e) {
              this.appsrc=e.target.result;
              $('#imgs').css({'background-image':"url('"+ this.appsrc +"')",backgroundSize:'100% 100%'});
            }
          },
          //新增配置
          showAddModal(){
            if(this.$route.query.type=='app'){
              this.isNewImg=true;
              this.isMoreModal1=true;
            }else {
              this.isMoreModal2=true;
              this.isNewImg=false;
            }
          },

          //获取应用平台分页数据
          async getAppPageData(sendData){
              try{
                let res = await appPageData(sendData)
                if(res.statusCode !== 200) return process_error(res);
                if(res.data!=undefined){
                  this.currentData=res.data.content;
                  this.currentColumns=this.columns2
                }
                this.pageParams.total=res.data.totalElements;
                this.pageParams.pageSize=res.data.size
                this.moreCloseModel()
              }catch (err){
                //console.log(err)
              }
          },
          //获取应用平台下拉数据
          async  getAppSelectData(){
            try {
              let res =await appSelectData()
              if(res.statusCode !== 200) return process_error(res);
              this.applist=res.data

            }catch (err){
              //console.log(err)
            }
          },

          //删除
          delRow(id){
            if(this.$route.query.type=='app'){
              this.$Modal.confirm({
                title:'确认删除',
                content:'是否确认删除当前选中的配置系统',
                onOk: ()=>{
                  this.deleteApptData(id)
                },
                onCancel:()=>{
                  this.$Message.info('取消删除成功')
                }
              })
            }else {
              this.$Modal.confirm({
                title:'确认删除',
                content:'是否确认删除当前选中的外部导航',
                onOk: ()=>{
                  this.deleteLink(id)
                },
                onCancel:()=>{
                  this.$Message.info('取消删除成功')
                }
              })
            }
          },
          //应用平台删除
          async deleteApptData(id){
            try {
              let res=await deleteApptData(id)
              if(res.statusCode !== 200) return process_error(res);
              this.$Message.success("删除成功！")
              this.isMoreModal1=false;
              let sendData={
                sort:'serial,asc',
                size :this.pageParams.pageSize,
                current:this.pageParams.current
              }
              this.getAppPageData(sendData)
            }catch (err){
              //console.log(err)
            }
          },
           //确定
          morePartSubmit(type){
            if(this.$route.query.type=='app'){
              let pic=document.getElementById("imgs").style.backgroundImage
              this.pic=pic.split('"')[1]
              if(this.pic==='NaN'){
                this.pciMsg='系统图标不能为空'
                return;
              }
              if(this.updateParam.sysType==''){
                this.errWeb='浏览器类型不能为空';
                return
              }
              this.$refs["updateRoleForm"].validate((valid)=>{
                if(valid&&this.pic!='NaN'&&this.errWeb==''){
                  this.pciMsg='';
                  switch (type){
                    case "1":
                      let data1={
                        des:{
                          keys:this.updateParam.sysType
                        },
                        images:this.pic,
                        name:this.updateParam.sysName,
                        url:this.updateParam.sysAddress
                      }
                      this.upDtaAppPage(data1)
                      break;
                    case "2":
                      let data2={
                        id:this.appId,
                        des:{
                          keys:this.updateParam.sysType
                        },
                        images:this.pic,
                        name:this.updateParam.sysName,
                        url:this.updateParam.sysAddress
                      }
                      this.upAppPage(data2)
                      break;
                  }
                }
              })
            }else if(this.$route.query.type=='nav') {
              if(this.Params.linkType==''){
                this.errWof='类型不能为空'
                return
              }
              this.$refs["updateRoleForm2"].validate((valid)=>{
                if(valid&&this.errWof==''){
                  switch (type){
                    case '4':
                      let linkdata={
                        type:{
                          keys:this.Params.linkType
                        },
                        name:this.Params.linkName,
                        url:this.Params.linkAddress
                      }
                      this.addLink(linkdata)
                      break;
                    case '5':
                      let linkdata2={
                        id:this.linkId,
                        type:{
                          keys:this.Params.linkType
                        },
                        name:this.Params.linkName,
                        url:this.Params.linkAddress
                      }
                      this.updateLink(linkdata2)
                      break;
                  }
                }
              })
            }
          },


          //编辑修改应用平台
          async upAppPage(data){
           try {
             let res =await upAppPage(data)
             if(res.statusCode !== 200) return process_error(res);
             this.$Message.success("修改成功！")
             this.pic=''
             this.moreCloseModel()
             let sendData={
               sort:'serial,asc',
               size :this.pageParams.pageSize,
               current:this.pageParams.current
             }
             this.getAppPageData(sendData)
           }catch (err){
             //console.log(err)
           }
          },
          //新增应用平台
          async upDtaAppPage(data){
            try {
              let res =await upDtaAppPage(data)
              if(res.statusCode !== 200) return process_error(res);
              this.$Message.success("新增成功！")
              this.pic='';
              let sendData={
                sort:'serial,asc',
                size :this.pageParams.pageSize,
                current:this.pageParams.current
              }
              this.getAppPageData(sendData)
            }catch (err){
              //console.log(err)
            }
          },
         //关闭，取消
          moreCloseModel(){
            if(this.$route.query.type=='app'){
              this.isMoreModal1=false;
              this.updateParam={
                sysName:'',
                sysAddress:'',
                sysType:'',
                syspic:''
              }
              this.appId='';
              this.pciMsg='';
              this.errWeb='';
                // this.appsrc='';
              document.getElementById("files")&&document.getElementById("files").reset();
              $('#imgs').css({'background-image':"url('"+ +"')"});
            }else {
              this.isMoreModal2=false;
              this.linkId='';
              this.errWof='';
              this.Params={
                linkType:'',
                linkAddress:'',
                linkName:'',
              }
            }

          },
          //分页平台
          ChangePageare(current){
            if(this.$route.query.type=='app'){
              this.pageParams.current=current;
              let sendData={
                sort:'serial,asc',
                size :this.pageParams.pageSize,
                current:this.pageParams.current
              }
              this.getAppPageData(sendData)
            }
          },
          //外部导航分页
          ChangePageareLink(current){
            if(this.type1==undefined){
              this.type1=""
            }
           if(this.$route.query.type=='nav'){
             this.link.current=current;
             let linkData={
               name:this.linkNames,
               type1:this.type1,
               sort:'serial,asc',
               size :this.link.pageSize,
               current:this.link.current
             }
             this.outLinkPage(linkData)
           }
           },
          //编辑按钮
          editData(row){
            if(this.$route.query.type=='app'){
              this.isApp=true;
              this.isEdit=true;
              this.isEdit2=false;
              this.appId=row.id;
              $('#imgs').css({'background-image':"url('"+ row.images +"')",backgroundSize:'100% 100%'});
              this.updateParam={
                sysName:row.name,
                sysAddress:row.url,
                sysType:row.des.keys,
                sysNumber:row.serial
              }
              this.isMoreModal1=true;
            }else if(this.$route.query.type=='nav'){
              this.isEdit=false;
              this.isEdit2=true;
              this.linkId=row.id;
              this.Params={
                linkName:row.name,
                linkAddress:row.url,
                linkType:row.type.keys,
              }
              this.isApp=false;
              this.isMoreModal2=true;
            }
          },

          //升降序
          userEdit(type,id){
            if(this.$route.query.type=='app'){
              this.changeIds(type,id)
            }else if(this.$route.query.type=='nav'){
             this.linkCahngeIds(type,id)
            }

          },

          //应用平台自定义交换顺序
          async changeIds(type, id){
            try {
              let res= await changeIds(type, id)
              if(res.statusCode !== 200) return process_error(res);
               if(res.data.createUID==undefined){
                 this.$Message.success("当前数据为最大或者最小数据！")
               }else {
                 this.$Message.success("顺序交换成功！")
               }
              let sendData={
                sort:'serial,asc',
                size :this.pageParams.pageSize,
                current:this.pageParams.current
              }
              this.getAppPageData(sendData)
            }catch (err){
              //console.log(err)
            }
          },

          //外部导航自定义排序
          async linkCahngeIds(type, id){
            try {
              let res= await linkCahngeIds(type, id)
              if(res.statusCode !== 200) return process_error(res);
              if(res.data.createUID==undefined){
                this.$Message.success("当前数据为最大或者最小数据！")
              }else {
                this.$Message.success("顺序交换成功！")
              }
              let data={
                name:this.linkNames,
                type1: this.type1,
                sort:'serial,asc',
                size :this.link.pageSize,
                current:this.link.current
              }
              this.outLinkPage(data)
            }catch (err){
              //console.log(err)
            }
          },
          //外部导航分页数据
          async outLinkPage(data){
            try {
              let  res =await outLinkPage(data)
              if(res.statusCode !== 200) return process_error(res);
              this.currentData=res.data.content;
              this.currentColumns=this.columns3
              this.link.total=res.data.totalElements;
              this.link.pageSize=res.data.size
            }catch (err){

            }
          },
          //外部导航全量下拉数据
          async outLinkList(){
            try {
             let res = await outLinkList()
              if(res.statusCode !== 200) return process_error(res);
               this.outLink=res.data
            }catch(err) {
               //console.log(err)
            }
          },
          //外部导航表格删除
         async deleteLink(id){
           try {
             let res=await deleteLink(id)
             if(res.statusCode !== 200) return process_error(res);
             this.$Message.success("删除成功！")
             this.isMoreModal2=false;
             let data={
               name:this.linkNames,
               type1: this.type1,
               sort:'serial,asc',
               size :this.link.pageSize,
               current:this.link.current
             }
             this.outLinkPage(data)
           }catch (err){
             //console.log(err)
           }
         },
          //新增外部导航
         async addLink(data){
           try {
             let res =await addLink(data)
             if(res.statusCode !== 200) return process_error(res);
             this.$Message.success("新增成功！")
             this.moreCloseModel()
             let data2={
               name:this.linkNames,
               type1: this.type1,
               sort:'serial,asc',
               size :this.link.pageSize,
               current:this.link.current
             }
             this.outLinkPage(data2)
           }catch (err){
             //console.log(err)
           }
         },
          //外部导航编辑
         async updateLink(updata){
            try {
              let res= await updateLink(updata)
              if(res.statusCode !== 200) return process_error(res);
              this.$Message.success("编辑成功！")
              this.moreCloseModel()
              let data2={
                name:this.linkNames,
                type1: this.type1,
                sort:'serial,asc',
                size :this.link.pageSize,
                current:this.link.current
              }
              this.outLinkPage(data2)
            }catch (err) {
              //console.log(err)
            }
        },
        //外部导航搜索
        async linkSearch(data){
          try {
            let res =await linkSearch(data);
            if(res.statusCode !== 200) return process_error(res);
            this.currentData=res.data.content;
            this.link.total=res.data.totalElements;
            this.link.pageSize=res.data.size
          }catch (err){
            //console.log(err)
          }
        }
      }
    }
</script>

<style scoped lang="less">
#cls-application{
  width: 100%;
  height:calc(100% - 50px);
  padding:15px;

 .cls-application-content{
   width: 100%;
   height: 100%;
   /*background: #0e2456;*/
   overflow: hidden;
   .app-search{
     width: 100%;
     margin-top: 20px;
     display: flex;
     .app-btn{
       width: 40%;

     }
   }
 }
}
.app-content {
  margin-top: 15px;
  width: 100%;
  height: calc(100% - 150px);
}

.app-table{
    width: 100%;
    height:calc(100% - 55px);
    overflow: auto;
  }

.app-page{
  margin-top: 5px;
  width: 100%;
  height: 50px;
}
.cls-application-content .ivu-btn {
  background: #6b8caf;
  color: #f5f7f9;
}
.new-add{
  padding:5px;
  width: 100%;
  height: 300px;
  .new-conten{
    margin:0 auto;
    width:300px;
    height:260px;
  }
}
.cls-img{
  width:100%;
  height:60px;
  /*background: #0e2456;*/
}
#imgs{
  margin-left: 20px;
  background-size:cover;
  background: no-repeat;
}
</style>
