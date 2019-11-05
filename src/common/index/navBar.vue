<template>
    <div class="navBar" style="width: 100%;height: 100%">
      <ul class="menuTab" style="width: 100%;float: left;height: 50px;color: #f1f1f1;cursor: pointer;margin-top:-10px;">
        <template v-for="(num,index) in navList">
          <li v-if="index == navList.length-1" class="actives" :key="index"  @click="changeColor(num.index,num.text,num.path)" style="width: 214px;text-align: center;font-size: 18px;font-weight: 700;height: 50px;line-height:50px;float: left;padding: 0 24px;color: whitesmoke;list-style: none;">
            <span style="width: 100%;height: 100%;display: block;color: whitesmoke;">
              <Icon :type="num.icon"  style="margin-bottom: 3px"/>
              {{num.text}}
            </span>
          </li>
          <li v-else class="actives" :key="index"  @click="changeColor(num.index,num.text,num.path)" style="width:214px;text-align: center;font-size: 18px;font-weight: 700;height: 50px;line-height:50px;float: left;padding: 0 24px;color: whitesmoke;list-style: none;margin-right:10px;">
            <span style="width: 100%;height: 100%;display: block;color: whitesmoke;">
              <Icon :type="num.icon"  style="margin-bottom: 3px"/>
              {{num.text}}
            </span>
          </li>
        </template>
      </ul>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        name: "nav-bar",
        data() {
            return {
              theme:'dark',
              cur:0,
              actives:{
                background: 'red', color: '#ffffff'
              },
              navList:[
                {
                  path:"/index",
                  text:'首页',
                  index:'0',
                  icon:'md-home'
                },
                {
                  path:"/tabloid",
                  text:'图片新闻',
                  index:'1',
                  icon:'md-images'
                },
                {
                  path:"/dynamic",
                  text:'工作动态',
                  index:'2',
                  icon:'md-star'
                },
                {
                  path:"/technology",
                  text:'科技动态',
                  index:'3',
                  icon:'ios-jet'
                },
                {
                  path:"/notice",
                  text:'通知通告',
                  index:'4',
                  icon:'md-megaphone'
                }
              ]
            }
        },
        props: {
          title: {
            type: String,
            default: () => ""
          },
          routes: {
            type: Array,
            default: () => []
          }
        },
        mounted(){
          let el = document.getElementsByClassName("actives");
          $(el[0]).css({
            backgroundColor: 'orange', color: 'whitesmoke'
          })
          $(el[0]).siblings().css({background: '#155bb0', color: 'whitesmoke'});
        },
        methods:{
          //切换tab样式
          changeColor(index,text,path) {
            let el = document.getElementsByClassName("actives");
            $(el[index]).css({
              backgroundColor: 'orange', color: 'whitesmoke'
            })
            $(el[index]).siblings().css({backgroundColor: '#155bb0', color: 'whitesmoke'});
            if(index!='0'){
              this.$router.push({path:'/infolist',query:{text:text,index:index}})
            }else {
              this.$router.push({path:'/index'})
            }
          }
        }
    }
</script>

<style lang="less">

</style>
