<template>
    <div class="tabloid" style="height: 100vh">
      <div class="daohang" style="height: 30px">
        <Breadcrumb separator="" style="height: 40px;line-height: 40px;font-size: 16px">
          <img src="../../assets/images/weizhi.gif" alt="">&nbsp;
          <BreadcrumbItem>当前位置 :</BreadcrumbItem>
          <BreadcrumbItem>首页&nbsp;&nbsp;></BreadcrumbItem>
          <BreadcrumbItem>{{title}}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div style="float: left;margin-top: 20px;width: 100%;padding: 20px;height: auto;">
        <left-meau  style="float: left" ref="child"  @getMorList="getMorList"></left-meau>
        <div style="float: left;width: calc(100% - 180px);padding: 20px;height: 800px">
          <listing ref="listener" v-if="isType!='应用平台'&&isType!='软件下载'&&isType!='通讯录'?true:false"></listing>
          <software-listing  v-if="isType=='软件下载'"></software-listing>
          <ocap-listing  v-if="isType=='应用平台'"></ocap-listing>
          <address-list v-if="isType=='通讯录'"></address-list>
        </div>
      </div>
      <div class="content-footer" style="width: 100%;font-size: 16px;float: left;padding-top: 120px;position: absolute;bottom: 0px;height: 150px;">
        <div class="footerCont" style="width: 50%;position: absolute;left: 36%;margin-top: 50px">
          <div style="float: left;margin-top: 20px;">
            <span style="display: block;margin-left: 17px;text-align: center">主办:西安市公安局技术侦察支队&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span style="display: block;">技术支持:西安九索数据技术股份有限公司</span>
          </div>
          <div class="cont-right" style="float: left">
            <div class="jsRwm" style="float: left;margin-left: 20px">
              <img src="./../../assets/images/jsshuju.gif" alt="" style="display: block;width: 60px;height: 60px;">
              <span>关于九索</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import LeftMeau from '@/common/leftMeau';
    import listing from '@/common/index/listing';
    import SoftwareListing from '@/common/index/softwareListing'
    import ocapListing from '@/common/index/ocapListing'
    import addressList from '@/common/index/addressList'
    import $ from 'jquery'
    export default {
        components: {
          SoftwareListing,
          ocapListing,
          LeftMeau,
          listing,
          addressList,
        },
        name: "tabloid",
        data() {
            return {
              title:"图片新闻",
              isType:'',
            }
        },
        mounted(){
          this.$refs.child.changeColor(0);
            if(this.$route.query.text){
            this.getMorList(this.$route.query.text)
          }
        },
        methods: {
          //获取列表子组件方法
          getMorList(type){
            this.isType=type;
            this.$refs.listener.getListData(type)
          },
        }
    }
</script>

<style scoped lang="less">
</style>
