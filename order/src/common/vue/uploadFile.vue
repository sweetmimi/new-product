<template>
  <!-- File drag and drop upload -->
  <div class="up">
    <Upload
      class="drag-upload"
      :action="action"
      :name="name"
      :accept="accept"
      :data="otherParams"
      :visible="visible"
      ref="upload"
      type="drag"
      :headers='xHeaders'
      :limit="limit"
      :file-list="value"
      :auto-upload="autoUploadVal"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :on-success="handleSuccess"
      :on-progress="onProgress"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      :disabled="disabled"
　　　　>
      <div class="box">
           <i-circle  type="circle" v-show="loading" :percent="percent" :stroke-color="colors" class="progress">
               <span class="demo-Circle-inner" style="font-size:24px">{{percent}}%</span>
           </i-circle >
       <Icon class="drag-upload__icon" v-show="!loading" type="ios-cloud-upload" size="62" style="color: #3399ff"></Icon>
       <!-- <p>{{percent}}</p> -->
     <!-- / <i class="drag-upload__icon" :class="loading ? '' : 'el-icon-upload' "></i> -->
    
      </div>

    </Upload>
  </div>

</template>

<script>
export default {
  name: "uploadFile",
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    autoUpload: {
      type: String,
      default: 0,
    },
    limit: {
      type: Number,
      default: 1,
    },
    action: {
      required: true,
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "file",
    },
    accept:{
      type: String,
      default:'',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    sizeLimit: {
      type: Number,
      default: 1000,
    },
    tip: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    visible(value) {
      if (value) {
      } else {
        clearInterval(this.interval);
        this.loading = false;
      }
    },
  },
  data() {
    return {
      loading: false,
      otherParams: {
      },
      xHeaders: {
        // "Content-Type": "multipart/form-data"
      },
      autoUploadVal: this.autoUpload == "1" ? true : false,
      isChangeFlag: false,
      percent: 0,
      colors: "#2db7f5",
      interval: 0, 
      timeStop: 0,
    };
  },
  methods: {
    submitUpload() {
      let uoloadFilesData = this.$refs.upload.uploadFiles;
      console.log(uoloadFilesData)
      if (uoloadFilesData.length == 0) {
        let res = {
          data: "",
        };
        this.$emit("submitUploadParent", res);
      } else {
        if (uoloadFilesData[0].status === "success") {
          uoloadFilesData[0].data = uoloadFilesData[0].name;
          this.$emit("submitUploadParent", uoloadFilesData[0]);
        } else {
          this.$refs.upload.submit();
        }
      }
    },
    abort() {
      this.$refs.upload.abort();
    },
    onProgress(e, file, v) {
      let that = this;
      let endPro = 90;
      that.loading = true;
      that.interval = setInterval(function () {
        if (that.percent < endPro) {
          that.percent++;
        }
      }, 500);
    },
    beforeUpload(file) {
      const limit = file.size / 1024 / 1024 < this.sizeLimit;
      if (!limit) {
        this.$Message.error(` ${this.sizeLimit}MB!`);
      }
      if (limit) {
        this.loading = true;
      }
      return limit;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`delet ${file.name}”？`);
    },
    handleSuccess(res, file, fileList) {
      console.log(res)
      let that = this;
      that.percent = 100;
      clearInterval(that.interval);
      that.timeStop = setTimeout(() => {
        that.loading = false;
        // that.percent = 0;
        clearTimeout(that.timeStop);
        if (res.code == 0) {
          that.$emit("submitUploadParent", res);
          this.$refs.upload.clearFiles();
        } else {
          that.$Message.error(res.msg || "error");
          this.$refs.upload.clearFiles();
        }
      }, 1000);
    },
    handleRemove(file, fileList) {
      clearInterval(this.interval);
      this.percent = 0;
      this.loading = false;
      this.$emit("input", fileList);
    },
    handlePreview(file) {
      window.open(file.url);
    },
  },
};
</script>

<style lang="less" scoped>
.box{
   position: relative;
   top: 50%; 
   transform: translateY(-50%);

  .drag-upload__icon {
    font-size: 40px;
    line-height: 50px;
    color: #1989fa;
    margin: 0;
  }

  .drag-upload__text {
    line-height: 30px;
    margin-bottom: 6px;
  }

  .drag-upload__tip {
    font-size: 12px;
    line-height: 30px;
    color: #1989fa;
  }

}

</style>

<style lang="less">
.up{
    width: 100%;
  height: 100%;;
  .drag-upload {
  width: 100%;
  height: 100%;
  .ivu-upload {
    width: 100%;
    height: 100%;
  }
  .ivu-upload-dragger {
    width: 100%;
    min-height: 140px;
    height: 100%;
    padding: 20px 1em;
  }
  .ivu-progress {
     display: none;
  }
  .progress.ivu-progress {
    display: inline-block;
  }
}
}

</style>
