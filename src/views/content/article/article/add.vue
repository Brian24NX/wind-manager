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
              <el-input v-model="articleForm.title" size="small" />
            </el-form-item>
            <el-form-item :label="$t('addArticle.creator')" prop="creator">
              <el-input v-model="articleForm.creator" size="small" />
            </el-form-item>
            <el-form-item :label="$t('addArticle.description')" prop="description">
              <el-input v-model="articleForm.description" type="textarea" :rows="4" size="small" />
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
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('addArticle.content')" prop="content">
              <tinymce v-model="articleForm.content" :height="350" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col :span="12">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('addArticle.publishTo')" prop="publishTo">
                  <el-select v-model="articleForm.publishTo" multiple placeholder="请选择活动区域" style="width: 85%" size="small">
                    <el-option :label="$t('publishTo.newsCenter')" value="1" />
                    <el-option :label="$t('publishTo.CMACGM')" value="2" />
                    <el-option :label="$t('publishTo.weChatAccount')" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('addArticle.category')">
                  <el-select v-model="articleForm.categoryIds" multiple collapse-tags placeholder="请选择">
                    <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('addArticle.orginalArticleLink')">
              <el-input v-model="articleForm.name" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <el-form-item :label="$t('addArticle.schedulePublish')" prop="schedulePublish">
              <el-switch v-model="articleForm.schedulePublish" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('addArticle.scheduleTime')" prop="delivery">
              <el-date-picker v-model="articleForm.date1" type="date" placeholder="选择日期" style="width: 100%" size="small" />
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
// eslint-disable-next-line no-unused-vars
import { articleAdd, articleEdit, newsDetail } from '@/api/article.js'
// eslint-disable-next-line no-unused-vars
import { categoryList } from '@/api/article.js'
import { transList } from '@/utils'
import { getToken } from '@/utils/auth'
export default {
  name: 'AddArticle',
  components: { Tinymce },
  data() {
    return {
      articleForm: {
        title: '',
        region: '',
        type: '',
        publishTo: [],
        schedulePublish: false,
        frontCover: '',
        categoryIds: []
      },
      imageUrl: '',
      categoryList: [],
      fileList: [],
      isEdit: false,
      isAdd: false,
      articleRules: {
        title: [
          { required: true, message: '请输入文章名称', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
        creator: [
          { required: true, message: '请输入作者', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
        frontCover: [{ required: true, message: '请上传封面图', trigger: 'change' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        publishTo: [{ required: true, message: '请选择发布范围', trigger: 'change' }]
        // sendTo: [
        //   { type: 'array', required: true, message: '请选择发送群组', trigger: 'change' }
        // ]
      },
      uploadHeaders: { 'Authorization': getToken() }
    }
  },
  created() {
    this.getcategoryList()
    // 通过id判断是新增还是编辑
    // eslint-disable-next-line no-unused-vars
    const id = this.$route.params.id
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
      this.articleForm = res.data
    },
    async getcategoryList() {
      const type = 5
      const res = await categoryList(type)
      this.categoryList = transList(res.data)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = file.response.data.fileUrl
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    saveForm(formName) {
      this.articleForm.frontCover = this.imageUrl
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const data = {
            title: this.articleForm.title,
            creator: this.articleForm.creator,
            frontCover: this.articleForm.frontCover,
            description: this.articleForm.description,
            content: this.articleForm.content,
            originalLink: this.articleForm.name,
            publishIds: this.articleForm.publishTo,
            categoryIds: this.articleForm.categoryIds,
            publishDate: this.$moment(this.articleForm.date1).format('YYYY-MM-DD'),
            publish: 0,
            active: 1
          }
          if (this.isAdd) {
            const res = await articleAdd(data)
            this.$message.info(res.message)
            this.$router.push('/articlelist')
          } else {
            const res = await articleEdit(data)
            this.$message.info(res.message)
            this.$router.push('/articlelist')
          }
        }
      })
    },
    submitForm(formName) {
      this.articleForm.frontCover = this.imageUrl
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const data = {
            title: this.articleForm.title,
            creator: this.articleForm.creator,
            frontCover: this.articleForm.frontCover,
            description: this.articleForm.description,
            content: this.articleForm.content,
            originalLink: this.articleForm.name,
            publishIds: this.articleForm.publishTo,
            categoryIds: this.articleForm.categoryIds,
            publishDate: this.articleForm.date1,
            publish: 1,
            active: 1
          }
          if (this.isAdd) {
            const res = await articleAdd(data)
            this.$message.info(res.message)
            this.$router.push('/articlelist')
          } else {
            const res = await articleEdit(data)
            this.$message.info(res.message)
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
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
