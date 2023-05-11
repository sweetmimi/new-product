<template>
  <div class="m-customerMaterialInfo">
    <div class="tag-warp">
      <Tag type="border" class="tag" :color="data.device_photo ? '#5b8c00' : ''" :style="!data.device_photo ? style : 'border: 1px solid #5b8c00; color: #5b8c00;'" @click.native="showPhoto(data.device_photo)">{{$t('loan.materialInfo.devicePhoto')}}</Tag>
      <Tag type="border" class="tag" :color="data.front_photo ? '#ad6800' : ''" :style="!data.front_photo ? style : 'border: 1px solid #ad6800; color: #ad6800;'" @click.native="showPhoto(data.front_photo)">{{$t('loan.materialInfo.frontPhoto')}}</Tag>
      <Tag type="border" class="tag" :color="data.stock_photo ? '#009688' : ''" :style="!data.stock_photo ? style : 'border: 1px solid #009688; color: #009688;'" @click.native="showPhoto(data.stock_photo)">{{$t('loan.materialInfo.stockPhoto')}}</Tag>
     
    </div>
    <div class="show-photo" v-if="showPhotos">
     
    <div class="single-photo">
      <img :src="photos">
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class CustomerMaterialInfo extends Vue {
  @Prop({default: {}, type: Object }) data!: any
  showLivingPhotos = false
  showPhotos = false
  photos = []
  style = {
    borderStyle: 'dashed',
    color: '#495060a6'
  }
  showPhoto(photos: string) {
    if (!photos) {
      this.showPhotos = false
      return false
    }
    this.showPhotos = true
    Object.assign(this, {
      photos: photos
    })
    this.showLivingPhotos = (typeof photos) !== 'string'
  }
  
}
</script>

<style lang="scss" scoped>
.m-customerMaterialInfo {
  .tag {
    border-radius: 3px;
    text-align: center;
    height: auto;
    padding: 0px 10px;
    margin-right: 10px;
  }
  .show-photo {
    margin-top: 20px;
    .living-photo {
      width: 100%;
    }
    .single-photo {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
}
</style>
<style lang="scss">
.ivu-carousel-dots {
  height: 25px;
  li {
    button {
      &.radius {
        width: 10px;
        height: 10px;
      }
    }
    &.ivu-carousel-active {
      button {
        &.radius {
          width: 10px;
          height: 10px;
        }
      }
    }
  }
}
</style>
