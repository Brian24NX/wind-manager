<template>
      <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="18">
          <el-row :gutter="20">
            <el-col :span="8">
                <el-input v-model="queryParams.title" size="small" style="width: 100%" placeholder="请输入内容" clearable />
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.title" size="small" style="width: 100%" placeholder="请输入内容" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small">{{$t('sanctions.import')}}</el-button>
            <el-button type="danger" size="small" plain>{{$t('sanctions.export')}}</el-button>
            <el-button type="danger" size="small" >{{$t('sanctions.newitem')}}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <Pagination ref="pagination" uri="/wind-manager/sanctions/list" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('sanctions.commodityzh')" prop="commodityen"  />

        <el-table-column :label="$t('sanctions.commodityen')" prop="commodityzh"  />

        <el-table-column :label="$t('sanctions.referencenumber')" prop="referencenumber" align="center" />

        <el-table-column align="center" :label="$t('sanctions.type')"  prop="type" />

        <el-table-column align="center" :label="$t('sanctions.remarkszh')"  prop="remarkszh" />
        <el-table-column align="center" :label="$t('sanctions.remarksen')"  prop="remarksen" />
        <el-table-column :label="$t('article.actions')" align="center"  fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.status === 'Active'" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('message.unPublish') }}</el-button>
            <el-button v-if="scope.row.status === 'Deactive'" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('message.publish') }}</el-button>
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
  name: 'senctions',
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
<style scoped>

</style>
