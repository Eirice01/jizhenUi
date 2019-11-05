<template>
  <div id="ie-info" :style="{width:'100%',height:'100vh',backgroundImage:'url(' +require('../../assets/images/login/industry.jpg')+')',backgroundSize:'100% 100%',overflow:'hidden'}">
    <div style="color:cornflowerblue;font-size: 16px;margin-top: 20px;margin-right: 20px;text-align: right;cursor: pointer"@click="backIndex">返回首页</div>


    <div style="color: #fff;font-size: 26px;text-align: center;line-height: 50vh">{{this.$route.query.deg}},只能在{{this.$route.query.degType}}浏览器下运行</div>
    <div style="text-align: center;width: 100%;font-size: 30px;color: #1060ed;text-decoration: underline" @click="goDown">
      <a href="javascript:void(0);" style="cursor: pointer;">软件下载地址</a></div>
  </div>
</template>

<script>
    export default {
        name: "mian-page",
        data() {
            return {}
        },
        created(){

        },
        methods: {
          goDown(){
              this.$router.push({
                path:"/infolist",
                query:{
                  text:'软件下载',
                  index:6
                }
              })
          },
          backIndex(){
            this.$router.push({
              name: 'index',
            });
          }
        }
    }
</script>

<style scoped lang="less">

</style>
