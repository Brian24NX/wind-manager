<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-select v-model="queryParams.categoryIds" clearable filterable :placeholder="$t('article.category')" style="width: 100%" @change="search" @clear="search">
                <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.keyword" size="small" style="width: 100%" :placeholder="$t('newscenter.title')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" @click="search">{{ $t('message.search') }}</el-button>
            <el-button type="danger" size="small" plain @click="reset">{{ $t('message.reset') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <div class="operations">
        <el-button v-permission="[23]" type="danger" size="small" @click="setdialog = true">{{ $t('newscenter.categorysetting') }}</el-button>
        <el-button v-permission="[23]" type="danger" size="small" @click="exporttemplate">{{ $t('newscenter.export') }}</el-button>
        <el-button v-permission="[23]" type="danger" size="small" @click="downloadfile">{{ $t('message.download') }}</el-button>
        <el-button v-permission="[23]" type="danger" size="small" @click="importdialog = true">{{ $t('newscenter.import') }}</el-button>
        <el-button v-permission="[23]" type="danger" size="small" @click="addhistorynewsdialog = true">{{ $t('newscenter.addhistoynews') }}</el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/miniNewsList" :request-params="queryParams">
        <el-table-column align="center" :label="$t('newscenter.title')" prop="title" />
        <el-table-column align="center" :label="$t('newscenter.category')" prop="category" />
        <el-table-column :label="$t('newscenter.publishdate')" prop="publishDate" :formatter="formatDate" />
        <el-table-column :label="$t('newscenter.link')" prop="originalLink" align="center" />
        <el-table-column align="center" :label="$t('newscenter.status')" prop="publish" :formatter="transactive" />
        <el-table-column align="center" :label="$t('message.createTime')" prop="createTime" :formatter="formatDate" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button size="small" type="text" @click="handleDetail(scope.row.id)">{{ $t('message.detail') }}</el-button>
            <el-button v-if="scope.row.status === 'Unpublish'" v-permission="[24]" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('message.publish') }}</el-button>
            <el-button v-if="scope.row.status === 'Published'" v-permission="[24]" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('message.unPublish') }}</el-button>
            <!-- <el-button v-if="scope.row.status ==='Undeactive'" size="small" type="text" @click="handleEdit(scope.row.id)">{{ $t('message.edit') }}</el-button>-->
            <el-button v-permission="[25]" size="small" type="text" class="danger" @click="handleDel(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--历史文章添加-->
    <el-dialog :title="historyform.id ? $t('general.edit') : $t('general.add')" :visible.sync="addhistorynewsdialog" center :close-on-click-modal="false" destroy-on-close width="600px">
      <el-form ref="historyform" :model="historyform" label-position="top" :rules="rules">
        <el-form-item :label="$t('newscenter.title')" prop="title">
          <el-input v-model="historyform.title" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="historyform.title = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('newscenter.link')" prop="link">
          <el-input v-model="historyform.link" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="historyform.link = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('newscenter.category')" prop="category">
          <el-select v-model="historyform.categoryIds" style="width: 100%" multiple collapse-tags clearable :placeholder="$t('general.choose')">
            <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('newscenter.publishdate')" prop="publishdate">
          <el-date-picker v-model="historyform.publishdate" type="date" :placeholder="$t('general.chooseDate')" style="width: 100%" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="loading" @click="submithistory">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--文章导入-->
    <el-dialog :title="$t('newscenter.import')" :visible.sync="importdialog" center destroy-on-close :close-on-click-modal="false" width="410px">
      <el-upload class="upload-demo" drag action="/api/admin/miniNewsImport" :limit="1" :headers="uploadHeaders">
        <i class="el-icon-upload" />
        <div class="el-upload__text">{{ $t('general.upload') }}<em>{{ $t('general.uploadTips') }}</em></div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitimport">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="importdialog = false">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--文章类型修改-->
    <el-dialog :title="$t('newscenter.categorysetting')" :visible.sync="setdialog" center destroy-on-close :close-on-click-modal="false" top="50px">
      <el-button size="small" type="danger" @click="createcategory">{{ $t('library.addcategory') }}</el-button>
      <el-table :data="tabledata" style="width: 100%">
        <el-table-column :label="$t('newscenter.categoryen')" prop="categoryen">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input v-model="scope.row.category" size="mini" clearable @blur="scope.row.category = $event.target.value.trim()" />
            </span>
            <span v-else>{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('newscenter.categoryzh')" prop="categoryzh" align="center">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input v-model="scope.row.categoryCn" size="mini" clearable @blur="scope.row.categoryCn = $event.target.value.trim()" />
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
    <el-dialog :title="$t('message.detail')" :visible.sync="detailDialog" center width="500px" :close-on-click-modal="false" destroy-on-close top="50px">
      <div class="detailContent" v-html="detailform.content" />
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
// eslint-disable-next-line no-unused-vars
import { newsDel, newsAdd, newsPublish, newsExport } from '@/api/newcenter.js'
// eslint-disable-next-line no-unused-vars
import { categoryList, categoryAdd, categoryDel, categoryEdit, newsDetail } from '@/api/article.js'
import { transList } from '@/utils'
import { getToken } from '@/utils/auth'
export default {
  name: 'News',
  components: {
    Pagination
  },
  data() {
    return {
      uploadHeaders: { Authorization: getToken() },
      queryParams: {
        categoryIds: '',
        keyword: ''
      },
      categoryList: [],
      // 新增历史新闻
      addhistorynewsdialog: false,
      // 删除新闻
      deldialog: false,
      // 导入
      importdialog: false,
      // 类别修改
      setdialog: false,
      historyform: {
        title: '',
        link: '',
        categoryIds: [],
        publishdate: ''
      },
      rules: {},
      tabledata: [],
      loading: false,
      detailform: {},
      detailDialog: false
    }
  },
  watch: {
    '$store.getters.language'() {
      this.setRules()
    },
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
    },
    setdialog(val) {
      if (!val) {
        this.getcategoryList()
      }
    }
  },
  created() {
    this.getcategoryList()
  },
  mounted() {
    this.setRules()
  },
  methods: {
    setRules() {
      this.rules = {
        title: { required: true, message: this.$t('newscenter.titletips'), trigger: 'blur' },
        link: { required: true, message: this.$t('newscenter.linktips'), trigger: 'blur' },
        publishdate: { required: true, message: this.$t('newscenter.publishdatetips'), trigger: 'change' }
      }
      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.historyform ? this.$refs.historyform.clearValidate() : null
        })
      }, 1)
    },
    // 查看
    handleDetail(id) {
      newsDetail(id).then(res => {
        this.detailform = res.data
        if (this.detailform.historyFlag) {
          window.open(this.detailform.originalLink)
        } else {
          this.detailDialog = true
        }
      })
    },
    transactive(data) {
      // eslint-disable-next-line eqeqeq
      if (data.publish == 1) {
        return 'Published'
      } else {
        return 'Draft'
      }
    },
    submitimport() {
      this.importdialog = false
      this.search()
    },
    reset() {
      this.queryParams = {
        categoryIds: '',
        keyword: ''
      }
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    },
    search() {
      this.$refs.pagination.refreshRequest()
    },
    formatDate(row, column, cellValue, index) {
      return this.$moment(cellValue).format('YYYY-MM-DD')
    },
    // 获取种类列表
    async getcategoryList() {
      const type = 1
      const res = await categoryList(type)
      this.categoryList = transList(res.data)
      res.data.map((i) => {
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
          newsAdd(data).then(() => {
            this.addhistorynewsdialog = false
            this.$refs.pagination.pageRequest()
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
      }).then(async() => {
        await newsDel(id)
        this.$refs.pagination.pageRequest()
      })
    },
    async handleUpdateStatus(row, publish) {
      const data = {
        id: row.id,
        publish: publish
      }
      await newsPublish(data)
      this.$refs.pagination.pageRequest()
    },
    // 状态改变
    // 导出
    async exporttemplate() {
      const res = await newsExport(this.queryParams)
      window.open(res.data)
    },
    // 下载模版
    downloadfile() {
      window.open(process.env.VUE_APP_FILE_BASE_API + 'import/Import Historical News 导入历史新闻.xlsx')
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
        isSet: true,
        categoryadd: true
      }
      this.tabledata.push(data)
    },
    // 添加种类
    async Save(row) {
      if (!row.category || !row.categoryCn) {
        this.$message.error(this.$t('newscenter.categorytips'))
        return
      } else {
        const data = {
          id: row.id,
          category: row.category,
          categoryCn: row.categoryCn,
          creator: row.creator,
          type: 1,
          isSet: false
        }
        if (row.categoryadd) {
          const res = await categoryAdd(data)
          data.id = res.data
          this.$set(this.tabledata, this.tabledata.indexOf(row), data)
        } else {
          await categoryEdit(data)
          this.$set(this.tabledata, this.tabledata.indexOf(row), data)
        }
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
      }).then(async() => {
        await categoryDel(id)
        // 删除表格当前行
        this.tabledata.map((i, index) => {
          if (i.id === id) {
            this.tabledata.splice(index, 1)
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
