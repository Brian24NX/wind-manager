<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-select v-model="queryParams.category" placeholder="请选择">
                <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.title" size="small" style="width: 100%" placeholder="Keyword" suffix-icon="el-icon-search" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" plain @click="setdialog=true">{{ $t('newscenter.categorysetting') }}</el-button>
            <el-button type="danger" size="small" @click="exporttemplate">{{ $t('newscenter.export') }}</el-button>
            <el-button type="danger" size="small" @click="importdialog = true">{{ $t('newscenter.import') }}</el-button>
            <el-button type="danger" size="small" @click="addhistorynewsdialog = true">{{ $t('newscenter.addhistoynews') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <Pagination ref="pagination" uri="/wind-manager/newscenter/list" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('newscenter.title')" prop="title" />
        <el-table-column align="center" :label="$t('newscenter.category')" prop="category" />
        <el-table-column :label="$t('newscenter.publishdate')" prop="publishdate" />
        <el-table-column :label="$t('newscenter.link')" prop="link" align="center" />
        <el-table-column align="center" :label="$t('newscenter.status')" prop="status" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.status === 'Published'" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('message.publish') }}</el-button>
            <el-button v-if="scope.row.status === 'Unpublished'" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('message.unPublish') }}</el-button>
            <!-- <el-button v-if="scope.row.status ==='Undeactive'" size="small" type="text" @click="handleEdit(scope.row.id)">{{ $t('message.edit') }}</el-button>-->
            <el-button size="small" type="text" class="danger" @click="deldialog = true">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--历史文章添加-->
    <el-dialog :title="$t('newscenter.addtitle')" :visible.sync="addhistorynewsdialog" center>
      <el-form ref="historyform" :model="historyform" :rules="rules">
        <el-form-item :label="$t('newscenter.title')" :label-width="formLabelWidth" prop="title">
          <el-input v-model="historyform.title" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('newscenter.link')" :label-width="formLabelWidth" prop="link">
          <el-input v-model="historyform.link" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('newscenter.category')" :label-width="formLabelWidth" prop="category">
          <el-select v-model="historyform.category" placeholder="请选择">
            <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('newscenter.publishdate')" :label-width="formLabelWidth" prop="publishdate">
          <el-date-picker v-model="historyform.publishdate" type="date" placeholder="选择日期" style="width: 100%" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submithistory">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="addhistorynewsdialog = false">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--文章删除-->
    <el-dialog :title="$t('newscenter.del')" :visible.sync="deldialog" center>
      <span>{{ $t('newscenter.deltitle') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitdel">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="centerDialogVisible = false">{{ $t('forgetForm.cancel') }}</el-button>
      </span>
    </el-dialog>
    <!--文章导入-->
    <el-dialog :title="$t('newscenter.import')" :visible.sync="importdialog" center>
      <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" :limit="1">
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-dialog>
    <!--文章类型修改-->
    <el-dialog :title="$t('newscenter.categorysetting')" :visible.sync="setdialog" center>
      <el-button size="small" type="primary">{{ $t('library.addcategory') }}</el-button>
      <el-table :data="tabledata" style="width:80%">
        <el-table-column :label="$t('newscenter.categoryen')" prop="categoryen" />
        <el-table-column :label="$t('newscenter.categoryzh')" prop="categoryzh" align="center" />
        <el-table-column :label="$t('newscenter.creator')" prop="creator" align="center" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button size="small" type="text" @click="Edit(scope.row.id)">{{ $t('message.edit') }}</el-button>
            <el-button size="small" type="text" @click="Delete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
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
      categoryList: [
        { value: 0, label: 'Corporate Information 公司新闻' },
        { value: 1, label: 'CSR 社会责任' },
        { value: 2, label: 'Events 会展活动' }
      ],
      // 新增历史新闻
      addhistorynewsdialog: false,
      // 删除新闻
      deldialog: false,
      // 导入
      importdialog: false,
      // 类别修改
      setdialog: false,
      formLabelWidth: '130px',
      historyform: {
        title: '',
        link: '',
        category: '',
        publishdate: ''
      },
      rules: {
        title: { required: true, message: '请输入活动名称', trigger: 'blur' },
        link: { required: true, message: '请输入活动名称', trigger: 'blur' },
        publishdate: { required: true, message: '请选择活动区域', trigger: 'change' }
      },
      tabledata: [
        { categoryen: 'Business', categoryzh: '业务咨询', creator: 'Alina Huang' },
        { categoryen: 'CSR', categoryzh: '社会责任', creator: 'Alina Huang' }
      ]
    }
  },
  methods: {
    // 提交历史信息
    submithistory() {},
    // 删除一行数据
    submitdel() {},
    // 下载模版
    exporttemplate() {}
    //
  }
}
</script>
<style lang="scss" scoped></style>
