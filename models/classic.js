import {HTTP} from '../utils/http.js'
class ClassMouldes extends HTTP{
  getLatest(sCallback){
    this.request({
      url:'/classic/latest',
      success:(res)=>{
        sCallback(res)
        // 缓存
        this._setIndexLast(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }
  // 组件的复用
  getClassic(index, nextorprevious, sCallback){
    // 缓存中寻找 or API 写入到缓存中
    // key 确定key
    // 提高用户体验，提高了性能，（为了减少频繁的向服务器加载程序）
    let key = nextorprevious == 'next' ? this._getKey(index + 1) : this._getKey(index -1)
    let classic = wx.getStorageSync(key)
    if(!classic){
      this.request({
        // es6模板字符串的应用
        url: `/classic/${index}/${nextorprevious}`,
        // url: '/classic/' + index + '/' + nextorprevious,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    }else{
      sCallback(classic)
    }
    
  }
  isFirst(index){
    return index == 1?true:false
  }
  isLast(index){
    let indexLast = this._getIndexLast()
    return indexLast == index?true : false
  }
  // 存入index
  _setIndexLast(index){
    wx.setStorageSync('last', index)
  }
  // 读取index
  _getIndexLast() {
    let index = wx.getStorageSync('last')
    return index
  }
  _getKey(index){
    let key = 'classic-'+ index
    return key
  }
}
export {ClassMouldes}