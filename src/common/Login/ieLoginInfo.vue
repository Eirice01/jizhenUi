<template>
    <div id="ie-info" :style="{width:'100%',height:'100vh',backgroundImage:'url(' +require('../../assets/images/login/industry.jpg')+')',backgroundSize:'100% 100%',overflow:'hidden'}">
      <div style="color:cornflowerblue;font-size: 16px;margin-top: 20px;margin-right: 20px;text-align: right;cursor: pointer"@click="backIndex">返回首页</div>

      <div style="color: #fff;font-size: 26px;text-align: center;line-height: 50vh">使用后台管理系统，请在谷歌浏览器下运行</div>
    </div>
</template>

<script>
    export default {
        name: "ie-login-info",
        created(){
        },
        methods:{
          backIndex(){
            this.$router.push({
              name: 'index',
            });
          }
        }
    }
</script>

<style scoped>
#ie-info{
  text-align: center;
}
</style>
