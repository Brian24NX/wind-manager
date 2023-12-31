<template>
  <el-card class="addContainer">
    <div slot="header" class="clearfix">
      <span>{{ $t('addArticle.pageTitle') }}</span>
    </div>
    <div>
      <el-form ref="articleForm" :model="articleForm" :rules="articleRules" label-position="top" label-width="100px">
        <el-row :gutter="80">
          <el-col :span="12">
            <el-form-item :label="$t('addArticle.title')" prop="title">
              <el-input v-model="articleForm.title" size="small" clearable :placeholder="$t('general.input')" @blur="articleForm.title = $event.target.value.trim()" />
            </el-form-item>
            <el-form-item :label="$t('addArticle.creator')" prop="creator">
              <el-input v-model="articleForm.creator" size="small" clearable :placeholder="$t('general.input')" @blur="articleForm.creator = $event.target.value.trim()" />
            </el-form-item>
            <el-form-item :label="$t('addArticle.description')" prop="description">
              <el-input v-model="articleForm.description" type="textarea" :rows="4" clearable :placeholder="$t('general.input')" size="small" @blur="articleForm.description = $event.target.value.trim()" />
            </el-form-item>
          </el-col>
          <el-col v-permission="[20]" :span="12">
            <el-form-item :label="$t('addArticle.forntCover')" prop="frontCover">
              <el-upload
                ref="upload"
                class="avatar-uploader"
                drag
                action="/api/admin/uploadFile"
                multiple
                :limit="1"
                :headers="uploadHeaders"
                :show-file-list="false"
                :on-progress="handleProgress"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <el-image v-if="articleForm.frontCover" :src="articleForm.frontCover" fit="contain" class="avatar" />
                <template v-else>
                  <i class="el-icon-upload" />
                  <div class="el-upload__text">{{ $t('general.upload') }}<em>{{ $t('general.uploadTips') }}</em></div>
                </template>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('addArticle.content')" prop="content">
              <tinymce ref="editor" v-model="articleForm.content" :height="350" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item :label="$t('addArticle.orginalArticleLink')">
              <el-input v-model="articleForm.orginalArticleLink" size="small" clearable :placeholder="$t('general.input')" @blur="articleForm.orginalArticleLink = $event.target.value.trim()" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('addArticle.publishTo')" prop="publishIds">
              <el-select v-model="articleForm.publishIds" multiple clearable :placeholder="$t('general.choose')" style="width: 100%" size="small">
                <el-option :label="$t('publishTo.newsCenter')" :value="1" />
                <el-option :label="$t('publishTo.CMACGM')" :value="2" />
                <el-option :label="$t('publishTo.weChatAccount')" :value="3" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('addArticle.category')">
              <el-select v-model="articleForm.categoryIds" multiple collapse-tags filterable clearable style="width: 100%" :placeholder="$t('general.choose')">
                <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item :label="$t('addArticle.schedulePublish')" prop="schedule">
              <el-switch v-model="articleForm.schedule" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('addArticle.scheduleTime')" prop="publishDate" :rules="articleForm.schedule ? articleRules.publishDate : [{ required: false }]">
              <el-date-picker v-model="articleForm.publishDate" type="datetime" :placeholder="$t('general.chooseDate')" :default-time="'09:00:00'" style="width: 100%" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end">
          <el-form-item>
            <el-button v-permission="[20]" type="danger" :loading="loading" @click="saveForm('articleForm')">{{ $t('addArticle.save') }}</el-button>
            <el-button v-permission="[20]" type="danger" plain @click="resetForm('articleForm')">{{ $t('message.reset') }}</el-button>
            <el-button v-permission="[21]" type="danger" :loading="loading" @click="submitForm('articleForm')">{{ $t('addArticle.submit') }}</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </el-card>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { articleAdd, articleEdit, newsDetail } from '@/api/article'
