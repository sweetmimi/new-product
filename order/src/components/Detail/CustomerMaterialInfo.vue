<template>
  <div class="m-customerMaterialInfo">
    <div class="tag-warp">
      <Tag type="border" class="tag" :color="data.idcard_front ? '#5b8c00' : ''" :style="!data.idcard_front ? style : 'border: 1px solid #5b8c00; color: #5b8c00;'" @click.native="showPhoto(data.idcard_front)">{{$t('loan.materialInfo.idcardFront')}}</Tag>
      <!-- <Tag type="border" class="tag" :color="data.idcard_back ? '#ad6800' : ''" :style="!data.idcard_back ? style : 'border: 1px solid #ad6800; color: #ad6800;'" @click.native="showPhoto(data.idcard_back)">{{$t('loan.materialInfo.idcardBack')}}</Tag>
      <Tag type="border" class="tag" :color="data.idcard_held ? '#009688' : ''" :style="!data.idcard_held ? style : 'border: 1px solid #009688; color: #009688;'" @click.native="showPhoto(data.idcard_held)">{{$t('loan.materialInfo.idcardHeld')}}</Tag>
      <Tag type="border" class="tag" :color="data.social_card ? '#ad2102' : ''" :style="!data.social_card ? style : 'border: 1px solid #ad2102; color: #ad2102;'" @click.native="showPhoto(data.social_card)">{{$t('loan.materialInfo.socialCard')}}</Tag>
      <Tag type="border" class="tag" :color="data.credit_card ? '#9b43c3' : ''" :style="!data.credit_card ? style : 'border: 1px solid #9b43c3; color: #9b43c3;'" @click.native="showPhoto(data.credit_card)">{{$t('loan.materialInfo.creditCard')}}</Tag>
      <Tag type="border" class="tag" :color="data.family_card ? '#00bcd4' : ''" :style="!data.family_card ? style : 'border: 1px solid #00bcd4; color: #00bcd4;'" @click.native="showPhoto(data.family_card)">{{$t('loan.materialInfo.familyCard')}}</Tag> -->
      <Tag type="border" class="tag" :color="data.face_photo_list && data.face_photo_list.length ? '#7cb305' : ''" :style="data.face_photo_list && !data.face_photo_list.length ? style : 'border: 1px solid #7cb305; color: #7cb305;'" @click.native="showPhoto(data.face_photo_list)">{{$t('loan.materialInfo.facePhotoList')}}</Tag>
    </div>
    <div class="show-photo" v-if="showPhotos">
      <Carousel radius-dot v-if="showLivingPhotos">
        <CarouselItem v-for="(item, index) in photos" :key="index">
          <img class="living-photo" :src="item"/>
        </CarouselItem>
      </Carousel>
    <div class="single-photo" v-else>
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
