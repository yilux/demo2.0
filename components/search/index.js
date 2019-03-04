import {KeywordModel} from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'
import { paginationBev } from '../behaviors/pagination.js'
const keywordModel = new KeywordModel()
const bookModels = new BookModel()
Component({
  // 组件使用行为
  behaviors: [paginationBev],
  properties:{
    // 组件外（pages-book）向组件内(components-search)进行通知
    more:{
      type:String,
      observer:'loadMore'
    }
  },
  data: {
    historyWords:[],
    hotWords:[],
    // dataArray:[],
    searching:false,
    // 定义q为字符串
    q:'',
    // 是否发送请求
    loading:false,
    loadingCenter:false
  },
  attached(){
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    keywordModel.getHot().then((res) => {
      console.log(res)
      this.setData({
        hotWords:res.hot
      })
    })
  },
  methods:{
    loadMore(){
      if(!this.data.q){
        return
      }
      if(this.isLocked()){
        return
      }
      // 同时发送了两个请求
      // 一次只发送一次请求
      if(this.hasMore()){
        // 锁住请求
        this.locked() // this.data.loading = true
        bookModels.search(this.getCurrentStat(), this.data.q) 
        // this.getCurrentStat() = length，->this.getCurrentStat()被封装在paginationBev里
          .then(res => {
          // const tempArray = this.data.dataArray.concat(res.books)
          this.setMoreData(res.books)
          // 解开请求
            this.unLocked() // this.data.loading = false
        },()=>{ //第二个参数表示失败
            this.unLocked()
        })
      }
    },
    onCancel(event){
      this.triggerEvent('cancel', {}, {}) // 自定义事件，抛给pages里的页面
      this.initialize()
    },
    onConfirm(event){
      this._shoResult()
      this._showLoadingCenter()
      // this.initialize()  // 重新搜索的时候清空数据
      // value文本输入的事件，text是标签获取到的事件
      const q = event.detail.value || event.detail.text
      this.setData({
        // dataArray:res.books,
        // 更新给input里的值
        q
      })
      bookModels.search(0,q).then(res=>{
        this.setMoreData(res.books)
        this.setTotal(res.total)     
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },
    // 把函数进行封装(_showLoadingCenter私有的方法)
    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },
    _hideLoadingCenter(){
      this.setData({
        loadingCenter: false
      })
    },
    onDelete(event){
      this.initialize()
      this._closeResult()
    },
    _shoResult(){
      this.setData({
        searching: true
      })
    },

    // 小巧函数的封装
    _closeResult(){
      this.setData({
        searching: false,
        q:''
      })
    },
    // onReachBottom() {
      
    // }
  },
  // scroll-view |Page onReachBottom 监听(上滑加载)
})