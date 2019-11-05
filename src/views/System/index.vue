<template>
    <div id="cls-system">
    <div class="leftcon">
      <Row style="margin-top: 20px">
      <Menu :theme="theme2" active-name="1" :open-names="modalName">

          <MenuItem name="1">
            <Icon type="ios-paper" />
            <router-link :to="{path:'/curation', query:{type:'news'}}">
              <span class="headerTitle">内容维护</span>
            </router-link>
          </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-paper" />
          <router-link :to="{path:'/application', query:{type:'app'}}">
            <span class="headerTitle">应用平台</span>
          </router-link>
        </MenuItem>
        <MenuItem name="3">
          <Icon type="ios-paper" />
          <router-link :to="{path:'/application', query:{type:'nav'}}">
            <span class="headerTitle">外部导航</span>
          </router-link>
        </MenuItem>
        <Submenu name="4">
          <template slot="title">
            <Icon type="ios-stats" />
            系统管理
          </template>
            <MenuItem name="4-1">
              <router-link :to="{path:'/departList', query:{type:'part'}}">
                <span class="headerTitle">部门管理</span>
              </router-link>
            </MenuItem>
            <MenuItem name="4-2">
              <router-link :to="{path:'/userManagement', query:{type:'user'}}">
                <span class="headerTitle">用户管理</span>
              </router-link>
            </MenuItem>
            <MenuItem name="4-3">
              <router-link :to="{path:'/software', query:{type:'software'}}">
                <span class="headerTitle">软件下载</span>
              </router-link>
              </MenuItem>
        </Submenu>
      </Menu>
      </Row>
    </div>
      <!--路由页面-->
    <div class="system-content">
      <div class="user-location">
        <span> <Icon class="f-csp" type="ios-pin" size="20"></Icon></span>
        <span>当前位置：{{locations}}</span>
      </div>
      <div class="userManger">
        <span class="cls-back" @click="backHome">返回首页</span>
        <Tooltip style="margin-right: 18px;">
          <Icon type="ios-person" size="26" style="cursor:pointer"></Icon>
          <div slot="content">
            <p>当前登录人：{{username}}</p>
            <p>所属部门：{{partName}}</p>
          </div>
        </Tooltip>
        <a @click="userOut">
          <Icon class="f-csp" type="md-log-out" size="20" title="退出"></Icon>
        </a>
      </div>
      <router-view></router-view>
    </div>
    </div>
</template>

<script>
  import {getCurrentInfo,userLoginOut} from '../../service/index'
  import {process_error} from '@/config/process_request_conf'
  export default {
        name: "index",
      data(){
          return{
            locations:'内容维护',
            theme2:'dark',
            modalName:['1'],
            username:'',
            partName:'',

          }
      },
      watch:{
        modalName:function () {
          if(this.modalName[0]==1){
            this.$router.push({
              name: 'curation',
            });
          }
        },
        '$route.query.type'(){
          if(this.$route.query.type=='news'){
           this.locations='内容维护'
          }else if(this.$route.query.type=='app'){
            this.locations='应用平台'
          }else if(this.$route.query.type=='nav'){
            this.locations='外部导航'
          }else if(this.$route.query.type=='part'){
            this.locations='系统管理 > 部门管理'
          }else if(this.$route.query.type=='user'){
            this.locations='系统管理 > 用户管理'
          }else if(this.$route.query.type=='software'){
            this.locations='系统管理 > 软件下载'
          }
        },
        username(){
          if(this.username==null){
            this.logout()
          }
        },
      },
      mounted(){
         this.userLoginInfo()
        if(this.modalName[0]==1){
          this.$router.push({
            name: 'curation',
            query:{
              type:'news'
            }
          });
        }
      },
      methods:{
        //返回首页
        backHome(){
          this.$router.push({
            name: 'index',
          });
        },
        //获取登录用户信息
        //登录
        async userLoginInfo(){
          try{
            let res = await getCurrentInfo()
            if(res.statusCode !== 200) return process_error(res);
            this.username=res.data.user.userName;
            this.$store.state.setUser=res.data.user.userName;
            this.partName=res.data.user.departmentName;

          }catch (err){
            //console.log(err)
          }
        },

        //退出登录
        async userOut(){
          try {
           let res = await userLoginOut()
            if(res.statusCode!==200) return process_error(res);
            this.$Message.success('退出成功!');
            this.logout()
          }catch (err){
            //console.log(err)
          }
        },
          //登出
        logout(){
          //登录编辑后台
            this.$router.push({
              name: 'login',
            });
        },

      }
    }
</script>

<style scoped lang="less">
#cls-system{
  width: 100%;
  height:100%;
  display: flex;
 .leftcon{
  width:250px;
  height:100%;
  margin-right: 8px;
  background: #6c778c;
  overflow: hidden;
   a{
     display: inline-block;
     width: 88%;

   }
  .ivu-row{
    height: 100%;
  }
  .ivu-menu-dark{
    background: #6c778c;
  }
   ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
     background: #8297cf;
     color: #fff;
   }
 }
 .system-content{
   width: calc(100% - 260px);
   height:100%;
   background: #e4e4e4;
 }
}
.headerTitle{
  display: inline-block;
  outline: 0;
  font-size: 14px;
  color: #fff;
}
.userManger{
  width:220px;
  float: right;
  text-align: center;
  line-height: 50px;
  margin-top: 10px;
  height: 50px;
  .f-csp{
    color:black!important;
  }
  /*background: #0e2456;*/
}
.user-location{
  width: 200px;
  float: left;
  margin-left: 10px;
  height: 50px;
  line-height: 50px;
}
  .cls-back{
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 10px;
  }
</style>
