import { HTTP } from '../utils/http.js'
class LikeModels extends HTTP{
  getLike(behavior,artID,caregory){
    let url = behavior == 'like'?'/like':'/like/cancel'
    this.request({
      url:url,
      method:"POST",
      data:{
        art_id:artID,
        type:caregory
      }
    })
  }
  getClassicLikeStatus(artID,caregory,sCallback){
    this.request({
      url:'/classic/'+caregory+'/'+ artID +'/favor',
      success:sCallback
    })
  }
}
export {LikeModels}