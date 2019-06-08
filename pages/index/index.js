//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    selectPage:0,

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
