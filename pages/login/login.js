// pages/login/login.js
Page({
  formSubmit: function (e){
    let timestamp = Date.now();
    console.log(timestamp);
    wx.request({
      url:'http://localhost:3000/login',
      data:{
        email: e.detail.value.email,
        password: e.detail.value.password,
        timestamp: timestamp,
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
        wx.switchTab({
          url: '../main-index/main-index',
        });
      }
    })
  },
  logout:function(){
    wx.request({
      url: 'http://localhost:3000/logout',
      success(res){
        wx.clearStorage();
        console.log('退出登陆')
      }
    })
  },
  toIndex:function(){
    wx.switchTab({
      url: '../main-index/main-index',
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    height:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({//获取屏幕宽高
      success: (res) => {
        this.setData({
          height: res.windowHeight,
        })
      },
    })
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