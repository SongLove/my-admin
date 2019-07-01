// bus
import Vue from 'Vue'

const bus = new Vue({
  data() {
    return {
      // 定义数据
      form: {
        artic_title: "",
        artic_type: "文艺",
        type_label: [],
        abstract: "",
        artic_content: "",
        _id: ''
      },
      // 编辑类型 add 添加，edit 编辑
      menu_type: 'add'
    }
  },
  created() {
    // 绑定监听
    this.$on('openMenu', (val) => {
      console.log('openMenu', { ...val })
      // this.form = Object.assign({}, val)
      this.form.abstract = val.abstract
      this.form.artic_title = val.artic_title
      this.form.type_label = val.type_label
      this.form.artic_type = val.artic_type
      this.form.artic_content = val.artic_content
      this.form._id = val._id
    })
    // 更新编辑类型
    this.$on('upMenuType', (val) => {
      console.log('upMenuType', val)
      this.menu_type = val
    })
  },
  beforeDestroy() {
    this.bus.$off("openMenu");
    this.bus.$off('upMenuType')
  }
})

export default bus