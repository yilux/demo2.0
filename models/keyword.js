import { HTTP } from "../utils/http-p.js"
class KeywordModel extends HTTP{
  // 获取到历史搜索的关键字，利用缓存的原理，
  key = 'q'
  maxLength = 10
  getHistory(){
    const words = wx.getStorageSync(this.key)
    if(!words){
      return []
    }
    return words
  }
  // 获取到热门搜索的关键字
  getHot(){
    return this.request({
      url:'/book/hot_keyword'
    })
  }
  // 读取出来到页面上使用
  addToHistory(keyword){
    // 定义变量获取到历史搜索
    // words是一组
    // 获取历史搜索关键字的数组
    let words = this.getHistory()
    // keyword是新添加的才添加到缓存中
    // includes() 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。
    const has = words.includes(keyword)
    // 如果关键字不存在，返回新的关键字
    if(!has){
      // 数组末尾元素删除，再把keyword数组添加到第一位
      const length = words.length
      if(length >= this.maxLength){
        // pop() 方法用于删除并返回数组的最后一个元素。
        words.pop()
      }
      // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度
      words.unshift(keyword)
      // 写入缓存
      wx.setStorageSync(this.key, words)
    }   
  }
}
export {KeywordModel}