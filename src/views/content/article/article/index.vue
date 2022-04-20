<template>
  <div>
    <div class="searchContainer">
      <el-row type="flex" class="row-bg" justify="space-between" style="width: 100%">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-select v-model="queryParams.categoryId" size="small" style="width: 100%" clearable placeholder="请选择">
              <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-input v-model="queryParams.title" size="small" style="width: 100%" placeholder="请输入内容" clearable />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-button type="danger" size="small">search</el-button>
          <el-button type="danger" size="small" plain>reset</el-button>
        </el-row>
      </el-row>
    </div>
    <div class="tableContainer">
      <div class="operations">
        <el-button type="danger" size="small"> <i class="el-icon-plus" /> Add A New Article </el-button>
      </div>
      <Pagination ref="pagination" uri="/wind-manager/article/list" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('article.thumb')" width="120">
          <template scope="scope">
            <el-image :src="scope.row.thumb" mode="aspectFit" />
          </template>
        </el-table-column>

        <el-table-column :label="$t('article.title')" prop="title" width="300" />

        <el-table-column :label="$t('article.date')" prop="display_time" align="center" width="200" />

        <el-table-column align="center" :label="$t('article.category')" width="200" prop="category" />

        <el-table-column align="center" :label="$t('article.platform')" width="200">
          <template scope="scope">
            <el-tag v-for="(item, index) in scope.row.platforms" :key="index" type="default">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('article.status')" width="180" prop="status" />
        <el-table-column :label="$t('article.actions')" align="center" width="150" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.status === 'published'" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('message.unPublish') }}</el-button>
            <el-button v-if="scope.row.status === 'unPublished'" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('message.publish') }}</el-button>
            <el-button size="small" type="text" @click="handleEdit(scope.row.id)">{{ $t('message.edit') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="handleDelete(scope.row)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'ArticleManagement',
  components: {
    Pagination
  },
  data() {
    return {
      queryParams: {},
      categoryList: []
    }
  }
}
</script>
<style lang="scss" scoped>
.searchContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 24px;
  background-color: #fff;
}

.tableContainer {
  background: #ffffff;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.15);
  padding: 20px;

  .operations {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 28px;
  }
}
</style>
