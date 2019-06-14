// pages/vedioPlayer/vedioPlayer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvInfo:'',
    mvUrl:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://localhost:3000/mv/detail?mvid=' + options.mv,
      success:(res)=>{
        console.log(res.data);
        this.setData({
          mvInfo:res.data.data,
        })
      }
    });
    wx.request({
      url: 'http://localhost:3000/mv/url?id=' + options.mv,
      success:(res)=>{
        this.setData({
          mvUrl: res.data.data.url,
        })
      }
    })
  },

  mvComment:function(){
    let imageUrl = encodeURIComponent(this.data.mvInfo.cover)
    wx.navigateTo({
      url: '../comment/comment?type=mv&id=' + this.data.mvInfo.id + '&imageUrl=' + imageUrl + '&name=' +this.data.mvInfo.name,
    })
  },

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