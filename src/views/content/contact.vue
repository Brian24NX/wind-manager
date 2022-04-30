<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-select v-model="queryParams.office" placeholder="请选择">
                <el-option v-for="item in officeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-select v-model="queryParams.trade" placeholder="请选择">
                <el-option v-for="item in tradeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" @click="exporttemplate" plain>{{ $t('faq.export') }}</el-button>
            <el-button type="danger" size="small" @click="downloadfile">{{$t('message.download')}}</el-button>
            <el-button type="danger" size="small" @click="importdialog = true" plain>{{ $t('contact.import') }}</el-button>
            <el-button type="danger" size="small" @click="adddialog = true">{{ $t('contact.createinfo') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <Pagination ref="pagination" uri="/wind-manager/contact/list" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('contact.id')" prop="id" />
        <el-table-column align="center" :label="$t('contact.region')" prop="region" />
        <el-table-column :label="$t('contact.office')" prop="office" />
        <el-table-column :label="$t('contact.dept')" prop="dept" align="center" />
        <el-table-column align="center" :label="$t('contact.buinessscope')" prop="buinessscope" />
        <el-table-column align="center" :label="$t('contact.trade')" prop="trade" />
        <el-table-column align="center" :label="$t('contact.accountname')" prop="accountname" />
        <el-table-column align="center" :label="$t('contact.contactperson')" prop="contactperson" />
        <el-table-column align="center" :label="$t('contact.dutydate')" prop="dutydate" />
        <el-table-column align="center" :label="$t('contact.dutytime')" prop="dutytime" />
        <el-table-column align="center" :label="$t('contact.phone')" prop="phone" />
        <el-table-column align="center" :label="$t('contact.email')" prop="email" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.status === 'Undeactive'" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('contact.active') }}</el-button>
            <el-button v-if="scope.row.status === 'Deactive'" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('contact.deactive') }}</el-button>
            <el-button v-if="scope.row.status === 'Undeactive'" size="small" type="text" @click="handleEdit(scope.row.id)">{{ $t('message.edit') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="handleDelete(scope.row)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--导入模版-->
    <el-dialog :title="$t('newscenter.import')" :visible.sync="importdialog" center>
      <el-upload class="upload-demo" drag action="/api/admin/uploadFile" :limit="1">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-dialog>
    <!--新增联系方式-->
    <el-dialog :title="$t('contact.createinfo')" :visible.sync="adddialog" center>
      <el-row>
        <el-form :model="addform" :rules="rules" ref="addform">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('contact.region')" :label-width="formLabelWidth" prop="region">
                <el-select v-model="addform.region" placeholder="请选择">
                  <el-option v-for="item in regionList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('contact.office')" :label-width="formLabelWidth" prop="office">
                <el-select v-model="addform.office" placeholder="请选择">
                  <el-option v-for="item in officeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('contact.dept')" :label-width="formLabelWidth" prop="dept">
                <el-select v-model="addform.dept" placeholder="请选择">
                  <el-option v-for="item in deptList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('contact.buinessscope')" :label-width="formLabelWidth" prop="buinessscope">
                <el-select v-model="addform.buinessscope" placeholder="请选择">
                  <el-option v-for="item in buinessscopeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('contact.trade')" :label-width="formLabelWidth" prop="trade">
                   <el-select v-model="addform.trade" placeholder="请选择">
                <el-option v-for="item in tradeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('contact.accountname')" :label-width="formLabelWidth" prop="accountname">
                <el-input v-model="addform.accountname" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('contact.contactperson')" :label-width="formLabelWidth" prop="contactperson">
                <el-input v-model="addform.contactperson" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('contact.dutydate')" :label-width="formLabelWidth" prop="dutydate">
                  <el-checkbox-group v-model="addform.dutydate">
                    <el-checkbox-button v-for="duty in dutylist" :label="city" :key="city">{{duty}}</el-checkbox-button>
                  </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('contact.dutytime')" :label-width="formLabelWidth" prop="dutytime">
                <el-time-picker is-range v-model="addform.dutytime" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"> </el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('contact.phone')" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="addform.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('contact.email')" :label-width="formLabelWidth" prop="email">
                <el-input v-model="addform.email" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
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
  name: 'Contact',
  components: {
    Pagination,
  },
  data() {
    return {
      queryParams: {},
      categoryList: [],
      importdialog: false,
      adddialog: false,
      formLabelWidth: '130px',
      officeList: [
        { value: 0, label: 'ShangHai' },
        { value: 1, label: 'Wuhan' },
        { value: 2, label: 'Suzhou' },
      ],
      tradeList: [
        { value: 0, label: 'All Trade' },
        { value: 1, label: 'North America' },
        { value: 2, label: 'South America' },
      ],
      regionList: [
        {value:0, label:'Central China'},
        {value:1, label:'North China'},
        {value:2, label:'South China'}
      ],
      deptList:[
        {value:0, label:'Customer Service'},
        {value:1, label:'Ecom'},
        {value:2, label:'Cus'},
      ],
      buinessscopeList:[
        {value:0, label:'进口/Import'},
        {value:1, label:'出口/Export'},
        {value:2, label:'柜台业务/OBL & Telex Release'},
      ],
      dutylist:['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
      addform:{
         region: '',
         office: '',
         dept: '',
         buinessscope: '',
         trade:'',
         accountname:'',
         contactperson:'',
         dutydate:[],
         dutytime:[new Date(2022,4,24,9),new Date(2022,4,24,18)],
         phone:'',
         email:''
      },
      rules:{
        region: {required:true,message:'请选择',trigger:'change'},
        office: {required:true,message:'请选择',trigger:'change'},
        dept: {required:true,message:'请选择',trigger:'change'},
        buinessscope: {required:true,message:'请选择',trigger:'change'},
        trade: {required:true,message:'请选择',trigger:'change'},
        contactperson: {required:true,message:'请输入',trigger:'blur'},
        dutydate: {required:true,message:'请选择',trigger:'change'},
        dutytime: {required:true,message:'请选择',trigger:'change'},
        email: {required:true,message:'请输入',trigger:'blur'}
      }
    }
  },
  methods:{
    downloadfile(){
         window.location.href="https://uat.wind-admin.cma-cgm.com/api/admin/import/user_tm.xlsx"
    }
  }
}
</script>
<style lang="scss" scoped></style>
