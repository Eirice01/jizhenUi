<template>
    <div class="software-listing" style="width: 100%;float: left;margin-left: 15px;margin-top: 20px">
      <ul style="width: 100%;float: left;" v-for="(item,index) in softwareListData" :key="index">
        <p style="font-weight: 700;
    color: whitesmoke;
    background: rgb(8, 122, 237);
    font-size: 18px;
    width: 15%;
    text-align: center" >{{item.name}}</p>
        <li v-for="(num,index) in item.list" :key="index" style="height: 56px;line-height: 56px;font-size: 16px;margin: 0!important;list-style: none;float: left;width: 50%">
          <span style="float: left;width: 200px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;":title="num.name">{{index+1}}、{{num.name}}</span>
          <div style="float: right;margin-right: 10px">
            <span style="float: left;margin-right: 20px;text-align: right;width: 70px">{{num.fileSizeVal}}</span>
            <a style="text-align: left;width: 50px;border: none;background: none;color: rgb(104,94,237);float: left;cursor: pointer"
               :href="`api/jzweb/softDownload/softwareDownload?filename=${num.fileName}`"
               :download="num.fileName">下载</a>
            <span style="float: left;width: 90px;text-align: center">({{num.downloadCount}}次)</span>
          </div>
        </li>
      </ul>
      <!--<div class="part-page" style="position: absolute;bottom: 0;left: 50%">-->
        <!--<Page :total="pageParams.total" :page-size="pageParams.pageSize" :current="this.pageParams.current" show-total style="float: right"  @on-change="ChangePageare"></Page>-->
      <!--</div>-->
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        name: "software-listing",
        data() {
            return {
              softwareListData:[],
              // pageParams:{
              //   current:1,
              //   pageSize:10,
              //   total:20
              // },
              // curentType:''

            }
        },
        mounted(){
          this.rjDownList()
        },
          methods: {
          //软件详情列表
          rjDownList(){
            var _this=this
            $.post(`/api/jzweb/softDownload/softwareDetails`,null,function (res) {
              if(res.statusCode !== 200) return process_error(res);
              _this.softwareListData = res.data

            })
          },
          ChangePageare(){

          }
        }
    }
</script>

<style scoped lang="less">

</style>
