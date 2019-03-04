import { classicBeh } from '../class-beh.js'
// 定义变量，调用音乐来完成音乐的播放
const mMgr = wx.getBackgroundAudioManager()
Component({
  behaviors: [classicBeh],
  properties: {
    src:String
  },
  data: {
    playing:false,
    pauseSrc:"images/pause.png",
    playSrc:"images/play.png",
  },
  detached(event){
    mMgr.stop()
  },
  methods:{
    onPlay(event){
      if(!this.data.playing){
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
      }else{
        this.setData({
          playing: false
        })
        mMgr.pause()
      }   
    }
  }
})