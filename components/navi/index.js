Component({
  properties:{
    title:String,
    first:Boolean,
    last:Boolean
  },
  data:{
    noleft: "image/triangle.dis@left.png",
    yesleft:"image/triangle@left.png",
    noright: "image/triangle.dis@right.png",
    yesright:"image/triangle@right.png"
   
  },
  methods:{
    onLeft:function(event){
      if(!this.properties.last){
        // 自定义事件
        this.triggerEvent('left', {}, {})
      }
    },
    onRight:function(event){
      if(!this.properties.first){
        this.triggerEvent('right', {}, {})
      }
    }
  }
})