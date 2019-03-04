import { config } from '../config.js'
const tips = {
  1: "抱歉，出现了一个错误",
  1005: "appky已经失效，请重新在七月官网申请",
  3000: "该期内容不存在"
}
class HTTP{
  request(params){
    if(!params.method){
      params.method='GET'
    }
    wx.request({
      url: config.api_base_url+params.url,
      method:params.method,
      data:params.data,
      header:{
        'Content-Type':'application/json',
        'appkey':config.appkey
      },
      success:(res)=>{
        // startsWith
        // endsWith
        // toString()转换为字符串
        let code = res.statusCode.toString();
        if(code.startsWith('2')){
          params.success && params.success(res.data)
        }else{
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:(error)=>{
        this._show_error(1)
      }
    })
  }
  _show_error(error_code){
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tips ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}
export { HTTP}