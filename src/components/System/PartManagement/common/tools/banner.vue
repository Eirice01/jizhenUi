<style lang="less">
    .demo-carousel{

        // border-radius: 10px !important;
        // background:-webkit-linear-gradient(left top,#131e4a,#294279,#1d234f);
        color:#B1F7FF;
        width: 100%;
        height: 100px;
        text-align: center;
        cursor: pointer;
        .content{
            min-height:80px !important;
            padding-top:10px;
            // font-size: 12px;

        }
        .title{
            font-size: 14px;
            font-weight: 600;
        }
        .top{
            background: #ed3f14;
            border-radius: 5px;
            display: inline-block;
            font-size: 12px;
            padding:0 5px 0 5px;
            color: #fff;
            font-weight: 400;
            position: relative;
            top:-2px;
            left: -5px;
        }
    }
</style>
<template>
     <div class="home" >
      <template>
        <Carousel autoplay v-model="value2"  :autoplay-speed="3000" :radius-dot="true">
            <CarouselItem v-for="(item,index) in ListArr" :key="index" >
                <table></table>
                <div class="demo-carousel" @click="annDetail(item.id)" >
                      <div class="content">
                        <p class="title"><span class="top" v-if="item.top == 1">置顶</span><span>{{item.title}}</span></p>
                        <p><span>发布时间：</span><span>{{item.createtime}}</span></p>
                    </div>
                </div>
            </CarouselItem>
        </Carousel>
    </template>
  </div>
</template>

<script>
    import {annList} from '@/modules/index/pages/userManagement/service/getData'

    export default {
        name:'Home',
        components: {},
        data(){
            return{
                value2: 0,
                ListArr:[],
            }
        },
        computed:{

        },
        methods:{
            async queryList(sendData){
				await annList(sendData).then(res => {
					if(res.statusCode !== 200) return process_error(res);
						this.ListArr = res.data;
				})
			},

            annDetail(id){
                // console.log("object");
                var {href} = this.$router.resolve({name:'Announcement',query:{id:id}});
                // console.log(href);
                window.open(href,'_blank')
            }
        },
        mounted(){
            this.queryList({number:5})
        }
    }
</script>
