<template>
  <div id="app" style="background: #f4f4f4;" ref="app">
      <router-view/>
  </div>
</template>
<script>
import { setStore } from '@/config/mUtils'
import { getCurrentInfo } from '@/service'
export default {
    name: 'App',
    data() {
        return {
            authList: []
        }
    },
    methods: {
        async getCurrentUserFn() {
            try {
                let res = await getCurrentInfo()
                if (res.statusCode !== 200) {
                    res = await getCurrentInfo()
                }
                this.authList = res.data.user.ocodeList
                setStore('userInfo', res.data.user)
                setStore('copyright', res.data.copyright)
                setStore('authList', res.data.user.ocodeList)
            } catch (err) {
                //console.log(err)
            }
        },
    },
    created () {

    },
    mounted(){
    },
}
</script>

<style lang="less">
html,body{
  padding: 0;
  margin: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-y: auto;
  position: relative;
  height: 100%;
}
ul{margin: 0;padding: 0}
ul,li{ list-style:none;}
body{
  /*background: url(./assets/images/homeBg.jpg) fixed no-repeat;*/
  background-size: cover;
}
</style>
