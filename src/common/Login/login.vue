<template>
<div id="cls-login">
  <div class="login-menu">
    <span class="cls-img"></span>
    <span class="cls-web-info">西安市公安局技术侦察支队信息网</span>
    <span class="cls-back" @click="backHome">返回首页</span>
  </div>
  <span style="display: inline-block;width: 100%;text-align: center;color: #fff;font-size: 24px;margin-top: 40px">后台管理系统</span>
    <div id="login-content">
      <div class="login-lett">
      </div>
      <div class="login-right">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline style="margin-top: 110px;">
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="用户名" style="width: 220px">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="密码" style="width: 220px">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </Form>
        <Button type="primary" @click="handleSubmit('formInline')" style="width: 220px;margin-right: 10px;margin-top: 15px">登陆</Button>
      </div>
    </div>
</div>
</template>

<script>
import {accountLogin} from '../../service/index'
import {process_error} from '@/config/process_request_conf'
    export default {
        name: "login",
        data(){
          return{
            formInline: {
              user: 'admin',
              password: '123456'
            },
            ruleInline: {
              user: [
                { required: true, message: '用户名称不能为空', trigger: 'blur' }
              ],
              password: [
                { required: true, message: '密码不能为空.', trigger: 'blur' },
                { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
              ]
            }
          }
        },
      created(){
        this.getZishiying()
      },
      methods:{
        singIn(){
          //登录编辑后台
            this.$router.push({
              name: 'system',
            });
        },
        //返回首页
        backHome(){
          this.$router.push({
            name: 'index',
          });
        },
        //缩放
        getZishiying(){
          //console.log("----window.screen.width--",window.screen.width)
          if(window.screen.width<1920){
            let rate = window.screen.width / 1920;
            document.body.style.zoom = rate
          }else{
            document.body.style.zoom = 1
          }
        },
        //登录
        async accountLogin(username,password){
          try{
            let res = await accountLogin(username,password)
             if(res.statusCode !== 200) return process_error(res);
            this.$Message.success('登录成功!');
            this.singIn()

          }catch (err){
           //console.log(err)
          }
        },
        handleSubmit(name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
               let username=this.formInline.user;
               let password=this.formInline.password
              this.accountLogin(username,password)
              // this.$Message.success('Success!');
            } else {
              this.$Message.error('Fail!');
            }
          })
        }
      }
    }
</script>

<style scoped lang="less">
#cls-login{
width: 100%;
height:100%;
overflow: hidden;
background:url("../../assets/images/login/industry.jpg") no-repeat;
background-size:100% 100%;
position: relative;
}
#login-content{
  width: 20%;
  height:350px;
  margin:auto;
  border-radius: 3px;
  position: absolute;
  top:30%;
  left: 40%;
  display: flex;
  /*background: #4a9ede;*/
  .login-lett{
    width: 10%;
    height: 100%;
    opacity: .8;
    text-align: center;
    /*background: #1c2438;*/
    /*line-height: 100px;*/
    >span{
      display: block;
      color: #f1f1f1;
      font-size: 18px;
      font-weight: bold;
    }
    p{
      margin-top: 150px;
      color: #f1f1f1;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .login-right{
    text-align: center;
    width: 80%;
    height: 100%;
    /*background: #382c2d;*/
  }
 .cls-border{
   height: 100%;
   width: 2px;
   background:url("../../assets/images/login/right-border.png") no-repeat;
 }
}
.login-menu{
  position: relative;
  margin:40px auto;
  width: 100%;
  height: 100px;
  display: flex;
  /*justify-content: center;*/
  span{
    display: inline-block;
    width: 30%;
    height: 100%;
  }
 .cls-web-info{
   color: #fff;
   font-size: 30px;
   font-weight: bold;
   line-height: 100px;
 }
 @media screen and (min-width:1500px) and  (max-width: 1920px){
   .cls-web-info{
     font-size: 30px;
   }
 }
  @media screen and (min-width:1100px) and  (max-width: 1499px){
    .cls-web-info{
      font-size: 24px;
    }
  }
  .cls-img{
    margin-left: 20px;
    width: 100px;
    background: url("../../assets/images/guohui.png") no-repeat;
    background-size: 80px;
  }
  .cls-back{
    width: 10%;
    height: 30px;
    position: absolute;
    right: 0px;
    text-align: center;
    color: #d0dcf7;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;

  }
}
.login-info-title{
  width: 100%;
  height: 30px;
  text-align: center;
}
</style>
