/* eslint-disable vue/no-unused-vars */
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
      <Pagination ref="pagination" uri="/api/admin/roleList" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('userrole.id')" prop="id" />
        <el-table-column align="center" :label="$t('userrole.function')" prop="functname" />
        <el-table-column :label="$t('userrole.description')" prop="descri" />
        <el-table-column :label="$t('userrole.status')" prop="active" align="center" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button size="small" type="text" class="primary" @click="viewdialog = true">{{ $t('userrole.viewuser') }}</el-button>
            <el-button size="small" type="text" class="primary" @click="handleDelete(scope.row)">{{ $t('userrole.editpremission') }}</el-button>
            <el-button size="small" type="text" class="primary" @click="handleDelete(scope.row)">{{ $t('userrole.addemployee') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="delFunction(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--启用用户查看和移除-->
    <el-dialog :title="$t('userrole.viewuser')" :visible.sync="viewdialog" center>
      <el-input /><el-button>{{ $t('sanctions.export') }}</el-button>
      <el-table :data="tabledata" style="width: 100%">
        <el-table-column align="center" :label="$t('userrole.id')" prop="id" />
        <el-table-column align="center" :label="$t('userrole.name')" prop="name" />
        <el-table-column align="center" :label="$t('userrole.email')" prop="email" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          // eslint-disable-next-line vue/no-unused-vars
          <template scope="scope">
            <el-button size="small" type="text" class="danger" @click="remove">{{ $t('userrole.remove') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--新增角色和权限-->
    <el-dialog :title="$t('userrole.addnewfunction')" :visible.sync="adddialog" center>
      <el-form ref="premissionform" :model="premissionform" :rules="premissionrules">
        <el-form-item :label="$t('userrole.function')" :label-width="formLabelWidth" prop="function">
          <el-input v-model="premissionform.function" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="$t('userrole.description')" :label-width="formLabelWidth" prop="description">
          <el-input v-model="premissionform.description" type="textarea" :row="2" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="$t('userrole.permission')" :label-width="formLabelWidth" prop="permission">
          <multi-check-list :data-list="dataList" :default-checked-keys="premissionform.permission" :invert="false" :is-check-all="false" @change="handlerDataCheck" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import MultiCheckList from '@/components/MultiCheckList'
// eslint-disable-next-line no-unused-vars
import { roleDel } from '../../api/role.js'
export default {
  name: 'PagePermission',
  components: { Pagination, MultiCheckList },
  data() {
    return {
      dataList: [
        {
          code: 1001,
          label: '电商',
          value: 'a001',
          children: [
            {
              code: 1002,
              label: '淘宝',
              value: 'a002'
            },
            {
              code: 1003,
              label: '京东',
              value: 'a003'
            },
            {
              code: 1004,
              label: '亚马逊',
              value: 'a002'
            }
          ]
        },
        {
          code: 1005,
          label: '生活服务',
          value: 'a005',
          children: [
            {
              code: 1006,
              label: '美团',
              value: 'a006'
            },
            {
              code: 1007,
              label: '大众点评',
              value: 'a007'
            },
            {
              code: 1008,
              label: '滴滴',
              value: 'a008'
            },
            {
              code: 1009,
              label: '饿了么',
              value: 'a009'
            }
          ]
        }
      ],
      premissionform: {
        permission: ['a001', 'a003', 'a005', 'a009'],
        description: '',
        function: ''
      },
      queryParams: { function: '' },
      viewdialog: false,
      tabledata: [
        { id: '1', name: 'kelly', email: 'kelly@163.com' },
        { id: '2', name: 'kelly', email: 'kelly@163.com' },
        { id: '3', name: 'kelly', email: 'kelly@163.com' }
      ]
    }
  },
  methods: {
    handlerDataCheck(parent, child) {
      console.log(parent, child)
    },
    // 删除角色
    delFunction(id) {
      this.$confirm(this.$t('userrole.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await roleDel(id)
          this.$refs.pagination.refreshRequest()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
    // handleRolesChange() {
    //   this.$router.push({ path: '/permission/index?' + +new Date() })
    // },
  }
}
</script>
