<template>
  <div class="upload-container">
    <el-button icon="el-icon-upload" size="mini" type="primary" @click="materials">{{ $t('tinymce.material') }}</el-button>
    <el-button style="marginLeft: 10px" icon="el-icon-upload" size="mini" type="primary" @click="dialogVisible = true"> {{ $t('tinymce.title') }} </el-button>
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
    <el-dialog :title="$t('tinymce.title')" :visible.sync="material" center width="1000px" destroy-on-close append-to-body :modal-append-to-body="false">
      <el-row style="width: 100%;margin-bottom: 30px;" type="flex" justify="end">
        <el-select v-model="categoryId" placeholder="请选择" style="margin-right: 20px" clearable @change="changesearch">
          <el-option v-for="item in categoryLists" :key="item.id" :label="item.category" :value="item.id" />
        </el-select>
      </el-row>
      <div v-loading="loading" style="min-height: 200px">
        <el-checkbox-group v-if="librarylist.length" v-model="checkedList">
          <div class="listcontainer">
            <div v-for="(item, index) in librarylist" :key="index" class="cardcontainer">
              <el-image :src="filePath + item.filePath" mode="aspectFit" lazy :preview-src-list="[filePath + item.filePath]" class="imgsrc" fit="scale-down" />
              <el-checkbox :label="item.id" @change="changeCheck">
                <span style="text-overflow: ellipsis; white-space: break-spaces;">{{ item.title }}</span>
              </el-checkbox>
            </div>
          </div>
        </el-checkbox-group>
        <div v-if="!librarylist.length" style="width: 100%;height: 200px;display: flex;justify-content: center;align-items: center;font-size: 14px;color: #5e6d82;">{{ $t('tinymce.noMaterial') }}</div>
      </div>
      <Pagination :total="total" :page="pageNum" :limit="pageSize" @pagination="changePagination" />
      <div style="display: flex; justify-content: center;">
        <el-button type="primary" @click="materialSubmit"> {{ $t('tinymce.confirmBtn') }} </el-button>
        <el-button @click="cancelBtn"> {{ $t('tinymce.cancelBtn') }} </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import { materialList } from '@/api/material'
import { categoryList } from '@/api/article'
import Pagination from '@/components/Pagination2'
import Cookies from 'js-cookie'

export default {
  name: 'EditorSlideUpload',
  components: { Pagination },
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      material: false,
      dialogVisible: false,
      cookies: Cookies.get('Admin-Token'),
      listObj: {},
      filePath: process.env.VUE_APP_FILE_BASE_API + 'wind/',
      checkedList: [],
      librarylist: [],
      materialObj: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      fileList: [],
      loading: true,
      categoryId: '',
      categoryLists: []
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
      if (fileName.indexOf('#') > -1) {
        this.$message.error(this.$t('tips.errornull'))
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
    },
    changePagination(pagination) {
      this.pageNum = pagination.page
      this.pageSize = pagination.limit
      this.materials()
    },
    materials() {
      this.material = true
      this.getcategoryList()
      this.getMaterialList()
    },
    changesearch(val) {
      this.categoryId = val
      this.getMaterialList()
    },
    // 获取种类列表
    async getcategoryList() {
      const type = 4
      const res = await categoryList(type)
      this.categoryLists = res.data
    },
    getMaterialList() {
      const data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        categoryId: this.categoryId
      }
      this.loading = true
      materialList(data).then(res => {
        this.librarylist = res.data.list
        this.total = res.data.total
        this.loading = false
      }, () => {
        this.loading = false
      })
    },
    changeCheck() {
      var list = []
      for (let i = 0; i < this.checkedList.length; i++) {
        const v = this.checkedList[i]
        var b = this.librarylist.filter(items => items.id === v)
        list.push(b)
      }
      var obj = []
      for (let i = 0; i < list.length; i++) {
        var Url = this.filePath + list[i][0].filePath
        var data = { hasSuccess: true, url: Url, uid: list[i][0].id }
        obj.push(data)
      }
      this.materialObj = obj
    },
    materialSubmit() {
      const arr = Object.keys(this.materialObj).map((v) => this.materialObj[v])
      if (!arr.length) {
        this.$message.error(this.$t('tinymce.choose'))
        return
      }
      this.$emit('successCBK', arr)
      this.cancelBtn()
    },
    cancelBtn() {
      this.checkedList = []
      this.pageNum = 1
      this.pageSize = 10
      this.material = false
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

.listcontainer {
  overflow: hidden;
  // margin-right: -20px;
  margin-bottom: -40px;
  margin-top: 0;
}

.cardcontainer {
  float: left;
  width: calc((100% - 40px) / 5);
  height: 200px;
  margin-right: 10px;
  margin-bottom: 20px;
}

.cardcontainer:nth-of-type(5n) {
  margin-right: 0;
}

.imgsrc {
  width: 100%;
  height: 160px;
  margin-bottom: 10px;
}
</style>
