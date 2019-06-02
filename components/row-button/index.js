// components/row-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    video:{
      type:Boolean,
      value:false,
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
      value:"一级名字",
    },
    sub_name:{
      type:String,
      value:'副标题名字',
    },
    leftImage:{
      type:String,
      value:'',
    }
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
    
  }
})
