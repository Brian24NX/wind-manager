<template>
  <div v-loading="loading" class="librarycontainer">
    <div slot="header" class="clearfix" style="margin-bottom: 20px">
      <span>{{ $t('library.title') }}</span>
    </div>

    <div class="greycontainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="3">
              <el-checkbox v-model="checked" style="margin-top: 10px" @change="changeall">{{ $t('library.allselect') }}</el-checkbox>
            </el-col>
            <el-col :span="10">
              <el-button type="danger" size="small" :disabled="!checkedList.length ? true : false" plain @click="handleEditAllCate">{{ $t('library.category') }}</el-button>
              <el-button type="danger" size="small" :disabled="!checkedList.length ? true : false" plain @click="handleDelAll">{{ $t('library.delete') }}</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-select v-model="query.categoryId" placeholder="请选择" style="margin-right: 20px" @change="changesearch">
              <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-button type="danger" size="small" plain @click="uploaddialog = true">{{ $t('library.upload') }}</el-button>
            <el-button type="danger" size="small" plain @click="setdialog = true">{{ $t('business.categoryset') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <el-checkbox-group v-model="checkedList">
      <div class="listcontainer">
        <div v-for="(item, index) in librarylist" :key="index" class="cardcontainer">
          <el-image :src="filePath + item.filePath" mode="aspectFit" lazy :preview-src-list="[item.filePath]" class="imgsrc" />
          <div>
            <el-button class="table-cell" icon="el-icon-edit" @click="handleEdit(item)" />
            <el-button class="table-cell" icon="el-icon-guide" @click="handleEditCate(item)" />
            <el-button class="table-cell" icon="el-icon-delete" @click="handleDel(item)" />
          </div>
          <el-checkbox :label="item.id" @change="changeCheck">
            <span>{{ item.title }}</span>
          </el-checkbox>
        </div>
      </div>
    </el-checkbox-group>
    <Pagination v-show="total > 0" :total="total" :page="pageNum" :limit="pageSize" @pagination="changePagination" />
    <!--类别设置-->
    <el-dialog :title="$t('business.categoryset')" :visible.sync="setdialog" center>
      <el-button size="small" type="primary" @click="createcategory">{{ $t('library.categorysetting') }}</el-button>
      <el-table :data="tabledata" style="width: 100%">
        <el-table-column :label="$t('business.category')">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input v-model="scope.row.category" size="mini" />
            </span>
            <span v-else>{{ scope.row.category }}</span>
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
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.isSet" size="small" type="text" @click="Save(scope.row)">{{ $t('message.save') }}</el-button>
            <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Edit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Delete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--名称修改-->
    <el-dialog :title="$t('message.update')" :visible.sync="editdialog" center>
      <el-form ref="editform" :model="editform" :rules="rules">
        <el-form-item :label="$t('library.name')" :label-width="formLabelWidth" prop="title">
          <el-input v-model="editform.title" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savename">{{ $t('message.save') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--类别修改-->
    <el-dialog :title="$t('message.update')" :visible.sync="editcategorydialog" center>
      <el-form ref="editcateform" :model="editcateform">
        <el-form-item :label="$t('library.category')" :label-width="formLabelWidth" prop="categoryId">
          <el-select v-model="editcateform.categoryId" placeholder="请选择" style="margin-right: 20px">
            <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savecate">{{ $t('message.save') }}</el-button>
        <el-button @click="Canclecate">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--批量文件上传-->
    <el-dialog :title="$t('library.upload')" :visible.sync="uploaddialog" center @close="getMatlist">
      <el-upload
        ref="upload"
        class="upload-demo"
        :headers="{
          Authorization: cookies,
        }"
        action="/api/admin/uploadImgList"
        :on-preview="handPreview"
        :on-remove="handRemove"
        :on-success="handleSuccess"
        :file-list="fileList"
        :limit="10"
      >
        <el-button slot="trigger" size="small" type="primary">{{ $t('business.uploadfile') }}</el-button>
      </el-upload></el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination2'
// eslint-disable-next-line no-unused-vars
import { materialList, materialDelete, materialChange, materialRename } from '@/api/material'
// eslint-disable-next-line no-unused-vars
import { categoryList, categoryAdd, categoryDel, categoryEdit } from '@/api/article.js'
// eslint-disable-next-line no-unused-vars
import { transList } from '@/utils'
import Cookies from 'js-cookie'
export default {
  name: 'Material',
  components: { Pagination },
  data() {
    return {
      cookies: Cookies.get('Admin-Token'),
      filePath: process.env.VUE_APP_FILE_BASE_API,
      // 全选参数
      query: {
        category: ''
      },
      checked: false,
      setdialog: false,
      editdialog: false,
      editcategorydialog: false,
      uploaddialog: false,
      tabledata: [],
      librarylist: [],
      categoryList: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      editform: {
        id: '',
        title: ''
      },
      editcateform: {
        id: [],
        categoryId: ''
      },
      formLabelWidth: '130px',
      rules: {
        title: { required: true, message: 'title is required', trigger: 'blur' }
      },
      checkedList: [],
      fileList: [],
      loading: false
    }
  },
  created() {
    this.getlist()
    this.getcategoryList()
  },
  methods: {
    // 关闭获取list
    getMatlist() {
      this.uploaddialog = false
      this.getlist()
    },
    // 种类变化搜索
    changesearch() {
      this.getlist()
    },
    handleEditAllCate() {
      this.editcateform.id = this.checkedList
      this.editcategorydialog = true
    },
    changeCheck() {
      if (this.librarylist.length && this.checkedList.length === this.librarylist.length) {
        this.checked = true
      } else {
        this.checked = false
      }
    },
    async handleDelAll() {
      const res = await materialDelete(this.checkedList)
      this.$message.info(res.message)
      this.getlist()
    },
    changeall() {
      this.checkedList = []
      if (this.checked) {
        this.librarylist.forEach(item => {
          this.checkedList.push(item.id)
        })
      }
    },
    Canclecate() {
      this.editcateform.id = []
      this.editcateform.categoryId = ''
      this.editcategorydialog = false
    },
    Cancle() {
      this.editform = {}
      this.editdialog = false
    },
    handleEditCate(row) {
      this.editcateform.id.push(row.id)
      this.editcateform.categoryId = row.categoryId
      this.editcategorydialog = true
    },
    // 处理编辑
    handleEdit(row) {
      this.editform = row
      this.editdialog = true
    },
    // 修改名称
    async savename() {
      const data = {
        id: this.editform.id,
        name: this.editform.title
      }
      const res = await materialRename(data)
      this.$message.info(res)
      this.editdialog = false
      this.editform = {}
      this.getlist()
    },
    // 修改类别
    async savecate() {
      const res = await materialChange(this.editcateform)
      this.$message.info(res)
      this.editcategorydialog = false
      this.editcateform.id = []
      this.editcateform.categoryId = ''
      this.checkedList = []
      this.getlist()
    },
    // 获取种类列表
    async getcategoryList() {
      const type = 4
      const res = await categoryList(type)
      this.categoryList = transList(res.data)
      res.data.map((i) => {
        i.isSet = false
      })
      this.tabledata = res.data
    },
    changePagination(pagination) {
      this.pageNum = pagination.page
      this.pageSize = pagination.limit
      this.checkedList = []
      this.getlist()
    },
    async getlist() {
      const data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        categoryId: this.query.categoryId
      }
      this.loading = true
      this.librarylist = []
      const res = await materialList(data)
      this.loading = false
      this.total = res.data.total
      res.data.list.map((i) => {
        i.checked = false
      })
      this.librarylist = res.data.list
    },
    // 添加种类
    createcategory() {
      const data = {
        category: '',
        creator: '',
        isSet: true
      }
      this.tabledata.push(data)
      this.categoryadd = true
    },
    // 添加种类
    async Save(row) {
      const data = {
        id: row.id,
        category: row.category,
        creator: row.creator,
        type: 4,
        isSet: false
      }
      // eslint-disable-next-line eqeqeq
      if (this.categoryadd == true) {
        const res = await categoryAdd(data)
        this.$message.info(res.message)
        this.getcategoryList()
        this.categoryadd = false
      } else {
        const res = await categoryEdit(data)
        this.$message.info(res.message)
        this.getcategoryList()
        this.categoryedit = false
      }
    },
    // 编辑种类
    async Edit(row) {
      row.isSet = true
      this.categoryedit = true
    },
    // 删除种类
    async Delete(id) {
      this.$confirm(this.$t('business.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await categoryDel(id)
          this.getcategoryList()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 删除资源库文件
    async handleDel(row) {
      const list = []
      list.push(row.id)
      const res = await materialDelete(list)
      this.$message.info(res.message)
      this.getlist()
    },
    handPreview() {},
    handRemove() {},
    handleSuccess() {}
  }
}
</script>
<style scoped>
.librarycontainer {
  width: 100%;
}
.greycontainer {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 24px;
}
.left {
  float: left;
}
.right {
  float: right;
}
.listcontainer {
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: stretch;
  min-height: 225px;
}
.cardcontainer {
  width: 20%;
  height: 225px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.imgsrc {
  width: 190px;
  height: 160px;
  margin-bottom: 10px;
}
.table-cell {
  display: table-cell;
}
</style>
