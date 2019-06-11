// pages/main-index/main-index.js
Component({
  lifetimes:{
    ready:function(){
      wx.request({
        url: 'http://localhost:3000/banner?type=1',
        success:(res)=>{
          this.setData({
            bannerData:res.data.banners,
          })
        }
      });
      wx.request({
        url: 'http://localhost:3000/personalized',
        success:(res)=>{
          console.log(res.data.result);
          let songListPart = [];
          for(let i=0;i<6;i++){
            songListPart[i] = res.data.result[i];
          }
          this.setData({
            rcSongList:songListPart,
          })
        }
      });
    }
  },
  properties: {

  },

  
  data: {
    selectTab:0,
    bannerData:'',
    rcSongList:'',
  },

 
  methods: {
    bannerTap:function(e){
      console.log(e.target.dataset.url);
    },
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
    },
    songListDetail:function(e){
      console.log(e.currentTarget);
      wx.navigateTo({
        url: '../playListPage/playListPage?id=' + e.currentTarget.dataset.songlistid,
      })
    },
  }
})
