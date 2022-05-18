<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-select v-model="queryParams.categoryId" placeholder="请选择" clearable filterable style="width: 100%">
                <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.keyWord" size="small" style="width: 100%" placeholder="Keyword" clearable />
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.creator" size="small" style="width: 100%" placeholder="Creator" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" @click="search">{{ $t('message.search') }}</el-button>
            <el-button type="danger" size="small" plain @click="reset">{{ $t('addArticle.reset') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <div class="operations">
        <el-button v-permission="[43]" type="danger" size="small" @click="setdialog = true">{{ $t('business.categoryset') }}</el-button>
        <el-button v-permission="[43]" type="danger" size="small" @click="handleAdd">{{ $t('business.sendnotification') }}</el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/businiessOpentionalList" :request-params="queryParams">
        <el-table-column align="center" :label="$t('business.title')" prop="title" />
        <el-table-column :label="$t('business.category')" prop="categoryEnName" />
        <el-table-column :label="$t('business.creator')" prop="creator" align="center" />
        <el-table-column align="center" :label="$t('business.updatetime')" prop="updateTime" :formatter="formatDate" />
        <el-table-column align="center" :label="$t('business.status')" prop="publish" :formatter="transactive" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.publish === 1" v-permission="[44]" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('message.unPublish') }}</el-button>
            <el-button v-if="scope.row.publish === 0" v-permission="[44]" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('message.publish') }}</el-button>
            <el-button v-if="scope.row.publish === 0" v-permission="[43]" size="small" type="text" @click="handleEdit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button v-permission="[43]" size="small" type="text" class="danger" @click="handleDelete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--类别设置-->
    <el-dialog :title="$t('business.categoryset')" :visible.sync="setdialog" center :close-on-click-modal="false" destroy-on-close>
      <el-button size="small" type="primary" @click="createcategory">{{ $t('library.categorysetting') }}</el-button>
      <el-table :data="tabledata" style="width: 100%">
        <el-table-column :label="$t('business.category')">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input v-model="scope.row.category" size="mini" @blur="scope.row.category = $event.target.value.trim()" />
            </span>
            <span v-else>{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('business.creator')" align="center">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input v-model="scope.row.creator" size="mini" @blur="scope.row.creator = $event.target.value.trim()" />
            </span>
            <span v-else>{{ scope.row.creator }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.isSet" size="small" type="text" @click="Save(scope.row)">{{ $t('message.save') }}</el-button>
            <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Edit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Delete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--添加通告-->
    <el-dialog :title="$t('business.sendnotification')" :visible.sync="adddialog" center destroy-on-close :close-on-click-modal="false" width="800px" top="50px">
      <el-form ref="addform" :model="addform" :rules="rules">
        <el-form-item :label="$t('business.title')" :label-width="formLabelWidth" prop="title">
          <el-input v-model="addform.title" autocomplete="off" clearable @blur="addform.title = $event.target.value.trim()" />
        </el-form-item>
        <!--<el-form-item :label="$t('business.creator')" :label-width="formLabelWidth" prop="creator">
          <el-input v-model="addform.creator" autocomplete="off" clearable @blur="addform.creator = $event.target.value.trim()" />
        </el-form-item>-->
        <el-form-item :label="$t('business.content')" :label-width="formLabelWidth" prop="content">
          <tinymce ref="editor" v-model="addform.content" :height="250" />
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
        <el-button type="primary" :loading="submitLoading" @click="savebusiness(0)">{{ $t('message.save') }}</el-button>
        <el-button type="primary" :loading="submitLoading" @click="savebusiness(1)">{{ $t('addArticle.submit') }}</el-button>
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
        title: { required: true, message: this.$t('business.titletips'), trigger: 'blur' }
      }
    }
  },
  watch: {
    adddialog(newValue) {
      if (!newValue) {
        this.addform = {
          title: '',
          creator: '',
          content: '',
          uploadfile: '',
          categoryId: ''
        }
        setTimeout(() => {
          this.$refs.editor.setContent('')
        }, 300)
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
    reset() {
      this.queryParams = {
        categoryId: '',
        keyWord: '',
        creator: ''
      }
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    },
    // 保存或者保存并发布新增数据
    async savebusiness(publish) {
      this.$refs['addform'].validate((valid) => {
        if (valid) {
          const businiessOpentional = {
            id: this.addform.id,
            title: this.addform.title,
            creator: this.addform.creator,
            content: this.addform.content,
            filepath: this.addform.uploadfile,
            categoryId: this.addform.categoryId,
            publish: publish
          }
          if (this.isAdd) {
            this.submitLoading = true
            businiessOpentional.createUser = JSON.parse(localStorage.getItem('userInfo')).id
            businessAdd(businiessOpentional).then(res => {
              this.$message.success(res.message)
              this.adddialog = false
              this.$refs.pagination.pageRequest()
            })
          } else {
            this.submitLoading = true
            businiessOpentional.updateUser = JSON.parse(localStorage.getItem('userInfo')).id
            businessEdit(businiessOpentional).then(res => {
              this.$message.success(res.message)
              this.adddialog = false
              this.$refs.pagination.pageRequest()
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
          this.$refs.pagination.pageRequest()
        })
    },
    // 处理发布状态
    async handleUpdateStatus(row, publish) {
      const data = {
        id: row.id,
        publish: publish,
        userId: JSON.parse(localStorage.getItem('userInfo')).id
      }
      const res = await businessPublish(data)
      this.$message.success(res.message)
      this.$refs.pagination.pageRequest()
    },
    // 编辑
    handleEdit(row) {
      this.addform = JSON.parse(JSON.stringify(row))
      if (row.filepath) {
        this.fileList = [{
          name: row.filepath.split('wind/')[1],
          url: process.env.VUE_APP_FILE_BASE_API + row.filepath
        }]
      }
      this.adddialog = true
      setTimeout(() => {
        this.$refs.editor.setContent(row.content)
      }, 200)
      this.isAdd = false
    },
    // 新增
    handleAdd() {
      this.adddialog = true
      this.isAdd = true
    },
    // 取消
    Cancle() {
      this.adddialog = false
    },
    // 添加种类
    createcategory() {
      const data = {
        category: '',
        creator: '',
        isSet: true
      }
      // if (!this.tabledata[this.tabledata.length - 1].category) return
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
        this.$message.success(res.message)
        this.getcategoryList()
        this.categoryadd = false
      } else {
        const res = await categoryEdit(data)
        this.$message.success(res.message)
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
    handPreview() {},
    handRemove(file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
    },
    handleSuccess(response, file, fileList) {
      if (response.code === '200') {
        this.fileList.push({ name: response.data.fileName, url: response.data.fileUrl })
        this.addform.uploadfile = response.data.fileName
      } else {
        this.$message.error(response.message)
        this.fileList = []
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
