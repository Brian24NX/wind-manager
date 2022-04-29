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
              <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                <i class="el-icon-upload" />
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
                  <el-select v-model="articleForm.region" placeholder="请选择活动区域" style="width: 85%" size="small">
                    <el-option label="区域一" value="shanghai" />
                    <el-option label="区域二" value="beijing" />
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
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('addArticle.sendTo')" prop="sendTo">
              <el-checkbox-group v-model="articleForm.sendTo">
                <el-checkbox label="美食/餐厅线上活动" name="type" />
                <el-checkbox label="地推活动" name="type" />
                <el-checkbox label="线下主题活动" name="type" />
                <el-checkbox label="单纯品牌曝光" name="type" />
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row type="flex" justify="end">
          <el-form-item>
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
import { articleAdd } from '../../../../api/article.js'
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
        schedulePublish: false
      },
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
      }
    }
  },
  created() {
    // 通过id判断是新增还是编辑
    // eslint-disable-next-line no-unused-vars
    const id = this.$route.params.id
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            title: this.articleForm.title,
            creator: this.articleForm.creator,
            frontCover: this.articleForm.frontCover,
            description: this.articleForm.description,
            content: this.articleForm.content,
            originalLink: this.articleForm.name,
            publishIds: this.articleForm.publishTo,
            categoryId: this.articleForm.region,
            publishDate: this.articleForm
          }
          this.articleAdd(data).then(res => {
            // eslint-disable-next-line eqeqeq
            if (res.code == 200) {
              this.$message.success(res.message)
              // this.$router.push('/login')
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
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
}
</style>
