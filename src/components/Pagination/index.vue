<template>
  <div class="table-pagination-container">
    <!-- 数据列表 -->
    <el-table
      v-loading="isLoading"
      :data="data"
      current-row-key="aaa"
      element-loading-text="loading"
      fit
      highlight-current-row
      class="tables"
      :show-header="showHeader"
      :header-cell-style="{ backgroundColor: '#FBFCFF' }"
      @selection-change="selectionChange"
    >
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
        background
        :current-page="pagination.page"
        :page-sizes="pageSizes"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'

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
      required: false,
      default: () => ({})
    },
    // 每页记录数
    pageSize: {
      type: Number,
      required: false,
      default: 10
    },
    // 页码
    page: {
      type: Number,
      required: false,
      default: 1
    },
    selectionChange: {
      type: Function,
      default: function() {}
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
        pageNum: this.page,
        pageSize: this.pageSize
      },
      total: 0,
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
      this.pagination.pageNum = this.$route.query.page
    }
    this.pageRequest()
    this.pageSizes = [this.pagination.pageSize, this.pagination.pageSize * 2, this.pagination.pageSize * 5, this.pagination.pageSize * 10]
  },

  methods: {
    refreshRequest() {
      this.pagination.pageNum = 1
      this.pageRequest()
    },
    /**
     * 分页请求
     */
    pageRequest() {
      this.isLoading = true
      request({
        url: this.uri,
        method: 'get',
        params: Object.assign(this.pagination, this.requestParams)
      })
        .then((response) => {
          console.log(response)
          this.total = response.data.total
          this.data = response.data.list
          this.isLoading = false
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    /**
     * 切换页面
     */
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.pageRequest()
    },

    /**
     * 当前页码
     */
    handleCurrentChange(currentPage) {
      this.$route.query.page = currentPage
      this.pagination.pageNum = currentPage
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
<style lang="scss">
.tables {
  width: 100%;
  border: 1px solid #ebebeb;
  border-bottom: none;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;

  .el-pagination.is-background .el-pager li {
    background-color: transparent;
  }

  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #fff8f8;
    color: #e10202;
  }

  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #e10202;
  }
}
</style>
