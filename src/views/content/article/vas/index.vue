<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.keyword" size="small" style="width: 100%" placeholder="Keyword" clearable />
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
        <el-button type="danger" size="small" @click="adddialog = true">{{ $t('vas.addarticlelink') }}</el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/cmaNewsList" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('vas.title')" prop="title" />
        <el-table-column :label="$t('vas.publishdate')" prop="publishDate" :formatter="formatDate" />
        <el-table-column :label="$t('vas.link')" prop="originalLink" align="center" />
        <el-table-column align="center" :label="$t('vas.status')" prop="publish" :formatter="transactive" />
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
    <!--添加vas弹窗-->
    <el-dialog :title="$t('vas.addtitle')" :visible.sync="adddialog" center destroy-on-close :close-on-click-modal="false">
      <el-form ref="addform" :model="addform" :rules="rules">
        <el-form-item :label="$t('vas.title')" :label-width="formLabelWidth" prop="title">
          <el-input v-model="addform.title" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('vas.link')" :label-width="formLabelWidth" prop="link">
          <el-input v-model="addform.link" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('vas.publishdate')" :label-width="formLabelWidth" prop="publishdate">
          <el-date-picker v-model="addform.publishdate" type="date" placeholder="" style="width: 100%" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="loading" @click="submithistory">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
// eslint-disable-next-line no-unused-vars
import { cmaDel, cmaAdd, cmaPublish } from '@/api/cmacmg.js'
export default {
  name: 'CmaCgm',
  components: {
    Pagination
  },
  data() {
    return {
      queryParams: {
        keyword: ''
      },
      categoryList: [],
      addform: {
        title: '',
        link: '',
        publishdate: ''
      },
      formLabelWidth: '130px',
      // 添加弹窗
      adddialog: false,
      rules: {
        title: { required: true, message: this.$t('vas.titletips'), trigger: 'blur' },
        link: { required: true, message: this.$t('vas.linktips'), trigger: 'blur' },
        publishdate: { required: true, message: this.$t('vas.publishdatetips'), trigger: 'change' }
      },
      loading: false
    }
  },
  watch: {
    adddialog(val) {
      if (!val) {
        this.addform = {
          title: '',
          link: '',
          publishdate: ''
        }
        this.loading = false
      }
    }
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
    search() {
      this.$refs.pagination.refreshRequest()
    },
    reset() {
      this.queryParams = {
        keyword: ''
      }
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    },
    formatDate(date) {
      return this.$moment(date.publishDate).format('YYYY-MM-DD')
    },
    // 删除
    handleDel(id) {
      this.$confirm(this.$t('vas.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await cmaDel(id)
          this.$refs.pagination.pageRequest()
        })
    },
    // 状态改变
    async handleUpdateStatus(row, publish) {
      const data = {
        id: row.id,
        publish: publish
      }
      const res = await cmaPublish(data)
      this.$message.success(res.message)
      this.$refs.pagination.pageRequest()
    },
    // 新增
    async submithistory() {
      this.$refs['addform'].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = {
            title: this.addform.title,
            originalLink: this.addform.link,
            publishDate: this.$moment(this.addform.publishdate).format('YYYY-MM-DD'),
            publish: 1
          }
          cmaAdd(data).then(res => {
            this.$message.success(res.message)
            this.adddialog = false
            this.$refs.pagination.pageRequest()
          })
        } else {
          return false
        }
      })
    },
    // 取消
    Cancle() {
      this.$refs.addform.resetFields()
      this.adddialog = false
    }
  }
}
</script>
<style lang="scss" scoped></style>
