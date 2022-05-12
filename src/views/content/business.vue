<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-select v-model="queryParams.categoryId" placeholder="请选择">
                <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.keyWord" size="small" style="width: 100%" placeholder="Keyword" suffix-icon="el-icon-search" clearable />
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.creator" size="small" style="width: 100%" placeholder="Creator" suffix-icon="el-icon-search" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" plain @click="search">{{ $t('message.search') }}</el-button>
            <el-button type="danger" size="small" plain @click="setdialog = true">{{ $t('business.categoryset') }}</el-button>
            <el-button type="danger" size="small" @click="handleAdd">{{ $t('business.sendnotification') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <Pagination ref="pagination" uri="/api/admin/businiessOpentionalList" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('business.id')" prop="id" />
        <el-table-column align="center" :label="$t('business.title')" prop="title" />

        <el-table-column :label="$t('business.category')" prop="categoryEnName" />

        <el-table-column :label="$t('business.creator')" prop="creator" align="center" />

        <el-table-column align="center" :label="$t('business.updatetime')" prop="updateTime" :formatter="formatDate" />
        <el-table-column align="center" :label="$t('business.status')" prop="publish" :formatter="transactive" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.publish === 1" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('message.unPublish') }}</el-button>
            <el-button v-if="scope.row.publish === 0" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('message.publish') }}</el-button>
            <el-button v-if="scope.row.publish === 0" size="small" type="text" @click="handleEdit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="handleDelete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--类别设置-->
    <el-dialog :title="$t('business.categoryset')" :visible.sync="setdialog" center :close-on-click-modal="false" destroy-on-close>
      <el-button size="small" type="primary" @click="createcategory">{{ $t('library.addcategory') }}</el-button>
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
            <el-button v-if="scope.row.isSet" :disabled="scope.row.category ? false : true" size="small" type="text" @click="Save(scope.row)">{{ $t('message.save') }}</el-button>
            <el-button v-if="!scope.row.isSet" :disabled="scope.row.category ? false : true" size="small" type="text" @click="Edit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Delete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--添加通告-->
    <el-dialog :title="$t('business.sendnotification')" :visible.sync="adddialog" center destroy-on-close :close-on-click-modal="false" width="800px">
      <el-form ref="addform" :model="addform" :rules="rules">
        <el-form-item :label="$t('business.title')" :label-width="formLabelWidth" prop="title">
          <el-input v-model="addform.title" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('business.creator')" :label-width="formLabelWidth" prop="creator">
          <el-input v-model="addform.creator" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('business.content')" :label-width="formLabelWidth" prop="content">
          <tinymce v-model="addform.content" :height="250" />
        </el-form-item>
        <el-form-item :label="$t('business.uploadfile')" :label-width="formLabelWidth" prop="uploadfile">
          <!-- <el-date-picker type="date" placeholder="选择日期" v-model="historyform.publishdate" style="width: 100%"></el-date-picker>-->
          <el-upload
            ref="upload"
            class="upload-demo"
            :headers="{
              Authorization: cookies,
            }"
            action="/api/admin/uploadFile"
            :on-preview="handPreview"
            :on-remove="handRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            :limit="1"
          >
            <el-button slot="trigger" size="small" type="primary">{{ $t('business.uploadfile') }}</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('business.category')" :label-width="formLabelWidth" prop="categoryId">
          <el-select v-model="addform.categoryId" placeholder="请选择">
            <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="submitLoading" @click="savebusiness">{{ $t('message.save') }}</el-button>
        <el-button v-show="isAdd" type="primary" :loading="submitLoading" @click="submitbusiness">{{ $t('addArticle.submit') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import Tinymce from '@/components/Tinymce'
// eslint-disable-next-line no-unused-vars
import { businessAdd, businessDel, businessPublish, businessEdit } from '@/api/business.js'
// eslint-disable-next-line no-unused-vars
import { categoryList, categoryAdd, categoryDel, categoryEdit } from '@/api/article.js'
// eslint-disable-next-line no-unused-vars
import { transList } from '@/utils'
import Cookies from 'js-cookie'
export default {
  name: 'Business',
  components: {
    Pagination,
    Tinymce
  },
  data() {
    return {
      cookies: Cookies.get('Admin-Token'),
      queryParams: {
        categoryId: '',
        keyWord: '',
        creator: ''
      },
      categoryadd: false,
      categoryedit: false,
      isEdit: false,
      isAdd: false,
      categoryList: [],
      adddialog: false,
      deldialog: false,
      setdialog: false,
      fileList: [],
      formLabelWidth: '130px',
      addform: {
        title: '',
        creator: '',
        content: '',
        uploadfile: '',
        categoryId: ''
      },
      tabledata: [],
      submitLoading: false,
      rules: {
        title: { required: true, message: 'title is required', trigger: 'blur' }
      }
    }
  },
  watch: {
    adddialog(newValue) {
      if (!newValue) {
        this.fileList = []
        this.submitLoading = false
      }
    }
  },
  created() {
    this.getcategoryList()
  },
  methods: {
    transactive(data) {
    // eslint-disable-next-line eqeqeq
      if (data.publish == 1) {
        return 'Published'
      } else {
        return 'Draft'
      }
    },
    formatDate(date) {
      return this.$moment(date.updateTime).format('YYYY-MM-DD')
    },
    // 获取种类列表
    async getcategoryList() {
      const type = 2
      const res = await categoryList(type)
      this.categoryList = transList(res.data)
      res.data.map(i => {
        i.isSet = false
      })
      this.tabledata = res.data
    },
    // 搜索
    search() {
      this.$refs.pagination.refreshRequest()
    },
    // 提交新增数据
    async submitbusiness() {
      this.$refs['addform'].validate((valid) => {
        if (valid) {
          const businiessOpentional = {
            title: this.addform.title,
            creator: this.addform.creator,
            content: this.addform.content,
            filepath: this.addform.uploadfile,
            categoryId: this.addform.categoryId,
            publish: 1
          }
          this.submitLoading = true
          businessAdd(businiessOpentional).then(res => {
            this.$message.info(res.message)
            this.$refs.pagination.refreshRequest()
            this.adddialog = false
          })
        } else {
          return false
        }
      })
    },
    // 保存新增数据
    async savebusiness() {
      this.$refs['addform'].validate((valid) => {
        if (valid) {
          const businiessOpentional = {
            id: this.addform.id,
            title: this.addform.title,
            creator: this.addform.creator,
            content: this.addform.content,
            filepath: this.addform.uploadfile,
            categoryId: this.addform.categoryId,
            publish: 0
          }
          // eslint-disable-next-line eqeqeq
          if (this.isAdd == true) {
            this.submitLoading = true
            businessAdd(businiessOpentional).then(res => {
              this.$message.info(res.message)
              this.adddialog = false
              this.$refs.pagination.refreshRequest()
              this.isAdd = false
            })
          } else {
            this.submitLoading = true
            businessEdit(businiessOpentional).then(res => {
              this.$message.info(res.message)
              this.adddialog = false
              this.$refs.pagination.refreshRequest()
              this.isEdit = false
            })
          }
        } else {
          return false
        }
      })
    },
    // 删除数据
    handleDelete(id) {
      this.$confirm(this.$t('business.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await businessDel(id)
          this.$refs.pagination.refreshRequest()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 处理发布状态
    async handleUpdateStatus(row, publish) {
      const data = {
        id: row.id,
        publish: publish
      }
      const res = await businessPublish(data)
      this.$message.info(res.message)
      this.$refs.pagination.refreshRequest()
    },
    // 编辑
    handleEdit(row) {
      console.log(row)
      this.addform = JSON.parse(JSON.stringify(row))
      if (row.filepath) {
        this.fileList = [{
          name: row.filepath.split('wind/')[1],
          url: process.env.VUE_APP_FILE_BASE_API + row.filepath
        }]
      }
      this.adddialog = true
      this.isEdit = true
    },
    // 新增
    handleAdd() {
      this.addform = {
        title: '',
        creator: '',
        content: '',
        uploadfile: '',
        categoryId: ''
      }
      this.fileList = []
      this.adddialog = true
      this.isAdd = true
    },
    // 取消
    Cancle() {
      this.isAdd = false
      this.isEdit = false
      this.$refs.addform.resetFields()
      this.adddialog = false
    },
    // 添加种类
    createcategory() {
      const data = {
        category: '',
        creator: '',
        isSet: true
      }
      if (!this.tabledata[this.tabledata.length - 1].category) return
      this.tabledata.push(data)
      this.categoryadd = true
    },
    // 添加种类
    async Save(row) {
      const data = {
        id: row.id,
        category: row.category,
        creator: row.creator,
        type: 2,
        isSet: false
      }
      if (!data.category) return
      if (this.categoryadd) {
        const res = await categoryAdd(data)
        this.$message.info(res.message)
        this.getcategoryList()
        this.categoryadd = false
      } else {
        const res = await categoryEdit(data)
        this.$message.info(res.message)
        this.getcategoryList()
        this.categoryedit = false
      }
    },
    // 编辑种类
    async Edit(row) {
      row.isSet = true
      this.categoryedit = true
    },
    // 删除种类
    async Delete(id) {
      this.$confirm(this.$t('business.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await categoryDel(id)
          this.getcategoryList()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    handPreview() {},
    handRemove(file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
    },
    handleSuccess(response, file, fileList) {
      if (response.code === '200') {
        this.fileList.push({ name: response.data.fileName, url: response.data.fileUrl })
        this.addform.uploadfile = 'wind/' + response.data.fileName
      } else {
        this.$message.error(response.message)
        this.fileList = []
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
