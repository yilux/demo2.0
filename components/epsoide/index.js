// compontents/epsoide/index.js
  Component({
    properties:{
      index:{
        type:String,
        observer:function (newVal, oldVal, changedPath) {
          let val = newVal < 10?'0'+newVal:newVal
          this.setData({
            _index:val
          })
        }
      }
    },
    data:{
      year:Number,
      month:String,
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月','十二月'],
      _index:''
    },
    attached:function(){
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth()
      this.setData({
        year,
        month:this.data.months[month]
      })
    }
  })