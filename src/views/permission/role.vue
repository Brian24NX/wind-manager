<template>
  <!--<div>用户管理</div>-->
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
            <el-button type="danger" size="small" @click="importdialog = true" plain>{{ $t('userrole.import') }}</el-button>
            <el-button type="danger" size="small" @click="downloadtemplate" plain>{{ $t('userrole.export') }}</el-button>
            <el-button type="danger" size="small" @click="adddialog = true">{{ $t('userrole.newuser') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <Pagination ref="pagination" uri="/wind-manager/userlist/list" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('userrole.name')" prop="name" />
        <el-table-column align="center" :label="$t('userrole.email')" prop="email" />
        <el-table-column :label="$t('userrole.function')" prop="function" />
        <el-table-column :label="$t('userrole.status')" prop="status" align="center" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.status === 'Active'" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('userrole.deactive') }}</el-button>
            <el-button v-if="scope.row.status === 'Deactive'" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('userrole.active') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="editdialog=true">{{ $t('userrole.viewedit') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--文件上传弹窗-->
    <el-dialog :title="$t('newscenter.import')" :visible.sync="importdialog" center>
      <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" :limit="1">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-dialog>
    <!--新增弹窗-->
    <el-dialog :title="$t('userrole.newuser')" :visible.sync="adddialog" center>
      <el-form :model="addform" :rules="rules" ref="addform">
        <el-form-item :label="$t('userrole.name')" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('userrole.email')" :label-width="formLabelWidth" prop="email">
          <el-input v-model="addform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('userrole.function')" :label-width="formLabelWidth" prop="function">
          <el-select v-model="addform.function" multiple placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('login.password')" :label-width="formLabelWidth" prop="password">
             <el-input v-model="addform.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="addhistorynewsdialog = false">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--查看和编辑角色-->
    <el-dialog :title="$t('userrole.viewedit')" :visible.sync="editdialog" center>
      <el-form :model="editform" :rules="editrules" ref="editform">
         <el-form-item :label="$t('userrole.name')" :label-width="formLabelWidth" prop="name">
          <el-input v-model="editform.name" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$t('userrole.email')" :label-width="formLabelWidth" prop="email">
          <el-input v-model="editform.email" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$t('userrole.function')" :label-width="formLabelWidth" prop="function">
           <el-select v-model="editform.function" multiple placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="addhistorynewsdialog = false">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'
import i18n from '@/lang'
import Pagination from '@/components/Pagination'
const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: [],
}

export default {
  name: 'role',
  components: {
    Pagination,
  },
  data() {
    return {
      queryParams: {},
      addform:{
        name:'',
        email:'',
        function:'',
        password:'',
      },
      editform:{
        name:'',
        email:'',
        function:''
      },
      options:[{value:'1',label:'Normal User'},{value:'2',label:'sales'},{value:'3',label:'Communiication'}],
      adddialog:false,
      importdialog:false,
      editdialog:false,
      formLabelWidth:"130px",
      rules:{
        name: { required: true, message: 'name is required', trigger: 'blur' },
        email: { required: true, message: 'email is required', trigger: 'blur' },
        function: { required: true, message: 'function is required', trigger: 'change' },
        password: { required: true, message: 'password is required', trigger: 'blur' },
      },
      editrules:{
        function:{ required: true, message: 'function is required', trigger: 'change' },
      }
    }
  },
  computed: {
  
  },
  created() {
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
