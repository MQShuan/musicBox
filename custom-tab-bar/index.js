Component({
  data: {
    selected: 1,
    selectedIndex:1,
    color: "gray",
    selectedColor: "#fff",
    list: [ {
      pagePath: "/pages/accountMusic/accountMusic",
      text: "iconfont icon-yinle icon"
    },
    {
      pagePath: "/pages/main-index/main-index",
      text: "iconfont icon-shipin icon"
    },
    {
      pagePath: "/pages/search/search",
      text: "iconfont icon-chazhao icon"
    }]
  },
  
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index,
      })
    }
  }
})