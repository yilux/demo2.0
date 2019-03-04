import { BookModel} from '../../models/book.js'
import { random } from '../../utils/common.js'
const bookModels = new BookModel()
Page({
  data: {
    books:[],
    searching:false,
    more:''
    // 回调地狱
    // 一次调用满足需求 多次调用服务器api 链式调用 3个api api1 api2 api3
    // 回调地狱，内部再写一次请求，嵌套层次很多的时候
    //  asycFunc1(function(){
    //      asyncFunc2(function(){
    //        asynFunc3(function(){

    //        })
    //      })
    //    })
  },
  onLoad: function (options) {
    // 错误的写法
    // const hotList = bookModels.getHotList()
    // hotList.then((res)=>{
    //   console.log(res)
    //   bookModels.getMyBookCount().then((res)=>{
    //     console.log(res)
    //     // 第三次调用api
    //     // bookModels.getMyBookCount().then((res) => {
    //     //   console.log(res)
    //     // })
    //   })
    // },(error)=>{

    // })
    // 正确的写法
    bookModels.getHotList().then((res)=>{
      console.log(res)
      this.setData({
        books: res
      })
      return bookModels.getMyBookCount()
  
    })
    

    // Promise 对象可以保存状态，函数不可以保存
    // Promise第一步
    // 异步代码 写在 Promise函数中 第二步
    // then获取方法 第三步
    // const promise = new Promise((resolve,reject)=>{
    //   // pending fulfilled rejected
    //   // 进行中 已成功 已失败（状态）
    //   // new Promise 就已经处于进行中的状态，结果只有成功或者失败（修改状态后就已经凝固了，不能改变状态）
    //   wx.getSystemInfo({
    //     success:(res)=>{
    //       // 把进行中的状态修改成已成功
    //       resolve(res)
    //     },
    //     fail:(error)=>{
    //       // 把进行中的状态修改成已失败
    //       reject(error)
    //     }
    //   })
    // })
    // 成功和失败的回调函数，方法不可以调换
    // promise.then((res)=>{
    //   console.log(res)
    // },(error)=>{
    //   console.log(error)
    // })
  },
  onSearching(event){
    this.setData({
      searching:true
    })
  },
  onCancel(event){
    this.setData({
      searching: false
    })
  },
  // 下拉加载
  onReachBottom(){
    this.setData({
      more: random(16)
    })
  }
})