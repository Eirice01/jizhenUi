<template>
    <div class="ocapList">
      <ul style="width: 96%;margin-left: 40px;margin-top: 5px;">
        <li v-for="(item,index) in ocapListData" @click="goPages(item.des,item.url,item.name)" :key="index" style="font-family: 'Microsoft YaHei';font-weight:700;color: #2582ff;height: 100px;font-size: 16px;list-style: none;display:inline-block;width:150px;vertical-align:bottom;background:#f6f6f6;margin-right:10px;margin-bottom:10px;text-align:center;cursor: pointer">
          <img :src="item.image" alt="" style="margin-top: 8px;width: 40px;height: 40px;display:inline-block;"><br>
          <span style="margin-top:10px;display:inline-block;" v-if="item.name.length <=6">{{item.name}}</span>
          <span   v-else>
              <span>{{item.name.slice(0,6)}}</span> <br>
              <span>{{item.name.slice(6)}}</span>
          </span>
        </li>
        <li  style="font-family: 'Microsoft YaHei';font-weight:700;color: #2582ff;height: 100px;font-size: 16px;list-style: none;display:inline-block;width:150px;background:#f6f6f6;margin-right:10px;margin-bottom:10px;line-height:100px;text-align:center;cursor: pointer">
          <span style="cursor: pointer;color: #2582ff" @click="goPtDetailPage()">更多>></span>
        </li>
      </ul>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        name: "ocapList",
        //props:['ocapListData'],
        data() {
            return {
              ocapListData:[],
              urls:''
            }
        },
        mounted(){
          this.getPingtaiList(3)

        },
        methods: {
          goPtDetailPage(){
            this.$emit("goPtDetailPage")
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

              }
        }
    }
</script>

<style scoped lang="less">

</style>
