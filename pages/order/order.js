var app = getApp()

Page({
  data: {
    mapWidth: app.globalData.screen_width
    , mapHeight: app.globalData.screen_height
    , markers:[]
  }
  //show current position
  , onLoad: function (options) {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        that.setData({
          mapLongitude: 117.710646
          , mapLatitude: 36.938357
          , markers: [
            {
              id: 0
              , iconPath: "../../images/mapMarks/bbShopLocation.png"
              , longitude: res.longitude
              , latitude: res.latitude
              , width: 30
              , height: 30
              , callout: {
                content: "BBShop-时尚造型"
                , color: "#d4237a"
                , bgColor: "#00000000"
              }
              ,label: {
                content:"BBShop-时尚造型"
                , color: "#d4237a"
              }
            },
            {
              id: 1
              , iconPath: "../../images/mapMarks/bbShopLocation.png"
              , longitude: 117.710646
              , latitude: 36.938357
              , width: 30
              , height: 30
              , callout: {
                content: "BBShop-时尚造型"
                , color: "#d4237a"
                , bgColor: "#00000000"
              }
              , label: {
                content: "BBShop-时尚造型"
                , color: "#d4237a"
              }
            }
          ]
        })
      },
    })
//数据请求
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=' + code + '&grant_type=authorization_code',
      success(res) {
        openid = res.data.openid //返回openid

        console.log(res);
      },
    })
  }
  //获取中间点的经纬度，并mark出来
  , getLngLat: function () {
    var that = this;
    this.mapCtx = wx.createMapContext("map4select");
    this.mapCtx.getCenterLocation({
      success: function (res) {
        that.setData({
          longitude: 112.33
          , latitude: 23.099994
        })
      }
    })
  }
  , regionchange(e) {
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置
    if (e.type == 'end') {
      this.getLngLat()
    }
  }
    /**
   * 用户点击右上角分享
   */
  ,onShareAppMessage: function () {

  }
  , markertap(e) {
    var mark = this.data.markers[1];
    console.log(mark);

    wx.openLocation({ //出发wx.openLocation API
      latitude: mark.latitude, //坐标纬度（从地图获取坐标）
      longitude: mark.longitude, //坐标经度（从地图获取坐标）
      name: mark.label.content, //打开后显示的地址名称
      address: mark.label.content //打开后显示的地址汉字
    })
    
  }
})