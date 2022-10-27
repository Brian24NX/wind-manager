<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.keyword" size="small" style="width: 100%" :placeholder="$t('userful.name')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
            <el-col :span="8">
              <el-select v-model="queryParams.type" size="small" :placeholder="$t('userful.type')" clearable filterable style="width: 100%" @change="search">
                <el-option v-for="item in typelist" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
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
        <el-button v-permission="[47]" type="danger" size="small" @click="setDocumentCategory()">{{ $t('userful.categoryset1') }}</el-button>
        <el-button v-permission="[47]" type="danger" size="small" @click="setLinkCategory()">{{ $t('userful.categoryset2') }}</el-button>
        <el-button v-permission="[48]" type="danger" size="small" @click="importFile">{{ $t('userful.import') }}</el-button>
        <el-button v-permission="[46]" type="danger" size="small" @click="handleAdd">{{ $t('userful.additem') }}</el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/templateList" :request-params="queryParams">
        <el-table-column align="center" :label="$t('userful.name')" prop="name" />
        <el-table-column :label="$t('userful.category')" prop="categoryName" align="center" width="230px" />
        <el-table-column :label="$t('userful.categoryTwo')" prop="categorySubName" align="center" width="230px">
          <template scope="scope">
            <span>{{ scope.row.categorySubName || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('userful.type')" prop="type" width="120px" align="center">
          <template scope="scope">
            <span>{{ scope.row.type === 1 ? $t('userful.type1') : $t('userful.type2') }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('userful.document')" prop="document">
          <template scope="scope">
            <span v-if="scope.row.type === 2" style="white-space: pre-line">{{ scope.row.document }}</span>
            <span v-else>{{ transdocument(scope.row.document) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('userful.reference')" prop="internalReference">
          <template scope="scope">
            <span style="white-space: pre-line">{{ scope.row.internalReference }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('message.createTime')" prop="createTime" :formatter="formatDate" width="150px" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right" width="150px">
          <template scope="scope">
            <el-button v-permission="[50]" size="small" type="text" @click="handleEdit(scope.row)">{{ $t('userful.edit') }}</el-button>
            <el-button v-if="scope.row.type == 1" v-permission="[49]" size="small" type="text" @click="download(scope.row.document)">{{ $t('userful.download') }}</el-button>
            <el-button v-permission="[51]" size="small" type="text" class="danger" @click="handleDelete(scope.row.id)">{{ $t('userful.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--文档类别设置-->
    <el-dialog :title="$t('business.categoryset')" :visible.sync="setdialog" center :close-on-click-modal="false">
      <el-button size="small" type="danger" style="margin-bottom: 20px" @click="createcategory">{{ $t('library.categorysetting') }}</el-button>
      <el-tabs v-model="tabCategory" type="border-card" @tab-click="handleClick">
        <el-tab-pane :label="$t('userful.category')" name="firstCategory">
          <el-table :data="documentCategory" style="width: 100%">
            <el-table-column :label="$t('userful.categoryen')" align="center">
              <template scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input v-model="scope.row.category" size="mini" />
                </span>
                <span v-else>{{ scope.row.category }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('userful.categoryzh')" align="center">
              <template scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input v-model="scope.row.categoryCn" size="mini" />
                </span>
                <span v-else>{{ scope.row.categoryCn }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('userful.sort')" align="center">
              <template scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input-number v-model="scope.row.sort" style="width: 100%" :min="1" />
                </span>
                <span v-else>{{ scope.row.sort }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('business.creator')" align="center">
              <template scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input v-model="scope.row.creator" size="mini" />
                </span>
                <span v-else>{{ scope.row.creator }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('article.actions')" align="center" width="120px" fixed="right">
              <template scope="scope">
                <el-button v-if="scope.row.isSet" size="small" type="text" @click="Save(scope.row)">{{ $t('message.save') }}</el-button>
                <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Edit(scope.row)">{{ $t('message.edit') }}</el-button>
                <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Delete(scope.row.id)">{{ $t('message.delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="$t('userful.categoryTwo')" name="secondCategory">
          <el-table :data="documentSecondCategory" style="width: 100%">
            <el-table-column :label="$t('userful.categoryen')" align="center">
              <template scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input v-model="scope.row.category" size="mini" />
                </span>
                <span v-else>{{ scope.row.category }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('userful.categoryzh')" align="center">
              <template scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input v-model="scope.row.categoryCn" size="mini" />
                </span>
                <span v-else>{{ scope.row.categoryCn }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('userful.sort')" align="center">
              <template scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input-number v-model="scope.row.sort" style="width: 100%" :min="1" />
                </span>
                <span v-else>{{ scope.row.sort }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('business.creator')" align="center">
              <template scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input v-model="scope.row.creator" size="mini" />
                </span>
                <span v-else>{{ scope.row.creator }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('article.actions')" align="center" width="120px">
              <template scope="scope">
                <el-button v-if="scope.row.isSet" size="small" type="text" @click="Save(scope.row)">{{ $t('message.save') }}</el-button>
                <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Edit(scope.row)">{{ $t('message.edit') }}</el-button>
                <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Delete(scope.row.id)">{{ $t('message.delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!--链接类别设置-->
    <el-dialog :title="$t('business.categoryset')" :visible.sync="setdialog2" center :close-on-click-modal="false">
      <el-button size="small" type="danger" @click="createcategory">{{ $t('library.categorysetting') }}</el-button>
      <el-table :data="linkCategory" style="width: 100%">
        <el-table-column :label="$t('userful.categoryen')" align="center">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input v-model="scope.row.category" size="mini" />
            </span>
            <span v-else>{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('userful.categoryzh')" align="center">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input v-model="scope.row.categoryCn" size="mini" />
            </span>
            <span v-else>{{ scope.row.categoryCn }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('userful.sort')" align="center">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input-number v-model="scope.row.sort" style="width: 100%" :min="1" />
            </span>
            <span v-else>{{ scope.row.sort }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('business.creator')" align="center">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input v-model="scope.row.creator" size="mini" />
            </span>
            <span v-else>{{ scope.row.creator }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('article.actions')" align="center" width="120px">
          <template scope="scope">
            <el-button v-if="scope.row.isSet" size="small" type="text" @click="Save(scope.row)">{{ $t('message.save') }}</el-button>
            <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Edit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Delete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--添加通告-->
    <el-dialog :title="addform.id ? $t('general.edit') : $t('general.add')" :visible.sync="adddialog" center destroy-on-close :close-on-click-modal="false" width="650px">
      <el-form ref="addform" :model="addform" label-position="top" :rules="rules">
        <el-form-item :label="$t('userful.name')" prop="name">
          <el-input v-model="addform.name" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.name = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('userful.type')" prop="type">
          <el-radio-group v-model="addform.type" @change="changeType">
            <el-radio v-for="item in typelist" :key="item.value" :label="item.value">{{ item.label }} </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('userful.category')" prop="categoryId">
          <el-select v-model="addform.categoryId" style="width: 100%" :placeholder="$t('general.choose')">
            <el-option v-for="item in addform.type === 1 ? categoryList2 : categoryList1" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="addform.type === 1"
          :label="$t('userful.categoryTwo')"
          prop="categorySubId"
          :rules="addform.type === 1 ? [{ required: true, message: $t('userful.categoryIdtips'), trigger: 'blur' }] : ''"
        >
          <el-select v-model="addform.categorySubId" style="width: 100%" :placeholder="$t('general.choose')">
            <el-option v-for="item in categoryList3" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="addform.type == 1" :label="$t('userful.uploadfile')" prop="document">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="/api/admin/uploadFile"
            :headers="uploadHeaders"
            :on-preview="handPreview"
            :on-remove="handRemove"
            :on-success="handleupSuccess"
            :limit="1"
            :file-list="fileList"
          >
            <el-button slot="trigger" size="small" type="primary">{{ $t('userful.uploadfile') }}</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item v-show="addform.type == 2" :label="$t('userful.link')" prop="document">
          <el-input v-model="addform.document" autocomplete="off" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" clearable @blur="addform.document = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('userful.reference')" prop="internalReference">
          <el-input
            v-model="addform.internalReference"
            autocomplete="off"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            clearable
            @blur="addform.internalReference = $event.target.value.trim()"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save('addform')">{{ $t('message.save') }}</el-button>
        <!-- <el-button v-show="isAdd" type="primary" @click="submitbusiness">{{ $t('addArticle.submit') }}</el-button>-->
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--导入模板-->
    <CustomerImport ref="customerImport" download-url="import/Import Useful Links导入常用链接.xlsx" import-url="/api/admin/usefulTemplateImport" :table-colum="tableColum" @success="search" />
    <!-- <el-dialog :title="$t('newscenter.import')" :visible.sync="importdialog" center destroy-on-close :close-on-click-modal="false" width="410px">
      <el-upload class="upload-demo" drag action="/api/admin/usefulTemplateImport" :limit="1" :on-success="handleSuccess" :headers="uploadHeaders" accept=".xlsx, .xls">
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          {{ $t('general.upload') }}<em>{{ $t('general.uploadTips') }}</em>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="loading" @click="submitimport">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="importdialog = false">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import CustomerImport from '@/components/Import/import'
import { templateAdd, templateEdit, templateDelete } from '@/api/useful'
import { categoryList, categoryAdd, categoryDel, categoryEdit } from '@/api/article'
import { transList } from '@/utils'
import { getToken } from '@/utils/auth'
export default {
  name: 'Useful',
  components: {
    Pagination,
    CustomerImport
  },
  data() {
    return {
      uploadHeaders: { Authorization: getToken(), userId: JSON.parse(localStorage.getItem('userInfo')).id },
      queryParams: { keyword: '', type: '' },
      categoryList1: [],
      categoryList2: [],
      categoryList3: [],
      categoryedit: false,
      importdialog: false,
      addform: {
        name: '',
        categoryId: '',
        categorySubId: '',
        type: 1,
        document: '',
        internalReference: '',
        id: ''
      },
      fileList: [],
      isAdd: false,
      adddialog: false,
      setdialog: false,
      typelist: [
        {
          label: 'Document / 文档',
          value: 1
        },
        {
          label: 'Link / 链接',
          value: 2
        }
      ],
      rules: {},
      linkCategory: [],
      documentCategory: [],
      documentSecondCategory: [],
      selectcolumn: [],
      loading: false,
      categoryType: null,
      tableColum: [
        {
          prop: 'name',
          label: 'name',
          width: '200px'
        },
        {
          prop: 'categoryName',
          label: 'categoryName',
          width: '200px'
        },
        {
          prop: 'document',
          label: 'Link',
          width: '200px'
        },
        {
          prop: 'internalReference',
          label: 'internalReference',
          width: '200px'
        }
      ],
      tabCategory: 'firstCategory',
      setdialog2: false
    }
  },
  watch: {
    '$store.getters.language'() {
      this.setRules()
    },
    adddialog(val) {
      if (!val) {
        this.addform = {
          name: '',
          categoryId: '',
          categorySubId: '',
          type: 1,
          document: '',
          internalReference: '',
          id: ''
        }
        this.fileList = []
        this.loading = false
      }
    }
  },
  created() {
    this.getDocumentCategoryList()
    this.getDocumentSecondCategoryList()
    this.getLinkCategoryList()
  },
  mounted() {
    this.setRules()
  },
  methods: {
    setRules() {
      this.rules = {
        name: { required: true, message: this.$t('userful.nametips'), trigger: 'blur' },
        categoryId: { required: true, message: this.$t('userful.categoryIdtips'), trigger: 'blur' },
        type: { required: true, message: this.$t('userful.typetips'), trigger: 'change' },
        document: { required: true, message: this.$t('userful.documenttips'), trigger: 'blur' }
      }
      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.addform ? this.$refs.addform.clearValidate() : null
        })
      }, 1)
    },
    changeType() {
      this.addform.categoryId = ''
      this.addform.categorySubId = ''
    },
    setLinkCategory() {
      this.setdialog2 = true
      this.categoryType = 3
    },
    setDocumentCategory() {
      this.setdialog = true
      this.categoryType = 6
      this.tabCategory = 'firstCategory'
    },
    formatDate(row, column, cellValue, index) {
      return this.$moment(cellValue).format('YYYY-MM-DD')
    },
    // 置空列表
    reset() {
      this.queryParams = { keyword: '', type: '' }
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    },
    // 文档处理
    transdocument(document) {
      return process.env.VUE_APP_FILE_BASE_API + 'wind/' + document
    },
    // 文件上传成功
    handleupSuccess(res) {
      this.addform.document = res.data.fileName
    },
    // 获取种类列表
    async getLinkCategoryList() {
      const type = 3
      const res = await categoryList(type)
      this.categoryList1 = transList(res.data)
      res.data.map((i) => {
        i.isSet = false
      })
      this.linkCategory = res.data
    },
    async getDocumentCategoryList() {
      const type = 6
      const res = await categoryList(type)
      this.categoryList2 = transList(res.data)
      res.data.map((i) => {
        i.isSet = false
      })
      this.documentCategory = res.data
    },
    async getDocumentSecondCategoryList() {
      const type = 7
      const res = await categoryList(type)
      this.categoryList3 = transList(res.data)
      res.data.map((i) => {
        i.isSet = false
      })
      this.documentSecondCategory = res.data
    },
    // 新增
    handleAdd() {
      this.isAdd = true
      this.adddialog = true
    },
    // 编辑
    handleEdit(row) {
      this.addform = JSON.parse(JSON.stringify(row))
      if (this.addform.type === 1 && this.categoryList2.findIndex((i) => i.value === row.categoryId) === -1) {
        this.addform.categoryId = ''
      }
      if (this.addform.type === 1 && this.categoryList3.findIndex((i) => i.value === row.categorySubId) === -1) {
        this.addform.categorySubId = ''
      }
      if (this.addform.type === 2 && this.categoryList1.findIndex((i) => i.value === row.categoryId) === -1) {
        this.addform.categoryId = ''
      }
      if (this.addform.type === 1) {
        if (row.document) {
          this.fileList = [
            {
              name: row.document,
              url: process.env.VUE_APP_FILE_BASE_API + 'wind/' + row.document
            }
          ]
        }
      }
      console.log(this.addform)
      this.isAdd = false
      this.adddialog = true
    },
    async save(formName) {
      const data = {
        name: this.addform.name,
        type: this.addform.type,
        categoryId: this.addform.categoryId,
        categorySubId: this.addform.categorySubId,
        internalReference: this.addform.internalReference,
        document: this.addform.document,
        id: this.addform.id
      }
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          console.log(this.addform.document)
          if (!this.addform.document) {
            this.$message.error(this.$t('userful.documenttips'))
            return
          }
          this.loading = true
          if (this.isAdd) {
            data.createUser = JSON.parse(localStorage.getItem('userInfo')).id
            await templateAdd(data)
            this.adddialog = false
            this.$refs.pagination.pageRequest()
            this.loading = false
          } else {
            data.updateUser = JSON.parse(localStorage.getItem('userInfo')).id
            await templateEdit(data)
            this.adddialog = false
            this.$refs.pagination.pageRequest()
            this.loading = false
          }
        } else {
          return false
        }
      })
    },
    // 删除数据
    handleDelete(id) {
      this.$confirm(this.$t('userful.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      }).then(async() => {
        await templateDelete(id)
        this.$refs.pagination.pageRequest()
      })
    },
    // 搜索
    search() {
      this.$refs.pagination.refreshRequest()
    },
    // 取消
    Cancle() {
      this.$refs.addform.resetFields()
      this.adddialog = false
    },
    handleClick(e) {
      // 打印
      const name = e.name
      if (name === 'firstCategory') {
        this.categoryType = 6
        this.getDocumentCategoryList()
      } else if (name === 'secondCategory') {
        this.categoryType = 7
        this.getDocumentSecondCategoryList()
      }
    },
    // 添加种类
    createcategory() {
      const data = {
        categoryEn: '',
        category: '',
        creator: '',
        sort: 1,
        isSet: true,
        categoryadd: true
      }
      if (this.categoryType === 6) {
        this.documentCategory.push(data)
      } else if (this.categoryType === 7) {
        this.documentSecondCategory.push(data)
      } else if (this.categoryType === 3) {
        this.linkCategory.push(data)
      }
    },
    // 添加种类
    async Save(row) {
      const data = {
        id: row.id,
        category: row.category,
        categoryCn: row.categoryCn,
        creator: row.creator,
        sort: row.sort,
        type: this.categoryType,
        isSet: false
      }
      if (!data.category) {
        this.$message.error(this.$t('userful.categoryIdtips'))
        return
      }
      const res = row.categoryadd ? await categoryAdd(data) : await categoryEdit(data)
      if (res.code === '200') {
        console.log(this.categoryType)
        if (this.categoryType === 6) {
          this.getDocumentCategoryList()
        } else if (this.categoryType === 7) {
          this.getDocumentSecondCategoryList()
        } else if (this.categoryType === 3) {
          this.getLinkCategoryList()
        }
      }
    },
    // 编辑种类
    async Edit(row) {
      row.isSet = true
      this.categoryedit = true
    },
    // 删除种类
    async Delete(id) {
      this.$confirm(this.$t('navbar.delcatetitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      }).then(async() => {
        await categoryDel(id)
        if (this.categoryType === 6) {
          this.getDocumentCategoryList()
        } else if (this.categoryType === 7) {
          this.getDocumentSecondCategoryList()
        } else if (this.categoryType === 3) {
          this.getLinkCategoryList()
        }
      })
    },
    // 改变
    change(selections) {
      if (selections.length < 2) {
        // eslint-disable-next-line eqeqeq
        if (selections.type == 1) {
          this.selectcolumn.push(selections.document)
        }
      } else {
        selections.map((i) => {
          // eslint-disable-next-line eqeqeq
          if (i.type == 1) {
            this.selectcolumn.push(i.document)
          }
        })
      }
    },
    // 下载
    download(url) {
      window.open(process.env.VUE_APP_FILE_BASE_API + 'wind/' + url)
    },
    // 预览
    handPreview() {},
    // 移除
    handRemove(file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
    },
    importFile() {
      this.$refs.customerImport.importFile()
    }
  }
}
</script>
<style scoped>
</style>
