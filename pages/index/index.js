//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    selectPage:1,

  },
  onShow: function () {
    if (typeof this.getTabbar === 'function' && this.getTabbar()) {
      this.getTabbar().setData({
        selected: 0,
      })
    }
  },
  loginPage:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  toAccountMusic:function(e){
    this.setData({
      selectPage:0,
    })
  },
  toIndexPage:function(e){
    this.setData({
      selectPage:1,
    })
  },
  toVideoPage:function(e){
    this.setData({
      selectPage:2,
    })
  }
})
