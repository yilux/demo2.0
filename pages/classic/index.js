import {ClassMouldes} from '../../models/classic.js'
import { LikeModels } from '../../models/like.js'
const classMouldes = new ClassMouldes()
const likeModels = new LikeModels()
Page({
  data: {
    classic:null,
    first:false,
    last:true,
    likeStaus:false,
    likeCount:0
  },
  onLoad: function (options) {
    classMouldes.getLatest((res)=>{
      console.log(res)
      this.setData({
        classicData:res,
        likeCount:res.fav_nums,
        likeStaus:res.like_status
      })
    })
  },
  onLike(event){
    // console.log(event)
    const behavior = event.detail.behavior;
    likeModels.getLike(behavior, this.data.classicData.id, this.data.classicData.type)
  },
  // 上一期
  onNext(){
    this._updateClassic('next')
  },
  // 下一期
  onPrevious (event){
    this._updateClassic('previous')
  },
  // 组件的复用(传入参数nextorprevious)
  _updateClassic: function (nextorprevious){
    // console.log(event)
    const index = this.data.classicData.index
    classMouldes.getClassic(index,nextorprevious,(res) => {
      // console.log(res)
      this._getClassicLikeStatus(res.id,res.type)
      this.setData({
        classicData: res,
        last: classMouldes.isLast(res.index),
        first: classMouldes.isFirst(res.index)
      })
    })
  },
  _getClassicLikeStatus: function (artID, caregory){
    likeModels.getClassicLikeStatus(artID,caregory,(res)=>{
      this.setData({
        likeStaus: res.like_status,
        likeCount: res.fav_nums
      })
    })
  }
})