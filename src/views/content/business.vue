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
            <el-button type="danger" size="small" @click="setdialog=true" plain>{{$t('business.categoryset')}}</el-button>
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
    <el-dialog :title="$t('business.categoryset')" :visible.sync="setdialog" center>
        <el-button size="small" type="primary">{{$t('library.addcategory')}}</el-button>
        <el-table :data="tabledata" style="width:80%">
            <el-table-column :label="$t('business.category')" prop="category"/>
            <el-table-column :label="$t('business.creator')" prop="creator" align="center"/>
            <el-table-column :label="$t('article.actions')" align="center"  fixed="right">
              <template scope="scope">
                  <el-button size="small" type="text" @click="Edit(scope.row.id)">{{ $t('message.edit') }}</el-button>
                  <el-button size="small" type="text" @click="Delete(scope.row.id)">{{ $t('message.delete') }}</el-button>
              </template>
            </el-table-column>
        </el-table>
    </el-dialog>
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
              <tinymce v-model="addform.content" :height="250" />
        </el-form-item>
        <el-form-item :label="$t('business.uploadfile')" :label-width="formLabelWidth" prop="publishdate">
          <!-- <el-date-picker type="date" placeholder="选择日期" v-model="historyform.publishdate" style="width: 100%"></el-date-picker>-->
          <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handPreview"
          :on-remove="handRemove" :file-list="fileList" :auto-upload="false" :limit="1">
            <el-button slot="trigger" size="small" type="primary">{{$t('business.uploadfile')}}</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('business.category')" :label-width="formLabelWidth" prop="category">
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
import Tinymce from '@/components/Tinymce'
export default {
  name: 'Business',
  components: {
    Pagination,
    Tinymce
  },
  data() {
    return {
      queryParams: {},
      categoryList: [],
      adddialog: false,
      deldialog: false,
      setdialog: false,
      categoryList:[
        {value:0,label:'Business Update'},
        {value:1,label:'Operational Update'}
      ],
      fileList:'',
      formLabelWidth:'130px',
      addform:{
          title:'',
          creator:'',
          content:'',
          uploadfile:'',
          category:'',
      },
      tabledata:[
        {category:'Business Update',creator:'Kelly'},
        {category:'Operational Update',creator:'Kelly'}
      ]
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
