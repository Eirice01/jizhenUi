<template>
      <div id="ino-content" style="width: 100%;background:#fff;">
        <!--顶部导航-->
        <div id="infoHeader" style="width: 100%;height:50px;cursor: pointer">
          <!--<ul class="menuTab" style="width: 100%;background: #155bb0;color: #f1f1f1;height: 60px;float: left">
            <li class="activessTop" v-for="(num,index) in navList1" :key="index"   style="text-align: center;margin: 0 auto;font-size: 20px;font-weight: 700;height: 60px;line-height:60px;color: white;list-style: none;width:calc(100%/5);float: left;"
             @click="changeMenu(num.text,num.index)"
            ><Icon :type="num.icon" />{{num.text}}</li>
          </ul>-->

            <ul class="menuTab" style="width: 100%;float: left;height: 50px;color: #f1f1f1;cursor: pointer;margin-top:-10px;">
              <template v-for="(num,index) in navList1">
                <li v-if="index == navList1.length-1" class="activessTop" :key="index"  @click="changeMenu(num.text,num.index)" style="width: 214px;text-align: center;font-size: 18px;font-weight: 700;height: 50px;line-height:50px;float: left;padding: 0 24px;color: whitesmoke;list-style: none;">
                  <span style="width: 100%;height: 100%;display: block;color: whitesmoke;">
                    <Icon :type="num.icon"  style="margin-bottom: 3px"/>
                    {{num.text}}
                  </span>
                </li>
                <li v-else class="activessTop" :key="index"  @click="changeMenu(num.text,num.index)" style="width: 214px;text-align: center;font-size: 18px;font-weight: 700;height: 50px;line-height:50px;float: left;padding: 0 24px;color: whitesmoke;list-style: none;margin-right:10px;">
                  <span style="width: 100%;height: 100%;display: block;color: whitesmoke;">
                    <Icon :type="num.icon"  style="margin-bottom: 3px"/>
                    {{num.text}}
                  </span>
                </li>
              </template>
          </ul>
        </div>
        <!--面包屑导航-->
        <div class="daohang" style="height: 30px">
          <Breadcrumb separator="" style="height: 40px;line-height: 40px;font-size: 16px">
            <img src="../../assets/images/weizhi.gif" alt="">&nbsp;
            <BreadcrumbItem>当前位置 :</BreadcrumbItem>
            <BreadcrumbItem>首页&nbsp;&nbsp;></BreadcrumbItem>
            <BreadcrumbItem>{{title}}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <!--左侧导航-->
        <div id="infoleft" style="width: 180px; float: left;margin-top: 20px;height: 680px;">
           <ul class="menuTab" style="width: 160px;color: #f1f1f1;height: auto;margin-left:15px;">
             <li class="activessLeft"  @click="changeLeft(num.text,num.index)" v-for="(num,index) in navList2" :key="index"   style="text-align: center;margin: 0 auto;margin-bottom:10px;cursor: pointer;font-size:16px;font-weight: 700;height: 45px;line-height:45px;color: white;list-style: none;width: 100%;z-index: 999999999"><Icon :type="num.icon" />{{num.text}}</li>
           </ul>
        </div>
        <div id="info-list" style="width:calc(100% - 180px);margin-top:10px;height: 680px;margin-left: 180px;padding: 10px 20px 20px;">
           <!--列表-->
           <keep-alive>
             <component :is="currentView" ref="listinfo" v-if="isType"></component>
           </keep-alive>
           <!--应用平台 -->
           <div style="width: 100%">
             <ocap-listing  v-if="isType1" style=""></ocap-listing>
           </div>
            <!--软件下载-->
            <div style="width: 100%">
              <software-listing v-if="isType2"></software-listing>
            </div>
            <!--通讯录-->
           <div style="width: 50%;margin:30px 50px;">
             <address-list v-if="isType3"></address-list>
           </div>
         </div>
      </div>
