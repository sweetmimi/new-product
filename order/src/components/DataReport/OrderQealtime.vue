<template>
  <div id="user_add">
    <Modal
      v-model="build"
      title="add"
      @on-cancel="AddData = {}"
      class-name="vertical-center-modal"
    >
      <Form ref="add" :model="AddData" :rules="AddRule" :label-width="90">
        <FormItem label="apk"  prop="file">
          <Upload
            v-model="AddData.file"
            :before-upload="handleUpload"
            accept=".apk"
            :format="['.apk']"
            :max-size=102400
            action="#"
            ref="upload"
          >
            <Button size="small">Select the file</Button>
          </Upload>
          <span style="margin-left: 10px">
             
              <span v-if="AddData.file === null">No file selected</span>
              <span v-if="AddData.file !== null">{{ AddData.file.name }}</span>
            </span>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="verification" :loading="loadingStatus">ok</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
// import { appVersionAdd } from '@/api/systemManage'
export default {
  name: 'UserAdd',
  data () {

    const validateUpload = (rule, value, callback) => {
      if (this.AddData.file === null) {
        callback(new Error('Please select a file to upload'))
      } else {
        callback()
      }
    }
    return {

      AddData: {
        remark: '',
        file: null
      },

      AddRule: {
        file: [
          { required: true, validator: validateUpload, trigger: 'change' }
        ]
      },

      build: false,

      loadingStatus: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {

    handleUpload (file) {

      this.AddData.file = file

      this.$refs['add'].validate(() => {})
    },

    verification () {
      this.loadingStatus = true
      this.$refs['add'].validate((valid) => {
        if (valid) {
          this.upload()
        } else {
          this.loadingStatus = false
        }
      })
    },

    upload () {

      let param = new FormData()
      param.append('file', this.AddData.file)
      param.append('remark', this.AddData.remark)
      this.params = param

      appVersionAdd(this.params).then((res) => {
        if (res.data.code === '0000') {
          this.$Notice.success({ title: 'Uploaded successfully' })
          this.loadingStatus = false
        } else {
          this.loadingStatus = false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
<style lang="scss">

  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
    .ivu-modal{
      top: 0;
    }
  }
</style>


