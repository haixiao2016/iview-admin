<template>
  <div>
    <Search :Input = "Input" :Select = "Select" :Picker="Picker" @search="search" @reset = "reset"></search>
  </div>
</template>

<script>
import Search from '_c/search'
export default {
  name: 'testIndex',
  components: {
    Search
  },
  data () {
    return {
      Picker: [{
        pickerKey: 'tiems',
        pickerValue: ''
      }],
      Input: [{
        inputKey: 'name',
        inputValue: '',
        placeholder: '请输入名字'
      }],
      Select: [{
        selectData: [{
          value: 'New York',
          label: 'New York'
        }],
        selectKey: 'city',
        selectValue: '',
        placeholder: '请选择城市'
      }]
    }
  },
  mounted () {
    console.log(`测试montend`)
  },
  activated () {
    console.log(`测试activated`)
  },
  methods: {
    search (res) {
      console.log(res)
    },
    reset () {
      console.log('重置完毕')
    }
  }
}
</script>
