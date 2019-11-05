<template>
    <div class="left-meau">
      <ul class="menuTab" style="width: 180px;background: #155bb0;color: #f1f1f1;height: auto">
        <li class="activess" v-for="(num,index) in navList" :key="index"  @click="changeColor(cur=index,num.text)" style="text-align: center;margin: 0 auto;font-size: 20px;font-weight: 700;height: 70px;line-height:70px;color: white;list-style: none;width: 100%;display: block;"><Icon :type="num.icon" />{{num.text}}</li>
      </ul>
    </div>
</template>

<script>
    import {softwareDetails} from '../service/index'
    //import LeftMeau from '@/common/leftMeau';
    export default {
        name: "left-meau",
        data() {
        return {
          theme:'dark',
          cur:0,
          navList:[
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
              icon:'md-megaphone'
            }
          ]
        }
      },
        mounted(){
          this.$nextTick(()=>{
            this.$on('changeColor',() =>{

            })
          })
          this.changeColor("0",this.navList[0].text);
        },
        methods: {
          //切换tab样式
          changeColor(index,text) {
            debugger
            this.$emit('getMorList',text);
            let el = document.getElementsByClassName("activess");
            $(el[index]).css({
              backgroundColor: 'orange', color: '#fff'
            })
            $(el[index]).siblings().css({background: '', color: ''})
            this.$parent.title = this.navList[index].text;
          },
        }
    }
</script>

<style scoped lang="less">

</style>
