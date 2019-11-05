<template>
      <div class="detail" style="height: 100%;background: white;">
        <!--顶部导航-->
        <div class="detail-nav" style="width: 100%;height: 50px">
           <nav-bar></nav-bar>
        </div>
        <!--面包屑导航-->
        <div class="">
            <Breadcrumb separator="" style="height: 40px;line-height: 40px;font-size: 16px">
              <img src="../../assets/images/weizhi.gif" alt="">&nbsp;
              <BreadcrumbItem>当前位置 :</BreadcrumbItem>
              <BreadcrumbItem>首页&nbsp;&nbsp;></BreadcrumbItem>
              <span @click="backupPage" style="cursor: pointer">{{title}}</span>
            </Breadcrumb>
         </div>
        <!--详情页内容-->
        <div class="detail-content" style="width: 100%;height: 100%">
            <div class="main"  style="width: 86%;margin: auto;min-height:800px;border:1px solid #ccc;padding: 20px;margin-top: 20px;margin-bottom: 10px">
              <p style="font-size: 30px;  color: #087aed;font-weight: 700;text-align: center;" v-if="title1.length==='1'">{{title1[0]}}</p>
              <p style="font-size: 30px;  color: #087aed;font-weight: 700;text-align: center;" v-for="item in title1" v-else>{{item}}</p>
              <p style="text-align: center;margin: 10px 0;font-size: 18px;border-bottom: 1px solid #ccc" v-if="contData.userid">发布机构:&nbsp;&nbsp;{{contData.userid.departName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间:&nbsp;&nbsp;{{contData.createTime}}</p>
              <div class="mian-body" v-html="contData.contents" style="height: auto;padding-bottom: 10px;margin-bottom: 10px"></div>
            </div>
           <div style="width: 100%;margin-top: 5px;padding-left: 100px;padding-bottom: 10px" v-if="newTep.length==0?false:true">
             <span style="color: black;font-size: 28px;display: block">附件下载：</span>
             <a  style="display: block" v-for="(item,index) in newTep " :key="index"
                :href="`/api/jzweb/word/fileDownload?fileBs=${item.fileBs}&fileName=${item.fileName}`"
                :download="item.fileName">
               {{item.fileName}}
             </a>
           </div>
        </div>
      </div>
</template>

<script>
    import bus from '../../assets/eventBus'
    import $ from 'jquery'
    import NavBar from "../../common/index/navBar";
    import {process_error} from '@/config/process_request_conf'
    export default {
      components: {NavBar},
      name: "detail",
        data() {
            return {
              current:this.$route.query.current,
              title:"", //二级导航title
              title1:'',
              contData:{},//详情页内容
              newTep:[]
            }
        },
        mounted(){
          this.lookDetails()
        },
        created(){
        },

        methods: {
          //返回上一页
          backupPage(){
            let index = '';
            switch (this.title){
              case '图片新闻':
                index = 1
                break;
              case '工作动态':
                index = 2
                break;
              case '科技动态':
                index = 3
                break;
              case '通知通告':
                index = 4
                break;
            }
            this.$router.push({path:"/infolist",query:{text:this.title,index:index,current:this.current}})
          },
          //查看通知详情
          lookDetails(){
            var _this=this
            $.get(`/api/jzweb/word/viewWord?id=${this.$route.query.id}`,function(res){
              if(res.statusCode !== 200) return process_error(res);
              _this.contData = res.data;
              _this.title1= _this.contData.title.split("#");
              _this.title =res.data.type.title;
              let tep=_this.contData.files;
              _this.newTep=[];
              if(tep!=null){
                tep=tep.split(";")
                for(let i=0;i<tep.length;i++){
                  _this.newTep.push({
                    fileBs: tep[i].split(',')[0],
                    fileName:tep[i].split(',')[1]
                  })
                }
              }

            })
          }
        }
    }
</script>

<style scoped lang="less">

</style>
<style>

</style>
