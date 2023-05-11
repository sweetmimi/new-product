<template>
    <div id="app" class="layout">
        <Layout>
          <router-view/>
        </Layout>
    </div>
</template>
<script>
export default {
  name: 'App',

  provide(){
    return {
      reload: this.reload
    }
    },
  data() {
    return {

      isRouterAlive: true
    }
  },
    created() {
      // this.$nextTick(() => {

      //   document.oncontextmenu = new Function("event.returnValue=false");

      //   document.onselectstart = new Function("event.returnValue=false");

      // });
    },
    methods: {

    reload(){
      this.isRouterAlive = false;

      this.$nextTick(function(){
        console.log(222222)
        this.isRouterAlive = true;
      });
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
</style>
