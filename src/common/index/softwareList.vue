<template>
    <div class="software-list" style="width: 100%;">
      <ul style="margin-left: 20px;margin-top: 5px;float: left;" >
        <li v-for="(item,index) in softwareListData" :key="index" style="height: 30px;line-height: 30px;font-size: 14px;list-style: none;float: left;width: 100%;border:1px solid #e6e6e6;margin-bottom:8px;padding-left:8px;">
          <span style="float: left;width: 190px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :title="item.key">{{index+1}}、{{item.key}}</span>
          <div style="float: right">
            <!--<span style="float: left;margin-right: 30px;text-align: left;width: 100px">{{item.fileSizeVal}}</span>-->
            <a style="text-align: left;width: 50px;border: none;background: none;color: rgb(104,94,237);float: left;"
               :href="`api/jzweb/softDownload/softwareDownload?filename=${item.fileName}`"
               :download="item.fileName">下载</a>
            <span style="float: left;width: 90px;text-align: center">({{item.value}}次)</span>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
    import {softwareDownload} from '../../service/index'
    import $ from 'jquery'
    export default {
        name: "software-list",
        data() {
            return {
              softwareListData:[]
            }
        },
        mounted(){
          this.rjDownList()
        },
        methods: {
          //软件下载列表
          rjDownList(){
            let count = 6;
            var _this=this
            $.post(`/api/jzweb/softDownload/homeSoftwareList?count=${count}`,null,function (res) {
              if(res.statusCode !== 200) return process_error(res);
              _this.softwareListData = res.data

            })
          },
        }
    }
</script>

<style scoped lang="less">

</style>
