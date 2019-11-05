<template>
  <div class="listing">
    <ul class="uls" style="cursor: pointer;font-family: 'Microsoft YaHei!important';" >
      <li v-for="(item,index) in listData" :key="index" @click="lookDetail(item.id)" style=" width: 100%;height: 32px;line-height:32px;float: left;list-style: none;font-size: 14px;color: #092e54;">
        <div class="liDiv" style="float: left;width: 77%; margin-left:5px;">
          <!--最新-->
          <div class="imgcla" style="float: left;width: 40px;line-height: 30px;margin-right:3px;" v-for="n in imgData">
            <img :src="n.img" alt="" v-if="item.createtime.split(' ')[0] >= ctime && item.top ==='0'">
          </div>
          <!--...-->
          <div class="imgcla" style="float: left;width: 40px;line-height: 14px;font-size: 34px;text-align: center;color: #a5a6a7"  v-if="item.createtime.split(' ')[0] < ctime && item.top ==='0'">
            .
          </div>
          <!--置顶-->
          <!--<div class="imgcla" style="border:1px solid #bb1313;float: left;width: 38px;line-height: 16px;font-size: 12px;text-align: center;color:#bb1313;margin-right: 5px;margin-top: 8px;font-weight:300;border-radius: 4px;" v-if="item.top ==='1'">
            置顶-->
          <div class="imgcla" style="float: left;width: 38px;line-height: 16px;font-size: 12px;text-align: center;color:#bb1313;margin-right: 5px;margin-top: 7px;font-weight:300;border-radius: 4px;" v-if="item.top ==='1'">
            <svg class="icon" width="35px" height="15px" viewBox="0 0 1152 1024" version="1.1" >
              <path d="M0 512c0-140.8 115.2-256 256-256h640c140.8 0 256 115.2 256 256s-115.2 256-256 256H256c-140.8 0-256-115.2-256-256z" fill="#F66C23" transform="matrix(1.8 0 0 1.85 -450 -450)"/>
              <text x="50" y="650" fill="#FFFFFF" style="font: italic 514px 'Microsoft Yahei';">置顶</text>
            </svg>
          </div>
          <span style="font-weight: 700;width: 86%;display:block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;float: left" :title="item.title.split('#')[0]" v-if="item.top ==='1'">{{item.title.split('#')[0]}}</span>
          <span style="width: 86%;display:block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;float: left" :title="item.title.split('#')[0]" v-if="item.createtime.split(' ')[0] >= ctime && item.top ==='0'">{{item.title.split('#')[0]}}</span>
          <span style="width: 86%;display:block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;float: left" :title="item.title.split('#')[0]" v-if="item.createtime.split(' ')[0] < ctime && item.top ==='0'">{{item.title.split('#')[0]}}</span>
        </div>
        <span style="float: right;color: gray;margin-right: 15px;">{{item.createtime.split(" ")[0]}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: "listing",
    props:['listData',],
    data() {
      return {
        ctime:"",//当前时间前三天内
        imgData:[
          {
            img:require("@/assets/images/news.gif")
          }
        ],
      }
    },
    mounted(){
        this. currentDate(-3)
    },
    created(){

    },
    methods: {
      //获取当前时间几天天内时间
      currentDate(aa){
        var date1 = new Date();
        var date2 = new Date(date1);
        date2.setDate(date1.getDate()+aa);
        this.ctime = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate()
      },
      lookDetail(id) {
        let router = this.$router.resolve({path: "/details", query: {text: "通知通告", id: id}});
        window.open(router.href,'_blank')//跳转新指定页面
      },
    }
  }
</script>

<style scoped lang="less">
    .xtx-small { font: italic 310px 'Microsoft Yahei'; }
</style>

