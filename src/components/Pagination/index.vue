<template>
  <div class="table-pagination-container">

    <!-- 数据列表 -->
    <el-table :data="data" @selection-change="selectionChange" v-loading="isLoading" current-row-key="aaa" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%" :show-header="showHeader">
      <el-table-column type="selection" width="55" v-if="showCheck">
      </el-table-column>
      <el-table-column v-if="getShowIndex" align="center" :label="$t('message.index')" width="80" >
        <template scope="scope">
          <span>{{pagination.page * pagination.size + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>

    <!-- 分页信息 -->
    <div v-show="!isLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.page + 1"
        :page-sizes="pageSizes" :page-size="pagination.size" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
      </el-pagination>
    </div>
  </div>  
</template>

<script>
import http from '@/utils/http'
import merge from 'merge'
import { Message } from 'element-ui'

export default {
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    // 数据请求地址
    uri: {
      type: String,
      required: true
    },
    // 请求参数
    requestParams: {
      type: Object,
      required: false
    },
    // 每页记录数
    pageSize: {
      type: Number,
      required: false
    },
    // 页码
    page: {
      type: Number,
      required: false
    },
    selectionChange: {
      type: Function,
      default: function () { }
    },
    showCheck: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: true,
      // 分页参数
      pagination: {
        page: this.page || 0,
        size: this.pageSize || 10,
        total: null
      },
      pageSizes: [],
      data: undefined
    }
  },
  created() {
    if (this.$route.query.page) {
      this.pagination.page = this.$route.query.page
    }
    this.pageRequest()
    this.pageSizes = [
      this.pagination.size,
      this.pagination.size * 5,
      this.pagination.size * 10,
      this.pagination.size * 30,
      this.pagination.size * 50
    ]
  },
  computed: {
    getShowIndex() {
      return this.showIndex
    }
  },

  methods: {
    /**
     * 分页请求
     */
    pageRequest() {
      this.isLoading = true
      http.get(this.uri, merge({ '_search': 'ok' }, this.pagination, this.requestParams)).then(response => {
        this.pagination.total = response.data.total_elements
        this.data = response.data.content
        this.isLoading = false
      }).catch(error => {
        Message({
          message: error.message,
          type: 'error'
        })
      }).finally(() => {
        this.isLoading = false
      })
    },

    /**
     * 切换页面
     */
    handleSizeChange(size) {
      this.pagination.size = size
      this.pageRequest()
    },

    /**
     * 当前页码
     */
    handleCurrentChange(currentPage) {
      console.info('页码' + currentPage)
      // this.$router.push({ path: this.$route.path, query: { page: currentPage - 1 }})
      this.$route.query.page = currentPage - 1
      this.pagination.page = currentPage - 1
      this.pageRequest()
    },

    /**
     * 删除一行
     */
    removeItem() {
      this.isLoading = true
      http.get(this.uri, merge({ '_search': 'ok' }, this.pagination, this.requestParams)).then(response => {
        this.pagination.total = response.data.total_elements
        this.data = response.data.content
        this.isLoading = false
      }).catch(error => {
        Message({
          message: error.message,
          type: 'error'
        })
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>
