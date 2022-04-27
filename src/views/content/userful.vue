<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.title" size="small" style="width: 100%" placeholder="请输入内容" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small">{{ $t('userful.categoryset') }}</el-button>
           <el-button type="danger" size="small" @click="downloadfile">{{ $t('message.download') }}</el-button>
            <el-button type="danger" size="small">{{ $t('userful.import') }}</el-button>
            <el-button type="danger" size="small" plain>{{ $t('userful.additem') }}</el-button>
            <el-button type="danger" size="small" >{{ $t('userful.download') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <Pagination ref="pagination" uri="/wind-manager/user/list" :request-params="queryParams" :show-index="false">
        <el-table-column type="selectction" width="55"></el-table-column>
        <el-table-column align="center" :label="$t('userful.name')" prop="nameoflink"  />

        <el-table-column :label="$t('userful.category')" prop="category"  />

        <el-table-column :label="$t('useful.document')" prop="file" align="center" />

        <el-table-column align="center" :label="$t('useful.reference')"  prop="reference" />

        <el-table-column :label="$t('article.actions')" align="center"  fixed="right">
          <template scope="scope">
            <!--<el-button v-if="scope.row.status === 'Active'" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('message.unPublish') }}</el-button>
            <el-button v-if="scope.row.status === 'Deactive'" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('message.publish') }}</el-button>-->
            <el-button size="small" type="text" @click="handleEdit(scope.row.id)">{{ $t('userful.edit') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="handleDelete(scope.row)">{{ $t('userful.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
  </div> 
</template>
<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'useful',
  components: {
    Pagination
  },
  data() {
    return {
      queryParams: {},
      categoryList: []
    }
  },
  methods:{
      downloadfile(){
        window.location.href="https://uat.wind-admin.cma-cgm.com/api/admin/import/user_tm.xlsx"
      }
  }
}
</script>
<style scoped>

</style>