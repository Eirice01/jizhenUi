<template>
    <div class="address-list" style="width: 100%;">
      <div style="width: 100%;">
        <ul style="margin-left: 15px;">
          <li v-for="(item,index) in addressListData.textList" :key="index" style="height: 58px;line-height: 29px;font-size: 14px;list-style: none;display:inline-block;border:1px solid #e6e6e6;width:45%;margin:10px 15px auto auto !important;text-align:center;">
            <div>{{item.text.split(":")[0]}}</div>
            <div>{{item.text.split(":")[1]}}</div>
          </li>
        </ul>
        <div class="imgClass" style="margin-top: 10px;border:1px solid #e6e6e6;margin-left:15px;margin-right:20px;text-align:center;width:90%;"  v-for="(num,index) in addressListData.imgTextobj" :key="index">
          <img :src="num.img" alt="" style="width: 80px;height: 80px;">
          <span style="font-size: 14px;margin-left: 9px;width: 100%;">{{num.text}}</span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "address-list",
        data() {
            return {
              addressListData:{
                textList:[
                  {
                    text:'接案中心:029-87255244'
                  },
                  {
                    text:'指挥中心:029-87278110'
                  },
                  {
                    text:'传真电话:029-87276357'
                  },
                  {
                    text:'投诉电话:029-86751952'
                  },
                ],
                imgTextobj: [
                  {
                    img: require("@/assets/images/zfjd.jpg"),
                    text: '执法监督(微信)'
                  }
                ]

              },
            }
        },
        methods: {}
    }
</script>

<style scoped lang="less">

</style>