import { categoryList } from '@/api/article.js'
import { transList } from '@/utils'
import { getToken } from '@/utils/auth'
export default {
  name: 'AddArticle',
  components: { Tinymce },
  data() {
    return {
      articleForm: {
        id: '',
        title: '',
        creator: '',
        frontCover: '',
        orginalArticleLink: '',
        publishIds: [],
        schedule: false,
        categoryIds: []
      },
      categoryList: [],
      fileList: [],
      isEdit: false,
      isAdd: false,
      articleRules: {},
      uploadHeaders: { Authorization: getToken() },
      loading: false
    }
  },
  watch: {
    '$store.getters.language'() {
      this.setRules()
    }
  },
  created() {
    this.getcategoryList()
    // 通过id判断是新增还是编辑
    const id = this.$route.query.id
    if (id) {
      this.isEdit = true
      this.getList(id)
    } else {
      this.isAdd = true
    }
  },
  mounted() {
    this.setRules()
  },
  methods: {
    setRules() {
      this.articleRules = {
        title: [
          { required: true, message: this.$t('addArticle.titletips'), trigger: 'blur' },
          { min: 2, max: 100, message: this.$t('addArticle.titlelengthtips'), trigger: 'blur' }
        ],
        creator: [
          { required: true, message: this.$t('addArticle.creatortips'), trigger: 'blur' },
          { min: 2, max: 100, message: this.$t('addArticle.creatorlengthtips'), trigger: 'blur' }
        ],
        frontCover: [{ required: true, message: this.$t('addArticle.frontCovertips'), trigger: 'change' }],
        content: [{ required: true, message: this.$t('addArticle.contenttips'), trigger: 'blur' }],
        publishIds: [{ required: true, message: this.$t('addArticle.publishIdstips'), trigger: 'change' }],
        publishDate: [{ required: true, message: this.$t('addArticle.publishDatetips'), trigger: 'change' }]
      }
      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.articleForm.clearValidate()
        })
      }, 1)
    },
    async getList(id) {
      const res = await newsDetail(id)
      res.data.schedule = res.data.schedule === 1
      setTimeout(() => {
        this.$refs.editor.setContent(res.data.content)
      }, 300)
      this.articleForm = res.data
    },
    async getcategoryList() {
      const type = 1
      const res = await categoryList(type)
      this.categoryList = transList(res.data)
    },
    handleProgress(event, file, fileList) {
      console.log(event)
    },
    handleAvatarSuccess(response, file) {
      this.articleForm.frontCover = response.data.fileUrl
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
    saveForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            id: this.articleForm.id,
            title: this.articleForm.title,
            creator: this.articleForm.creator,
            frontCover: this.articleForm.frontCover,
            description: this.articleForm.description,
            content: this.articleForm.content,
            originalLink: this.articleForm.name,
            publishIds: this.articleForm.publishIds,
            categoryIds: this.articleForm.categoryIds,
            schedule: this.articleForm.schedule ? 1 : 0,
            publishDate: this.$moment(this.articleForm.publishDate),
            publish: 0,
            active: 1
          }
          this.loading = true
          if (this.isAdd) {
            articleAdd(data).then(res => {
              this.loading = false
              this.$router.push('/articlelist')
            }, () => {
              this.loading = false
            })
          } else {
            articleEdit(data).then(res => {
              this.loading = false
              this.$router.push('/articlelist')
            }, () => {
              this.loading = false
            })
          }
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const data = {
            id: this.articleForm.id,
            title: this.articleForm.title,
            creator: this.articleForm.creator,
            frontCover: this.articleForm.frontCover,
            description: this.articleForm.description,
            content: this.articleForm.content,
            originalLink: this.articleForm.name,
            publishIds: this.articleForm.publishIds,
            categoryIds: this.articleForm.categoryIds,
            schedule: this.articleForm.schedule ? 1 : 0,
            publishDate: this.$moment(this.articleForm.publishDate).format('YYYY-MM-DD'),
            publish: 1,
            active: 1
          }
          if (this.isAdd) {
            await articleAdd(data)
            this.$router.push('/articlelist')
          } else {
            await articleEdit(data)
            this.$router.push('/articlelist')
          }
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
.addContainer {
  .el-card__body {
    padding: 20px 50px;
  }
  // .avatar-uploader .el-upload {
  //   border: 1px dashed #d9d9d9;
  //   border-radius: 6px;
  //   cursor: pointer;
  //   position: relative;
  //   overflow: hidden;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  // }
  // .avatar-uploader .el-upload:hover {
  //   border-color: #409eff;
  // }
  // .avatar-uploader-icon {
  //   font-size: 28px;
  //   color: #8c939d;
  // }
  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