</template>
<script>
    import Listing from "../../common/index/listing";
    import softwareListing from '@/common/index/softwareListing'
    import ocapListing from '@/common/index/ocapListing'
    import addressList from '@/common/index/addressList'
    export default {
      components: {
        Listing,
        softwareListing,
        ocapListing,
        addressList
      },
      name: "infolist",
        data() {
            return {
              theme:'dark',
              currentView:'Listing',
              cur:0,
              isType:true,
              isType1:false,
              isType2:false,
              isType3:false,
              title:'',
              navList2:[
                {
                  text:'图片新闻',
                  index:'1',
                  icon:'md-images'
                },
                {
                  text:'工作动态',
                  index:'2',
                  icon:'md-star'
                },
                {
                  text:'科技动态',
                  index:'3',
                  icon:'ios-jet'
                },
                {
                  text:'通知通告',
                  index:'4',
                  icon:'md-megaphone'
                },
                {
                  text:'应用平台',
                  index:'5',
                  icon:'md-star'
                },
                {
                  text:'软件下载',
                  index:'6',
                  icon:'ios-paper'
                },
                {
                  text:'通讯录',
                  index:'7',
                  icon:'md-person'
                }
              ],
              navList1:[
                {
                  text:'首页',
                  index:'0',
                  icon:'md-home'
                },
                {
                  text:'图片新闻',
                  index:'1',
                  icon:'md-images'
                },
                {
                  text:'工作动态',
                  index:'2',
                  icon:'md-star'
                },
                {
                  text:'科技动态',
                  index:'3',
                  icon:'ios-jet'
                },
                {
                  text:'通知通告',
                  index:'4',
                  icon:'md-megaphone'
                }
              ]
            }
        },
        watch:{
          '$route.query.index'(){
            if(this.$route.query.index!='0'){

            }
          }
        },
        created(){
          this.getZishiying()
        },
         mounted(){
           this.isType = this.$route.query.text;
           this.HandleChangeTop(this.$route.query.index,this.$route.query.text);
           this.HandleChangeLeft(this.$route.query.index);
           this.title=this.$route.query.text;
          switch (this.$route.query.index){
            case '5':
              this.isType=false;
              this.isType1=true;
              this.isType2=false;
              this.isType3=false;
              this.clearTop()
              break;
            case '6':
              this.isType=false;
              this.isType1=false;
              this.isType3=false;
              this.isType2=true;
              this.clearTop()
              break;
          }
         },
        methods: {
          getZishiying(){
            //console.log("devicePixeRatio--->",window.devicePixelRatio)
            if(window.screen.width<1140){
              let rate = window.screen.width / 1920;
              document.body.style.zoom = rate
            }else{
              document.body.style.zoom = 1
            }
          },
          //返回顶部
          backTop(){
            let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset || document.getElementById('app').scrollTop;
            const timeTop = setInterval(()=>{
              document.getElementById('app').scrollTop = document.body.scrollTop = document.documentElement.scrollTop = window.pageYOffset = top -= 50;
              if(top <= 0){
                clearInterval(timeTop);
              }
            },0)
          },
          //手动更头部样式调取数据
          HandleChangeTop(index,text){
            if(text=='应用平台'){
              this.isType=false;
              this.isType1=true;
              this.isType2=false;
              this.isType3=false;
              this.clearTop()
            }else if(text=='软件下载'){
              this.clearTop()
              this.isType=false;
              this.isType1=false;
              this.isType2=true;
              this.isType3=false;
            }else if(text=='通讯录'){
              this.clearTop()
              this.isType=false;
              this.isType1=false;
              this.isType2=false;
              this.isType3=true;
            }
            else {
              this.isType=true;
              this.isType1=false;
              this.isType2=false;
              this.isType3=false;
            }
            let el = document.getElementsByClassName("activessTop");
            $(el[index]).css({
              backgroundColor: 'orange', color: '#fff'
            })
            $(el[index]).siblings().css({background: '#155bb0', color: 'whitesmoke'});
            setTimeout(()=>{
              if(index!='0'){
                if(!!this.isType){
                  this.$refs.listinfo.getListData(text);
                }
              }
            },30)

            if(index=='0'){
              this.$router.push({path:'/index',query:{text}})
            }
          },
          //手动左侧部样式
          HandleChangeLeft(index){
            let el = document.getElementsByClassName("activessLeft");
            //console.log('---el---',el);
            $(el[index-1]).css({
              backgroundColor: 'orange', color: '#fff'
            })
            $(el[index-1]).siblings().css({background: '#4180b5', color: 'whitesmoke'});
          },
          //手动更改头部样式
          hangleTop(index){
            let el = document.getElementsByClassName("activessTop");
            $(el[index]).css({
              backgroundColor: 'orange', color: '#fff'
            })
            $(el[index]).siblings().css({background: '#155bb0', color: 'whitesmoke'});
          },
          //详情页面头点击获取
          changeMenu(text,index){
            if(text=='应用平台'){
              this.isType=false;
              this.isType1=true;
              this.isType2=false;
              this.isType3=false;
              this.clearTop()
            }else if(text=='软件下载'){
              this.clearTop()
              this.isType=false;
              this.isType1=false;
              this.isType2=true;
              this.isType3=false;
            }else if(text=='通讯录'){
              this.clearTop()
              this.isType=false;
              this.isType1=false;
              this.isType2=false;
              this.isType3=true;
            }
            else {
              this.isType=true;
              this.isType1=false;
              this.isType2=false;
              this.isType3=false;
            }
            this.title = text;
            let el = document.getElementsByClassName("activessTop");
            $(el[index]).css({
              backgroundColor: 'orange', color: '#fff'
            })
            $(el[index]).siblings().css({background: '#155bb0', color: 'whitesmoke'});
            setTimeout(()=>{
              if(index!='0'){
                this.$refs.listinfo.getListData(text);
                this.$refs.listinfo.getPagingStyle(0)
              }
            },30)
            if(index=='0'){
              this.$router.push({path:'/index',query:{text}})
            }
            this.title = text;
            this.HandleChangeLeft(index)
          },

          //清除顶部选种样式
          clearTop(){
            let el=$(".activessTop");
                el.each(function () {
                  $(this).css({background: '#155bb0', color: 'whitesmoke'})
                })
            },
          //左侧点击调用获取数据
          changeLeft(text,index){
            this.title = text;
            if(text=='应用平台'){
              this.isType=false;
              this.isType1=true;
              this.isType2=false;
              this.isType3=false;
              this.clearTop();
              this.backTop()
            }else if(text=='软件下载'){
              this.isType=false;
              this.isType1=false;
              this.isType2=true;
              this.isType3=false;
              this.clearTop();
              this.backTop();
              //this.backTop()
            }else if(text=='通讯录'){
              this.isType=false;
              this.isType1=false;
              this.isType2=false;
              this.isType3=true;
              this.clearTop();
              this.backTop();
            }
            else {
              this.isType=true;
              this.isType1=false;
              this.isType2=false;
              this.isType3=false;
            }
            setTimeout(()=>{
              if(text!='首页' && this.$refs.listinfo!=undefined){
                this.$refs.listinfo.getListData(text);
                this.$refs.listinfo.getPagingStyle(0);
              }
            },30)
            let el = document.getElementsByClassName("activessLeft");
            $(el[index-1]).css({
              backgroundColor: 'orange', color: '#fff'
            })
            $(el[index-1]).siblings().css({background: '#4180b5', color: 'whitesmoke'});
            if(text=='首页'){
              this.$router.push({path:'/index',query:{text}})
            }
            this.hangleTop(index)
          },
        }
    }
</script>

<style scoped lang="less">

</style>
