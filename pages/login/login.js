// pages/login/login.js
Page({
  formSubmit: function (e){
    wx.request({
      url:'http://localhost:3000/login',
      data:{
        email: e.detail.value.email,
        password: e.detail.value.password,
      },
      success(res){
        console.log(res.data);
        let userId = res.data.account.id.toString();
        wx.setStorage({
          key: 'uid',
          data: userId,
        });
        let userData = JSON.stringify(res.data);
        wx.setStorageSync('userData', userData);
        wx.navigateTo({
          url: '../index/index',
        });
      }
    })
  },
  logout:function(){
    wx.request({
      url: 'http://localhost:3000/logout',
      success(res){
        console.log('退出登陆')
      }
    })
  },
  toIndex:function(){
    wx.navigateTo({
      url: '../index/index',
    });
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})