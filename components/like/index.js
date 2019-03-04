Component({
  properties:{
    like:{
      type:Boolean,
      value:false
    },
    content:{
      type:Number
    }
  },
  data:{
    yseSrc:"image/like.png",
    noSrc:"image/nolike.png"
  },
  methods:{
    onLike:function(event){
      let like = this.properties.like
      let content = this.properties.content
      content = like?content-1:content+1
      this.setData({
        content:content,
        like:!like
      })
      let behavior = this.properties.like ?'like':'cancel'
      this.triggerEvent('like', {
        behavior: behavior
      }, {})
    }
    
  }
})