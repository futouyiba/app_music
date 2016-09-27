//index.js
//获取应用实例
var app = getApp();
var muName = '';
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    musicList: {},
    musicInfo: {},
    musicImg: '',
    hasMusic: 0,
    isPlay: 0
  },
  inputC: function(e){
    muName = e.detail.value;
  },
  searchMusci: function(){
    var that = this;
     wx.request({
        url: 'http://mobilecdn.kugou.com/api/v3/search/song',
        data: {
          format:'json',
          keyword:muName,
          page:1,
          pagesize:10
        },
        success: (res)=>{
          that.setData({
            musicList: res.data.data,
            hasMusic: 1
          })
        }
     })
  },
  playThis:function(e){
    this.setData({
      action: {
        method: 'pause'
      },
      isPlay: 0
    })
     wx.request({
       url: 'http://m.kugou.com/app/i/getSongInfo.php',
       data: {
         cmd: 'playInfo',
         hash: e.target.dataset.hash
       },
       success: (res)=>{
          this.setData({
            musicInfo: res.data,
            action: {
              method: 'play'
            },
            isPlay: 1
          })
       }
     })

     wx.request({
       url: 'http://tools.mobile.kugou.com/api/v1/singer_header/get_by_hash',
       data: {
         size:200,
         format:'json',
         hash: e.target.dataset.hash
       },
       success: (res)=>{
          this.setData({
            musicImg: res.data.url
          })
       }
     })


     
      
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
