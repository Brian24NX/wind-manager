<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="18">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-select v-model="queryParams.categoryId" size="small" style="width: 100%" clearable placeholder="请选择">
                <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.title" size="small" style="width: 100%" placeholder="请输入内容" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small">search</el-button>
            <el-button type="danger" size="small" plain>reset</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <div class="operations">
        <el-button type="danger" size="small" @click="addarticle"> <i class="el-icon-plus" /> Add A New Article </el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/miniNewsList" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('article.thumb')" width="120">
          <template scope="scope">
            <el-image :src="scope.row.thumb" mode="aspectFit" />
          </template>
        </el-table-column>

        <el-table-column :label="$t('article.title')" prop="title" />

        <el-table-column :label="$t('article.date')" prop="display_time" align="center" />

        <el-table-column align="center" :label="$t('article.category')" prop="category" />

        <el-table-column align="center" :label="$t('article.platform')">
          <template scope="scope">
            <el-tag v-for="(item, index) in scope.row.platforms" :key="index" type="default">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('article.status')" prop="status" />
        <el-table-column :label="$t('article.actions')" align="center" width="200" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.status === 'published'" size="small" type="text" @click="handleUpdateStatus(scope.row)">{{ $t('message.unPublish') }}</el-button>
            <el-button v-if="scope.row.status === 'unPublished'" size="small" type="text" @click="handleUpdateStatus(scope.row)">{{ $t('message.publish') }}</el-button>
            <el-button size="small" type="text" @click="handleEdit(scope.row.id)">{{ $t('message.edit') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="handleDelete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { articlePublish, articleDel } from '../../../../api/article.js'
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
      categoryList: []
    }
  },
  methods: {
    // 状态改变
    handleUpdateStatus(row) {
      const data = {
        id: row.id,
        publish: row.publish
      }
      this.articlePublish(data).then(res => {
        // eslint-disable-next-line eqeqeq
        if (res.code == 200) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 删除历史信息
    handleDelete(index) {
      this.$confirm(this.$t('article.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(() => {
          this.articleDel(index).then((res) => {
            // eslint-disable-next-line eqeqeq
            if (res.code == 200) {
              this.$message.success(res.message)
            }
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 编辑历史信息
    handleEdit(id) {
      this.$route.push({ name: '/addarticle', params: { id: id }})
    },
    // 新增历史信息
    addarticle() {
      this.$route.push('/addarticle')
    }
  }
}
</script>
<style lang="scss" scoped></style>
