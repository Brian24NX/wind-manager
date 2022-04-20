<template>
  <div class="table-pagination-container">
    <!-- 数据列表 -->
    <el-table v-loading="isLoading" :data="data" current-row-key="aaa" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%" :show-header="showHeader" @selection-change="selectionChange">
      <el-table-column v-if="showCheck" type="selection" width="55" />
      <el-table-column v-if="getShowIndex" align="center" :label="$t('message.index')" width="80">
        <template scope="scope">
          <span>{{ pagination.page * pagination.size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <slot />
    </el-table>

    <!-- 分页信息 -->
    <div v-show="!isLoading" class="pagination-container">
      <el-pagination
        :current-page="pagination.page + 1"
        :page-sizes="pageSizes"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
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
      default: function() { }
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
        page: this.page || 1,
        size: this.pageSize || 10,
        total: null
      },
      pageSizes: [],
      data: undefined
    }
  },
  computed: {
    getShowIndex() {
      return this.showIndex
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

  methods: {
    /**
     * 分页请求
     */
    pageRequest() {
      this.isLoading = true
      request({
        url: this.uri,
        method: 'get',
        params: Object.assign(this.pagination, this.requestParams)
      }).then(response => {
        console.log(response)
        this.pagination.total = response.data.total
        this.data = response.data.list
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
      this.$route.query.page = currentPage
      this.pagination.page = currentPage
      this.pageRequest()
    },

    /**
     * 删除一行
     */
    removeItem() {
      this.pageRequest()
    }
  }
}
</script>
