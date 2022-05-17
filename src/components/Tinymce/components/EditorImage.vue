<template>
  <div class="upload-container">
    <el-button :style="{ background: color, borderColor: color }" icon="el-icon-upload" size="mini" type="primary" @click="dialogVisible = true"> {{ $t('tinymce.title') }} </el-button>
    <el-dialog :title="$t('tinymce.title')" :visible.sync="dialogVisible" center width="800px" destroy-on-close append-to-body :modal-append-to-body="false">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :headers="{
          Authorization: cookies,
        }"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        action="/api/admin/uploadFile"
        list-type="picture-card"
      >
        <el-button size="small" type="primary"> {{ $t('tinymce.uploadBtn') }} </el-button>
      </el-upload>
      <div style="display: flex; justify-content: center;">
        <el-button @click="dialogVisible = false"> {{ $t('tinymce.cancelBtn') }} </el-button>
        <el-button type="primary" @click="handleSubmit"> {{ $t('tinymce.confirmBtn') }} </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import Cookies from 'js-cookie'

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      cookies: Cookies.get('Admin-Token'),
      listObj: {},
      fileList: []
    }
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        this.listObj = {}
        this.fileList = []
      }
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every((item) => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map((v) => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.data.fileUrl
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.name
      this.listObj[fileName] = {}
      // 图片文件名有空格，不让上传
      // eslint-disable-next-line eqeqeq
      if (fileName.indexOf(' ') !== -1) {
        this.$message.error('图片文件名有空格,请上传正确的图片文件名')
        return false
      } else {
        return new Promise((resolve, reject) => {
          if (file.type.indexOf('image') === -1) {
            this.$message.error(this.$t('tinymce.uploadError'))
            reject(file)
            return
          }
          const img = new Image()
          img.src = _URL.createObjectURL(file)
          img.onload = function() {
            _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
          }
          resolve(true)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}
</style>
