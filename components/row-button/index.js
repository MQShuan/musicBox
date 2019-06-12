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
    isSearch:{
      type:Boolean,
      value:false,
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
          url: '../../pages/audioPlayer/audioPlayer?id=' + this.data.dataId+'&songName='+this.data.name+'&authorName='+this.data.subName,
        })
      }else{
        wx.navigateTo({
          url: '../../pages/playListPage/playListPage?id=' + this.data.dataId,
        })
      }
    },
    moreTap:function(){
      let rowState = {}
      rowState.id = this.data.dataId;
      rowState.modalvisible = true;
      this.triggerEvent('modalevent', {rowState});
    }
  }
})
