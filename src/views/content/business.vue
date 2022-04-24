<template>
   <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-select v-model="queryParams.category" placeholder="请选择">
                <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
              <el-col :span="8">
              <el-input v-model="queryParams.title" size="small" style="width: 100%" placeholder="Keyword" suffix-icon="el-icon-search" clearable />
            </el-col>
             <el-col :span="8">
              <el-input v-model="queryParams.creator" size="small" style="width: 100%" placeholder="Creator" suffix-icon="el-icon-search" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" plain>{{$t('business.categoryset')}}</el-button>
            <el-button type="danger" size="small" @click="adddialog=true">{{$t('business.sendnotification')}}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <Pagination ref="pagination" uri="/wind-manager/business/list" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('business.id')" prop="id"  />
        <el-table-column align="center" :label="$t('business.title')" prop="title"  />

        <el-table-column :label="$t('business.category')" prop="category"  />

        <el-table-column :label="$t('business.creator')" prop="creator" align="center" />

        <el-table-column align="center" :label="$t('business.updatetime')"  prop="updatetime" />
        <el-table-column align="center" :label="$t('business.status')"  prop="status" />
        <el-table-column :label="$t('article.actions')" align="center"  fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.status === 'Published'" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('message.unPublish') }}</el-button>
            <el-button v-if="scope.row.status === 'Draft'" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('message.publish') }}</el-button>
            <el-button v-if="scope.row.status ==='Draft'" size="small" type="text" @click="handleEdit(scope.row.id)">{{ $t('message.edit') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="handleDelete(scope.row)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--删除通告-->
     <el-dialog :title="$t('newscenter.del')" :visible.sync="deldialog" center>
      <span>{{ $t('business.deltitle') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitdel">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="centerDialogVisible = false">{{ $t('forgetForm.cancel') }}</el-button>
      </span>
    </el-dialog>
    <!--类别设置-->
    <!--添加通告-->
    <el-dialog :title="$t('business.sendnotification')" :visible.sync="adddialog" center>
       <el-form :model="addform" :rules="rules" ref="addform">
        <el-form-item :label="$t('business.title')" :label-width="formLabelWidth" prop="title">
          <el-input v-model="addform.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('business.creator')" :label-width="formLabelWidth" prop="creator">
          <el-input v-model="addform.creator" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('business.content')" :label-width="formLabelWidth" prop="content">
          <el-select v-model="historyform.category" placeholder="请选择">
            <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('newscenter.uploadfile')" :label-width="formLabelWidth" prop="publishdate">
          <el-date-picker type="date" placeholder="选择日期" v-model="historyform.publishdate" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('newscenter.category')" :label-width="formLabelWidth" prop="category">
              <el-select v-model="queryParams.category" placeholder="请选择">
                <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submithistory">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="addhistorynewsdialog = false">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div> 
</template>
<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'Business',
  components: {
    Pagination
  },
  data() {
    return {
      queryParams: {},
      categoryList: [],
      adddialog: false,
      deldialog: false,
      categoryList:[
        {value:0,label:'Business Update'},
        {value:1,label:'Operational Update'}
      ]
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
