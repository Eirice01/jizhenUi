<template>
    <div id="cls-editor">
      <Modal
        v-model="getEditorModalState"
        :title="title"
        width="1000"
        id="add-editor-modal"
      >
        <div id="cls-new-content">
         <div class="cls-type">
              <span class="new-title" style="margin-bottom: 8px;display: block;">
        标题： <Input v-model.trim="newName" placeholder="请输入标题,多个标题请使用'#'分割" style="width: 300px"  @on-change="testName"/>
        </span>
           <span class="type-info" style="margin-left: 70px">新增类型选择：</span>
           <Select v-model="model8"  style="width:200px;z-index: 99999">
             <Option v-for="item in cityList" :value="item.keys" :key="item.keys">{{ item.descs }}</Option>
           </Select>
         </div>
          <span class="cls-msg-erro" >{{erroinfo}} </span>
        <div id="new-info" ref="myEditor"></div>
         <div id="upload">
           <span style="display: block">已上传附件列表：</span>
           <div class="cls-file">
              <li class="cls-file-info" v-for="(item,index) in filelist" :key="index">
                <span class="cls-list" :title="item.fileName">{{item.fileName}}</span>
                <span class="cls-delete" @click="deleteFiles(item.fileBs)"><Icon type="ios-close-circle-outline" title="删除"/></span>
              </li>
           </div>
         </div>
            <span>
                  <Upload :action="`api/jzweb/word/fileUpload`"
                          :on-success="handleSuccess"
                          :before-upload="beforeUpload"
                          :show-upload-list="false">
                <Button type="default" icon="ios-cloud-upload-outline"
                        style="height:32px;width:90px; margin-top:7px;float:left">上传附件
                </Button>
              </Upload>
         </span>
        </div>
        <div slot="close" @click="closeModel"><Icon type="ios-close"></Icon></div>
        <div slot="footer" style="margin-right: 25px;">
          <Button type="text" @click="closeModel">取消</Button>
          <Button type="primary" @click.native="SubmitHtml('1')" v-if="!isEdit">确定</Button>
          <Button type="primary" @click.native="SubmitHtml('2')" v-if="isEdit">确定</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
  import {addMenu,menuSelect,deleteFile,updateMenu} from '../../service/index'
  import {process_error} from '@/config/process_request_conf'
  import E from 'wangEditor'
    export default {
        name: "editor-model",
        data(){
          return{
            isEdit:false,
            filelist:[
            ],
            uploadParams: {
              multipartFile: '',
              nowCount: 0,
            },
            title:'内容编辑',
            newName:'',
            uploadPath:'',
            editData:'',
            editor:'',
            erroinfo:'',
            cityList:this.menuList,
            model8: '',
            upIds:'',
            menuContent:'',
          }
        },
      props:['testData','menuList'],
      computed: {
        //弹窗显示状态改变
        getEditorModalState: {
          get: function () {
            return this.$store.state.addEditorModal;
          },
          set: function () {
            this.$store.commit("showEditorModal");
          }
        },
      },
      created(){
        this.typeSelect()
      },

      mounted(){
        this.intEditor()
      },
      methods:{

         //删除上传附件
         deleteFiles(fileBs){
           // console.log(fileBs)
          this.deleteFile(fileBs)
        },

        //上传前文件大小判定
        beforeUpload(file) {
          let fileSize = file.size;
            if (fileSize < 52428800) {
            } else {
              this.$Message.info("请不要上传超过50MB的文件");
            }
          },

        //上传成功后的回调方法
        handleSuccess(res, file) {
          if(res.statusCode !== 200) return process_error(res);
          this.$Message.success("附件上传成功！")
          this.filelist.push(res.data)
        },
      //成功后利用Promise回调
      //  getParams(file) {
      //   return new Promise((resolve, reject) => {
      //     this.uploadParams.multipartFile = file.name;
      //     this.uploadParams.nowCount = this.numHandler();
      //     resolve()
      //   })
      // },
         //校验标题/类型
         testName(){
          if(this.newName==""){
            this.erroinfo="标题名称不能为空"
          }else if(this.newName.length>200){
            this.erroinfo="标题名称长度不能超过200个字节"
          } else {
            this.erroinfo=""
          }
          // }else if(this.newName.includes(" ")){
          //   this.erroinfo="标题名称不能含有空格"
          // }
         
         },
        //初始化编辑器
        intEditor(html){
          this.editor=new E(this.$refs.myEditor)
          //配置图片上传服务器
          //this.editor.customConfig.uploadImgServer = '/upload'
          //配置菜单
          this.editor.customConfig.menus=[
            'head', //标题
            'blod', //粗体
            'fontSize', //字号
            'fontName',//字体
            'italic',//斜体
            'underline',//下划线
            'strikeThrough',//删除线
            'foreColor',//字体颜色
            'backColor',//背景颜色
            'list',
            'justify',//对齐方式
            'quote', //引用
            'image',
            'table',
            'undo',//撤销
            'redo'//重复
          ]
          //配置字体
          this.editor.customConfig.fontNames=[
           '宋体',
           '微软雅黑',
           '仿宋',
            '楷体',
            '黑体',
            'Arial',
            'Tahoma',
            'Verdana'
          ]
          //字体背景颜色
          this.editor.customConfig.colors=[
            '#000000',
            '#ace',
            '#666',
            '#fff',
            '#1c487f',
            '#4d80bf',
            '#c24f4a',
            '#8baa4a',
            '#7b5ba1',
            '#46acc8',
            '#f9963b',
            '#9900cc',
            '#169bd5',
            '#ff0000',
            '#008000',
            '#cccccc',
            '#c24f50'
          ]
          this.editor.customConfig.uploadImgShowBase64=true //保存图片64位;
          this.editor.customConfig.onchange=(html) => {
            //替换掉字符串中的双引号
            html=html.replace(/\"/g,"'")
            this.editData=html;

          }
          this.editor.create()
          if(html!=''){
            this.editor.txt.html(html)
          }
        },
          //取消关闭
        closeModel(){
          this.editor.txt.clear()
          this.menuContent='';
          this.upIds='';
          this.erroinfo="";
          this.model8="";
          this.newName="";
          this.filelist=[];
          this.$store.commit("showEditorModal",false);
        },
        //提交
        SubmitHtml(type){
          let flies=[];
         if(this.model8==""){
           this.erroinfo="类型选择不能为空";
         }else if(this.newName==""){
           this.erroinfo="标题不能为空";
          }else if(this.model8==""&&this.newName==""){
           this.erroinfo="请填写标题并选择一个类型";
         }
         else {
            switch (type){
              case '1':
                if(this.filelist.length!=0){
                  for(let i in this.filelist){
                    flies.push(this.filelist[i].fileBs+','+this.filelist[i].fileName)
                  }
                  flies=flies.join(";")
                }else {
                  flies=''
                }
                this.erroinfo="";
                let  send={
                  contents:this.editData,
                  files:flies,
                  publishflag:0,
                  top:0,
                  title:this.newName,
                  type:{
                    keys:this.model8
                  }
                }
                this.addMenu(send)
              break;
              case '2':
                if(this.filelist.length!=0){
                  for(let i in this.filelist){
                    flies.push(this.filelist[i].fileBs+','+this.filelist[i].fileName)
                  }
                  flies=flies.join(";")
                }else {
                  flies=''
                }
                this.erroinfo="";
               let html='';
                html=this.editor.txt.html();
                this.editData=html.replace(/\"/g,"'")

                let  send2={
                  contents:this.editData,
                  files:flies,
                  id:this.upIds,
                  publishflag:0,
                  top:0,
                  title:this.newName,
                  type:{
                    keys:this.model8
                  }
                }
              this.updateMenu(send2)
            }

         }
        },
        //新增内容
        async addMenu(dats){
           try {
             let res =await addMenu(dats)
             if(res.statusCode !== 200) return process_error(res);
             this.$Message.success('新增内容成功!');
             this.closeModel()
             let sendData={
               top:'',
               type1:'',
               title: '',
               sort:'createTime,desc',
               size :10,
               current:1
             }
             this.$emit('menuPage',sendData)
           }catch(err) {
             //console.log(err)
           }
        },

        //内容编辑
        async updateMenu(update){
          try {
            let res =await updateMenu(update)
            if(res.statusCode !== 200) return process_error(res);
            this.$Message.success('编辑内容成功!');
            this.closeModel()
            let sendData={
              type1:'',
              title: '',
              top:'',
              sort:'createTime,desc',
              size :10,
              current:1
            }
            this.$emit('menuPage',sendData)
          }catch(err) {
            //console.log(err)
          }
        },
        //获取内容类型下拉列表
        async  typeSelect(){
          try {
            let res =await menuSelect()
            if(res.statusCode !== 200) return process_error(res);
            this.cityList=res.data

          }catch (err){
            //console.log(err)
          }
        },
        //附件删除
        async deleteFile(name){
           try{
             let res =await deleteFile(name)
             if(res.statusCode !== 200) return process_error(res);
             this.$Message.success('删除成功!');
             for(let i in this.filelist){
               if(this.filelist[i].fileBs==name){
                 this.filelist.splice(i,1)
               }
             }
           }catch (err){
            //console.log(err)
           }
        },

      }
    }
</script>

<style scoped lang="less">
#cls-new-content{
  width: 100%;
  padding:0px 8px;
  box-sizing: border-box;
  height: 700px;
  .new-line{
    display: inline-block;
    width: 100%;
    height: 2px;
    border-bottom: 1px dashed #1c2438;
  }
  .line-info{
    width: 100%;
    display: inline-block;
    text-align: center;
    font-size: 18px;
    font-weight:700;
  }
}
#new-info{
  width: 100%;
  margin:0 auto;
  height:calc(100% - 180px);
  overflow: auto;
  background: #fff;
}

.cls-type{
  width: 100%;
  height: 50px;
  /*margin-bottom: 15px;*/
  display: flex;
  align-items: center;
}
.cls-msg-erro{
  display: inline-block;
  width: 50%;
  height: 10px;
  color: #c5150f;
  font-size: 8px;
  text-align: center;
  margin-bottom: 5px;
}
#upload{
  width: 80%;
  float: left;
  height:100px;
  /*background: #0e2456;*/
  /*overflow: auto;*/
}
.cls-file{
  width: 90%;
  height:calc(100% - 13px);
  overflow: auto;
}
.cls-file-info{
  width: 100%;
  border: 1px dashed #8897ab;
  display: flex;
  span{
    display: block;
  }
}
.cls-list{
  width: 60%;
  color: #485a6e;
  font-size:14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.cls-delete{
  font-size: 14px;
  cursor: pointer;
  .ivu-icon{
    background: #ff481b;
    color: black;
    border-radius: 50%;
  }
}
</style>
<style>
  .w-e-text-container{
    height: 480px!important;
    overflow: auto;
  }
</style>
