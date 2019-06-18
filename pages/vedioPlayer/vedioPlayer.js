// pages/vedioPlayer/vedioPlayer.js
const md5 = require('../../utils/md5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vedioInfo:'',
    vedioUrl:'',
    relatedVedio:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.mv){
      this.getMvDetail(options);
    }else{
      this.getVedioDetail(options);
    }
  },

  mvComment:function(){
    let imageUrl = encodeURIComponent(this.data.mvInfo.cover)
    wx.navigateTo({
      url: '../comment/comment?type=mv&id=' + this.data.mvInfo.id + '&imageUrl=' + imageUrl + '&name=' +this.data.mvInfo.name,
    })
  },
  getMvDetail: function (options){
    wx.request({
      url: 'http://localhost:3000/mv/detail?mvid=' + options.mv,//获取MV详情
      success: (res) => {
        console.log(res.data);
        this.setData({
          vedioInfo: res.data.data,
        })
      }
    });
    wx.request({
      url: 'http://localhost:3000/mv/url?id=' + options.mv,//获取MV播放URL
      success: (res) => {
        this.setData({
          vedioUrl: res.data.data.url,
        })
      }
    })
    wx.request({//获取MV相关视频
      url: 'http://localhost:3000/related/allvideo?id=' + options.mv,
      success: (res) => {
        this.setData({
          relatedVedio:res.data.data,
        })
        console.log(res.data);
      }
    })
  },
  getVedioDetail: function (options){
    wx.request({
      url: 'http://localhost:3000/video/detail?id=' + md5.hexMD5(options.vid),
      success:(res)=>{
        console.log(res.data);
        this.setData({
          vedioInfo: res.data.data,
        })
      }
    })
    wx.request({
      url: 'http://localhost:3000/video/url?id=' + md5.hexMD5(options.vid),
      success:(res)=>{
        console.log(res.data);
      }
    })
    wx.request({
      url: 'http://localhost:3000/related/allvideo?id=' + options.vid,
      success:(res)=>{
        this.setData({
          relatedVedio: res.data.data,
        })
      }
    })
  },
  relatedVedio:function(e){
    console.log(e);
    wx.navigateTo({
      url: 'vedioPlayer?vid=' + e.currentTarget.dataset.vid ,
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