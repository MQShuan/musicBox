// components/row-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mv:{
      type:Number,
      value:'',
    },
    index:{
      type:Number,
      value:'',
    },
    modalFunc:{
      type:Function,
      value:null,
    },
    name:{
      type:String,
      value:'',
    },
    subName:{
      type:String,
      value:'',
    },
    leftImage:{
      type:String,
      value:'',
    },
    dataId:{
      type:Number,
      value:'',
    },
    rowType:{
      type:String,
      value:'',
    },
    moreTap:{
      type:Function,
      value:null,
    },
    coverImageUrl:{
      type:String,
      value:'',
    },
    tracks:{
      type:Array,
      value:'',
    }
  },
  lifetimes:{
    
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    detailPage:function(e){
      if(this.data.rowType==='song'){
        wx.navigateTo({
          url: '../../pages/audioPlayer/audioPlayer?id=' + this.data.dataId +'&index=' + this.data.index,
        })
      }else{
        wx.navigateTo({
          url: '../../pages/playListPage/playListPage?id=' + this.data.dataId,
        })
      }
      if(this.data.tracks){
        let songList = this.data.tracks;
        wx.setStorageSync('songList', songList)
      }
    },
    moreTap:function(){
      let rowState = {}
      rowState.id = this.data.dataId;
      rowState.modalvisible = true;
      this.triggerEvent('modalevent', {rowState});
    },
    mvPage:function(){
      wx.navigateTo({
        url: '../../pages/videoPlayer/videoPlayer?vid=' + this.data.mv,
      })
    }
  }
})
