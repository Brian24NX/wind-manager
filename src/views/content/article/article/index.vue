<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-select v-model="queryParams.categoryIds" size="small" style="width: 100%" clearable filterable :placeholder="$t('article.category')" @change="submit" @clear="submit">
                <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.keyword" size="small" style="width: 100%" :placeholder="$t('article.title')" clearable @clear="submit" @keyup.enter.native="submit" />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" @click="submit">{{ $t('message.search') }}</el-button>
            <el-button type="danger" size="small" plain @click="reset">{{ $t('message.reset') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <div class="operations">
        <el-button v-permission="[15]" type="danger" size="small" @click="addarticle"> <i class="el-icon-plus" /> {{ $t('addArticle.addnew') }} </el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/newsList" :request-params="queryParams" show-index>
        <el-table-column align="center" :label="$t('article.thumb')" width="120">
          <template scope="scope">
            <el-image v-if="scope.row.frontCover" :src="scope.row.frontCover" :preview-src-list="[scope.row.frontCover]" mode="aspectFit" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('article.title')" prop="title" />
        <el-table-column :label="$t('article.date')" prop="publishDate" align="center" :formatter="formatDate" />
        <el-table-column align="center" :label="$t('article.category')" prop="category" />
        <el-table-column align="center" :label="$t('article.platform')" prop="publishTos" />
        <el-table-column align="center" :label="$t('article.status')" prop="publish" :formatter="transactive" />
        <el-table-column align="center" :label="$t('message.createTime')" prop="createTime" :formatter="formatDate" />
        <el-table-column :label="$t('article.actions')" align="center" width="200" fixed="right">
          <template scope="scope">
            <el-button size="small" type="text" @click="handleDetail(scope.row.id)">{{ $t('message.detail') }}</el-button>
            <el-button v-if="scope.row.status === 'Unpublish'&&scope.row.historyFlag!=1" v-permission="[16]" size="small" type="text" @click="handleEdit(scope.row.id)">{{ $t('message.edit') }}</el-button>
            <el-button v-if="scope.row.status === 'Published'" v-permission="[17]" size="small" type="text" @click="handleUpdateStatus(scope.row,0)">{{ $t('message.unPublish') }}</el-button>
            <el-button v-if="scope.row.status === 'Unpublish'" v-permission="[17]" size="small" type="text" @click="handleUpdateStatus(scope.row,1)">{{ $t('message.publish') }}</el-button>
            <el-button v-permission="[18]" size="small" type="text" class="danger" @click="handleDelete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <el-dialog :title="$t('message.detail')" :visible.sync="detailDialog" center width="500px" :close-on-click-modal="false" destroy-on-close top="50px">
      <div class="detailContent" v-html="detailform.content" />
    </el-dialog>
  </div>
</template>
<script>
import { categoryList, newsDetail, articlePublish, articleDel } from '@/api/article'
import { transList } from '@/utils'
import Pagination from '@/components/Pagination'
export default {
  name: 'ArticleManagement',
  components: {
    Pagination
  },
  data() {
    return {
      queryParams: {
        categoryIds: '',
        keyword: ''
      },
      categoryList: [],
      detailform: {},
      detailDialog: false
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
    formatDate(row, column, cellValue, index) {
      return this.$moment(cellValue).format('YYYY-MM-DD')
    },
    // 获取种类列表
    async getcategoryList() {
      const type = 1
      const res = await categoryList(type)
      this.categoryList = transList(res.data)
    },
    // 搜索
    submit() {
      this.$refs.pagination.refreshRequest()
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
    // 状态改变
    async handleUpdateStatus(row, publish) {
      const data = {
        id: row.id,
        publish: publish
      }
      await articlePublish(data)
      this.$refs.pagination.pageRequest()
    },
    // 删除历史信息
    handleDelete(index) {
      this.$confirm(this.$t('article.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await articleDel(index)
          this.$refs.pagination.pageRequest()
        })
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
    // 编辑平台新建文章
    handleEdit(id) {
      this.$router.push({ path: '/addarticle', query: { id: id }})
    },
    // 新增平台新建文章
    addarticle() {
      this.$router.push('/addarticle')
    }
  }
}
</script>
<style lang="scss" scoped></style>
