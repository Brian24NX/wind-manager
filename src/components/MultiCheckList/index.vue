<template>
  <div v-loading="loading" class="multi-check" :style="{ width: width }">
    <div v-for="item in newDataList" :key="item.id" class="multi-check-item">
      <el-checkbox v-model="item.buttonFlag" :indeterminate="item.isIndeterminate" :label="item.name" :value="item.id" @change="handlerChange(1, item, $event)">{{ item.name }}</el-checkbox>
      <div v-for="firstChild in item.children || []" :key="firstChild.id" class="multi-check-item" style="display: inline-block">
        <el-checkbox v-model="firstChild.buttonFlag" :indeterminate="firstChild.isIndeterminate" :label="firstChild.name" @change="handlerChange(2, firstChild, $event, item)">{{
          firstChild.name
        }}</el-checkbox>
        <div class="multi-check-item" style="display: inline-block">
          <el-checkbox
            v-for="secondChild in firstChild.children || []"
            :key="secondChild.id"
            v-model="secondChild.buttonFlag"
            :label="secondChild.name"
            @change="handlerChange(3, secondChild, $event, item, firstChild)"
          >{{ secondChild.name }}</el-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MultiCheckList',
  props: {
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
      loading: false,
      newDataList: [] // 为了不污染prop dataList
    }
  },
  methods: {
    dealDatas() {
      console.log(this.defaultCheckedKeys)
      this.loading = true
      // setTimeout(() => {
      const newList = JSON.parse(JSON.stringify(this.dataList))
      console.log(newList)
      newList.forEach(item => {
        item.children.forEach((child) => {
          child.children.forEach((secondChild) => {
            secondChild.buttonFlag = this.defaultCheckedKeys.includes(secondChild.id)
          })
          const length = child.children.filter(secondChild => secondChild.buttonFlag).length
          child.isIndeterminate = !!(length < child.children.length && length > 0)
          child.buttonFlag = length === child.children.length
          const length2 = item.children.filter(firstChild => firstChild.buttonFlag).length
          const length3 = item.children.filter(firstChild => firstChild.isIndeterminate).length
          console.log(length, length2, length3)
          item.buttonFlag = length2 === item.children.length
          item.isIndeterminate = !!(((length2 || length3) && (length2 < item.children.length && length3 <= item.children.length)))
        })
      })
      this.newDataList = newList
      this.loading = false
    },
    handlerChange($type, $row, $event, item, firstItem) {
      const buttonFlag = !$event.target ? $event : $event.target.checked
      if ($type === 1) {
        $row.children.forEach((item) => {
          this.$set(item, 'buttonFlag', !!buttonFlag)
          this.$set(item, 'isIndeterminate', false)
          item.children.forEach((child) => {
            this.$set(child, 'buttonFlag', !!buttonFlag)
          })
        })
        this.$set($row, 'isIndeterminate', false)
      } else if ($type === 2) {
        $row.children.forEach((item) => {
          this.$set(item, 'buttonFlag', !!buttonFlag)
        })
        this.$set($row, 'isIndeterminate', false)
        const checkCount = item.children.reduce((prev, cur) => {
          let check = 0
          if (cur.buttonFlag === undefined) {
            check = 0
          } else {
            check = +cur.buttonFlag
          }
          return prev + +check
        }, 0) // 统计选择的次数
        const checkCount1 = item.children.reduce((prev, cur) => {
          let check = 0
          if (!cur.isIndeterminate) {
            check = 0
          } else {
            check = +cur.isIndeterminate
          }
          return prev + +check
        }, 0) // 统计选择的次数
        console.log(checkCount, checkCount1)
        this.$set(item, 'isIndeterminate', !!(((checkCount || checkCount1) && (checkCount < item.children.length && checkCount1 < item.children.length))))
        this.$set(item, 'buttonFlag', checkCount && checkCount === item.children.length)
      } else if ($type === 3) {
        this.$set($row, 'buttonFlag', !!buttonFlag)
        // 二级按钮判断
        const checkCount2 = firstItem.children.reduce((prev, cur) => {
          let check = 0
          if (cur.buttonFlag === undefined) {
            check = 0
          } else {
            check = +cur.buttonFlag
          }
          return prev + +check
        }, 0) // 统计选择的次数
        if (checkCount2 === firstItem.children.length) {
          this.$set(firstItem, 'buttonFlag', true)
          this.$set(firstItem, 'isIndeterminate', false)
        } else {
          this.$set(firstItem, 'buttonFlag', false)
          this.$set(firstItem, 'isIndeterminate', !!checkCount2)
        }
        // 一级按钮判断
        const checkCount1 = item.children.reduce((prev, cur) => {
          let check = 0
          if (cur.buttonFlag === undefined) {
            check = 0
          } else {
            check = +cur.buttonFlag
          }
          return prev + +check
        }, 0) // 统计选择的次数
        const checkCount0 = item.children.reduce((prev, cur) => {
          let check = 0
          if (!cur.isIndeterminate) {
            check = 0
          } else {
            check = +cur.isIndeterminate
          }
          return prev + +check
        }, 0) // 统计选择的次数
        console.log(checkCount0, checkCount1)
        this.$set(item, 'isIndeterminate', !!(((checkCount1 || checkCount0) && (checkCount1 < item.children.length && checkCount0 <= item.children.length))))
        this.$set(item, 'buttonFlag', !!(checkCount1 && checkCount1 === item.children.length))
      }
    },
    getCheckedKeys() {
      const length = this.newDataList.filter(item => (item.buttonFlag || item.isIndeterminate)).length
      if (!length) {
        this.$message.error('请选择权限')
        return []
      }
      return this.newDataList
    }
  }
}
</script>
<style lang="scss" scoped>
.multi-check {
  position: relative;
  text-align: left;
	max-height: 550px;
	overflow-y: scroll;

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
