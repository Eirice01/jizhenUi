<template>
    <div class="gotop" v-show="isShow" @click="backTop"
         style="text-align: center;position: fixed;right: 100px;bottom: 110px;cursor: pointer;padding: 10px;border-radius: 50%;background: #087aee;color: #000000;z-index: 999999999">
      <!--顶部-->
      <Icon type="ios-arrow-up" style="font-size: 24px;color: whitesmoke" />
    </div>
</template>

<script>
    export default {
        name: "back-top",
        data() {
            return {
              isShow:false,
              scroll:""
            }
        },
        mounted(){
          window.addEventListener("scroll",this.scrollToTop,true);
        },
        destroyed(){
          window.removeEventListener("scroll",this.scrollToTop,true);
        },
        methods: {
          scrollToTop(){
            this.scroll = document.getElementById('app').scrollTop || document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
            this.scroll > 300 ? (this.isShow = true) : (this.isShow = false);
          },
          backTop(){
            let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset || document.getElementById('app').scrollTop;
            const timeTop = setInterval(()=>{
              document.getElementById('app').scrollTop = document.body.scrollTop = document.documentElement.scrollTop = window.pageYOffset = top -= 50;
              if(top <= 0){
                clearInterval(timeTop);
              }
            },10)
          },
        }
    }
</script>

<style scoped lang="less">

</style>
