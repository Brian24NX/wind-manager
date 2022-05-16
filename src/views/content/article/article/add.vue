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
              <el-input v-model="articleForm.title" size="small" clearable />
            </el-form-item>
            <el-form-item :label="$t('addArticle.creator')" prop="creator">
              <el-input v-model="articleForm.creator" size="small" clearable />
            </el-form-item>
            <el-form-item :label="$t('addArticle.description')" prop="description">
              <el-input v-model="articleForm.description" type="textarea" :rows="4" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('addArticle.forntCover')" prop="frontCover">
              <el-upload
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
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
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
              <el-input v-model="articleForm.orginalArticleLink" size="small" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('addArticle.publishTo')" prop="publishIds">
              <el-select v-model="articleForm.publishIds" multiple clearable placeholder="请选择" style="width: 100%" size="small">
                <el-option :label="$t('publishTo.newsCenter')" :value="1" />
                <el-option :label="$t('publishTo.CMACGM')" :value="2" />
                <el-option :label="$t('publishTo.weChatAccount')" :value="3" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('addArticle.category')">
              <el-select v-model="articleForm.categoryIds" multiple collapse-tags filterable clearable style="width: 100%" placeholder="请选择">
                <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <el-form-item :label="$t('addArticle.schedulePublish')" prop="schedule">
              <el-switch v-model="articleForm.schedule" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('addArticle.scheduleTime')" prop="publishDate" :rules="articleForm.schedule ? articleRules.publishDate : [{ required: false }]">
              <el-date-picker v-model="articleForm.publishDate" type="datetime" placeholder="选择日期" :default-time="'09:00:00'" style="width: 100%" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end">
          <el-form-item>
            <el-button type="danger" @click="saveForm('articleForm')">{{ $t('addArticle.save') }}</el-button>
            <el-button type="danger" @click="submitForm('articleForm')">{{ $t('addArticle.submit') }}</el-button>
            <el-button type="danger" plain @click="resetForm('articleForm')">{{ $t('addArticle.reset') }}</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </el-card>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { articleAdd, articleEdit, newsDetail } from '@/api/article.js'
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
        region: '',
        type: '',
        publishIds: [],
        schedule: false,
        frontCover: '',
        categoryIds: []
      },
      categoryList: [],
      fileList: [],
      isEdit: false,
      isAdd: false,
      articleRules: {
        title: [
          { required: true, message: this.$t('addArticle.titletips'), trigger: 'blur' },
          { min: 3, max: 100, message: this.$t('addArticle.titlelengthtips'), trigger: 'blur' }
        ],
        creator: [
          { required: true, message: this.$t('addArticle.creatortips'), trigger: 'blur' },
          { min: 3, max: 100, message: this.$t('addArticle.creatorlengthtips'), trigger: 'blur' }
        ],
        frontCover: [{ required: true, message: this.$t('addArticle.frontCovertips'), trigger: 'change' }],
        content: [{ required: true, message: this.$t('addArticle.contenttips'), trigger: 'blur' }],
        publishIds: [{ required: true, message: this.$t('addArticle.publishIdstips'), trigger: 'change' }],
        publishDate: [{ required: true, message: this.$t('addArticle.publishDatetips'), trigger: 'change' }]
      },
      uploadHeaders: { Authorization: getToken() }
    }
  },
  created() {
    this.getcategoryList()
    // 通过id判断是新增还是编辑
    const id = this.$route.query.id
    console.log(id)
    if (id) {
      this.isEdit = true
      this.getList(id)
    } else {
      this.isAdd = true
    }
  },
  methods: {
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
    handleAvatarSuccess(res, file) {
      this.articleForm.frontCover = file.response.data.fileUrl
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    saveForm(formName) {
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
            publishDate: this.$moment(this.articleForm.publishDate),
            publish: 0,
            active: 1
          }
          if (this.isAdd) {
            const res = await articleAdd(data)
            this.$message.success(res.message)
            this.$router.push('/articlelist')
          } else {
            const res = await articleEdit(data)
            this.$message.success(res.message)
            this.$router.push('/articlelist')
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
            const res = await articleAdd(data)
            this.$message.success(res.message)
            this.$router.push('/articlelist')
          } else {
            const res = await articleEdit(data)
            this.$message.success(res.message)
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
