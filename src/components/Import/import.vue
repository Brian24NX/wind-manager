<template>
  <div class="import-container">
    <el-dialog :title="$t('import.import')" :visible.sync="importdialog" center destroy-on-close :close-on-click-modal="false" width="410px">
      <el-upload
        ref="upload"
        class="upload-demo"
        drag
        :action="importUrl"
        :limit="1"
        :auto-upload="false"
        :on-success="handleSuccess"
        :headers="uploadHeaders"
        accept=".xlsx, .xls"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">{{ $t('import.tip1') }}<em>{{ $t('import.tip2') }}</em></div>
        <div slot="tip" class="el-upload__tip">{{ $t('import.tip3') }}<span class="downloads" @click="downloadfile">{{ $t('import.tip4') }}</span></div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="loading" @click="submitimport">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="importdialog = false">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('import.importRes')" :visible.sync="importResultDialog" center destroy-on-close :close-on-click-modal="false" width="1200px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" label="No." width="80px">
          <template scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column v-for="(item, index) in tableColum" :key="index" :prop="item.prop" :label="item.label" :width="item.label" />
        <el-table-column prop="error" label="ERR_MSG" fixed="right" width="300">
          <template slot-scope="scope">
            <div v-if="scope.row.error">
              <div v-for="(item, index) in (scope.row.error.substring(0, scope.row.error.length - 2).split(';'))" :key="index">{{ item }};</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'Import',
  props: {
    downloadUrl: {
      type: String,
      default: ''
    },
    importUrl: {
      type: String,
      default: ''
    },
    tableColum: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      uploadHeaders: { Authorization: getToken() },
      importdialog: false,
      importResultDialog: false,
      loading: false,
      tableData: []
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  methods: {
    // 下载文件
    downloadfile() {
      window.open(process.env.VUE_APP_FILE_BASE_API + this.downloadUrl)
    },
    importFile() {
      this.importdialog = true
      setTimeout(() => {
        this.$refs.upload.clearFiles()
      }, 200)
    },
    // 提交导入
    submitimport() {
      this.$refs.upload.submit()
    },
    // 处理完成
    handleSuccess(res) {
      this.importdialog = false
      this.$refs.upload.clearFiles()
      if (res.code !== '200') {
        if (res.code !== '501') {
          this.$message.error(res.message)
        } else {
          this.importResultDialog = true
          this.tableData = res.data
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
