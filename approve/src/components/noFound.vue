<template>
  <div id="noFound" class="m-noFound">
    <div class="pic">
      <img src="../assets/404.png" alt="">
    </div>
    <div class="content">
      <h2 class="title">404</h2>
      <p class="subtitle">{{ $t('noFound.title') }}</p>
      <Button type="primary" class="back" @click="backHome">{{ $t('noFound.back') }}</Button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    backHome() {
      this.$router.push({path: '/'})
    }
  }
}
</script>
<style scoped lang="scss">
.m-noFound {
  .pic {
    float: left;
    width: 50%;
    text-align: right;
    padding-top: 150px;
    img {
      width: 280px;
    }
  }
  .content {
    display: block;
    margin-left: 55%;
    padding-top: 200px;
    .title {
      font-size: 50px;
      color: #545a5a;
    }
    .subtitle {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
    }
    .back {
      margin-top: 10px;
    }
  }
  .ft {
    font-size: 12px;
    color: #999;
    text-align: center;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 20px;
  }
}
</style>


