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
            <el-button type="danger" size="small" plain>{{$t('contact.import')}}</el-button>
            <el-button type="danger" size="small" >{{$t('contact.createinfo')}}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <Pagination ref="pagination" uri="/wind-manager/contact/list" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('contact.id')" prop="id"  />
        <el-table-column align="center" :label="$t('contact.region')" prop="region"  />
        <el-table-column :label="$t('contact.office')" prop="office"  />
        <el-table-column :label="$t('contact.dept')" prop="dept" align="center" />
        <el-table-column align="center" :label="$t('contact.buinessscope')"  prop="buinessscope" />
        <el-table-column align="center" :label="$t('contact.trade')"  prop="trade" />
        <el-table-column align="center" :label="$t('contact.accountname')"  prop="accountname" />
        <el-table-column align="center" :label="$t('contact.contactperson')"  prop="contactperson" />
        <el-table-column align="center" :label="$t('contact.dutydate')"  prop="dutydate" />
        <el-table-column align="center" :label="$t('contact.dutytime')"  prop="dutytime" />
        <el-table-column align="center" :label="$t('contact.phone')"  prop="phone" />
        <el-table-column align="center" :label="$t('contact.email')"  prop="email" />
        <el-table-column :label="$t('article.actions')" align="center"  fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.status === 'Undeactive'" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('contact.active') }}</el-button>
            <el-button v-if="scope.row.status === 'Deactive'" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('contact.deactive') }}</el-button>
            <el-button v-if="scope.row.status ==='Undeactive'" size="small" type="text" @click="handleEdit(scope.row.id)">{{ $t('message.edit') }}</el-button>
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
  name: 'Contact',
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
