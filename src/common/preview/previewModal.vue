<template>
    <div id="cls-preview">
      <Modal
        v-model="getperviewModalState"
        width="960"
      >
       <div class="cls-preview-content">
         <div class="pre-title">
           <h1 v-if="title.length==1" style="font-size:30px;font-weight: 700">{{title[0]}}</h1>
           <!--<span>公安网站是是是11阿萨斯</span>-->
           <p v-else v-for="item in title">
             {{item}}
           </p>
         </div>
         <div class="per-info">
           <span style="margin-right: 20px">发布机构：{{depPart}}</span>
           <span>来源信息：{{isType}}</span>
           <span style="margin-left: 20px">创建时间：{{createTimes}}</span>
         </div>
         <div v-html="showhtml" class="pre-content"></div>
       </div>
        <div slot="footer" style="margin-right: 25px;">
          <!--<Button type="text" @click="closeModel">取消</Button>-->
          <!--<Button type="primary" @click="partSubmit">确定</Button>-->
        </div>
      </Modal>
    </div>
</template>

<script>
    export default {
        name: "preview-modal",
        data(){
          return{
            showhtml:'',
            createTimes:'',
            title:'',
            isType:'',
            depPart:''
          }
        },

      computed: {
        //弹窗显示状态改变
        getperviewModalState: {
          get: function () {
            return this.$store.state.previewModal;
          },
          set: function () {
            this.$store.commit("showPreviewModal");
          }
        },
      },
      methods:{
       getShowHtml(html){
         this.showhtml=html;
       }
      }
    }
</script>

<style scoped>
#cls-preview{
  width: 100%;
  padding:15px;
}
.cls-preview-content{
  width: 100%;
  height:600px;
  /*text-align: center;*/
  /*background: #00cc66;*/
}
.pre-content{
  width: 100%;
  height:550px;
  overflow: auto;
}
.pre-title{
  width: 100%;
  font-size: 30px;
  font-weight: bold;
  color: #2b85e4;
  text-align: center;
  margin-top:32px;
}
.per-info{
  text-align: center;
  width: 100%;
  font-size: 18px;
  border-bottom: 1px solid #aebed2;
  margin-top:10px;
  margin-bottom:10px;
}
</style>
<style>
  .ivu-modal-content .ivu-modal-body{
   font-size: 16px!important;
  }
</style>
