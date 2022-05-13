<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="18">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-select v-model="queryParams.categoryIds" size="small" style="width: 100%" clearable filterable placeholder="请选择">
                <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.keyword" size="small" style="width: 100%" placeholder="请输入内容" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" @click="submit">{{ $t('message.search') }}</el-button>
            <el-button type="danger" size="small" plain @click="reset">{{ $t('addArticle.reset') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <div class="operations">
        <el-button type="danger" size="small" @click="addarticle"> <i class="el-icon-plus" /> {{ $t('addArticle.addnew') }} </el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/newsList" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('article.thumb')" width="120">
          <template scope="scope">
            <el-image :src="scope.row.frontCover" :preview-src-list="[scope.row.frontCover]" mode="aspectFit" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('article.title')" prop="title" />

        <el-table-column :label="$t('article.date')" prop="publishDate" align="center" :formatter="formatDate" />

        <el-table-column align="center" :label="$t('article.category')" prop="category" />
        <el-table-column align="center" :label="$t('article.platform')" prop="publishTos" />
        <el-table-column align="center" :label="$t('article.status')" prop="status" />
        <el-table-column :label="$t('article.actions')" align="center" width="200" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.status === 'Published'" size="small" type="text" @click="handleUpdateStatus(scope.row,0)">{{ $t('message.unPublish') }}</el-button>
            <el-button v-if="scope.row.status === 'Unpublish'" size="small" type="text" @click="handleUpdateStatus(scope.row,1)">{{ $t('message.publish') }}</el-button>
            <el-button v-if="scope.row.status === 'Unpublish'&&scope.row.historyFlag!=1" size="small" type="text" @click="handleEdit(scope.row.id)">{{ $t('message.edit') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="handleDelete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { articlePublish, articleDel } from '@/api/article.js'
// eslint-disable-next-line no-unused-vars
import { categoryList } from '@/api/article.js'
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
        categoryIds: [],
        keyword: ''
      },
      categoryList: []
    }
  },
  created() {
    this.getcategoryList()
  },
  methods: {
    formatDate(date) {
      return this.$moment(date.publishDate).format('YYYY-MM-DD')
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
        categoryIds: [],
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
      const res = await articlePublish(data)
      this.$message.info(res.message)
      this.$refs.pagination.refreshRequest()
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
          this.submit()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 编辑历史信息
    handleEdit(id) {
      this.$router.push({ path: '/addarticle', query: { id: id }})
    },
    // 新增历史信息
    addarticle() {
      this.$router.push('/addarticle')
    }
  }
}
</script>
<style lang="scss" scoped></style>
