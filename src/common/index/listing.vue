<template>
    <div class="listing" style="position: relative">
        <ul class="uls" style="height: 610px;font-family: 'Microsoft YaHei';">
          <li v-for="(item,index) in currentData" :key="index" @click="lookDetail(item)" style="border-bottom:1px solid #ccc; width: 100%;height: 50px;list-style: none;font-size: 14px;color: #092e54;margin-bottom:8px;cursor: pointer;position:relative;">
              <span @mouseenter="changeStyle($event)" @mouseleave="removeStyle($event)" style="font-size:16px;width: 80%;display:block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;margin-top: 5px;margin-left: 5px;" :title="item.title.split('#')[0]">
                <span style="width: 40px;line-height: 14px;font-size: 34px;text-align: center;color: #a5a6a7;position:absolute;left:-22px;top:-6px;">.</span>
                {{item.title.split('#')[0]}}
              </span>
              <span style="color: gray;margin-right: 20px;margin-left: 5px">发布时间:{{item.createTime}}</span>
              <span style="color: gray;margin-right: 20px;margin-left: 5px">发布机构:{{item.userid.departName}}</span>
          </li>
        </ul>
      <div class="part-page" v-if="this.currentData.length>0" style="height: 30px;text-align: center;">
        <!--<Page style="list-style: none;" :total="pageParams.total" :page-size="pageParams.pageSize" :current="this.pageParams.current" show-total  @on-change="ChangePageare"></Page>-->
        <div class="page-list" style="margin-left: 35%;font-size: 14px">
            <span style="float: left;margin-right: 15px;">共&nbsp;{{pageParams.total}}&nbsp;条</span>
            <!--<span style="float: left;margin-right: 15px;cursor: pointer">当前第&nbsp;{{pageParams.current}}&nbsp;页</span>-->
            <span class="page-item" style="float: left;cursor: pointer" :class="" @click="jumpPage(pageParams.current-1)">上一页</span>
            <span class="active" style="display: block;float: left;width: 30px;cursor: pointer;" :class="{'active':num === pageParams.current}" v-for="num in Math.ceil(pageParams.total/pageParams.pageSize)" @click="jumpPage(num)">{{num}}</span>
            <span class="page-item" style="float: left;cursor: pointer" :class="" @click="jumpPage(pageParams.current+1)">下一页</span>
        </div>
      </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        name: "listing",
        data() {
            return {
                currentData:[],
                cur:1,
                pageParams:{
                  current:1,
                  pageSize:10,
                  total:20
                },
                curentType:'',
            }
        },
        mounted(){
            let myTimer = setInterval(()=>{
              this.getPagingStyle(0);
              clearInterval(myTimer)
            },500)
        },
        methods: {
          changeStyle(e){
            e.target.style.color = '#087aee';
            e.target.children[0].style.color='#087aee';
        },
          //鼠标移出
        removeStyle(e){
          e.target.style.color = 'black';
          e.target.children[0].style.color='#a5a6a7';
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
          //查看详情
          lookDetail(item){
              let router = this.$router.resolve({path:"/details",query:{text:"通知通告",id:item.id,current:this.pageParams.current}});
              window.open(router.href,'_blank')
              this.backTop()
          },
          //点击改变分页样式
          getPagingStyle(index){
            let el =$(".active");
            $(el[index]).css({
              color: '#6da1de',
              fontWeight:'700'
            })
            $(el[index]).siblings().css({color: '',fontWeight:''})
          },
          //分页控制page
          jumpPage(current){
            var _this = this;
            _this.getPagingStyle(current-1);
            _this.backTop()
            _this.pageParams.current=current;
            let page= _this.pageParams.current;
            let size=_this.pageParams.pageSize;
            let sort='createtime,desc'
            switch (_this.curentType){
              case '工作动态':
                $.get(`/api/jzweb/word/pageWork?page=${page}&size=${size}&sort=${sort}`,function(res){
                  if(res.statusCode !== 200) return process_error(res);
                  _this.currentData = _this.currentData = res.data.content;
                  _this.pageParams.total=res.data.totalElements;
                })
              break;
              case '图片新闻':
                $.get(`/api/jzweb/word/pagePictures?page=${page}&size=${size}&sort=${sort}`,function(res){
                  if(res.statusCode !== 200) return process_error(res);
                  _this.currentData = _this.currentData = res.data.content;
                  _this.pageParams.total=res.data.totalElements;
                })
              break;
              case '通知通告':
                $.get(`/api/jzweb/word/pageNotice?page=${page}&size=${size}&sort=${sort}`,function(res){
                  if(res.statusCode !== 200) return process_error(res);
                  _this.currentData = _this.currentData = res.data.content;
                  _this.pageParams.total=res.data.totalElements;
                })
              break;
              case '科技动态':
                $.get(`/api/jzweb/word/pageTechnology?page=${page}&size=${size}&sort=${sort}`,function(res){
                  if(res.statusCode !== 200) return process_error(res);
                  _this.currentData = _this.currentData = res.data.content;
                  _this.pageParams.total=res.data.totalElements;
                })
              break;
            }
          },
          //获取列表数据
          getListData(type){
            var _this = this;
            //var count = 100
            _this.curentType=type;
            switch (type){
              case '工作动态':
                $.get(`/api/jzweb/word/pageWork?page=1&size=10&sort=createtime,desc`,function(res){
                  if(res.statusCode !== 200) return process_error(res);
                  _this.currentData = _this.currentData = res.data.content;
                  _this.pageParams.total=res.data.totalElements;
                  _this.pageParams.pageSize=res.data.size
                })
                break;
              case '图片新闻':
                $.get(`/api/jzweb/word/pagePictures?page=1&size=10&sort=createtime,desc`,function(res){
                  if(res.statusCode !== 200) return process_error(res);
                  this.currentData = _this.currentData = res.data.content;
                  _this.pageParams.total=res.data.totalElements;
                  _this.pageParams.pageSize=res.data.size
                })
                break;
              case '通知通告':
                $.get(`/api/jzweb/word/pageNotice?page=1&size=10&sort=createtime,desc`,function(res){
                  if(res.statusCode !== 200) return process_error(res);
                  this.currentData = _this.currentData = res.data.content;
                  _this.pageParams.total=res.data.totalElements;
                  _this.pageParams.pageSize=res.data.size
                })
                break;
              case '科技动态':
                $.get(`/api/jzweb/word/pageTechnology?page=1&size=10&sort=createtime,desc`,function(res){
                  if(res.statusCode !== 200) return process_error(res);
                  this.currentData = _this.currentData = res.data.content;
                  _this.pageParams.total=res.data.totalElements;
                  _this.pageParams.pageSize=res.data.size
                })
                break;
              default:;
            }
          },
        }
    }
</script>

<style scoped lang="less">
</style>
