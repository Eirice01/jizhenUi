<template>
  <div class="headers" :style="{background:'url(' +require('../../assets/images/header1.png')+')',backgroundSize:'100% 100%',height:'190px',minWidth:'1170px'}">
    <div class="header-content" style="width: 1110px;height: 190px;margin: 0 auto">
      <div class="header-top" style="width: 100%;margin: 0 auto;height: 30px;line-height: 66px;">
        <div class="header-topRight" style="height: 30px;width: 100%;line-height: 30px;font-size: 16px;">
          <div class="time" style="float: right">
            <Clock />
            <button style="border: none;font-size: 18px;color: #155bb0;background: transparent;margin-left: 30px;float: left" @click="loginSytem">登录</button>
          </div>
        </div>
      </div>
      <div class="header-center" style="
    height: calc(100% - 86px);
    text-align: left;
    margin-top: -15px;
float: left">
        <div class="header-cenTop">
          <img src="../../assets/images/guohui.png" alt="" style="float: left; display: block;
      width: 96px;
      height: 100px;
      margin-right: 15px;margin-top:15px;">
          <div class="titleName" style="float: left">
            <h2 class="system-title" style="background-image: none;font-weight: bold;
    letter-spacing: 10px;
    font-size: 32px;
    color: #31446e;">{{systemTitle}}</h2>
            <p class="system-title-en" style="background-image: none;margin-bottom: 15px;
      color: #31446e;
      font-size: 20px;">{{enTitle}}</p>
            <div class="header-cenBottom" style="
    float: left;
    width: 100%;">
              <ul v-for="(item,index)  in ulList" :key="index" style="width: 100%;float: left;z-index: 9999;font-size: 20px">
                <li style=" width: 12%;
        color: #31446e;
        font-weight: 700;list-style: none;float: left">{{item.li1}}</li>
                <li style=" width: 12%;
        color: #31446e;
        font-weight: 700;list-style: none;float: left">{{item.li2}}</li>
                <li style=" width: 12%;
        color: #31446e;
        font-weight: 700;list-style: none;float: left">{{item.li3}}</li>
                <li style=" width: 12%;
        color: #31446e;
        font-weight: 700;list-style: none;float: left">{{item.li4}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="clear: both"></div>
  </div>
</template>
<script>
import Clock from "@/common/index/createClock";
export default {
    name:'headers',
    props: {
        systemTitle: {
            type: String,
            default: '西安市公安局技术侦查支队信息网'
        },
        enTitle: {
          type: String,
          default: 'xi`an technical investigation'
        }
    },
    components: {
      Clock,
    },
    data () {
        return {
          ulList:[{
            li1:'忠诚',
            li2:'进取',
            li3:'缜密',
            li4:'奉献'
          }]
        }
    },
    methods: {

      //登录编辑后台
      loginSytem(){
        if(!!window.ActiveXObject || 'ActiveXObject' in window){
          this.$router.push({
            name: 'ielogin',
          });
        }else {
          this.$router.push({
            name: 'login',
          });
        }


      },
    },
    mounted() {

    }
}
</script>
<style lang="less" scoped>
  .headers{
    font-size: 20px;
    display: -ms-flexbox;
    flex-direction: column;
    /*background-repeat:no-repeat;*/
    /*background-attachment: fixed;*/
    /*filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../../assets/images/33.png',sizingMethod='scale');*/
    /*-ms-filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../../assets/images/33.png',sizingMethod='scale');*/
    /*background-size: cover;*/
    /*-moz-background-size: cover;*/
    /*-webkit-background-size: cover;*/
    height: 300px;
    width: 100%;
    z-index: 99999;

  }
  .header-topRight{

  }
  .time{
    /*display: flex;*/
  }
  .header-center{

    p{

    }
  }
  .header-cenTop{
    display: flex;
    img{
      display: block;
      width: 168px;
      height: 186px;
      margin-right: 40px;
    }
  }
  .titleName{
    margin-top: 20px;
  }
  .header-cenBottom{
    color: white;
    display: flex;
    justify-content: center;
    width: 100%;
    ul{
      display: flex;
      width: 100%;
      li{
        width: 12%;
        color: #31446e;
        font-weight: 700;
      }
    }
  }
  .system-title{
    background:linear-gradient(to bottom,#6adbf6,#4fadf8);
    -webkit-background-clip: text;
    font-weight: bold;
    padding: 0;
    margin: 0;
    letter-spacing: 10px;
    font-size: 48px;
    color: #31446e;
  }
  .system-title-en{
    background:linear-gradient(to bottom,#6adbf6,#4fadf8);
    -webkit-background-clip: text;
    color: white;
    padding: 0;
    margin: 0;
  }
  @media screen and (max-width: 1368px){
    .system-title{
      font-size: 32px;
    }
    .header-center{
      p{
        font-size: 18px;
      }
    }
  }
</style>
