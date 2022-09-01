<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.title" size="small" style="width: 100%" :placeholder="$t('vas.title')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
            <el-col :span="8">
              <el-select v-model="queryParams.publish" size="small" :placeholder="$t('vas.status')" clearable filterable style="width: 100%" @change="search">
                <el-option v-for="item in publishList" :key="item.key" :label="item.value + ' / ' + item.valueCn" :value="item.key" />
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-select v-model="queryParams.topFlag" size="small" :placeholder="$t('business.topFlag')" clearable filterable style="width: 100%" @change="search">
                <el-option v-for="item in topFlagList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
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
        <el-button v-permission="[76]" type="danger" size="small" @click="adddialog = true">{{ $t('vas.addarticlelink') }}</el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/videoLibraryList" :request-params="queryParams">
        <el-table-column align="center" :label="$t('article.thumb')" width="120">
          <template scope="scope">
            <el-image v-if="scope.row.frontCover" :src="scope.row.frontCover" :preview-src-list="[scope.row.frontCover]" mode="aspectFit" />
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('vas.title')" prop="title" />
        <el-table-column :label="$t('vas.publishdate')" prop="publishDate" :formatter="formatDate" />
        <el-table-column :label="$t('vas.link')" prop="linkUrl" align="center" />
        <el-table-column align="center" :label="$t('vas.status')" prop="publish" :formatter="transactive" />
        <el-table-column align="center" :label="$t('business.topFlag')" prop="topFlag" width="120px">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.topFlag" :active-value="1" :inactive-value="0" active-color="#e10202" inactive-color="#C0CCDA" @change="changeTopFlag(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('message.createTime')" prop="createTime" :formatter="formatDate" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-show="scope.row.publish === 0" v-permission="[78]" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('message.publish') }}</el-button>
            <el-button v-show="scope.row.publish === 1" v-permission="[78]" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('message.unPublish') }}</el-button>
            <el-button v-show="scope.row.publish === 0" v-permission="[76]" size="small" type="text" @click="handleEdit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button v-permission="[79]" size="small" type="text" class="danger" @click="handleDel(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--添加vas弹窗-->
    <el-dialog :title="addform.id ? $t('general.edit') : $t('general.add')" :visible.sync="adddialog" center destroy-on-close :close-on-click-modal="false" width="600px">
      <el-form ref="addform" :model="addform" label-position="top" :rules="rules">
        <el-form-item :label="$t('vas.title')" prop="title">
          <el-input v-model="addform.title" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.title = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('vas.link')" prop="linkUrl">
          <el-input v-model="addform.linkUrl" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.linkUrl = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('vas.publishdate')" prop="publishdate">
          <el-date-picker v-model="addform.publishdate" type="date" :placeholder="$t('general.chooseDate')" style="width: 100%" clearable />
        </el-form-item>
        <el-form-item :label="$t('addArticle.forntCover')" prop="frontCover">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            drag
            action="/api/admin/uploadFile"
            :limit="1"
            :headers="uploadHeaders"
            :show-file-list="false"
            :on-progress="handleProgress"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-image v-if="addform.frontCover" :src="addform.frontCover" fit="contain" class="avatar" />
            <template v-else>
              <i class="el-icon-upload" />
              <div class="el-upload__text">
                {{ $t('general.upload') }}<em>{{ $t('general.uploadTips') }}</em>
              </div>
            </template>
          </el-upload>
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
import { videoAdd, videoEdit, videoDel, videoPublish, videoTopFlag } from '@/api/video'
import { dictItem } from '@/api/system/dict/dict'
import { getToken } from '@/utils/auth'
export default {
  name: 'CmaCgm',
  components: {
    Pagination
  },
  data() {
    return {
      queryParams: {
        title: '',
        publish: '',
        topFlag: ''
      },
      publishList: [],
      categoryList: [],
      addform: {
        title: '',
        linkUrl: '',
        publishdate: '',
        frontCover: ''
      },
      topFlagList: [
        {
          value: 1,
          label: 'YES / 是'
        },
        {
          value: 0,
          label: 'NO / 否'
        }
      ],
      // 添加弹窗
      adddialog: false,
      rules: {},
      loading: false,
      uploadHeaders: { Authorization: getToken() }
    }
  },
  watch: {
    adddialog(val) {
      if (!val) {
        this.addform = {
          id: null,
          title: '',
          linkUrl: '',
          frontCover: '',
          publishdate: ''
        }
        this.loading = false
      }
    },
    '$store.getters.language'() {
      this.setRules()
    }
  },
  created() {
    this.getPublishList()
  },
  mounted() {
    this.setRules()
  },
  methods: {
    getPublishList() {
      dictItem('dict_publish').then((res) => {
        this.publishList = res.data
      })
    },
    setRules() {
      this.rules = {
        title: { required: true, message: this.$t('vas.titletips'), trigger: 'blur' },
        linkUrl: { required: true, message: this.$t('vas.linktips'), trigger: 'blur' },
        publishdate: { required: true, message: this.$t('vas.publishdatetips'), trigger: 'change' }
      }
      setTimeout(() => {
        this.$refs.addform ? this.$refs.addform.clearValidate() : null
      }, 1)
    },
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
        publish: '',
        topFlag: '',
        title: ''
      }
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    },
    formatDate(row, column, cellValue, index) {
      return this.$moment(cellValue).format('YYYY-MM-DD')
    },
    // 删除
    handleDel(id) {
      this.$confirm(this.$t('vas.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      }).then(async() => {
        await videoDel(id)
        this.$refs.pagination.pageRequest()
      })
    },
    // 状态改变
    async handleUpdateStatus(row, publish) {
      const data = {
        id: row.id,
        publish: publish
      }
      await videoPublish(data)
      this.$refs.pagination.pageRequest()
    },
    handleEdit(row) {
      const data = JSON.parse(JSON.stringify(row))
      this.addform = {
        id: data.id,
        title: data.title,
        linkUrl: data.linkUrl,
        publishdate: data.publishDate,
        frontCover: data.frontCover
      }
      this.adddialog = true
    },
    changeTopFlag(row) {
      videoTopFlag({
        id: row.id,
        topFlag: row.topFlag
      }).then(() => {}, () => {
        row.topFlag = row.topFlag === 1 ? 0 : 1
      })
    },
    handleProgress(event, file, fileList) {
      console.log(event)
    },
    handleAvatarSuccess(res, file) {
      this.addform.frontCover = res.data.fileUrl
      this.$refs.upload.clearFiles()
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error(this.$t('tips.errorImg'))
        return isLt2M
      }
      const fileName = file.name
      if (fileName.indexOf('jpg') === -1 && fileName.indexOf('png') === -1 && fileName.indexOf('jpeg') === -1 && fileName.indexOf('gif') === -1) {
        this.$message.error(this.$t('tips.errortxt'))
        return false
      }
      if (fileName.indexOf('#') > -1) {
        this.$message.error(this.$t('tips.errornull'))
        return false
      }
      return true
    },
    // 新增
    async submithistory() {
      this.$refs['addform'].validate((valid) => {
        if (valid) {
          const data = {
            title: this.addform.title,
            frontCover: this.addform.frontCover,
            linkUrl: this.addform.linkUrl,
            publishDate: this.$moment(this.addform.publishdate).format('YYYY-MM-DD'),
            publish: 1
          }
          this.loading = true
          if (this.addform.id) {
            data.id = this.addform.id
            videoEdit(data).then((res) => {
              this.adddialog = false
              this.$refs.pagination.pageRequest()
            })
          } else {
            data.topFlag = 0
            videoAdd(data).then((res) => {
              this.adddialog = false
              this.$refs.pagination.pageRequest()
            })
          }
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
<style lang="scss" scoped>
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
