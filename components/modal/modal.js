// components/modal/modal.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    modalType:{
      type:String,
      value: 'bottom'
    },
    footer:{
      type:Boolean,
      value: false,
    },
    showModal:{
      type:Boolean,
      value:false,
    },
    height:{
      type:String,
      value:'50%',
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
    tapMask:function(e){
      this.setData({
        showModal:false,
      })
    }
  }
})
