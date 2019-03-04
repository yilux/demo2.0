import { BookModel } from '../../models/book.js'
import { LikeModels } from '../../models/like.js'
const bookModels = new BookModel()
const likeModels = new LikeModels()
Page({
  data: {
    comments:[],
    book:null,
    likeStatus:false,
    likeCount:0,
    posting:false
  },
  onLoad: function (options) {
    wx.showLoading()
    // 通过页面传递参数
    const bid = options.bid
    // console.log(bid)
    const detail = bookModels.getDetail(bid)
    const likeStatus = bookModels.getLikeStatus(bid)
    const comments = bookModels.getComments(bid)
    Promise.all([detail,comments,likeStatus]).then((res)=>{
      console.log(res)
      this.setData({
        book:res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount:res[2].fav_nums
      })
      wx.hideLoading();
    })
    // detail.then((res)=>{
    //   console.log(res)
    //   this.setData({
    //     book:res
    //   })
    //   wx.hideLoading()
    // })
    // comments.then((res)=>{
    //   // comments下的数据才是短评
    //   this.setData({
    //     comments: res.comments
    //   })
    // })
    // likeStatus.then((res) => {
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
  },
  onLike(event) {
    // console.log(event)
    const like_or_cancel = event.detail.behavior;
    likeModels.getLike(like_or_cancel, this.data.book.id, 400)
  },
  onFakePost(event){
    this.setData({
      posting:true
    })
  },
  // 取消
  onCancel(event){
    this.setData({
      posting: false
    })
  },
  onPost(event){
    // 定义comment获取用户的输入
    const comment = event.detail.text || event.detail.value
    // const commentInput = event.detail.value
    console.log('comment:'+comment)
    if (!comment){
      return
    }
    // 短评字段长度大于12，做了一个判断
    if(comment.length > 12){
      wx.showToast({
        title: "短评最多12个字",
        icon:'none'
      })
      return
    }
    bookModels.postComment(this.data.book.id, comment).then(res => {
      wx.showToast({
        title:"+ 1",
        icon:"none"
      })
      // unshift添加新的元素
      // 合并新的短评
      this.data.comments.unshift({
        content:comment,
        nums:1
      })
      this.setData({
        comments:this.data.comments,
        posting:false
      })
    })
  },
})