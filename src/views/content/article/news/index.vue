<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.title" size="small" style="width: 100%" placeholder="请输入内容" clearable />
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.title" size="small" style="width: 100%" placeholder="请输入内容" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" plain>{{$t('newscenter.categorysetting')}}</el-button>
            <el-button type="danger" size="small" >{{$t('newscenter.export')}}</el-button>
            <el-button type="danger" size="small" >{{$t('newscenter.import')}}</el-button>
            <el-button type="danger" size="small" >{{$t('newscenter.addhistoynews')}}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <Pagination ref="pagination" uri="/wind-manager/newscenter/list" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('newscenter.title')" prop="title"  />
        <el-table-column align="center" :label="$t('newscenter.category')" prop="category"  />
        <el-table-column :label="$t('newscenter.publishdate')" prop="publishdate"  />
        <el-table-column :label="$t('newscenter.link')" prop="link" align="center" />
        <el-table-column align="center" :label="$t('newscenter.status')"  prop="status" />
        <el-table-column :label="$t('article.actions')" align="center"  fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.status === 'Published'" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('message.publish') }}</el-button>
            <el-button v-if="scope.row.status === 'Unpublished'" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('message.unPublish') }}</el-button>
            <!-- <el-button v-if="scope.row.status ==='Undeactive'" size="small" type="text" @click="handleEdit(scope.row.id)">{{ $t('message.edit') }}</el-button>-->
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
  name: 'News',
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

</style>
