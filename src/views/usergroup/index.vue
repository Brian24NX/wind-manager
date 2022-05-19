<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.company" size="small" style="width: 100%" placeholder="Company" clearable />
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.username" size="small" style="width: 100%" placeholder="UserName" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" @click="submit">{{ $t('message.search') }}</el-button>
            <el-button type="danger" size="small" plain @click="reset">{{ $t('addArticle.reset') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <div class="operations">
        <el-button type="danger" size="small" @click="exportexcle">  {{ $t('programuser.export') }} </el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/usergroupList" :request-params="queryParams" show-index>
        <el-table-column :label="$t('programuser.username')" prop="username" />
        <el-table-column :label="$t('programuser.account')" prop="ecomaccount" align="center" />
        <el-table-column align="center" :label="$t('programuser.company')" prop="company" />
        <el-table-column align="center" :label="$t('programuser.companycategory')" prop="companycategory" />
        <el-table-column align="center" :label="$t('programuser.partnercode')" prop="partnercode" />
      </Pagination>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'Index',
  components: {
    Pagination
  },
  data() {
    return {
      queryParams: {
        company: '',
        username: ''
      }
    }
  },
  created() {
  },
  methods: {
    // 搜索
    submit() {
      this.$refs.pagination.refreshRequest()
    },
    // 重置
    reset() {
      this.queryParams = {
        categoryIds: '',
        keyword: ''
      }
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    },
    // 导出excle
    exportexcle() {

    }
  }
}
</script>
<style lang="scss" scoped></style>
