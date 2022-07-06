<template>
  <div v-loading="loading" class="librarycontainer">
    <!-- <div slot="header" class="clearfix" style="margin-bottom: 20px">
      <span>{{ $t('library.title') }}</span>
    </div> -->
    <!--资源中心-->
    <div class="greycontainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="3">
              <el-checkbox v-model="checked" style="margin-top: 10px" @change="changeall">{{ $t('library.allselect') }}</el-checkbox>
            </el-col>
            <el-col :span="10">
              <el-button v-permission="[61]" type="danger" size="small" :disabled="!checkedList.length ? true : false" plain @click="handleEditAllCate">{{ $t('library.category') }}</el-button>
              <el-button v-permission="[61]" type="danger" size="small" :disabled="!checkedList.length ? true : false" plain @click="handleDelAll">{{ $t('library.delete') }}</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-select v-model="query.categoryId" placeholder="请选择" style="margin-right: 20px" clearable @change="changesearch">
              <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-upload
              ref="upload"
              v-permission="[61]"
              class="upload-demo"
              :show-file-list="false"
              :headers="uploadHeaders"
              action="/api/admin/uploadImgList"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
              :limit="10"
            >
              <el-button type="danger">{{ $t('library.upload') }}</el-button>
            </el-upload>
            <el-button v-permission="[61]" type="danger" size="small" @click="setdialog = true">{{ $t('business.categoryset') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <el-checkbox-group v-model="checkedList">
      <div class="listcontainer">
        <div v-for="(item, index) in librarylist" :key="index" class="cardcontainer">
          <el-image :src="filePath + item.filePath" mode="aspectFit" lazy :preview-src-list="[filePath + item.filePath]" class="imgsrc" fit="scale-down" />
          <div>
            <el-button class="table-cell" icon="el-icon-edit" @click="handleEdit(item)" />
            <el-button class="table-cell" icon="el-icon-guide" @click="handleEditCate(item)" />
            <el-button style="margin-left: 10px;" icon="el-icon-delete" @click="handleDel(item)" />
          </div>
          <el-checkbox :label="item.id" @change="changeCheck">
            <span>{{ item.title }}</span>
          </el-checkbox>
        </div>
      </div>
    </el-checkbox-group>
    <Pagination v-show="total > 0" :total="total" :page="pageNum" :limit="pageSize" @pagination="changePagination" />
    <!--类别设置-->
    <el-dialog :title="$t('business.categoryset')" :visible.sync="setdialog" center :close-on-click-modal="false">
      <el-button size="small" type="danger" @click="createcategory">{{ $t('library.categorysetting') }}</el-button>
      <el-table :data="tabledata" style="width: 100%">
        <el-table-column :label="$t('business.category')">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input v-model="scope.row.category" size="mini" />
            </span>
            <span v-else>{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('business.creator')" align="center">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input v-model="scope.row.creator" size="mini" />
            </span>
            <span v-else>{{ scope.row.creator }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.isSet" size="small" type="text" @click="Save(scope.row)">{{ $t('message.save') }}</el-button>
            <el-button v-if="!scope.row.isSet" v-permission="[61]" size="small" type="text" @click="Edit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Delete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--名称修改-->
    <el-dialog :title="$t('message.update')" :visible.sync="editdialog" center destroy-on-close :close-on-click-modal="false">
      <el-form ref="editform" :model="editform" :rules="rules">
        <el-form-item :label="$t('library.name')" :label-width="formLabelWidth" prop="title">
          <el-input v-model="editform.title" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savename">{{ $t('message.save') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--类别修改-->
    <el-dialog :title="$t('message.update')" :visible.sync="editcategorydialog" center :close-on-click-modal="false">
      <el-form ref="editcateform" :model="editcateform">
        <el-form-item :label="$t('library.category')" :label-width="formLabelWidth" prop="categoryId">
          <el-select v-model="editcateform.categoryId" placeholder="请选择" style="margin-right: 20px">
            <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savecate">{{ $t('message.save') }}</el-button>
        <el-button @click="Canclecate">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--批量文件上传-->
    <!-- <el-dialog :title="$t('library.upload')" :visible.sync="uploaddialog" center @close="getMatlist">
      <el-upload
        ref="upload"
        class="upload-demo"
        multiple
        :show-file-list="false"
        list-type="picture-card"
        :headers="uploadHeaders"
        action="/api/admin/uploadImgList"
        :on-preview="handPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :file-list="fileList"
        :limit="10"
      >
        <i class="el-icon-plus" />
      </el-upload></el-dialog> -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination2'
import { materialList, materialDelete, materialChange, materialRename } from '@/api/material'
import { categoryList, categoryAdd, categoryDel, categoryEdit } from '@/api/article'
import { transList } from '@/utils'
import Cookies from 'js-cookie'
import { getToken } from '@/utils/auth'
export default {
  name: 'Material',
  components: { Pagination },
  data() {
    return {
      uploadHeaders: { Authorization: getToken(), userId: JSON.parse(localStorage.getItem('userInfo')).id },
      cookies: Cookies.get('Admin-Token'),
      filePath: process.env.VUE_APP_FILE_BASE_API,
      // 全选参数
      query: {
        category: ''
      },
      checked: false,
      setdialog: false,
      editdialog: false,
      editcategorydialog: false,
      uploaddialog: false,
      tabledata: [],
      librarylist: [],
      categoryList: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      editform: {
        id: '',
        title: ''
      },
      editcateform: {
        id: [],
        categoryId: ''
      },
      formLabelWidth: '130px',
      rules: {},
      checkedList: [],
      fileList: [],
      loading: false,
      listObj: {}
    }
  },
  watch: {
    setdialog(val) {
      if (!val) {
        this.getcategoryList()
      }
    },
    editdialog(val) {
      if (!val) {
        this.editform = {
          id: '',
          title: ''
        }
      }
    },
    '$store.getters.language'() {
      this.setRules()
    }
  },
  created() {
    this.getcategoryList()
    this.getlist()
  },
  mounted() {
    this.setRules()
  },
  methods: {
    setRules() {
      this.rules = {
        title: { required: true, message: this.$t('library.titleRequire'), trigger: 'blur' }
      }
      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.editform ? this.$refs.editform.clearValidate() : null
        })
      }, 1)
    },
    // 关闭获取list
    getMatlist() {
      this.uploaddialog = false
      this.getlist()
    },
    // 种类变化搜索
    changesearch() {
      this.getlist()
    },
    // 编辑
    handleEditAllCate() {
      this.editcateform.id = this.checkedList
      this.editcategorydialog = true
    },
    // 改变选中
    changeCheck() {
      if (this.librarylist.length && this.checkedList.length === this.librarylist.length) {
        this.checked = true
      } else {
        this.checked = false
      }
    },
    // 全部清空
    async handleDelAll() {
      this.$confirm(this.$t('popconfirm.text'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await materialDelete(this.checkedList)
          this.getlist()
        })
    },
    // 全选定义
    changeall() {
      this.checkedList = []
      if (this.checked) {
        this.librarylist.forEach(item => {
          this.checkedList.push(item.id)
        })
      }
    },
    // 编辑种类弹窗
    Canclecate() {
      this.editcateform.id = []
      this.editcateform.categoryId = ''
      this.editcategorydialog = false
    },
    // 取消
    Cancle() {
      this.editform = {}
      this.editdialog = false
    },
    // 种类编辑
    handleEditCate(row) {
      this.editcateform.id.push(row.id)
      this.editcateform.categoryId = row.categoryId
      this.editcategorydialog = true
    },
    // 处理编辑
    handleEdit(row) {
      this.editform = JSON.parse(JSON.stringify(row))
      this.editdialog = true
    },
    // 修改名称
    async savename() {
      this.$refs.editform.validate(async valid => {
        if (valid) {
          const data = {
            id: this.editform.id,
            name: this.editform.title,
            userId: JSON.parse(localStorage.getItem('userInfo')).id
          }
          await materialRename(data)
          this.editdialog = false
          this.editform = {}
          this.getlist()
        }
      })
    },
    // 修改类别
    async savecate() {
      this.editcateform.updateUser = JSON.parse(localStorage.getItem('userInfo')).id
      materialChange(this.editcateform)
      this.editcategorydialog = false
      setTimeout(() => {
        this.editcateform.id = []
        this.editcateform.categoryId = ''
        this.checkedList = []
      }, 200)
      this.getlist()
    },
    // 获取种类列表
    async getcategoryList() {
      const type = 4
      const res = await categoryList(type)
      this.categoryList = transList(res.data)
      res.data.map((i) => {
        i.isSet = false
      })
      this.tabledata = res.data
    },
    // 改变分页
    changePagination(pagination) {
      this.pageNum = pagination.page
      this.pageSize = pagination.limit
      this.checkedList = []
      this.getlist()
    },
    // 获取列表
    async getlist() {
      const data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        categoryId: this.query.categoryId
      }
      this.loading = true
      this.librarylist = []
      const res = await materialList(data)
      this.loading = false
      this.total = res.data.total
      res.data.list.map((i) => {
        i.checked = false
      })
      this.librarylist = res.data.list
    },
    // 添加种类
    createcategory() {
      const data = {
        category: '',
        creator: '',
        isSet: true,
        categoryadd: true
      }
      this.tabledata.push(data)
    },
    // 添加种类
    async Save(row) {
      const data = {
        id: row.id,
        category: row.category,
        creator: row.creator,
        type: 4,
        isSet: false
      }
      if (!data.category) {
        this.$message.error(this.$t('userful.categoryIdtips'))
        return
      }
      if (row.categoryadd) {
        const res = await categoryAdd(data)
        data.id = res.data
        this.$set(this.tabledata, this.tabledata.indexOf(row), data)
      } else {
        await categoryEdit(data)
        this.$set(this.tabledata, this.tabledata.indexOf(row), data)
      }
    },
    // 编辑种类
    async Edit(row) {
      row.isSet = true
    },
    // 删除种类
    async Delete(id) {
      this.$confirm(this.$t('navbar.delcatetitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await categoryDel(id)
          this.getcategoryList()
        })
    },
    // 删除资源库文件
    handleDel(row) {
      this.$confirm(this.$t('popconfirm.text'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          const list = []
          list.push(row.id)
          await materialDelete(list)
          this.getlist()
        })
    },
    handleSuccess() {
      this.getMatlist()
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
    }
  }
}
</script>
<style scoped>
.librarycontainer {
  width: 100%;
}
.greycontainer {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 24px;
}
.left {
  float: left;
}
.right {
  float: right;
}
.listcontainer {
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: stretch;
  min-height: 225px;
}
.cardcontainer {
  width: 20%;
  height: 225px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.imgsrc {
  width: 190px;
  height: 160px;
  margin-bottom: 10px;
}
.table-cell {
  display: table-cell;
}

.upload-demo {
  margin-right: 20px;
}
</style>
