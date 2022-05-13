<template>
  <div class="multi-check" :style="{ width: width }">
    <div v-if="isCheckAll" class="multi-check-item">
      <el-checkbox v-model="checkAll" label="全选" :indeterminate="isIndeterminate" @change="handlerChange(0, null, $event)">全选 {{ totalLabel }}</el-checkbox>
      <el-checkbox v-model="checkInvert" label="反选" @change="handlerChange(-1, null, $event)">反选</el-checkbox>
    </div>
    <div v-for="item in newDataList" :key="item.code" class="multi-check-item">
      <el-checkbox v-model="item.isChecked" :indeterminate="item.isIndeterminate" :label="item.code" :value="item.value" @change="handlerChange(1, item, $event)">{{ item.label }}</el-checkbox>
      <div class="multi-check-item" style="display: inline-block">
        <el-checkbox v-for="child in item.children || []" :key="child.code" v-model="child.isChecked" :label="child.value" @change="handlerChange(2, item, $event)">{{ child.label }}</el-checkbox>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MultiCheckList',
  props: {
    isCheckAll: {
      // 是否显示全选
      type: Boolean,
      default: false
    },
    invert: {
      // 是否显示反选(2021-07-06更新)
      type: Boolean,
      default: false
    },
    dataList: {
      // 数据集合
      type: Array,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    },
    defaultCheckedKeys: {
      // 默认选中项
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkAll: false,
      checkInvert: false, // 反选(2021-07-06更新)
      isIndeterminate: false,
      totalLabel: '',
      newDataList: [] // 为了不污染prop dataList
    }
  },
  computed: {
    getDataList() {
      const parentList = []
      const childList = []
      this.newDataList.forEach((item) => {
        if (item.isChecked) parentList.push(item.value)
        ;(item.children || []).forEach((child) => {
          if (child.isChecked) {
            childList.push(child.value)
          }
        })
      })
      return [parentList, childList]
    }
  },
  watch: {
    newDataList: {
      handler() {
        const isChangeSum = this.newDataList.reduce((prev, cur) => {
          return prev + +(cur.isChange || 0)
        }, 0)
        const isCheckSum = this.newDataList.reduce((prev, cur) => {
          return prev + +(cur.isChecked || 0)
        }, 0)
        this.checkAll = isCheckSum && isCheckSum === this.newDataList.length
        this.isIndeterminate = !!isChangeSum
        if (isCheckSum && isCheckSum === this.newDataList.length) {
          this.isIndeterminate = false
        }
        this.totalLabel = isChangeSum === 0 ? '' : `已选择(${isChangeSum})个分类`
      },
      immediate: true,
      deep: true
    },
    dataList: {
      handler: function(val) {
        // 这里只做简单的拷贝，深拷贝需要自己实现,这里只是为了演示
        this.newDataList = JSON.parse(JSON.stringify(val))
        this.initCheckedKeys()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    initCheckedKeys() {
      // 初始化默认选中项
      (this.newDataList || []).forEach((item) => {
        if (!item.children || !Array.isArray(item.children)) item.children = []
        item.children.forEach((child) => {
          if (this.defaultCheckedKeys.includes(child.value)) {
            this.$set(child, 'isChecked', true)
          }
        })
        if (item.children.length) {
          const every = item.children.every((it) => it.isChecked) // 子集全部选中
          const some = item.children.some((it) => it.isChecked) // 子集没有全部选中
          this.$set(item, 'isChecked', every)
          this.$set(item, 'isIndeterminate', some && !every)
          this.$set(item, 'isChange', some)
        }
      })
    },
    handlerCheckAll(isChecked) {
      this.newDataList.forEach((item) => {
        this.$set(item, 'isChecked', isChecked)
        this.$set(item, 'isChange', isChecked)
        if (isChecked) this.$set(item, 'isIndeterminate', false)
        item.children.forEach((child) => {
          this.$set(child, 'isChecked', isChecked)
        })
      })
    },
    handlerInvertCheck() {
      // 反选(2021-07-06更新)
      this.newDataList.forEach((item) => {
        this.$set(item, 'isChange', !item.isChecked)
        this.$set(item, 'isChecked', !item.isChecked)
        item.children.forEach((child) => {
          this.$set(child, 'isChecked', !child.isChecked)
          if (child.isChecked) this.$set(item, 'isChange', true)
        })
      })
    },
    handlerChange($type, $row, $event) {
      const isChecked = !$event.target ? $event : $event.target.checked
      if ($type === 0) {
        // 全选
        this.handlerCheckAll(isChecked)
        this.$emit('change', this.getDataList[0], this.getDataList[1])
        return
      }
      if ($type === 1) {
        $row.children.forEach((item) => {
          this.$set(item, 'isChecked', isChecked)
        })
      }
      if ($type === -1) {
        // 反选(2021-07-06更新)
        this.handlerInvertCheck()
        this.$emit('change', this.getDataList[0], this.getDataList[1])
        return
      }
      const checkCount = $row.children.reduce((prev, cur) => {
        let check = 0
        if (cur.isChecked === undefined) {
          check = 0
        } else {
          check = +cur.isChecked
        }
        return prev + +check
      }, 0) // 统计选择的次数
      this.$set($row, 'isChange', checkCount !== 0)
      this.$set($row, 'isChecked', !!(checkCount && checkCount === $row.children.length))
      this.$set($row, 'isIndeterminate', !!(checkCount && checkCount < $row.children.length))

      this.$emit('change', this.getDataList[0], this.getDataList[1])
    }
  }
}
</script>
<style lang="scss" scoped>
.multi-check {
  position: relative;
  text-align: left;

  .multi-check-item {
    width: 100%;
    background-color: #f9fafb;
    padding: 10px 0;
    padding-left: 25px;
    margin-bottom: 10px;
    border-radius: 6px;
  }
}
</style>
