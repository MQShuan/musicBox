网易云音乐仿写精简版本（微信小程序）
===

API来自[网易云音乐API](https://github.com/Binaryify/NeteaseCloudMusicApi)

__本仿写小程序为学习练习项目，仅作为学习参考__

**project.config已gitignore,基础库版本为2.7.1,没有配置修改，请自行添加project.config**

**注意**

1.播放组件获取duration存在获取不到或者延迟获取的问题(需等待官方解决)

2.微信小程序自定义tab存在切换时屏幕闪烁问题，并且已选中项高亮有BUG，会跳到其他未选择项上(需等待官方解决)

3.部分需要登录才能使用的接口，如从歌单中删除歌曲等，会报错301，详情参照网易云音乐API的文档中的解决方案解决

**4.歌单中分享，下载，多选尚未实现，当前仅实现查看评论相关功能,首页推荐朋友电台三个模块，仅完成推荐模块**

**首页**

![img](https://github.com/partysu/musicBox/blob/master/images/index.png)

**播放页面（GIF较大，请等待加载完毕，方能查看具体效果，未加载完毕时GIF显示卡顿）**

![img](https://github.com/partysu/musicBox/blob/master/images/player.gif)

**用户歌单页面**

![img](https://github.com/partysu/musicBox/blob/master/images/songList.gif)

**搜索页面**

![img](https://github.com/partysu/musicBox/blob/master/images/search.gif)