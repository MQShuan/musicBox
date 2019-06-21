// pages/rcSongList/rcSongList.js
Page({
  onReady: function () {
    wx.request({
      url: 'http://localhost:3000/banner?type=1',
      success: (res) => {
        console.log(res.data.banners);
        this.setData({
          bannerData: res.data.banners,
        })
      }
    });
    wx.request({
      url: 'http://localhost:3000/personalized',
      success: (res) => {
        let songListPart = [];
        console.log(res.data);
        res.data.result.map(i => {
          if (i.playCount > 100000) {
            i.playCount = (i.playCount / 10000).toFixed(0) + '万';
          } else {
            i.playCount = i.playCount.toFixed(0);
          }
        })
        this.setData({
          rcSongList: res.data.result,
        })
      }
    });
  },
  data: {
    rcSongList: '',
  },
  songListDetail: function (e) {
    console.log(e.currentTarget);
    wx.navigateTo({
      url: '../playListPage/playListPage?id=' + e.currentTarget.dataset.songlistid,
    })
  },
})