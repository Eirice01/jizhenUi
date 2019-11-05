<template>
    <div class="index">
        <div class="index-content" style="width: 100%;height: auto">
           <div class="nav-Bar" style="width: 100%;height: 50px">
             <nav-bar></nav-bar>
           </div>
          <div class="rail"  :style="{backgroundImage:'url(' +require('../../assets/images/rail.png')+')',backgroundSize:'100% 100%',width:'100%',height:'80px'}"></div>
          <div class="content-top" style="width: 100%;background: white;clear: both;margin-top: 10px;height: 310px">
              <div id="ban1" style="width: 550px;height: 300px;;float: left;" class="carousel slide" data-ride="carousel">
                <div style="position:absolute;width:550px;height:23px;background:rgba(0,0,0,.7);left:0;right:0;bottom:0;z-index:14;"></div>
                <ul class="carousel-indicators" style="list-style: none;margin: 0;right:auto;left:185px;">
                  <li style="float: left"  data-target="#ban1" :data-slide-to="index" :class="[index==0 ? 'active' : '']" v-for="(item,index) in luboData" :key="index"></li>
                </ul>
                <div class="carousel-inner">
                  <div class="carousel-item active"   v-for="(item,index) in luboData" :key="index"  v-if="index==0">
                    <a href="#" @click="goToDetailPage(item.diction,item.id)"><img :src="item.img" alt="" style="display: block;height: 300px;width: 550px"></a>
                    <h3 class="carousel-caption" style="margin: auto;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;color:#f3f3f3;font-size: 14px;width: 100%;position: absolute;right: 0px;left: 0px;height: 15px;line-height: 15px;background: rgba(0,0,0,.7)" :title="item.title.split('#')[0]">{{item.title.split('#')[0]}}</h3>
                    <!--<p>{{item.title}}</p>-->
                  </div>
                  <div class="carousel-item"  v-if="index!=0" v-for="(item,index) in luboData" :key="index">
                    <a href="#" @click="goToDetailPage(item.diction,item.id)"><img :src="item.img" alt="" style="display: block;height: 300px;width: 550px"></a>
                     <div>
                       <h3 class="carousel-caption"  style="margin: auto;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;color:#f3f3f3;font-size: 14px;width: 100%;position: absolute;right: 0px;left: 0px;height: 10px;line-height: 10px;background: rgba(0,0,0,.7)" :title="item.title.split('#')[0]">{{item.title.split('#')[0]}}</h3>
                     </div>
                  </div>
                </div>
              </div>
            <div class="top-center" style="width:540px;height:300px;float: right;margin-left: 20px;position:relative;">
              <!--添加分界线-->
              <div style="position:absolute;height:280px;width:2px;background:#e6e6e6;top:16px;left:-10px;"></div>
              <!--图片新闻-->
                 <div class="title-header" style="position: relative">
                   <h1 style="font-size: 18px;height: 50px;line-height: 50px;border-bottom: 2px solid #e6e6e6;color: #1b6cc7;font-weight: 700;">
                      <span class="addPicNews" style="border-bottom: 2px solid #1b6cc7;padding-bottom:13px;">
                        <Icon type="md-images" style="font-size: 24px;margin-right: 8px" />{{listTitle.text2}}
                      </span>
                    </h1>
                   <span style="position: absolute;right: 20px;top:15px;cursor: pointer;color: #1b6cc7" @click="goXwDetailPage()">更多>></span>
                   <indexListing :listData="picNewsData"/>
                 </div>
            </div>
          </div>
          <div class="content-mainList" style="width: 100%;background: white;overflow: hidden; margin-top: 10px;margin-bottom: 10px;height: 220px">
            <div class="main-left" style="float: left;width: 550px;height:100%;position: relative">
              <!--工作动态-->
              <h1 style="font-size: 18px;height: 50px;line-height: 50px;border-bottom: 2px solid #e6e6e6;color: #1b6cc7;font-weight: 700;">
                <span class="addPicNews" style="border-bottom: 2px solid #1b6cc7;padding-bottom:13px;">
                  <Icon type="md-star" style="font-size: 24px;margin-right: 8px" />{{listTitle.text3}}
                </span>
              </h1>
              <span style="position: absolute;right: 20px;top:15px;color: blue;cursor: pointer;color: #1b6cc7" @click="goDtDetailPage()">更多>></span>
              <indexListing :listData="jobTrendsData"/>
            </div>
            <div class="main-cont" style="width: 540px;height:100%;float: right;position: relative;margin-left: 20px">
              <!--添加分界线-->
              <div style="position:absolute;height:188px;width:2px;background:#e6e6e6;top:24px;left:-11px;"></div>
              <!--通知通告-->
              <h1 style="font-size: 18px;height: 50px;line-height: 50px;border-bottom: 2px solid #e6e6e6;color: #1b6cc7;font-weight: 700;">
                  <span class="addPicNews" style="border-bottom: 2px solid #1b6cc7;padding-bottom:13px;">
                    <Icon type="md-megaphone" style="font-size: 24px;margin-right: 8px" />{{listTitle.text1}}
                  </span>
              </h1>
              <span style="position: absolute;right: 20px;top:15px;cursor: pointer;color: #1b6cc7" @click="goTgDetailPage()">更多>></span>
              <indexListing :listData="tglistData"/>
            </div>
          </div>
          <div class="content-center" style="width: 100%;height: 290px;background:#fff;">
            <div class="center-center" style="width: 33.33%;float: left">
              <!--通讯录-->
              <h1 style="font-size: 18px;height: 50px;line-height: 50px;border-bottom: 2px solid #e6e6e6;color: #1b6cc7;font-weight: 700;">
                <span class="addPicNews" style="border-bottom: 2px solid #1b6cc7;padding-bottom:13px;">
                  <Icon type="md-person" style="font-size: 24px;margin-right: 8px" />{{listTitle.text6}}
                </span>
              </h1>
              <addressList :addressListData="addressListData"/>
            </div>
            <div class="center-right" style="width: 33.33%;float: left;position: relative;">
              <!--添加分界线-->
              <div style="position:absolute;height:254px;width:2px;background:#e6e6e6;top:24px;left:8px;"></div>
              <!--软件下载-->
              <h1 style="font-size: 18px;height: 50px;line-height: 50px;border-bottom: 2px solid #e6e6e6;color: #1b6cc7;font-weight: 700;margin-left:20px;">
                <span class="addPicNews" style="border-bottom: 2px solid #1b6cc7;padding-bottom:13px;">
                  <Icon type="ios-paper" style="font-size: 24px;margin-right: 8px" />{{listTitle.text5}}
                </span>
              </h1>
              <span style="position: absolute;right: 20px;top:15px;cursor: pointer;color:  #1b6cc7" @click="goRjDetailPage()">更多>></span>
              <softwareList :softwareListData="softwareListData" />
            </div>
            <div class="center-left" style="width: 33.33%;float: left;position: relative;">
              <!--添加分界线-->
              <div style="position:absolute;height:254px;width:2px;background:#e6e6e6;top:24px;left:10px;"></div>
              <!--应用平台-->
              <h1 style="font-size: 18px;height: 50px;line-height: 50px;border-bottom: 2px solid #e6e6e6;color: #1b6cc7;font-weight: 700;margin-left:20px;">
                <span class="addPicNews" style="border-bottom: 2px solid #1b6cc7;padding-bottom:13px;">
                  <Icon type="md-cloudy" style="font-size: 24px;margin-right: 8px" />{{listTitle.text4}}
                </span>
              </h1>
              <!--<span style="position: absolute;right: 20px;top:15px;cursor: pointer;color: #1b6cc7" @click="goPtDetailPage()">更多>></span>-->
              <ocapList @goPtDetailPage="goPtDetailPage"/>
            </div>
          </div>
          <div class="content-bottom" style=" width: 100%;background: white;height: 200px;margin-top: 10px;">
            <p style="line-height: 50px;height: 50px;font-size: 18px;border-bottom: 2px solid #e6e6e6;color: #1b6cc7;font-weight: 700;margin-bottom: 0px;">
              <span class="addPicNews" style="border-bottom: 2px solid #1b6cc7;padding-bottom:13px;">
                  <Icon type="ios-browsers" style="font-size: 24px;margin-right: 8px" />{{pTitle}}
              </span>
            </p>
            <div class="bottom-box" style="width: 100%;background: white;border:none;padding-left: 15px">
              <ul id="menuTab" style="float: left;width: 100%;font-size: 16px">
                 <li  class="activee" v-for="(num,index) in menuTabData" :key="index"  @click="changeColor(cur=index)"  style="float: left;width: 33%;text-align: center;height: 40px;line-height: 40px;list-style: none">
                   <a href="javascript:void(0);" style="">{{num.title}}</a></li>
              </ul>
              <div id="mainTab" style="float: left;font-size: 16px;height: 90px;overflow:auto;">
                <ul style="float: left;width:100%;overflow:auto;">
                  <li v-show="cur==0" v-for="(item,index) in qgNavData" :key="index" style="float: left;width: 12%;height: 30px;line-height: 30px;list-style: none">
                    <a :href="item.value" :title="item.lable" style="color: black;display: block;width: 96px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" target="_blank" @mouseenter="changeStyle($event)" @mouseleave="removeStyle($event)">{{item.lable}}</a></li>
                </ul>
                <ul style="float: left;width:100%;overflow: auto">
                  <li v-show="cur==1" v-for="(item,index) in qsNavData" :key="index" style="float: left;width: 12%;height: 30px;line-height: 30px;list-style: none">
                    <a :href="item.value" :title="item.lable" style="color: black;display: block;width: 96px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" target="_blank" @mouseenter="changeStyle($event)" @mouseleave="removeStyle($event)">{{item.lable}}</a></li>
                </ul>
                <ul style="float: left;width:100%;overflow: auto;">
                  <li v-show="cur==2" v-for="(item,index) in jnNavData" :key="index" style="float: left;width: 12%;height: 30px;line-height: 30px;list-style: none">
                    <a :href="item.value" :title="item.lable" style="color: black;display: block;width: 96px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" target="_blank" @mouseenter="changeStyle($event)" @mouseleave="removeStyle($event)">{{item.lable}}</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    import NavBar from '@/common/index/navBar';
    import {homeSoftwareList} from '../../service/index'
    import {process_error} from '@/config/process_request_conf'
    import imgscrool from '../../util/gdlb.js'
    import IndexListing from '@/common/index/indexListing';
    import ocapList from '@/common/index/ocapList'
    import addressList from '@/common/index/addressList'
    import softwareList from '@/common/index/softwareList'
    import $ from 'jquery'
    export default {
        name: "index",
        components: {
          IndexListing,
          ocapList,
          addressList,
          softwareList,
          NavBar
        },
        data() {
            return {
              //Urls:window.__private__.imgUrls.imgUrl,
              cur:0,
              listTitle:{
                text1:"通知通告",
                text2:"图片新闻",
                text3:"工作动态",
                text4:"应用平台",
                text5:"软件下载",
                text6:"通讯录"
              },
              pTitle:"友情链接",
              active:{
                borderBottom:'2px solid #4284d2',color:'#4284d2'
              },
              jobTrendsData:[],//工作动态列表
              picNewsData:[],//图片新闻列表
              tglistData:[],//通知通告列表
              qsNavData:[],//全省市导航列表
              qgNavData:[],//全国导航列表
              jnNavData:[],//局内导航列表
              ocapListData:[],//应用平台列表
              addressListData:{
                textList:[{text:'接案中心:  029-87255244'},
                  {text:'指挥中心:  029-87278110'},
                  {text:'传真电话:  029-87276357'},
                  {text:'投诉电话:  029-86751952'}],
                imgTextobj: [
                  {
                    img: require("@/assets/images/zfjd.jpg"),
                    text: '执法监督(微信)'
                  }
                ]

              },//通讯录
              softwareListData:[],//软件下载列表
              luboData:[],//轮播图
              menuTabData:[//底部导航title
                {title:"全国各省导航"},
                {title:"全省市单位导航"},
                {title:"局内单位导航"},
              ],
              value:0,
            }
        },
        created(){
          this.getLuboList()
          this.getZishiying()
        },
        update(){
          this.getLuboList()
        },
        mounted(){
          $('#ban1').carousel();
          this.changeColor("0")
          imgscrool('#ban1')
          //this.rjDownList()
          //this.getAllNavListTitle()
          this.getAllCountryList()
          this.getProCitysList()
          this.getInsideList()
          this.getPingtaiList()
          this.getTgList()
          this.getPicNew()
          this.getJobTrends()
          
          if(window.navigator.userAgent.indexOf('MSIE') >= 1){
             let arr = $(".addPicNews");
             for(var  i =0;i<arr.length;i++){
               arr[i].style.paddingBottom = '11px';
             }
          }
        },
        methods: {
          //鼠标移入
          changeStyle(e){
            e.target.style.fontWeight = '700';
            e.target.style.color = '#007bff';
          },
          //鼠标移出
          removeStyle(e){
            e.target.style.fontWeight = '100';
            e.target.style.color = 'black';
          },
          getZishiying(){
            if(window.screen.width<1140){
              let rate = window.screen.width / 1920;
              document.body.style.zoom = rate
            }else{
              document.body.style.zoom = 1
            }
          },
          //轮播跳转
          goToDetailPage(type,id){
            let router = this.$router.resolve({path: "/details", query: {text: type.val, id: id}});
            window.open(router.href,'_blank')
          },
          //切换tab样式
          changeColor(index) {
            let el =$(".activee");
            $(el[index]).css({
              borderBottom: '2px solid #4284d2', color: '#4284d2'
            })
            $(el[index]).siblings().css({borderBottom: '', color: ''})
          },
          //轮播图
          getLuboList(){
            let count = 5
            var _this=this
            $.get(`/api/jzweb/word/getPictureTopN?i=${count}`,function(res){
              if(res.statusCode !== 200) return process_error(res);
                _this.luboData= res.data
            })
          },
          //获取导航类型所有字典
          // getAllNavListTitle(){
          //   var _this=this
          //   $.get(`/api/jzweb/links/getLinksDiction`,function(res){
          //     if(res.statusCode !== 200) return process_error(res);
          //     _this.menuTabData = res.data
          //   })
          // },
          //获取全国各省导航
          getAllCountryList(){
            var _this=this
            $.get(`/api/jzweb/links/getCountryLinks`,function(res){
              if(res.statusCode !== 200) return process_error(res);
              _this.qgNavData = res.data
            })
          },
          //获取全省市单位导航
          getProCitysList(){
            var _this=this
            $.get(`/api/jzweb/links/getProvinceLinks`,function(res){
              if(res.statusCode !== 200) return process_error(res);
              _this.qsNavData = res.data
            })
          },
          //获取局内单位导航
          getInsideList(){
            var _this=this
            $.get(`/api/jzweb/links/getBureauLinks`,function(res){
              if(res.statusCode !== 200) return process_error(res);
              _this.jnNavData = res.data
            })
          },
          //获取平台外部导航 前几条
          getPingtaiList(){
            let count = 3
            var _this=this
            $.get(`/api/jzweb/platform/getAll?i=${count}`,function(res){
              if(res.statusCode !== 200) return process_error(res);
              _this.ocapListData = res.data
            })
          },
          //获取通知通告
          getTgList(){
            let count = 5
            var _this=this
            $.get(`/api/jzweb/word/getNotice?i=${count}`,function(res){
              if(res.statusCode !== 200) return process_error(res);
              _this.tglistData = res.data
            })
          },
          //获取图片新闻
          getPicNew(){
            let count = 8
            var _this=this
            $.get(`/api/jzweb/word/getPictures?i=${count}`,function(res){
              if(res.statusCode !== 200) return process_error(res);
              _this.picNewsData = res.data
            })
          },
          //获取工作动态
          getJobTrends(){
            let count = 5
            var _this=this
            $.get(`/api/jzweb/word/getWork?i=${count}`,function(res){
              if(res.statusCode !== 200) return process_error(res);
              _this.jobTrendsData = res.data
            })
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
          //跳转详情页
          goTgDetailPage(){
            this.$router.push({path:"/infolist",query:{text:this.listTitle.text1,index:'4'}});//通知通告
            this.backTop()
          },
          goXwDetailPage(){
            this.$router.push({path:"/infolist",query:{text:this.listTitle.text2,index:'1'}});//图片新闻
            this.backTop()
          },
          goDtDetailPage(){
            this.$router.push({path:"/infolist",query:{text:this.listTitle.text3,index:'2'}});//工作动态
            this.backTop()
          },
          goPtDetailPage(){
            this.$router.push({path:"/infolist",query:{text:this.listTitle.text4,index:"5"}});//应用平台
            this.backTop()
          },
          goRjDetailPage(){
            this.$router.push({path:"/infolist",query:{text:this.listTitle.text5,index:"6"}});//软件下载
            this.backTop()
          }
        }
    }
</script>

<style lang="less">
.index-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
.header-right{
  display: flex;
  align-items: center;
  span{
    color: white;
    font-size: 16px;
    display: block;
    margin-right: 20px;
  }
}
.rail{
  width: 100%;
  height: 108px;
  background: url("./../../assets/images/rail.png") no-repeat top center;
  background-size: contain;
  padding: 16px;
  margin-bottom: 12px;
}
.content-top{
  display: flex;
}
.top-left{
  width: 60%;
  height: 350px
}
.top-center{
  width: 40%;
  height: 350px;
}
.demo-carousel1{
  position: relative;
  img{
    display: block;
    width: 100%;
    height: 310px;
    position: absolute;
  }
  p{
    color: red;
    font-size: 16px;
    position: absolute;
    margin-top: 10px;
    height: 28px;
    left: 30px;
    top: 310px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 90%;
  }
}
.content-mainList{
  display: flex;
  width: 100%;
}
.main-left,.main-cont{
  width: 50%;
}
.main-right{
  width: calc(100% - 76%);
  h1{
    font-size: 18px;
    border-bottom: 1px solid #ccc;
    height: 50px;
    line-height: 50px;
    margin-left: 20px;
  }
  ul{
    margin-left: 20px;
    li{
      height: 54px;
      line-height: 54px;
      margin: 27px 0;
      width: 100%;
      text-align: center;
      font-size: 18px;
      color: #4c87c3;
      background: url("./../../assets/images/pingtai.png")no-repeat left center;
      background-size: 100% 100%;
    }
  }
}
.center-center{
  ul{
    li{
      background-size: 100% 100%;
      //color: #4c86c5;
      text-align: left;
      margin: 20px 30px 20px 0;
    }
  }
}
.center-right{
  h1{
    font-size: 18px;
    border-bottom: 1px solid #ccc;
    height: 50px;
    line-height: 50px;
    margin-left: 20px;
  }
  ul{
    margin-left: 20px;
    li{
      display: flex;
      justify-content: space-between;
      height: 70px;
      line-height: 70px;
      font-size: 16px;
      span{
        display: block;
        height: 100%;
      }
      button{
        text-align: center;
        width: 50px;
        border: none;
        background: none;
        color: blue;
      }
    }
  }
}
.content-bottom{
  width: 100%;
  p{
    font-size: 16px;
    color: #4284d2;
  }
}
.bottom-box{
  width: 100%;
  border:1px solid #e7e7e7;
}
.navList{
  width: 100%;
  height: 100%;
  ul{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    font-size: 16px;
    margin-left: 30px;
    li{
      height: 25%;
      width: 12%;
      color: #252525;
    }
  }
}

.cont-right{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
}
.jsRwm{
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
<style>
  .ivu-tabs-nav{
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .ivu-tabs-nav .ivu-tabs-tab{
    width: 33%;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
  .ivu-tabs-nav .ivu-tabs-tab:nth-child(4){
    border-right:none;
  }
</style>
