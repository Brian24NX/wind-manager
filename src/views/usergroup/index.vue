<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%" type="flex" justify="space-between">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.company" size="small" style="width: 100%" :placeholder="$t('programuser.company')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.name" size="small" style="width: 100%" :placeholder="$t('programuser.username')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" @click="search">{{ $t('message.search') }}</el-button>
            <el-button type="danger" size="small" plain @click="reset">{{ $t('message.reset') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <div class="operations">
        <el-button v-permission="[63]" type="danger" size="small" @click="exportexcle">{{ $t('programuser.export') }}</el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/miniUserList" :request-params="queryParams" show-index>
        <el-table-column :label="$t('programuser.username')" prop="name" />
        <el-table-column :label="$t('programuser.account')" prop="email" align="center" />
        <el-table-column align="center" :label="$t('programuser.company')" prop="company" />
        <el-table-column align="center" :label="$t('programuser.companycategory')" prop="companyCategory" />
        <el-table-column align="center" :label="$t('programuser.partnercode')" prop="partnerCode" />
      </Pagination>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
// eslint-disable-next-line no-unused-vars
import { userExport } from '@/api/miniuser.js'
export default {
  name: 'Index',
  components: {
    Pagination
  },
  data() {
    return {
      queryParams: {
        company: '',
        name: ''
      }
    }
  },
  created() {},
  methods: {
    // 搜索
    search() {
      this.$refs.pagination.refreshRequest()
    },
    // 重置
    reset() {
      this.queryParams = {
        company: '',
        name: ''
      }
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    },
    // 导出excle
    async exportexcle() {
      const res = await userExport(this.queryParams)
      // console.log(res.data)
      window.open(res.data)
    }
  }
}
</script>
<style lang="scss" scoped></style>
