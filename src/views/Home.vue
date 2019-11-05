<template>
  <div class="home" style="height: auto">
    <Header :systemTitle="systemTitle" :enTitle="enTitle"/>
    <div class="contentBox" style="
    overflow: inherit;">
      <div class="main-content" style=" width: 1140px;margin: auto auto 10px auto;
      padding: 0 15px;">
        <transition name="move" mode="out-in"><router-view></router-view></transition>
        <!--<transition name="move" mode="out-in"><keep-alive><router-view v-if="$route.path==='/index' || $route.path==='/details' || !$route.meta.keepAlive"></router-view></keep-alive></transition>-->
      </div>
      <back-top></back-top>
      <div class="content-footer" style="min-width:10px;font-size: 16px;height:100px;background-color: #57a3f3;background-size: 100% 100%;">
        <div class="footerCont" style="width: 450px;position: absolute;left: 41%;margin-top: 10px;">
          <div style="float: left;margin-top: 20px;">
            <span style="text-align: center;display: block;margin-left: 17px">{{text1}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span style="display: block">{{text2}}</span>
          </div>
          <div class="cont-right" style="float: left">
            <div class="jsRwm" style="float: left;margin-left: 20px">
              <img src="./../assets/images/jsshuju.gif" alt="" style="display: block;width: 60px;height: 60px;">
              <span>{{text3}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/common/index/header'
import NavBar from '@/common/index/navBar';
import backTop from '../common/backTop/backTop';
export default {
    components: {
        NavBar,
        Header,
        backTop
    },
    data () {
        return {
            systemTitle: '西安市公安局技术侦察支队信息网',
            enTitle: 'xi`an technical investigation',
            text1:"主办:西安市公安局技术侦察支队",
            text2:"技术支持:西安九索数据技术股份有限公司",
            text3:"关于九索",
        }
    },
    created(){

    },
    mounted(){
    },
    methods:{

    },
}

</script>
<style lang="less" scoped>
  .home{

  }
  #app .contentBox{
    background: #f4f4f4;
    overflow: inherit;
  }
  #app .main-content{
    width: 1140px;
    padding: 0 15px;
  }
  .nav{
    width: 100%;
    background: #155bb0;
  }
</style>
