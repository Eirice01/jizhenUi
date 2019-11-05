<template>
  <div class="ocapListing">
    <ul style="width: 100%;margin-left: 50px;margin-top: 30px;">
      <li v-for="(item,index) in ocapListData" @mouseenter="changeStyle($event)" @mouseleave="removeStyle($event)" @click="goPages(item.des,item.url,item.name)":key="index" style="height: 120px;font-size: 16px;width:300px;list-style: none;background:#f6f6f6;cursor: pointer;text-align:center;display:inline-block;margin-right:20px;margin-bottom:20px;">
        <img :src="item.image" alt="" style="margin-top: 15px;display:inline-block;width: 50px;height:50px"><br>
        <span  style="line-height: 60px">{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: "ocapListing",
    data() {
      return {
        ocapListData:[]
      }
    },
    mounted(){
      this.getPingtaiList(50)
    },
    methods: {
       changeStyle(e){
            e.target.style.fontWeight = '700';
            e.target.style.color = 'whitesmoke';
            e.target.style.background = '#619cda';
        },
          //鼠标移出
        removeStyle(e){
          e.target.style.fontWeight = '100';
          e.target.style.color = 'black';
          e.target.style.background = '#f6f6f6';
         //e.target.style.background = '#0076aa';
        },

      goPages(des,url,name){
        var type= this.myBrowser();
        if(des.descs=='IE'&&type=='IE'){
          window.open(url);
        } else if(des.descs=='Chrome' && type=='Chrome'){
          window.open(url);
        }else {
          this.$router.push({
            path:'/mianPage',
            query:{
              deg:name,
              degType:des.descs
            }
          })
        }
      },

      //判断当前浏览器类型
      myBrowser() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1
          && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1
          && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1
          && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

        if (isIE) {
          return "IE";
        }
        if (isOpera) {
          return "Opera";
        }
        if (isEdge) {
          return "Edge";
        }
        if (isFF) {
          return "FF";
        }
        if (isSafari) {
          return "Safari";
        }
        if (isChrome) {
          return "Chrome";
        }

      },
      //获取平台外部导航 前几条
      getPingtaiList(cont){
        let count = cont;
        var _this=this
        $.get(`/api/jzweb/platform/getAll?i=${count}`,function(res){
          if(res.statusCode !== 200) return process_error(res);
          _this.ocapListData = res.data
        })
      },
    }
  }
</script>

<style scoped lang="less">

</style>

