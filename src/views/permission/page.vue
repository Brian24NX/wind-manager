<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.creator" size="small" style="width: 100%" placeholder="Creator" suffix-icon="el-icon-search" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" @click="adddialog = true">{{ $t('userrole.addnewfunction') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <Pagination ref="pagination" uri="/wind-manager/rolepermission/list" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('userrole.id')" prop="id" />
        <el-table-column align="center" :label="$t('userrole.function')" prop="function" />
        <el-table-column :label="$t('userrole.description')" prop="description" />
        <el-table-column :label="$t('userrole.status')" prop="status" align="center" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button size="small" type="text" class="primary" @click="viewdialog = true">{{ $t('userrole.viewuser') }}</el-button>
            <el-button size="small" type="text" class="primary" @click="handleDelete(scope.row)">{{ $t('userrole.editpremission') }}</el-button>
            <el-button size="small" type="text" class="primary" @click="handleDelete(scope.row)">{{ $t('userrole.addemployee') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="deldialog=true">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--启用用户查看和移除-->
    <el-dialog :title="$t('userrole.viewuser')" :visible.sync="viewdialog" center>
      <el-input></el-input><el-button>{{ $t('sanctions.export') }}</el-button>
      <el-table :data="tabledata" style="width: 100%">
        <el-table-column align="center" :label="$t('userrole.id')" prop="id" />
        <el-table-column align="center" :label="$t('userrole.name')" prop="name" />
        <el-table-column align="center" :label="$t('userrole.email')" prop="email" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button size="small" type="text" class="danger" @click="remove">{{ $t('userrole.remove') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--删除角色-->
    <el-dialog :title="$t('message.delete')" :visible.sync="deldialog" center>
      <span>{{ $t('userrole.deltitle') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitdel">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="centerDialogVisible = false">{{ $t('forgetForm.cancel') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SwitchRoles from './components/SwitchRoles'
import Pagination from '@/components/Pagination'
export default {
  name: 'PagePermission',
  components: { SwitchRoles, Pagination },
  data() {
    return {
      queryParams: {},
      viewdialog: false,
      deldialog: false,
      tabledata:[
        {id:'1',name:'kelly',email:'kelly@163.com'},
        {id:'2',name:'kelly',email:'kelly@163.com'},
        {id:'3',name:'kelly',email:'kelly@163.com'}
      ]
    }
  },
  methods: {
    // handleRolesChange() {
    //   this.$router.push({ path: '/permission/index?' + +new Date() })
    // },
  },
}
</script>
