// pages/main-index/main-index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selectTab:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectRecommend:function(event){
      this.setData({
        selectTab:0,
      })
    },
    selectFriend: function (event) {
      this.setData({
        selectTab: 1,
      })
    },
    selectFm: function (event) {
      this.setData({
        selectTab: 2,
      })
    }
  }
})
