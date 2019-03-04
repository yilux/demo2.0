
Component({
  // 启用插槽
  options:{
    multipleSlots:true
  },
  // 外部样式
  externalClasses:['tag-class'],
  properties:{
    text:String,
  },
  // methods:{
  //   onTap(event){
  //     // 自定义事件
  //     this.triggerEvent('tapping',{
  //       text:this.properties.text
  //     })
  //   }
  // },

  methods: {
    onTap(event) {
      this.triggerEvent('tapping', {
        text: this.properties.text
      })
    }
  }
})