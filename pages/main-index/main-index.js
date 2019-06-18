// pages/main-index/main-index.js
Page({
  onReady:function(){
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
          for (let i = 0; i < 6; i++) {
            songListPart[i] = res.data.result[i];
            if(songListPart[i].playCount>100000){
              songListPart[i].playCount = (songListPart[i].playCount/10000).toFixed(0) + '万';
            }else{
              songListPart[i].playCount = songListPart[i].playCount.toFixed(0);
            }
          }
          this.setData({
            rcSongList: songListPart,
          })
        }
      });
  },
  data: {
    selectTab:0,
    bannerData:'',
    rcSongList:'',
  },

  bannerTap: function (e) {
    console.log(e.target.dataset.url);
  },
  selectRecommend: function (event) {
    this.setData({
      selectTab: 0,
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
  },
  songListDetail: function (e) {
    console.log(e.currentTarget);
    wx.navigateTo({
      url: '../playListPage/playListPage?id=' + e.currentTarget.dataset.songlistid,
    })
  },
})
