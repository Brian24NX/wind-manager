<template>
  <div>
    <!--搜索输入-->
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="20">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-select v-model="queryParams.categoryId" size="small" :placeholder="$t('business.category')" clearable filterable style="width: 100%" @change="search">
                <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-input v-model="queryParams.keyWord" size="small" style="width: 100%" :placeholder="$t('business.title')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
            <el-col :span="6">
              <el-select v-model="queryParams.publish" size="small" :placeholder="$t('business.status')" clearable filterable style="width: 100%" @change="search">
                <el-option v-for="item in publishList" :key="item.key" :label="item.value + ' / ' + item.valueCn" :value="item.key" />
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-select v-model="queryParams.topFlag" size="small" :placeholder="$t('business.topFlag')" clearable filterable style="width: 100%" @change="search">
                <el-option v-for="item in topFlagList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" @click="search">{{ $t('message.search') }}</el-button>
            <el-button type="danger" size="small" plain @click="reset">{{ $t('message.reset') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!--table显示-->
    <div class="tableContainer">
      <div class="operations">
        <el-button v-permission="[43]" type="danger" size="small" @click="setdialog = true">{{ $t('business.categoryset') }}</el-button>
        <el-button v-permission="[43]" type="danger" size="small" @click="handleAdd">{{ $t('business.sendnotification') }}</el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/businiessOpentionalList" :request-params="queryParams">
        <el-table-column align="center" :label="$t('business.title')" prop="title" />
        <el-table-column :label="$t('business.category')" align="center" width="180px">
          <template slot-scope="scope">
            {{ scope.row.categoryEnName ? (scope.row.categoryEnName + '/' + scope.row.categoryCnName) : '' }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('business.creator')" prop="creator" align="center" width="150px" />
        <el-table-column align="center" :label="$t('message.createTime')" prop="createTime" :formatter="formatDate" width="150px" />
        <el-table-column align="center" :label="$t('business.topFlag')" prop="topFlag" width="120px">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.topFlag"
              :active-value="1"
              :inactive-value="0"
              active-color="#e10202"
              inactive-color="#C0CCDA"
              @change="changeTopFlag(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('business.status')" prop="publish" :formatter="transactive" width="120px" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right" width="180px">
          <template scope="scope">
            <el-button size="small" type="text" @click="handleDetail(scope.row)">{{ $t('message.detail') }}</el-button>
            <el-button v-if="scope.row.publish === 0" v-permission="[43]" size="small" type="text" @click="handleEdit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button v-if="scope.row.publish === 1" v-permission="[44]" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('message.unPublish') }}</el-button>
            <el-button v-if="scope.row.publish === 0" v-permission="[44]" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('message.publish') }}</el-button>
            <el-button v-permission="[43]" size="small" type="text" class="danger" @click="handleDelete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--类别设置-->
    <el-dialog :title="$t('business.categoryset')" :visible.sync="setdialog" center :close-on-click-modal="false" destroy-on-close>
      <el-button size="small" type="danger" @click="createcategory">{{ $t('library.categorysetting') }}</el-button>
      <el-table :data="tabledata" style="width: 100%">
        <el-table-column :label="$t('newscenter.categoryen')">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input v-model="scope.row.category" size="mini" @blur="scope.row.category = $event.target.value.trim()" />
            </span>
            <span v-else>{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('newscenter.categoryzh')">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input v-model="scope.row.categoryCn" size="mini" @blur="scope.row.categoryCn = $event.target.value.trim()" />
            </span>
            <span v-else>{{ scope.row.categoryCn }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('userful.sort')" align="center">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input-number v-model="scope.row.sort" style="width: 100%;" :min="1" />
            </span>
            <span v-else>{{ scope.row.sort }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('business.creator')" align="center">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input v-model="scope.row.creator" size="mini" @blur="scope.row.creator = $event.target.value.trim()" />
            </span>
            <span v-else>{{ scope.row.creator }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.isSet" size="small" type="text" @click="Save(scope.row)">{{ $t('message.save') }}</el-button>
            <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Edit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Delete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--添加通告-->
    <el-dialog :title="addform.id ? $t('general.edit') : $t('general.add')" :visible.sync="adddialog" center destroy-on-close :close-on-click-modal="false" width="1000px" top="50px">
      <el-form ref="addform" :model="addform" label-position="top" :rules="rules">
        <el-form-item :label="$t('business.title')" prop="title">
          <el-input v-model="addform.title" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.title = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('business.content')" prop="content">
          <tinymce ref="editor" v-model="addform.content" :height="250" />
        </el-form-item>
        <el-form-item :label="$t('business.uploadfile')" prop="uploadfile">
          <el-upload
            ref="upload"
            class="upload-demo"
            :headers="{
              Authorization: cookies,
            }"
            action="/api/admin/uploadFile"
            :on-preview="handPreview"
            :on-remove="handRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            :limit="1"
          >
            <el-button slot="trigger" size="small" type="primary">{{ $t('business.uploadfile') }}</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('business.category')" prop="categoryId">
          <el-select v-model="addform.categoryId" :placeholder="$t('general.choose')" style="width: 400px;">
            <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="submitLoading" @click="savebusiness(0)">{{ $t('message.save') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
        <el-button type="primary" :loading="submitLoading" @click="savebusiness(1)">{{ $t('addArticle.submit') }}</el-button>
      </div>
    </el-dialog>
    <!--查看通告-->
    <el-dialog :title="$t('message.detail')" :visible.sync="detaildialog" center destroy-on-close :close-on-click-modal="false" width="800px" top="50px">
      <el-form ref="addform" label-position="top" :model="detailform">
        <el-form-item :label="$t('business.title')" prop="title">
          <el-input v-model="detailform.title" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="$t('business.content')" prop="content">
          <div class="detailContent" v-html="detailform.content" />
        </el-form-item>
        <el-form-item :label="$t('business.uploadfile')" prop="uploadfile">
          <el-upload
            ref="upload"
            disabled
            class="upload-demo"
            :headers="{
              Authorization: cookies,
            }"
            action="/api/admin/uploadFile"
            :on-preview="handPreview"
            :on-remove="handRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            :limit="1"
          >
            <el-button slot="trigger" size="small" type="primary">{{ $t('business.uploadfile') }}</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('business.category')" prop="categoryId">
          <el-select v-model="addform.categoryId" placeholder="请选择" disabled>
            <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import Tinymce from '@/components/Tinymce'
import { businessAdd, businessDel, businessPublish, businessEdit, businessTopFlag } from '@/api/business'
import { dictItem } from '@/api/system/dict/dict'
import { categoryList, categoryAdd, categoryDel, categoryEdit } from '@/api/article'
import { transList } from '@/utils'
import Cookies from 'js-cookie'
export default {
  name: 'Business',
  components: {
    Pagination,
    Tinymce
  },
  data() {
    return {
      cookies: Cookies.get('Admin-Token'),
      queryParams: {
        categoryId: '',
        keyWord: '',
        publish: '',
        creator: '',
        topFlag: ''
      },
      publishList: [],
      topFlagList: [{
        value: 1,
        label: 'YES / 是'
      }, {
        value: 0,
        label: 'NO / 否'
      }],
      categoryadd: false,
      isAdd: false,
      categoryList: [],
      adddialog: false,
      deldialog: false,
      setdialog: false,
      fileList: [],
      addform: {
        title: '',
        creator: '',
        content: '',
        uploadfile: '',
        topFlag: 0,
        categoryId: ''
      },
      tabledata: [],
      submitLoading: false,
      rules: {},
      detailform: {},
      detaildialog: false
    }
  },
  watch: {
    '$store.getters.language'() {
      this.setRules()
    },
    adddialog(newValue) {
      if (!newValue) {
        this.addform = {
          title: '',
          creator: '',
          content: '',
          uploadfile: '',
          topFlag: 0,
          categoryId: ''
        }
        setTimeout(() => {
          this.$refs.editor.setContent('')
        }, 300)
        this.fileList = []
        this.submitLoading = false
      }
    },
    detaildialog(newValue) {
      if (!newValue) {
        this.detailform = {}
        this.fileList = []
      }
    },
    setdialog(val) {
      if (!val) {
        this.getcategoryList()
      }
    }
  },
  created() {
    this.getcategoryList()
    this.getPublishList()
  },
  mounted() {
    this.setRules()
  },
  methods: {
    getPublishList() {
      dictItem('dict_publish').then(res => {
        this.publishList = res.data
      })
    },
    changeTopFlag(row) {
      businessTopFlag({
        id: row.id,
        topFlag: row.topFlag,
        userId: JSON.parse(localStorage.getItem('userInfo')).id
      }).then(() => {}, () => {
        row.topFlag = row.topFlag === 1 ? 0 : 1
      })
    },
    setRules() {
      this.rules = {
        title: { required: true, message: this.$t('business.titletips'), trigger: 'blur' }
      }
      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.addform ? this.$refs.addform.clearValidate() : null
        })
      }, 1)
    },
    transactive(data) {
      if (data.publish === 1) {
        return 'Published'
      } else {
        return 'Draft'
      }
    },
    formatDate(row, column, cellValue, index) {
      return this.$moment(cellValue).format('YYYY-MM-DD')
    },
    // 获取种类列表
    async getcategoryList() {
      const type = 2
      const res = await categoryList(type)
      this.categoryList = transList(res.data)
      res.data.map(i => {
        i.isSet = false
      })
      this.tabledata = res.data
    },
    // 搜索
    search() {
      this.$refs.pagination.refreshRequest()
    },
    // 重置
    reset() {
      this.queryParams = {
        categoryId: '',
        keyWord: '',
        creator: ''
      }
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    },
    // 保存或者保存并发布新增数据
    async savebusiness(publish) {
      this.$refs['addform'].validate((valid) => {
        if (valid) {
          const businiessOpentional = {
            id: this.addform.id,
            title: this.addform.title,
            creator: this.addform.creator,
            content: this.addform.content,
            filepath: this.addform.uploadfile,
            categoryId: this.addform.categoryId,
            topFlag: this.addform.topFlag,
            publish: publish
          }
          if (this.isAdd) {
            this.submitLoading = true
            businiessOpentional.createUser = JSON.parse(localStorage.getItem('userInfo')).id
            businessAdd(businiessOpentional).then(res => {
              this.adddialog = false
              this.$refs.pagination.pageRequest()
            })
          } else {
            this.submitLoading = true
            businiessOpentional.updateUser = JSON.parse(localStorage.getItem('userInfo')).id
            businessEdit(businiessOpentional).then(res => {
              this.adddialog = false
              this.$refs.pagination.pageRequest()
            })
          }
        } else {
          return false
        }
      })
    },
    // 删除数据
    handleDelete(id) {
      this.$confirm(this.$t('business.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await businessDel(id)
          this.$refs.pagination.pageRequest()
        })
    },
    // 处理发布状态
    async handleUpdateStatus(row, publish) {
      const data = {
        id: row.id,
        publish: publish,
        userId: JSON.parse(localStorage.getItem('userInfo')).id
      }
      await businessPublish(data)
      this.$refs.pagination.pageRequest()
    },
    // 查看详情
    handleDetail(row) {
      this.detailform = JSON.parse(JSON.stringify(row))
      if (row.filepath) {
        this.fileList = [{
          name: row.filepath.split('wind/')[1],
          url: location.origin + process.env.VUE_APP_FILE_BASE_API + row.filepath
        }]
      }
      this.detaildialog = true
    },
    // 编辑
    handleEdit(row) {
      this.addform = JSON.parse(JSON.stringify(row))
      if (this.categoryList.findIndex(i => i.value === row.categoryId) === -1) {
        this.addform.categoryId = ''
      }
      if (row.filepath) {
        this.fileList = [{
          name: row.filepath.split('wind/')[1],
          url: location.origin + process.env.VUE_APP_FILE_BASE_API + row.filepath
        }]
      }
      this.adddialog = true
      setTimeout(() => {
        this.$refs.editor.setContent(row.content)
      }, 200)
      this.isAdd = false
    },
    // 新增
    handleAdd() {
      this.adddialog = true
      this.isAdd = true
    },
    // 取消
    Cancle() {
      this.adddialog = false
    },
    // 添加种类
    createcategory() {
      const data = {
        category: '',
        categoryCn: '',
        sort: 1,
        creator: '',
        isSet: true,
        categoryadd: true
      }
      // if (!this.tabledata[this.tabledata.length - 1].category) return
      this.tabledata.push(data)
      this.categoryadd = true
    },
    // 添加种类
    async Save(row) {
      const data = {
        id: row.id,
        category: row.category,
        categoryCn: row.categoryCn,
        sort: row.sort,
        creator: row.creator,
        type: 2,
        isSet: false
      }
      if (!data.category || !data.categoryCn) {
        this.$message.error(this.$t('newscenter.categorytips'))
        return
      }
      if (row.categoryadd) {
        const res = await categoryAdd(data)
        data.id = res.data
        this.$set(this.tabledata, this.tabledata.indexOf(row), data)
      } else {
        await categoryEdit(data)
        this.$set(this.tabledata, this.tabledata.indexOf(row), data)
      }
    },
    // 编辑种类
    async Edit(row) {
      row.isSet = true
    },
    // 删除种类
    async Delete(id) {
      this.$confirm(this.$t('navbar.delcatetitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await categoryDel(id)
          // 删除表格当前行
          this.tabledata.map((i, index) => {
            if (i.id === id) {
              this.tabledata.splice(index, 1)
            }
          })
        })
    },
    handPreview(file) {
      console.log(file)
      window.open(file.url)
    },
    handRemove(file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
    },
    handleSuccess(response, file, fileList) {
      if (response.code === '200') {
        this.fileList.push({ name: response.data.fileName, url: response.data.fileUrl })
        this.addform.uploadfile = response.data.fileName
      } else {
        this.$message.error(response.message)
        this.fileList = []
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
