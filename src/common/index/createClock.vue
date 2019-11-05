<template>
  <!--<div id="clock">-->
    <!--<p class="date">{{timeVal}}</p>-->
    <!--<p class="time" v-html="dateVal"></p>-->
  <!--</div>-->
  <div style="width: 300px;font-size: 18px;float: left">
    <Row>
      <Col span="12" style="">{{timeVal}}</Col>
      <Col span="12" v-html="dateVal" style="">></Col>
    </Row>
  </div>
</template>

<script>
export default {
    name: 'creat-clock',
    data() {
        return {
            timeVal: '',
            dateVal: '',
            timer: null
        }
    },
    methods: {
        creatClock() {
            this.timer = setInterval(this.updateTime, 1000)
            this.updateTime()
        },
        // changeStyle(){
        //   var oClock = document.getElementById('clock');
        //   var oDate = document.getElementsByClassName('date');
        //   var oTime = document.getElementsByClassName('time');
        //   oClock.style.cssFloat = 'left';
        //   oDate.style.cssFloat = 'right';
        //   oTime.style.cssFloat = 'right';
        // },
        updateTime() {
            let week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
            let cd = new Date()
            this.dateVal = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2) + '<i style="margin-right:10px"></i> ' + week[cd.getDay()]
            this.timeVal = this.zeroPadding(cd.getFullYear(), 4) + '年' + this.zeroPadding(cd.getMonth() + 1, 2) + '月' + this.zeroPadding(cd.getDate(), 2) + '日'
        },
        zeroPadding(num, digit) {
            let zero = ''
            for (let i = 0; i < digit; i++) {
                zero += '0'
            }
            return (zero + num).slice(-digit)
        }
    },
    mounted() {
        this.creatClock();
    },
    created(){

    },
    beforeDestroy() {
        clearInterval(this.timer)
    }
}
</script>

<style lang="less" scoped>
  #clock {
    /*display:flex;*/
    /*justify-content: flex-start;*/
    /*flex-wrap: nowrap;*/
    float: left;
    padding-left:10px;
    //text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
    font-weight: bold;
    font-size:16px;
    /*align-items: center;*/
    line-height: 41px;
    color:#206bc8;
    .time{
      letter-spacing: 0.05em;
      float: left;
    }
    .date{
      padding-right: 5px;
      letter-spacing: 0.1em;
      float: left;
    }
  }
</style>
