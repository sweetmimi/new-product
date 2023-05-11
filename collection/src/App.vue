<template>
    <div id="app" class="layout">
        <Layout>
          <router-view/>
        </Layout>
    </div>
</template>
<script>

import {watermark} from '@/common/js/waterMark'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  mounted() {
     let text = localStorage.getItem("%username")
    if(text){
      console.log(text)
       watermark({watermark_txt:''+"  "+text})
    }
  }

}
</script>

<style scoped lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
.ivu-layout {
  height: 100%;
}
.layout {
    /* border: 1px solid #d7dde4; */
    background: #f5f7f9;
    position: relative;
    /* border-radius: 4px; */
    overflow: hidden;
    height: 100%;
}
.ivu-layout-header{
    padding: 0 5px;
}

.layout-nav {
    width: 365px;
    margin: 0 auto;
    margin-right: 20px;
    overflow: hidden;
}
</style>
