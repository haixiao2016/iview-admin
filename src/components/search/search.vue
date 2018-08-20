<template>
  <div style="background:#eee;padding: 10px"  v-if="Picker.length||Input.length||Select.length">
    <div class="select-container" v-if="Picker.length">
      <Date-picker :editable="false" :placeholder="item.placeholder||'请选择时间段'" v-model="item.pickerValue" clearable :style="{'width':item.width?parseInt(item.width)+'px':'280px'}" v-for="(item,index) in Picker" :key="index" type="datetimerange" format="yyyy-MM-dd HH:mm:ss"></Date-picker>
    </div>
    <div class="select-container" v-if="Input.length">
      <Input :placeholder="item.placeholder||'请输入...'" v-model="item.inputValue" clearable :style="{'width':item.width?parseInt(item.width)+'px':'200px'}" v-for="(item,index) in Input" :key="index" />
    </div>
    <div class="select-container" v-if="Select.length">
      <Select :placeholder="item.placeholder||'请选择'" v-model="item.selectValue" clearable :style="{'width':item.width?parseInt(item.width)+'px':'200px'}" v-for="(item,index) in Select" :key="index">
        <Option v-for="(items,index) in item.selectData" :key="index" :value="items.value">{{items.label}}</Option>
      </Select>
    </div>
    <div class="btn-control">
      <Button type="primary" shape="circle" icon="ios-refresh" @click="reset">重置</Button>
      <Button type="primary" shape="circle" icon="ios-search" @click="search">搜索</Button>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
/**
 * 通用参数
 * @param {Number/String} width 外层容器的宽度，默认值为 200/280(时间选择器)
 * @param {String} placeholder 同 html placeholder 有默认值
 * @param {Array} Picker `pickerKey`:返回对象的key,`pickerValue`返回对象的value
 * @param {Array} Input `inputKey`:返回对象的key,`inputValue`返回对象的value
 * @param {Array} Select `selectKey`:返回对象的key,`selectValue`返回对象的value
 * @returns {Fun} search 搜素监听函数 返回一个包裹以上参数的obj
 * @returns {Fun} reset 重置完成监听函数 无返回参数，用作其他处理逻辑
 * 如有其他需要，请自行扩展！
*/
export default {
  props: {
    Picker: {
      type: Array,
      default: function () {
        return []
      }
    },
    Input: {
      type: Array,
      default: function () {
        return []
      }
    },
    Select: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    search () {
      let res = {}
      this.Picker.length && this.Picker.map(item => {
        if (!item.pickerValue[0].getTime) return
        res = {...res,
          ...{
            [item.pickerKey]: [item.pickerValue[0].getTime(), item.pickerValue[1].getTime()]
          }}
      })
      this.Input.length && this.Input.map(item => {
        if (!item.inputValue) return
        res = {...res,
          ...{
            [item.inputKey]: item.inputValue
          }
        }
      })
      this.Select.length && this.Select.map(item => {
        if (!item.selectValue) return
        res = {...res,
          ...{
            [item.selectKey]: item.selectValue
          }
        }
      })
      this.$emit('search', res)
    },
    reset () {
      this.Picker.length && this.Picker.map(item => {
        item.pickerValue = undefined
      })
      this.Input.length && this.Input.map(item => {
        item.inputValue = undefined
      })
      this.Select.length && this.Select.map(item => {
        item.selectValue = undefined
      })
      this.$emit('reset')
    }
  }
}
</script>

<style lang='less' scoped>
  .select-container{
    display: inline-block;
    >div{
      margin-right: 4px;
      margin-bottom: 4px;
    }
  }
  .btn-control{
    text-align: right;
    margin-top: 10px;
    button{
      margin-left:8px;
    }
  }
</style>
