<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-select v-model="queryParams.categoryIds" clearable filterable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.Keyword" size="small" style="width: 100%" placeholder="Keyword" clearable suffix-icon="el-icon-search" />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="primary" size="small" @click="search">{{ $t('message.search') }}</el-button>
            <el-button type="primary" size="small" plain @click="reset">{{ $t('addArticle.reset') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <div class="operations">
        <el-button type="primary" size="small" @click="setdialog = true">{{ $t('newscenter.categorysetting') }}</el-button>
        <el-button type="primary" size="small" @click="exporttemplate">{{ $t('newscenter.export') }}</el-button>
        <el-button type="primary" size="small" @click="downloadfile">{{ $t('message.download') }}</el-button>
        <el-button type="primary" size="small" @click="importdialog = true">{{ $t('newscenter.import') }}</el-button>
        <el-button type="primary" size="small" @click="addhistorynewsdialog = true">{{ $t('newscenter.addhistoynews') }}</el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/miniNewsList" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('newscenter.title')" prop="title" />
        <el-table-column align="center" :label="$t('newscenter.category')" prop="category" />
        <el-table-column :label="$t('newscenter.publishdate')" prop="publishDate" :formatter="formatDate" />
        <el-table-column :label="$t('newscenter.link')" prop="originalLink" align="center" />
        <el-table-column align="center" :label="$t('newscenter.status')" prop="status" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.status === 'Unpublish'" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('message.publish') }}</el-button>
            <el-button v-if="scope.row.status === 'Published'" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('message.unPublish') }}</el-button>
            <!-- <el-button v-if="scope.row.status ==='Undeactive'" size="small" type="text" @click="handleEdit(scope.row.id)">{{ $t('message.edit') }}</el-button>-->
            <el-button size="small" type="text" class="danger" @click="handleDel(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--历史文章添加-->
    <el-dialog :title="$t('newscenter.addtitle')" :visible.sync="addhistorynewsdialog" center :close-on-click-modal="false" destroy-on-close>
      <el-form ref="historyform" :model="historyform" :rules="rules">
        <el-form-item :label="$t('newscenter.title')" :label-width="formLabelWidth" prop="title">
          <el-input v-model="historyform.title" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('newscenter.link')" :label-width="formLabelWidth" prop="link">
          <el-input v-model="historyform.link" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('newscenter.category')" :label-width="formLabelWidth" prop="category">
          <el-select v-model="historyform.categoryIds" style="width: 100%" multiple collapse-tags placeholder="请选择">
            <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('newscenter.publishdate')" :label-width="formLabelWidth" prop="publishdate">
          <el-date-picker v-model="historyform.publishdate" type="date" placeholder="选择日期" style="width: 100%" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="loading" @click="submithistory">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--文章导入-->
    <el-dialog :title="$t('newscenter.import')" :visible.sync="importdialog" center>
      <el-upload class="upload-demo" drag action="/api/admin/miniNewsImport" :limit="1" :headers="uploadHeaders">
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitimport">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="importdialog=false">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--文章类型修改-->
    <el-dialog :title="$t('newscenter.categorysetting')" :visible.sync="setdialog" center>
      <el-button size="small" type="primary" @click="createcategory">{{ $t('library.addcategory') }}</el-button>
      <el-table :data="tabledata" style="width: 100%">
        <el-table-column :label="$t('newscenter.categoryen')" prop="categoryen">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input v-model="scope.row.category" size="mini" />
            </span>
            <span v-else>{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('newscenter.categoryzh')" prop="categoryzh" align="center">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input v-model="scope.row.categoryCn" size="mini" />
            </span>
            <span v-else>{{ scope.row.categoryCn }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('newscenter.creator')" prop="creator" align="center">
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
            <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Edit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Delete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
// eslint-disable-next-line no-unused-vars
import { newsDel, newsAdd, newsPublish, newsExport } from '@/api/newcenter.js'
// eslint-disable-next-line no-unused-vars
import { categoryList, categoryAdd, categoryDel, categoryEdit } from '@/api/article.js'
import { transList } from '@/utils'
import { getToken } from '@/utils/auth'
export default {
  name: 'News',
  components: {
    Pagination
  },
  data() {
    return {
      uploadHeaders: { 'Authorization': getToken() },
      queryParams: {
        categoryIds: [],
        keyword: ''
      },
      categoryedit: false,
      categoryadd: false,
      categoryList: [],
      // 新增历史新闻
      addhistorynewsdialog: false,
      // 删除新闻
      deldialog: false,
      // 导入
      importdialog: false,
      // 类别修改
      setdialog: false,
      formLabelWidth: '130px',
      historyform: {
        title: '',
        link: '',
        categoryIds: [],
        publishdate: ''
      },
      rules: {
        title: { required: true, message: 'title is required', trigger: 'blur' },
        link: { required: true, message: 'link is required', trigger: 'blur' },
        publishdate: { required: true, message: 'publishdate is required', trigger: 'change' }
      },
      tabledata: [],
      loading: false
    }
  },
  watch: {
    addhistorynewsdialog(val) {
      if (!val) {
        this.historyform = {
          title: '',
          link: '',
          categoryIds: [],
          publishdate: ''
        }
        this.loading = false
      }
    }
  },
  created() {
    this.getcategoryList()
  },
  methods: {
    submitimport() {
      this.importdialog = false
      this.search()
    },
    reset() {
      this.queryParams = {
        categoryIds: [],
        keyword: ''
      }
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    },
    search() {
      this.$refs.pagination.refreshRequest()
    },
    formatDate(date) {
      return this.$moment(date.publishDate).format('YYYY-MM-DD')
    },
    // 获取种类列表
    async getcategoryList() {
      const type = 1
      const res = await categoryList(type)
      this.categoryList = transList(res.data)
      res.data.map(i => {
        i.isSet = false
      })
      this.tabledata = res.data
    },
    // 提交历史信息
    async submithistory() {
      this.$refs['historyform'].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = {
            title: this.historyform.title,
            originalLink: this.historyform.link,
            categoryIds: this.historyform.categoryIds,
            publishDate: this.$moment(this.historyform.publishdate).format('YYYY-MM-DD'),
            publish: 1
          }
          newsAdd(data).then(res => {
            this.$message.success(res.message)
            this.addhistorynewsdialog = false
            this.$refs.pagination.refreshRequest()
          })
        } else {
          return false
        }
      })
    },
    // 删除一行数据
    handleDel(id) {
      this.$confirm(this.$t('newscenter.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await newsDel(id)
          this.$refs.pagination.refreshRequest()
        })
    },
    async handleUpdateStatus(row, publish) {
      const data = {
        id: row.id,
        publish: publish
      }
      const res = await newsPublish(data)
      this.$message.success(res.message)
      this.$refs.pagination.pageRequest()
    },
    // 状态改变
    // 导出
    async exporttemplate() {
      const res = await newsExport(this.queryParams)
      window.location.href = res.data
    },
    // 下载模版
    downloadfile() {
      window.location.href = process.env.VUE_APP_FILE_BASE_API + 'import/Import Historical News 导入历史新闻.xlsx'
    },
    // 取消
    Cancle() {
      this.$refs.historyform.resetFields()
      this.addhistorynewsdialog = false
    },
    // 添加种类
    createcategory() {
      const data = {
        id: '',
        category: '',
        categoryCn: '',
        creator: '',
        isSet: true
      }
      this.tabledata.push(data)
      this.categoryadd = true
    },
    // 添加种类
    async Save(row) {
      const data = {
        id: row.id,
        category: row.category,
        categoryCn: row.categoryCn,
        creator: row.creator,
        type: 1,
        isSet: false
      }
      // eslint-disable-next-line eqeqeq
      if (this.categoryadd == true) {
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
      this.$confirm(this.$t('business.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await categoryDel(id)
          this.getcategoryList()
        })
    }

  }
}
</script>
<style lang="scss" scoped></style>
