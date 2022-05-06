<template>
  <div class="librarycontainer">
    <div slot="header" class="clearfix">
      <span>{{ $t('library.title') }}</span>
    </div>
    <div class="greycontainer">
      <div class="left">
        <el-checkbox>{{ $t('library.allselect') }}</el-checkbox>
        <el-button>{{ $t('library.category') }}</el-button>
        <el-button>{{ $t('library.delete') }}</el-button>
      </div>
      <div class="right">
        <el-select v-model="query.category" placeholder="请选择">
          <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button>{{ $t('library.upload') }}</el-button>
        <el-button type="danger" size="small" plain @click="setdialog=true">{{ $t('business.categoryset') }}</el-button>
      </div>
    </div>
    <div class="listcontainer">
      <div v-for="(item, index) in librarylist" :key="index" class="cardcontainer">
        <el-image :src="item.src" mode="aspectFit" class="imgsrc" />
        <el-button class="table-cell" icon="el-icon-edit" />
        <el-button class="table-cell" icon="el-icon-guide" />
        <el-button class="table-cell" icon="el-icon-delete" />
        <el-checkbox v-model="item.checked">{{ item.name }}</el-checkbox>
      </div>
    </div>
    <Pagination v-show="total > 0" :total="total" :page="pageNum" :limit="pageSize" @pagination="getlist" />
    <el-dialog :title="$t('business.categoryset')" :visible.sync="setdialog" center>
      <el-button size="small" type="primary" @click="createcategory">{{ $t('library.addcategory') }}</el-button>
      <el-table :data="tabledata" style="width: 80%">
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
  </div>
</template>

<script>
import Pagination from '@/components/Pagination2'
import { materialList } from '@/api/material'
// eslint-disable-next-line no-unused-vars
import { categoryList, categoryAdd, categoryDel, categoryEdit } from '@/api/article.js'
// eslint-disable-next-line no-unused-vars
import { transList } from '@/utils'
export default {
  name: 'Material',
  components: { Pagination },
  data() {
    return {
      // 全选参数
      query: {
        category: ''
      },
      setdialog: false,
      tabledata: [],
      librarylist: [
      ],
      total: 0,
      pageNum: 1,
      pageSize: 10
    }
  },
  created() {
    this.getlist()
    this.getcategoryList()
  },
  methods: {
    // 获取种类列表
    async getcategoryList() {
      const type = 4
      const res = await categoryList(type)
      this.categoryList = transList(res.data)
      res.data.map(i => {
        i.isSet = false
      })
      this.tabledata = res.data
    },
    async getlist() {
      const data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      const res = await materialList(data)
      this.total = res.data.total
      this.librarylist = res.data
      console.log(res.data)
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
    }
  }
}
</script>
<style scoped>
.librarycontainer{
  width :100%;
}
.greycontainer{
   background-color:#f0f0f0;
   margin:15px;
   height: 50px;
   line-height: 50px;
}
.left{
  float:left;
}
.right{
   float:right;
}
.listcontainer{
   display:flex;
   flex-direction:row;
   flex-wrap:wrap;
   justify-content:flex-start;
}
.cardcontainer{
   width:200px;
   height:225px;
}
.cardcontainer:not(:first-child){
    margin-left:25px;
}
.imgsrc{
  width:190px;
  height:160px;
}
.table-cell{
  display:table-cell;
}
</style>
